import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid2,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CustomButton from "../components/CustomButton";
import CustomField from "../components/CustomField";
function PasswordReset() {
  const [email, setEmail] = useState("");
  const handleReset = () => {
    console.log(email);
  };
  return (
    <Container>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box>
          <Typography sx={{ p: 4 }} variant="h6" color="TextSecondary">
            Enter your email address below and we'll send you a link to reset
            your password.
          </Typography>
          <Grid2 container justifyContent="center">
            <Grid2 size={8}>
              <CustomField
                id="email"
                label="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                fullWidth
              />
            </Grid2>
          </Grid2>
        </Box>
        <CustomButton
          sx={{ mt: 4 }}
          text="RESET PASSWORD"
          type="submit"
          size="large"
          onClick={handleReset}
        />
      </Box>
    </Container>
  );
}

export default PasswordReset;
