import { useState, useEffect, useMemo } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

// locals
import { events } from "../../config/socketIo";
import AdminSidebar from "../../components/AdminSidebar";
import AdminSettings from "../../components/AdminSettings";
import AdminDashboard from "../../components/AdminDashboard";
import { debounce } from "../../utils";

// hooks
import useSocket from "../../hooks/useSocket";
import useAuth from "../../hooks/useAuth";
import useI18n from "../../hooks/useI18n";

import { IUserDashboardType } from "../../interfaces/IUserDashboard";
import axiosInstance from "../../utils/axios";
import Modal from "../../components/Modal";

export type CmpType = "users" | "management" | "settings";

export function Admin() {
  const [userNeedHelp, setUserNeedHelp] = useState("");
  const [users, setUsers] = useState<IUserDashboardType[] | []>([]);
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
        cmp = <p>management</p>;
        break;
      case "users":
        cmp = <AdminDashboard users={users} />;
        break;
      default:
        cmp = <p>Loading</p>;
        break;
    }

    return cmp;
  }, [currentCmp, users]);

  const getUsers = async () => {
    try {
      const res = await axiosInstance.get("/actions/admin-dashboard");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getUsersWithDebounce = debounce(async () => {
    await getUsers();
  }, 2000);

  useEffect(() => {
    if (!socket) return;

    socket.on(events.USER_ACTIVITY_UPDATE, getUsersWithDebounce);
    socket.on(events.USER_IN_BREAK, getUsersWithDebounce);
    socket.on(events.USER_CAME_FROM_BREAK, getUsersWithDebounce);
    socket.on(events.USER_IN_DISTRESS, getUsersWithDebounce);
    socket.on(events.QUESTION_ANSWERED, getUsersWithDebounce);
    socket.on(events.COUNTER_INCREMENT, getUsersWithDebounce);

    // ----------------------------------------------------------
    socket.on(events.CALL_FOR_HELP, (data) => {
      setUserNeedHelp(data.name);
    });
  }, [socket]);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <AdminSidebar currentCmp={currentCmp} setCurrentCmp={setCurrentCmp}>
        <Modal open={!!userNeedHelp}>
          <Typography variant="h6">
            {userNeedHelp} is calling for help!
          </Typography>
          <Button
            sx={{ flexBasis: 100, mr: 1 }}
            onClick={() => setUserNeedHelp("")}
          >
            Ok
          </Button>
        </Modal>

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
