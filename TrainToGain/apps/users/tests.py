
import json

from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate

from TrainToGain.apps.users.models import Entity, UserDetails
from TrainToGain.apps.users.views import *
from TrainToGain.apps.users.views import change_user_password


class UserTests(TestCase):
    def setUp(self):
        # Every test needs access to the request factory.
        self.factory = APIRequestFactory()
        self.user_details = UserDetails.objects.create(
            first_name="Joe",
            last_name="Doe",
            age=25,
            height=177,
            weight=65)
        self.user = Entity.objects.create_user(
            login='jdoe', email='jdoe@gmail.com', password='abcABC123*', user_details=self.user_details)

    def test_get_user_information_success(self):
        request = self.factory.get("/api/users/get_login/jdoe")
        response = get_user_by_login(request, self.user.login)
        self.assertEqual(response.status_code, 200)
        self.assertEqual("Joe", response.data["user_details"]["first_name"])
        self.assertEqual("Doe",  response.data["user_details"]["last_name"])
        self.assertEqual("jdoe@gmail.com", response.data["email"])

    def test_create_user_success(self):
        request = self.factory.post("/api/users/create", data=json.dumps({
            "login": "jbezos",
            "password": "abcABC123*",
            "email": "jbezos@gmail.com",
            "user_details": {
                "first_name": "Jeff",
                "last_name": "Bezos",
                "age": 46,
                "height": 180,
                "weight": 75,
            }}), content_type='application/json')
        response = CreateUserView.as_view()(request)
        self.assertEqual(response.status_code, 201)
        created_user = Entity.objects.get(login="jbezos")
        self.assertEqual(created_user.email, "jbezos@gmail.com")
        self.assertEqual(created_user.user_details.first_name, "Jeff")

    def test_create_user_with_weak_password_fail(self):
        request = self.factory.post("/api/users/create", data=json.dumps({
            "login": "rbranson",
            "password": "weakpassword",
            "email": "rbranson@gmail.com",
            "user_details": {
                "first_name": "Robert",
                "last_name": "Branson",
                "age": 55,
                "height": 178,
                "weight": 86,
            }}), content_type='application/json')
        response = CreateUserView.as_view()(request)
        self.assertEqual(response.status_code, 400)

    def test_create_user_with_invalid_email_fail(self):
        request = self.factory.post("/api/users/create", data=json.dumps({
            "login": "rbranson",
            "password": "abcABC123*",
            "email": "notanemail.com",
            "user_details": {
                "first_name": "Robert",
                "last_name": "Branson",
                "age": 55,
                "height": 178,
                "weight": 86,
            }}), content_type='application/json')
        response = CreateUserView.as_view()(request)
        self.assertEqual(response.status_code, 400)

    def test_create_user_with_taken_login_fail(self):
        request = self.factory.post("/api/users/create", data=json.dumps({
            "login": "jdoe",
            "password": "abcABC123*",
            "email": "rbranson@gmail.com",
            "user_details": {
                "first_name": "Robert",
                "last_name": "Branson",
                "age": 55,
                "height": 178,
                "weight": 86,
            }}), content_type='application/json')
        response = CreateUserView.as_view()(request)
        self.assertEqual(response.status_code, 400)

    def test_change_password_success(self):
        request = self.factory.patch(
            '/api/users/change-password', {'old_password': 'abcABC123*', 'new_password': 'ABCabc123*'})
        force_authenticate(request, user=self.user)
        response = change_user_password(request)
        test_user = Entity.objects.get(login='jdoe')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(test_user.check_password("ABCabc123*"))
