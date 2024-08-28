from django.contrib.auth.base_user import BaseUserManager


class CustomEntityManager(BaseUserManager):
    """Custom manager for user entity."""

    def create_user(self, login: str, password: str, email: str, user_details):
        user = self.model(login=login, email=email, user_details=user_details)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, login: str, password: str, email: str):
        admin = self.model(login=login, email=email, user_details=None)
        admin.set_password(password)
        admin.is_admin = True
        admin.active = True
        admin.save(using=self._db)

        return admin
