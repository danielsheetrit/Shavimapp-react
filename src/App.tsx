import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// auth
import { withAuthGuard } from "./hoc/withAuthGuard";
import { withGuestGuard } from "./hoc/withGuestGuard";

// Styles
import { ThemeProvider } from "@mui/material";
import { theme } from "./config/mui";

// pages
import User from "./pages/User";
import Login from "./pages/Login";

export default function App() {
  const UserWithAG = withAuthGuard(User, ["user"]);
  const LoginWithGG = withGuestGuard(Login);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/user" element={<UserWithAG />} />
          <Route path="/login" element={<LoginWithGG />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
