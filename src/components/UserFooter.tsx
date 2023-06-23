import { useState } from "react";
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";

// locals
import useI18n from "../hooks/useI18n";
import useAuth from "../hooks/useAuth";
import Clock from "./Clock";
import Modal from "./Modal";

export default function UserFooter({ handleHelp }: { handleHelp: () => void }) {
  const [open, setOpen] = useState(false);

  const { logout } = useAuth();
  const { translations } = useI18n();
  const theme = useTheme();
  const isTablet = useMediaQuery("(min-width:600px)");

  return (
    <>
      <Modal open={open}>
        <Typography variant="h6">
          {translations.userFooter.logoutModal}
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button
            onClick={() => setOpen(false)}
            sx={{
              mr: 1,
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.text.primary,
              "&:hover": {
                color: theme.palette.text.secondary,
              },
            }}
          >
            {translations.userFooter.cancelLogout}
          </Button>
          <Button onClick={() => logout()}>
            {translations.userFooter.confirmLogout}
          </Button>
        </Box>
      </Modal>

      <Stack
        alignItems="center"
        flexDirection={isTablet ? "row" : "column"}
        justifyContent="space-around"
        sx={{
          py: 2,
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        <Button
          onClick={() => handleHelp()}
          sx={{ height: 40, px: 2, width: isTablet ? 150 : "90%" }}
        >
          <HelpOutlinedIcon sx={{ mr: 2 }} />
          {translations.userFooter.callForHelpBtn}
        </Button>

        <Clock days={translations.userFooter.days} />

        <Button
          onClick={() => setOpen(true)}
          sx={{
            height: 40,
            px: 2,
            width: isTablet ? 150 : "90%",
            mt: isTablet ? 0 : 1,
          }}
        >
          <LogoutOutlinedIcon sx={{ mr: 2 }} />
          {translations.userFooter.logoutBtn}
        </Button>
      </Stack>
    </>
  );
}
