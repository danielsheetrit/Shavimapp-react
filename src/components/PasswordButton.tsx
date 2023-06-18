import { Dispatch, SetStateAction } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/VisibilityOutlined";
import VisibilityOff from "@mui/icons-material/VisibilityOffOutlined";

type PasswordButtonProps = {
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
};

export default function PasswordButton({
  showPassword,
  setShowPassword,
}: PasswordButtonProps) {
  return (
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
  );
}
