import { Divider } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
declare module "@mui/material/AppBar" {
  interface AppBarPropsColorOverrides {
    navbar: true;
  }
}
export default function ButtonAppBar() {
  const navigate = useNavigate();
  const isLogged = sessionStorage.getItem("token") ? true : false;
  const login = sessionStorage.getItem("login");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <AppBar color="navbar" elevation={0} position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Train to Gain
        </Typography>
        <Box>
          {isLogged ? (
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" mr={2}>
                {login}
              </Typography>
              <CustomButton text="LOGOUT" onClick={handleLogout} />
            </Box>
          ) : (
            <>
              <CustomButton
                text="LOGIN"
                onClick={() => navigate("/signin")}
                sx={{ marginRight: "5px" }}
                size="large"
              />
              <CustomButton
                variant="outlined"
                text="SIGN UP"
                onClick={() => navigate("/signup")}
                size="large"
              />
            </>
          )}
        </Box>
      </Toolbar>
      <Divider />
    </AppBar>
  );
}
