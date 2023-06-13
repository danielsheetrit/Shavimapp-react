import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1072,
      lg: 1200,
      xl: 1536,
    },
  },
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
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontWeight: 700,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) =>
          theme.unstable_sx({
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.background.default,
          }),
        text: {
          fontWeight: 700,
          textTransform: "none",
        },
      },
    },
  },
});

export { theme };
