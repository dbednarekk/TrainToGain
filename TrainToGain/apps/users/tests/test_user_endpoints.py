import json

import pytest
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.test import APIClient

from TrainToGain.apps.users.models import Entity
from TrainToGain.apps.users.regex_validators import LoginRegex, NameRegex, PasswordRegex


@pytest.mark.django_db
class TestCreateUser:
    client = APIClient()

    def test_create_user_success(self, user_schema):
        response = self.client.post("/api/users/", data=user_schema, format="json")
        try:
            db_user = Entity.objects.get(login=user_schema["login"])
        except ObjectDoesNotExist:
            db_user = None

        assert db_user is not None
        assert db_user.login == user_schema["login"]
        assert response.status_code == 201

    def test_create_user_login_taken(self, user, user_schema):
        user_schema["login"] = user.login

        response = self.client.post("/api/users/", data=user_schema, format="json")

        assert response.status_code == 400
        assert b"entity with this login already exists." in response.content
        assert Entity.objects.filter(login=user_schema["login"]).count() == 1

    def test_create_user_email_taken(self, user, user_schema):
        user_schema["email"] = user.email

        response = self.client.post("/api/users/", data=user_schema, format="json")

        assert response.status_code == 400
        assert b"entity with this email already exists." in response.content
        assert Entity.objects.filter(email=user_schema["email"]).count() == 1

    def test_create_user_no_fields(self):
        user_schema = {}

        response = self.client.post("/api/users/", data=user_schema, format="json")

        assert response.status_code == 400
        assert Entity.objects.all().count() == 0

    @pytest.mark.parametrize("field, value", [("login", ""), ("password", ""), ("email", "")])
    def test_create_user_blank_mandatory_fields(self, user_schema, field, value):
        user_schema[field] = value

        response = self.client.post("/api/users/", data=user_schema, format="json")
        result = json.loads(response.content.decode('utf-8'))

        assert response.status_code == 400
        assert result.get(field)[0] == "This field may not be blank."
        assert Entity.objects.all().count() == 0

    @pytest.mark.parametrize("field, value, response_message", [("user_details", {}, "This field is required."),
                                                                ("user_details", {"first_name": "", "last_name": ""},
                                                                 "This field may not be blank.")])
    def test_create_user_blank_user_details(self, user_schema, field, value, response_message):
        user_schema[field] = value

        response = self.client.post("/api/users/", data=user_schema, format="json")
        result = json.loads(response.content.decode('utf-8'))

        assert response.status_code == 400
        assert response_message in [obj[0] for obj in result.get(field).values()]
        assert Entity.objects.all().count() == 0

    @pytest.mark.parametrize("value", ["a", "ab", "", "a" * 51, "absd@", "12345", " ", "a b", "abc'"])
    def test_create_user_invalid_login(self, user_schema, value):
        user_schema["login"] = value

        response = self.client.post("/api/users/", data=user_schema, format="json")
        result = json.loads(response.content.decode('utf-8'))

        assert response.status_code == 400
        assert LoginRegex.message in result.get("login") or "This field may not be blank." in result.get("login")
        assert Entity.objects.all().count() == 0

    @pytest.mark.parametrize("value", ["a", "ab", "", "a" * 51, "absd@", "12345", " ", "a b", "abc'", "test@@gmail.com",
                                       "test@gmail", "test", "test@.com", "test@com", "test.com", "test@.com"])
    def test_create_user_invalid_email(self, user_schema, value):
        user_schema["email"] = value

        response = self.client.post("/api/users/", data=user_schema, format="json")
        result = json.loads(response.content.decode('utf-8'))

        assert response.status_code == 400
        assert "Invalid email" in result.get("email") or "This field may not be blank." in result.get("email")
        assert Entity.objects.all().count() == 0

    @pytest.mark.parametrize("name, number",
                             [("a", -1), (" ", 0), ("-asdsad", 123.5), (" -- ", "asd"), ("asdasd123", 0),
                              ("abc'@", 500)])
    def test_create_user_invalid_user_details(self, user_schema, name, number):
        user_schema["user_details"] = {
            "first_name": name,
            "last_name": name,
            "age": number,
            "height": number,
            "weight": number
        }

        response = self.client.post("/api/users/", data=user_schema, format="json")
        result = json.loads(response.content.decode('utf-8'))

        assert response.status_code == 400
        assert result.get("user_details").get("first_name")[0] in [NameRegex.message, "This field may not be blank."]
        assert result.get("user_details").get("last_name")[0] in [NameRegex.message, "This field may not be blank."]
        assert result.get("user_details").get("age")[0] in ["Ensure this value is greater than or equal to 1.",
                                                            "A valid integer is required.",
                                                            "Ensure this value is less than or equal to 150."]
        assert result.get("user_details").get("height")[0] in ["Ensure this value is greater than or equal to 1.",
                                                               "A valid integer is required.",
                                                               "Ensure this value is less than or equal to 250."]
        assert result.get("user_details").get("weight")[0] in ["Ensure this value is greater than or equal to 1.",
                                                               "A valid integer is required.",
                                                               "Ensure this value is less than or equal to 300."]
        assert Entity.objects.all().count() == 0

    @pytest.mark.parametrize("password", ["abc", "abcABC", "abcABC123", "       ", "a" * 100, "", "ABCABV123@@",
                                          "1234578910", "abcABCabcABC", "abcABC123abcABC", "abcABC123abcABC",
                                          "!@#$%^&*()"])
    def test_create_user_invalid_password(self, user_schema, password):
        user_schema["password"] = password

        response = self.client.post("/api/users/", data=user_schema, format="json")
        result = json.loads(response.content.decode('utf-8'))

        assert response.status_code == 400
        assert result.get("password")[0] in ["This field may not be blank.", PasswordRegex.message]
        assert Entity.objects.all().count() == 0


@pytest.mark.django_db
class TestUpdateUser:
    client = APIClient()

    def test_update_user_success(self, user):
        new_data = {
            "first_name": "New Name",
            "last_name": "New Surname"
        }
        user_from_db = Entity.objects.get(login=user.login)

        response = self.client.patch(f"/api/users/{user_from_db.id}/", data=new_data, format="json")

        assert response.status_code == 200
        assert user_from_db.user_details.first_name == "New Name"
        assert user_from_db.user_details.last_name == "New Surname"

    def test_update_user_wrong_data(self, user):
        new_data = {
            "first_name": 9999,
            "age": "test"
        }
        user_from_db = Entity.objects.get(login=user.login)

        response = self.client.patch(f"/api/users/{user_from_db.id}/", data=new_data, format="json")

        assert response.status_code == 400

    def test_update_user_that_does_not_exist(self):
        new_data = {
            "first_name": "New Name",
            "last_name": "New Surname"
        }

        response = self.client.patch("/api/user/test", data=new_data, format="json")

        assert response.status_code == 404

    def test_update_different_user_fail(self, user):
        pass
