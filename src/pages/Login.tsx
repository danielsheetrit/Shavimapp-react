import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// locals
import axiosInstance from "../utils/axios";
import useAuth from "../hooks/useAuth";
import AuthHero from "../components/AuthHero";
import PasswordButton from "../components/PasswordButton";

type GroupAUsersType = {
  username: string;
  _id: string;
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const [groupAUsers, setGroupAUsers] = useState<GroupAUsersType[] | null>(
    null
  );
  const theme = useTheme();
  const { login, loginEmployee } = useAuth();

  const handleLogin = async (type: "a" | "b") => {
    if (type === "b" && (!username.trim() || !password.trim())) return;
    if (type === "a" && !selectedUser) return;

    try {
      type === "a"
        ? await loginEmployee(selectedUser)
        : await login(username, password);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await axiosInstance.get("/users/users-summary");
      setGroupAUsers(data?.users);
    })();
  }, []);

  return (
    <Stack flexDirection="row" sx={{ height: "100vh" }}>
      <Box
        sx={{
          flexBasis: 400,
          py: 2.5,
          px: 4,
          width: "100%",
          mx: "auto",
          overflowY: "auto",
        }}
      >
        <Stack alignItems="center">
          <Typography variant="h5" sx={{ color: theme.palette.primary.main }}>
            Login
          </Typography>
          <Stack sx={{ width: "100%", mt: 5 }}>
            <Typography sx={{ fontSize: 11 }}>Username</Typography>
            <TextField
              sx={{ mt: 0.5 }}
              placeholder="Enter your username"
              size="small"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
            />
          </Stack>

          <Stack sx={{ width: "100%", mt: 2 }}>
            <Typography sx={{ fontSize: 11 }}>Password</Typography>
            <TextField
              sx={{ mt: 0.5 }}
              placeholder="***********"
              type={showPassword ? "text" : "password"}
              size="small"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <PasswordButton
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                ),
              }}
            />
          </Stack>
          <Button
            onClick={() => handleLogin("b")}
            sx={{ px: 6.5, py: 1, mt: 4 }}
          >
            Login B
          </Button>

          {/* {Group A} ------------------------------------------------ */}
          <Typography
            sx={{
              mt: 7,
              color: theme.palette.primary.main,
            }}
          >
            Choose User form Group A to login
          </Typography>

          <Stack sx={{ width: "100%", mt: 1.75 }}>
            <Typography sx={{ fontSize: 11 }}>Select User</Typography>
            <Select
              sx={{ mt: 0.5 }}
              value={selectedUser}
              onChange={(ev) => setSelectedUser(ev.target.value)}
              size="small"
              placeholder="Select user"
            >
              {groupAUsers ? (
                groupAUsers?.map((user) => (
                  <MenuItem key={user._id} value={user.username}>
                    {user.username}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">Loading</MenuItem>
              )}
            </Select>
          </Stack>
          <Button
            onClick={() => handleLogin("a")}
            sx={{ px: 6.5, py: 1, mt: 4 }}
          >
            Login A
          </Button>

          <Stack flexDirection="row" alignItems="center" sx={{ mt: 3 }}>
            <Typography sx={{ fontSize: 11, mr: 0.5 }}>
              Don’t have an account?
            </Typography>
            <Typography sx={{ fontSize: 11 }}>
              <Link
                style={{ color: theme.palette.primary.main }}
                to="/register"
              >
                Register!
              </Link>
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <AuthHero />
    </Stack>
  );
}
