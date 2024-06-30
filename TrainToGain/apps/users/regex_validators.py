class LoginRegex:
    regex = r"^([A-Za-z]){3,50}$"
    message = "Login must be between 3-50 characters and can contain only letters"


class PasswordRegex:
    regex = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,50}$"
    message = "Password must be between 8-50 characters and contain at least one uppercase letter," \
              " one lowercase letter, one digit, and one special character"


class NameRegex:
    regex = r"^[a-zA-Z][a-zA-Z\-\s]{3,50}$"
    message = "Name must start with a letter and can contain only letters, spaces, and hyphens"
