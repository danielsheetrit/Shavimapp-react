import { useState, useEffect, useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";

// locals
import { events } from "../../config/socketIo";
import AdminSidebar from "../../components/AdminSidebar";
import AdminSettings from "../../components/AdminSettings";
import AdminManagement from "../../components/AdminManagement";

// hooks
import useSocket from "../../hooks/useSocket";
import useAuth from "../../hooks/useAuth";
import useI18n from "../../hooks/useI18n";

export type CmpType = "users" | "management" | "settings";

export function Admin() {
  const [currentCmp, setCurrentCmp] = useState<CmpType>("users");

  const { user } = useAuth();
  const socket = useSocket();
  const { translations } = useI18n();

  const showCmp = useMemo(() => {
    let cmp;
    switch (currentCmp) {
      case "settings":
        cmp = <AdminSettings />;
        break;
      case "management":
        cmp = <AdminManagement />;
        break;
      default:
        cmp = <p>Loading</p>;
        break;
    }

    return cmp;
  }, [currentCmp]);

  useEffect(() => {
    if (!socket) return;

    socket.on(events.USER_ACTIVITY_UPDATE, () => {
      console.log("USER_ACTIVITY_UPDATE");
    });

    socket.on(events.USER_IN_BREAK, () => {
      console.log("in break");
    });

    socket.on(events.USER_CAME_FROM_BREAK, () => {
      console.log("Came back from break");
    });

    socket.on(events.CALL_FOR_HELP, () => {
      console.log("Call for help");
    });

    socket.on(events.USER_IN_DISTRESS, (data) => {
      console.log("USER_IN_DISTRESS", data.userId);
    });
  }, [socket]);

  return (
    <>
      <AdminSidebar currentCmp={currentCmp} setCurrentCmp={setCurrentCmp}>
        <Stack sx={{ mt: 2 }}>
          <Typography>
            {translations.navbar.greeting1} {user?.username},
          </Typography>
          <Typography variant="h4">
            {translations.navbar.greeting2}👋
          </Typography>
        </Stack>

        <Box sx={{ mt: 5 }}>{showCmp}</Box>
      </AdminSidebar>
    </>
  );
}
