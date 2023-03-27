import pytest
from faker import Faker

from TrainToGain.apps.users.tests.UserFactory import UserFactory


@pytest.fixture(scope="function")
def user_schema():
    fake = Faker()
    return {
        "login": fake.user_name(),
        "password": "abcABC123*",
        "email": fake.email(),
        "user_details": {
            "first_name": fake.first_name(),
            "last_name": fake.last_name(),
            "age": fake.random_int(min=1, max=100),
            "height": fake.random_int(min=1, max=250),
            "weight": fake.random_int(min=1, max=300)
        }
    }


@pytest.fixture(scope="function")
def create_user():
    return UserFactory()
