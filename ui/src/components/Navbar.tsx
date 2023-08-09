import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="transparent" elevation={0} position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Train to Gain
          </Typography>
          <Box>
            <CustomButton
              text="LOGIN"
              onClick={() => {}}
              sx={{ marginRight: "5px" }}
              size="large"
            />
            <CustomButton
              variant="outlined"
              text="SIGN UP"
              onClick={() => navigate("/signup")}
              size="large"
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
