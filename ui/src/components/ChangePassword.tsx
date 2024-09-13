import { Box, Grid2, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { post } from "../utils/ApiCalls";
import { changePasswordValidationSchema } from "../utils/ValidationSchema";
import CustomButton from "./CustomButton";
import CustomField from "./CustomField";
import { showPasswordInputProps } from "./ShowPasswordProps";
function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const token = sessionStorage.getItem("token") || "";
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleChangePassword = (payload: any) => {
    const jsonData = JSON.stringify({
      password: payload.newpassword,
      confirm_password: payload.confirmpassword,
    });

    post("users/change-password/", jsonData, token)
      .then(() => {
        toast.success("Password changed successfully");

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((err) => {
        toast.error(err.response.data.detail);
      });
  };
  const formik = useFormik({
    initialValues: {
      newpassword: "",
      confirmpassword: "",
    },
    validationSchema: changePasswordValidationSchema,
    onSubmit: (values) => {
      handleChangePassword(values);
    },
  });
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      sx={{
        mt: 3,
      }}
    >
      <Typography variant="h4" color="textSecondary">
        Change Password
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        sx={{
          mt: 3,
        }}
      >
        <Grid2 container spacing={3} flexDirection="column" alignItems="center">
          <Grid2 container flexDirection="row" justifyContent="center">
            <Grid2>
              <CustomField
                id="newpassword"
                label="New Password"
                value={formik.values.newpassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.newpassword &&
                  Boolean(formik.errors.newpassword)
                }
                helperText={
                  formik.touched.newpassword && formik.errors.newpassword
                }
                type={showPassword ? "text" : "password"}
                fullWidth
                InputProps={showPasswordInputProps(
                  showPassword,
                  handleClickShowPassword
                )}
              />
            </Grid2>
            <Grid2>
              <CustomField
                id="confirmpassword"
                label="Confirm Password"
                value={formik.values.confirmpassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmpassword &&
                  Boolean(formik.errors.confirmpassword)
                }
                helperText={
                  formik.touched.confirmpassword &&
                  formik.errors.confirmpassword
                }
                type={showPassword ? "text" : "password"}
              />
            </Grid2>
          </Grid2>
          <Grid2>
            <CustomButton text="CHANGE PASSWORD" size="large" type="submit" />
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
}

export default ChangePassword;
