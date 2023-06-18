import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Stack,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";

// locals
import AuthHero from "../components/AuthHero";
import { IRegisterForm } from "../interfaces/IRegisterForm";
import PasswordButton from "../components/PasswordButton";
import axiosInstance from "../utils/axios";

const registerFormState: IRegisterForm = {
  username: "",
  firstName: "",
  lastName: "",
  workGroup: 0,
  userType: "none",
  password: "",
  verifiedPassword: "",
};

export default function Register() {
  const [registerForm, setRegisterForm] = useState(registerFormState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme();
  const navigation = useNavigate();

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelect = (ev: SelectChangeEvent<number | string>) => {
    const { name, value } = ev.target;
    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(registerForm);
  const handleRegister = async () => {
    const {
      username,
      password,
      verifiedPassword,
      workGroup,
      userType,
      firstName,
      lastName,
    } = registerForm;

    const isIncrrectField = Object.values(registerForm).some((field) => {
      return (
        !field ||
        (typeof field === "string" && !field.trim()) ||
        field === "none"
      );
    });

    if (isIncrrectField) {
      enqueueSnackbar("One of the fields are incorrect", {
        variant: "error",
      });
      return;
    }

    if (!selectedFile) {
      enqueueSnackbar("Please choose a photo", {
        variant: "error",
      });
      return;
    }

    if (password.length < 8) {
      enqueueSnackbar("Required Password length of 8 charecters", {
        variant: "error",
      });
      return;
    }

    if (password !== verifiedPassword) {
      enqueueSnackbar("Passwords not match!", {
        variant: "error",
      });
      return;
    }

    const payload = {
      username,
      password,
      first_name: firstName,
      last_name: lastName,
      user_type: userType,
      work_group: workGroup,
    };

    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    formData.append("file", selectedFile);

    try {
      const res = await axiosInstance.post("/users/register", formData);
      const { message } = res.data;
      enqueueSnackbar(message, {
        variant: "success",
        style: {
          color: "green",
        },
      });
      navigation("/login");
    } catch (error) {
      console.error(error);
    }
  };

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
            Register
          </Typography>

          <Stack flexDirection="row" alignItems="center" sx={{ mt: 4.5 }}>
            <Stack sx={{ width: "50%" }}>
              <Typography sx={{ fontSize: 11 }}>Username</Typography>
              <TextField
                sx={{ mt: 0.5, mr: 1 }}
                placeholder="Enter your username"
                size="small"
                value={registerForm.username}
                name="username"
                onChange={handleChange}
              />
            </Stack>
            <Stack sx={{ width: "50%" }}>
              <Typography sx={{ fontSize: 11 }}>Photo</Typography>
              <input
                style={{
                  padding: "8.5px 14px",
                  fontSize: "11px",
                  backgroundColor: "#F7F7F8",
                  marginTop: "4px",
                  borderRadius: "5px",
                }}
                onChange={(ev: ChangeEvent<HTMLInputElement>) => {
                  if (ev.target.files && ev.target.files[0]) {
                    setSelectedFile(ev.target.files[0]);
                  }
                }}
                type="file"
                accept=".jpg, .png, .jpeg"
              />
            </Stack>
          </Stack>

          <Stack flexDirection="row" alignItems="center" sx={{ mt: 2 }}>
            <Stack sx={{ width: "100%" }}>
              <Typography sx={{ fontSize: 11 }}>Name</Typography>
              <TextField
                sx={{ mt: 0.5, mr: 1 }}
                placeholder="Enter your username"
                size="small"
                value={registerForm.firstName}
                name="firstName"
                onChange={handleChange}
              />
            </Stack>
            <Stack sx={{ width: "100%" }}>
              <Typography sx={{ fontSize: 11 }}>Sur name</Typography>
              <TextField
                sx={{ mt: 0.5, mr: 1, width: "100%" }}
                placeholder="Enter your username"
                size="small"
                value={registerForm.lastName}
                name="lastName"
                onChange={handleChange}
              />
            </Stack>
          </Stack>

          <Stack
            flexDirection="row"
            alignItems="center"
            sx={{ mt: 2, width: "100%" }}
          >
            <Stack sx={{ width: "100%" }}>
              <Typography sx={{ fontSize: 11 }}>Work Group</Typography>
              <Select
                sx={{ mt: 0.5, mr: 1 }}
                value={registerForm.workGroup}
                onChange={handleSelect}
                size="small"
                name="workGroup"
              >
                <MenuItem value={0}>None</MenuItem>
                {new Array(10).fill("foo").map((_, index) => {
                  return (
                    <MenuItem key={index} value={index + 1}>
                      {index + 1}
                    </MenuItem>
                  );
                })}
              </Select>
            </Stack>

            <Stack sx={{ width: "100%" }}>
              <Typography sx={{ fontSize: 11 }}>User Type</Typography>
              <Select
                sx={{ mt: 0.5 }}
                value={registerForm.userType}
                onChange={handleSelect}
                size="small"
                name="userType"
              >
                <MenuItem value={"none"}>None</MenuItem>
                <MenuItem value={"user"}>A</MenuItem>
                <MenuItem value={"admin"}>B</MenuItem>
                <MenuItem value={"chief"}>C</MenuItem>
              </Select>
            </Stack>
          </Stack>

          <Stack sx={{ width: "100%", mt: 2 }}>
            <Typography sx={{ fontSize: 11 }}>Password</Typography>
            <TextField
              sx={{ mt: 0.5 }}
              placeholder="***********"
              type={showPassword ? "text" : "password"}
              size="small"
              value={registerForm.password}
              name="password"
              onChange={handleChange}
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

          <Stack sx={{ width: "100%", mt: 2 }}>
            <Typography sx={{ fontSize: 11 }}>Verified Password</Typography>
            <TextField
              sx={{ mt: 0.5 }}
              placeholder="***********"
              type={showPassword ? "text" : "password"}
              size="small"
              value={registerForm.verifiedPassword}
              name="verifiedPassword"
              onChange={handleChange}
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

          <Button onClick={handleRegister} sx={{ px: 6.5, py: 1, mt: 4 }}>
            Register Account
          </Button>

          <Stack flexDirection="row" alignItems="center" sx={{ mt: 3 }}>
            <Typography sx={{ fontSize: 11, mr: 0.5 }}>
              Already have an account?
            </Typography>
            <Typography sx={{ fontSize: 11 }}>
              <Link style={{ color: theme.palette.primary.main }} to="/login">
                Login!
              </Link>
            </Typography>
          </Stack>
          {/* {End of column container -------------------------------------} */}
        </Stack>
      </Box>
      <AuthHero />
    </Stack>
  );
}
