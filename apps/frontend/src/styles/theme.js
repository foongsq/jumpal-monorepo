import { createTheme } from "@mui/material/styles";
import { green, grey } from "@mui/material/colors";

export default createTheme({
  palette: {
    primary: {
      main: green[600],
      light: green[300],
      lighter: green[100],
    },
    secondary: {
      main: grey[200],
    },
  },
});
