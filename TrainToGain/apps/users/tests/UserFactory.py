from factory import SubFactory
from factory.django import DjangoModelFactory
from faker import Faker

fake = Faker()


class UserDetailsFactory(DjangoModelFactory):
    class Meta:
        model = "users.UserDetails"

    first_name = fake.first_name()
    last_name = fake.last_name()
    age = fake.random_int(min=1, max=100)
    height = fake.random_int(min=1, max=250)
    weight = fake.random_int(min=1, max=300)


class UserFactory(DjangoModelFactory):
    class Meta:
        model = "users.Entity"

    login = fake.user_name()
    password = "abcABC123*"
    email = fake.email()
    active = True
    is_admin = False
    user_details = SubFactory(UserDetailsFactory)
