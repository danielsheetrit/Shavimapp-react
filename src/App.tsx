import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// auth
import { withAuthGuard } from "./hoc/withAuthGuard";
import { withGuestGuard } from "./hoc/withGuestGuard";


// Styles
import { ThemeProvider } from "@mui/material";
import { theme } from "./config/mui";

// notification
import { SnackbarProvider } from "notistack";

// pages
import User from "./pages/User";
import Login from "./pages/Login";
import { Admin } from "./pages/Admin";
import Register from "./pages/Register";

export default function App() {
  const UserWithAG = withAuthGuard(User, ["user"]);
  const AdminWithAG = withAuthGuard(Admin, ["admin", "chief"]);
  const LoginWithGG = withGuestGuard(Login);
  const RegisterWithGG = withGuestGuard(Register);

  return (
    <ThemeProvider theme={theme}>
        <SnackbarProvider
          autoHideDuration={2500}
          preventDuplicate
          style={{
            backgroundColor: "white",
            fontFamily: "'Nunito Sans', sans-serif",
            color: theme.palette.text.primary,
            borderRadius: "5px !important",
            padding: "3px 15px",
            marginTop: "25px",
          }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          dense
        >
          <Router>
            <Routes>
              <Route path="/" element={<LoginWithGG />} />
              <Route path="/user" element={<UserWithAG />} />
              <Route path="/admin" element={<AdminWithAG />} />
              <Route path="/login" element={<LoginWithGG />} />
              <Route path="/register" element={<RegisterWithGG />} />
            </Routes>
          </Router>
        </SnackbarProvider>
    </ThemeProvider>
  );
}
