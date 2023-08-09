import React from "react";
import CustomField from "../components/CustomField";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CustomButton from "../components/CustomButton";
import { useFormik } from "formik";
import singUpValidationSchema from "../utils/ValidationSchema";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { post } from "../utils/ApiCalls";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSignUp = (payload: any) => {
    const jsonData = JSON.stringify({
      login: payload.login,
      password: payload.password,
      email: payload.email,
      user_details: {
        first_name: payload.firstName,
        last_name: payload.lastName,
        age: payload.age,
        height: payload.height,
        weight: payload.weight,
      },
    });

    post("users/", jsonData)
      .then(() => {
        toast.success("User created successfully");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      login: "",
      password: "",
      confirmPassword: "",
      email: "",
      age: "",
      height: "",
      weight: "",
    },
    validationSchema: singUpValidationSchema,
    onSubmit: (values) => {
      handleSignUp(values);
    },
  });

  const showPasswordInputProps = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CustomField
                id="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomField
                id="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomField
                id="login"
                label="Login"
                value={formik.values.login}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.login && Boolean(formik.errors.login)}
                helperText={formik.touched.login && formik.errors.login}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <CustomField
                id="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <CustomField
                id="password"
                label="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                type={showPassword ? "text" : "password"}
                fullWidth
                InputProps={showPasswordInputProps}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomField
                id="confirmPassword"
                label="Confirm Password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                type={showPassword ? "text" : "password"}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomField
                id="height"
                label="Height"
                value={formik.values.height}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.height && Boolean(formik.errors.height)}
                helperText={formik.touched.height && formik.errors.height}
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">cm</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomField
                id="weight"
                label="Weight"
                value={formik.values.weight}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.weight && Boolean(formik.errors.weight)}
                helperText={formik.touched.weight && formik.errors.weight}
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">kg</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomField
                id="age"
                label="Age"
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.age && Boolean(formik.errors.age)}
                helperText={formik.touched.age && formik.errors.age}
                type="number"
              />
            </Grid>
          </Grid>
          <CustomButton
            text="Sign Up"
            type="submit"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            size="large"
          />
        </Box>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="#" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default SignUp;
