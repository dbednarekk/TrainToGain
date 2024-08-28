import { createTheme } from "@mui/material/styles";
declare module "@mui/material/styles" {
  interface Palette {
    navbar: Palette["primary"];
  }

  interface PaletteOptions {
    navbar?: PaletteOptions["primary"];
  }
}
const theme = createTheme({
  palette: {
    primary: {
      main: "#25527e",
    },
    secondary: {
      main: "#c8dbef",
    },
    navbar: {
      main: "#ffffff",
    },
  },
});

export default theme;
