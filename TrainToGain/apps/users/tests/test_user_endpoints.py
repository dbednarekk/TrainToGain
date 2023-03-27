import json

import pytest
from rest_framework.test import APIClient

from TrainToGain.apps.users.models import Entity


@pytest.mark.django_db
class TestCreateUser:
    client = APIClient()

    def test_create_user_success(self, user_schema):
        response = self.client.post("/api/users/", data=user_schema, format="json")

        db_user = Entity.objects.get(login=user_schema["login"])

        assert db_user.email == user_schema["email"]
        assert response.status_code == 201

    def test_user_login_taken(self, user_schema):
        self.client.post("/api/users/", data=user_schema, format="json")

        response = self.client.post("/api/users/", data=user_schema, format="json")

        assert response.status_code == 400
        assert b"entity with this login already exists." in response.content

    def test_user_email_taken(self, user_schema):
        self.client.post("/api/users/", data=user_schema, format="json")
        user_with_different_login = user_schema
        user_with_different_login["login"] = "new_login"

        response = self.client.post("/api/users/", data=user_schema, format="json")

        assert response.status_code == 400

    def test_create_user_no_fields(self):
        user_schema = {}

        response = self.client.post("/api/users/", data=user_schema, format="json")

        assert response.status_code == 400

    def test_create_user_not_all_mandatory_fields(self, user_schema):
        user_schema.pop("email")
        user_details_dict = user_schema["user_details"]
        user_details_dict.pop("first_name")
        user_schema["user_details"] = user_details_dict

        response = self.client.post("/api/users/", data=user_schema, format="json")
        result = json.loads(response.content.decode('utf-8'))

        assert response.status_code == 400
        assert result.get("email")[0] == "This field is required."
        assert result.get("user_details").get("first_name")[0] == "This field is required."


@pytest.mark.django_db
class TestUpdateUser:
    client = APIClient()

    def test_update_user_success(self, create_user):
        new_data = {
            "first_name": "New Name",
            "last_name": "New Surname"
        }

        response = self.client.patch(f"/api/users/{create_user.login}/", data=new_data, format="json")
        user_from_db = Entity.objects.get(login=create_user.login)

        assert response.status_code == 200
        assert user_from_db.user_details.first_name == "New Name"
        assert user_from_db.user_details.last_name == "New Surname"

    def test_update_user_wrong_data(self, create_user):
        new_data = {
            "first_name": 9999,
            "age": "test"
        }

        response = self.client.patch(f"/api/users/{create_user.login}/", data=new_data, format="json")

        assert response.status_code == 400

    def test_update_user_that_does_not_exist(self):
        new_data = {
            "first_name": "New Name",
            "last_name": "New Surname"
        }

        response = self.client.patch("/api/user/test", data=new_data, format="json")

        assert response.status_code == 404

    def test_update_different_user_fail(self, create_user):
        pass
