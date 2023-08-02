import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CustomButton from "./CustomButton";

export default function ButtonAppBar() {
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
              onClick={() => {}}
              size="large"
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
