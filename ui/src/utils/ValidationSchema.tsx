import * as yup from "yup";

export const singUpValidationSchema = yup.object({
  firstName: yup
    .string()
    .required("First Name is required")
    .min(2, "First Name must be at least 2 characters")
    .max(20, "First Name must be less than 20 characters"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .min(2, "Last Name must be at least 2 characters")
    .max(20, "Last Name must be less than 20 characters"),
  login: yup
    .string()
    .required("Login is required")
    .min(3, "Login must be at least 3 characters")
    .max(50, "Login must be less than 50 characters")
    .matches(/^[a-zA-Z0-9]+$/, "Login must contain only letters and numbers"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be less than 50 characters"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W).{8,50}$/,
  //   "Password must contain one uppercase letter, one lowercase letter, one number and one special character"
  // ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  email: yup
    .string()
    .email("Email must be a valid email")
    .max(50, "Email must be less than 50 characters")
    .required("Email is required"),
  age: yup
    .number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .max(150, "Age must be less than 150"),
  height: yup
    .number()
    .required("Height is required")
    .positive("Height must be a positive number")
    .integer("Height must be an integer")
    .max(300, "Height must be less than 300"),
  weight: yup
    .number()
    .required("Weight is required")
    .positive("Weight must be a positive number")
    .integer("Weight must be an integer")
    .max(500, "Weight must be less than 500"),
});

export const signInValidationSchema = yup.object({
  login: yup
    .string()
    .required("Login is required")
    .min(3, "Login must be at least 3 characters")
    .max(50, "Login must be less than 50 characters")
    .matches(/^[a-zA-Z0-9]+$/, "Login must contain only letters and numbers"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be less than 50 characters"),
});

export const editAccountValidationSchema = yup.object({
  firstName: yup
    .string()
    .required("First Name is required")
    .min(2, "First Name must be at least 2 characters")
    .max(20, "First Name must be less than 20 characters"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .min(2, "Last Name must be at least 2 characters")
    .max(20, "Last Name must be less than 20 characters"),
  age: yup
    .number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .max(150, "Age must be less than 150"),
  height: yup
    .number()
    .required("Height is required")
    .positive("Height must be a positive number")
    .integer("Height must be an integer")
    .max(300, "Height must be less than 300"),
  weight: yup
    .number()
    .required("Weight is required")
    .positive("Weight must be a positive number")
    .integer("Weight must be an integer")
    .max(500, "Weight must be less than 500"),
});

export const changePasswordValidationSchema = yup.object({
  newpassword: yup
    .string()
    .required("New Password is required")
    .min(8, "New Password must be at least 8 characters")
    .max(50, "New Password must be less than 50 characters"),
  confirmpassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("newpassword")], "Passwords must match"),
});
