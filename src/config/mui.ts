import { createTheme } from "@mui/material/styles";

const drawerWidth = 200;
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 800,
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
    MuiCheckbox: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: "none",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: "5px !important",
          backgroundColor: "#F7F7F8",
          fontSize: 12,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: ({ theme }) =>
          theme.unstable_sx({
            color: theme.palette.text.primary,
            fontWeight: 700,
          }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) =>
          theme.unstable_sx({
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.background.default,
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
            },
          }),
        text: {
          fontWeight: 700,
          textTransform: "none",
        },
      },
    },
  },
});

export { theme, drawerWidth };
