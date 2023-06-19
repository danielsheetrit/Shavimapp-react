import { Button, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";

// locals
import useI18n from "../hooks/useI18n";
import useAuth from "../hooks/useAuth";
import Clock from "./Clock";

export default function UserFooter() {
  const { logout } = useAuth();
  const { translations } = useI18n();
  const theme = useTheme();

  return (
    <Stack
      alignItems="center"
      flexDirection="row"
      justifyContent="space-around"
      sx={{
        py: 2,
        backgroundColor: theme.palette.secondary.main,
      }}
    >
      <Button sx={{ height: 40, px: 2 }}>
        <HelpOutlinedIcon sx={{ mr: 2 }} />
        {translations.userFooter.callForHelpBtn}
      </Button>
      <Clock days={translations.userFooter.days} />
      <Button onClick={() => logout()} sx={{ height: 40, px: 2 }}>
        <LogoutOutlinedIcon sx={{ mr: 2 }} />
        {translations.userFooter.logoutBtn}
      </Button>
    </Stack>
  );
}
