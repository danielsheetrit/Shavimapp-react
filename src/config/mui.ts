import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#fff",
    },
    text: {
      primary: "#081735",
      secondary: "#fff",
    },
    primary: {
      main: "#E14E10",
    },
    secondary: {
      main: "#FFEFE9",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: "'Nunito Sans', sans-serif",
  },
});

export { theme };
