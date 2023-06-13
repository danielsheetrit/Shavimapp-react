import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Styles
import { ThemeProvider } from "@mui/material";
import { theme } from "./config/mui";

// navigation
import Navbar from "./components/Navbar";

// pages
import User from "./pages/User";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/user" element={<User />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
