import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

// locals
import { events } from "../config/socketIo";
import AdminSidebar from "../components/AdminSidebar";
import AdminSettings from "../components/AdminSettings";
import AdminDashboard from "../components/AdminDashboard";
import { getGeoAndTime, getLocalStorageItem } from "../utils";
import axiosInstance from "../utils/axios";
import Modal from "../components/Modal";
import AdminMenegament from "../components/AdminManagement";

// hooks
import useSocket from "../hooks/useSocket";
import useAuth from "../hooks/useAuth";
import useI18n from "../hooks/useI18n";

import { IUserDashboardType } from "../interfaces/IUserDashboard";
import { IUser } from "../interfaces/IUser";

export type CmpType = "users" | "management" | "settings";

export function Admin() {
  const [users, setUsers] = useState<IUserDashboardType[] | []>([]);
  const [managementUsers, setManagementUsers] = useState<IUser[] | []>([]);
  const [currentCmp, setCurrentCmp] = useState<CmpType>("users");
  const [userNeedHelp, setUserNeedHelp] = useState("");

  // fetch dependencies
  const [date, setDate] = useState(dayjs());
  const [workGroup, setWorkGroup] = useState<number>(
    getLocalStorageItem("workGroup") || 1
  );

  const isFetchingRef = useRef(false);
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
        cmp = (
          <AdminMenegament
            managementUsers={managementUsers}
            getUsersForManagement={getUsersForManagement}
          />
        );
        break;
      case "users":
        cmp = (
          <AdminDashboard
            users={users}
            date={date}
            setDate={setDate}
            workGroup={workGroup}
            setWorkGroup={setWorkGroup}
          />
        );
        break;
      default:
        cmp = null;
        break;
    }

    return cmp;
  }, [currentCmp, date, managementUsers, users, workGroup]);

  const getUsers = useCallback(async () => {
    if (isFetchingRef.current) {
      return;
    }

    isFetchingRef.current = true;

    const { timezone } = getGeoAndTime();
    const milli = date.toDate().getTime();

    try {
      const res = await axiosInstance.get("/actions/admin-dashboard", {
        params: {
          milli,
          timezone,
          workGroup,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      isFetchingRef.current = false;
    }
  }, [date, workGroup]);

  async function getUsersForManagement() {
    try {
      const res = await axiosInstance.get(`/actions/management-dashboard`);
      setManagementUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (!socket) return;

    socket.on(events.USER_ACTIVITY_UPDATE, getUsers);
    socket.on(events.USER_IN_BREAK, getUsers);
    socket.on(events.USER_CAME_FROM_BREAK, getUsers);
    socket.on(events.USER_IN_DISTRESS, getUsers);
    socket.on(events.QUESTION_ANSWERED, getUsers);
    socket.on(events.COUNTER_INCREMENT, getUsers);
    socket.on(events.USER_BREAK_VALIDATED, getUsers);
    socket.on(events.CALL_FOR_HELP, getUsers);

    // ----------------------------------------------------------
    socket.on(events.CALL_FOR_HELP, (data) => {
      if (data.isActive) {
        setUserNeedHelp(data.name);
      }
    });
  }, [getUsers, socket]);

  useEffect(() => {
    if (currentCmp === "users") {
      getUsers();
    }
    if (currentCmp === "management") {
      getUsersForManagement();
    }
  }, [getUsers, date, currentCmp, workGroup]);

  return (
    <>
      <AdminSidebar currentCmp={currentCmp} setCurrentCmp={setCurrentCmp}>
        <Modal open={!!userNeedHelp}>
          <Typography variant="h6">
            {userNeedHelp} {translations.adminPage.callingForHelpAdmin}
          </Typography>
          <Button
            sx={{ flexBasis: 100, mr: 1, mt: 2 }}
            onClick={() => setUserNeedHelp("")}
          >
            {translations.userPage.getBackFromBreakBtn}
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
