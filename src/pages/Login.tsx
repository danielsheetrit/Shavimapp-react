import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Visibility from "@mui/icons-material/VisibilityOutlined";
import VisibilityOff from "@mui/icons-material/VisibilityOffOutlined";

// locals
import axiosInstance from "../utils/axios";
import useAuth from "../hooks/useAuth";
import AuthHero from "../components/AuthHero";

type GroupAUsersType = {
  username: string;
  _id: string;
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [groupAUsers, setGroupAUsers] = useState<GroupAUsersType[] | null>(
    null
  );
  const theme = useTheme();
  const { login } = useAuth();

  const handleLoginB = async () => {
    if (!username.trim() || !password.trim()) return;

    try {
      await login(username, password);
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
      <Box sx={{ flexBasis: 400, py: 2.5, px: 4, width: "100%", mx: "auto" }}>
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
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <VisibilityOff sx={{ fontSize: 15 }} />
                      ) : (
                        <Visibility sx={{ fontSize: 15 }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Button onClick={() => handleLoginB()} sx={{ px: 6.5, py: 1, mt: 4 }}>
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
              labelId="demo-select-small-label"
              id="demo-select-small"
              // value={age}
              label="Age"
              // onChange={handleChange}
              size="small"
              placeholder="Select user"
            >
              {groupAUsers ? (
                groupAUsers?.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.username}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">Loading</MenuItem>
              )}
            </Select>
          </Stack>
          <Button sx={{ px: 6.5, py: 1, mt: 4 }}>Login A</Button>

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
