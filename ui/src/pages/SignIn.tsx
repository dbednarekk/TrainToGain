import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import CustomField from "../components/CustomField";
import { showPasswordInputProps } from "../components/ShowPasswordProps";
import { signInValidationSchema } from "../utils/ValidationSchema";
import { getSelfInfo, post } from "../utils/ApiCalls";
import { toast } from "react-toastify";

function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const storeLoginInfo = (res: any) => {
    const claims = atob(res.data.access.split(".")[1]);
    getSelfInfo(res.data.access, JSON.parse(claims).user_id).then((res) => {
      console.log(res);
      localStorage.setItem("login", res.data.login);
    });
    localStorage.setItem("token", res.data.access);
  };

  const handleSignIn = (payload: any) => {
    const jsonData = JSON.stringify({
      login: payload.login,
      password: payload.password,
    });
    post("token/", jsonData)
      .then((res) => {
        storeLoginInfo(res);
        toast.success("Successful action");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: signInValidationSchema,
    onSubmit: (values) => {
      handleSignIn(values);
    },
  });

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
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
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
                InputProps={showPasswordInputProps(
                  showPassword,
                  handleClickShowPassword
                )}
              />
            </Grid>
          </Grid>
          <CustomButton
            text="Sign In"
            type="submit"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            size="large"
          />

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
