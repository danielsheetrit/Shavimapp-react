import { useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";

import axiosInstance from "../utils/axios";
import useAuth from "../hooks/useAuth";

import UserNavbar from "../components/UserNavbar";
import UserMain from "../components/UserMain";
import UserFooter from "../components/UserFooter";
import Modal from "../components/Modal";
import Image from "../components/Image";
import { todayFormattedDate } from "../utils";
import BreakSVG from "../assets/img/break_ill.svg";

export default function User() {
  const [onBreak, setOnBreak] = useState(false);
  const [calledHelp, setCalledHelp] = useState(false);
  const [count, setCount] = useState<number>(0);

  const { user } = useAuth();

  const handleBreak = async (isBreak: boolean) => {
    try {
      setOnBreak(isBreak);

      await axiosInstance.put("/users/break", {
        id: user?._id,
        isBreak,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleHelp = async () => {
    setCalledHelp(true);
    await axiosInstance.post("/actions/help", {
      id: user?._id,
      name: `${user?.first_name} ${user?.last_name}`,
    });
  };

  const handleCounter = async () => {
    try {
      const response = await axiosInstance.put("/users/click", {
        id: user?._id,
      });
      setCount(response?.data?.count);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) {
      const todayStr = todayFormattedDate();
      const todayCount = user?.clicks[todayStr];
      todayCount && setCount(todayCount.count);
    }
  }, [user]);

  return (
    <>
      {/* {Go on break Modal} */}
      <Modal open={onBreak}>
        <Stack alignItems="center">
          <Typography variant="h6">
            I am on break and will be back soon
          </Typography>
          <Image url={BreakSVG} width={250} height={250} />
          <Button sx={{ px: 4, mt: 1 }} onClick={() => handleBreak(false)}>
            Ok
          </Button>
        </Stack>
      </Modal>

      {/* {Call for help Modal} */}
      <Modal open={calledHelp}>
        <Stack alignItems="center">
          <Typography variant="h6">Calling Fo help</Typography>
          {/* <Image url={BreakSVG} width={250} height={250} /> */}
          <Button sx={{ px: 4, mt: 1 }} onClick={() => setCalledHelp(false)}>
            Ok
          </Button>
        </Stack>
      </Modal>

      <Stack justifyContent="space-between" sx={{ height: "100vh" }}>
        <UserNavbar />
        <UserMain
          handleBreak={handleBreak}
          handleCounter={handleCounter}
          count={count}
        />
        <UserFooter handleHelp={handleHelp} />
      </Stack>
    </>
  );
}
