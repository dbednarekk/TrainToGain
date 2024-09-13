import { Box, Grid2, InputAdornment, Typography } from "@mui/material";
import { useFormik } from "formik";
import { decodeToken } from "react-jwt";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { IUserObject, TokenPayload } from "../interfaces/ApiInterface";
import { patch } from "../utils/ApiCalls";
import { editAccountValidationSchema } from "../utils/ValidationSchema";
import CustomButton from "./CustomButton";
import CustomField from "./CustomField";
function EditAccount(userObj: IUserObject) {
  const user = userObj.user;
  const token = sessionStorage.getItem("token") || "";
  const decodedToken = decodeToken<TokenPayload>(token);

  const handleEditAccount = (payload: any) => {
    const jsonData = JSON.stringify({
      first_name: payload.firstName,
      last_name: payload.lastName,
      age: payload.age,
      height: payload.height,
      weight: payload.weight,
    });

    patch(`users/${decodedToken?.user_id}/`, jsonData, token)
      .then(() => {
        toast.success("Successfully updated account details");
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
      firstName: user?.user_details?.first_name,
      lastName: user?.user_details?.last_name,
      age: user?.user_details?.age.toFixed(),
      height: user?.user_details?.height.toFixed(),
      weight: user?.user_details?.weight.toFixed(),
    },
    validationSchema: editAccountValidationSchema,
    onSubmit: (values) => {
      handleEditAccount(values);
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
        Edit Account
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
                id="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
                multiline
              />
            </Grid2>
            <Grid2>
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
                multiline
              />
            </Grid2>
          </Grid2>
          <Grid2
            container
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent="center"
          >
            <Grid2 size={{ xs: 8, sm: 2 }}>
              <CustomField
                id="age"
                label="Age"
                type="number"
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.age && Boolean(formik.errors.age)}
                helperText={formik.touched.age && formik.errors.age}
                multiline
              />
            </Grid2>
            <Grid2 size={{ xs: 8, sm: 2 }}>
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
                multiline
              />
            </Grid2>
            <Grid2 size={{ xs: 8, sm: 2 }}>
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
                multiline
              />
            </Grid2>
          </Grid2>
          <Grid2>
            <CustomButton
              text="EDIT ACCOUNT"
              type="submit"
              fullWidth
              size="large"
            />
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
}

export default EditAccount;
