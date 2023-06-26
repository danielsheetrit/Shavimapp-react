import { useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";

import axiosInstance from "../utils/axios";
import useAuth from "../hooks/useAuth";

import UserNavbar from "../components/UserNavbar";
import UserMain from "../components/UserMain";
import UserFooter from "../components/UserFooter";
import Modal from "../components/Modal";
import Image from "../components/Image";
import { debounce, todayFormattedDate } from "../utils";
import useSettings from "../hooks/useSettings";
import useI18n from "../hooks/useI18n";

import BreakSVG from "../assets/img/break_ill.svg";
import CallForHelpPic from "../assets/img/call-for-help.jpg";

export default function User() {
  const [onBreak, setOnBreak] = useState(false);
  const [calledHelp, setCalledHelp] = useState(false);
  const [count, setCount] = useState<number>(0);

  const { user } = useAuth();
  const { translations } = useI18n();
  const { min_break_time } = useSettings();

  const handleBreak = async (isBreak: boolean) => {
    try {
      setOnBreak(isBreak);

      await axiosInstance.put("/users/break", {
        id: user?._id,
        isBreak,
      });

      const getValidateBreak = debounce(async () => {
        try {
          await axiosInstance.put("/actions/validate-break", {
            id: user?._id,
          });
        } catch (err) {
          throw new Error(err.toString());
        }
      }, min_break_time * (60 * 1000)); // min_break_time is in minutes

      getValidateBreak();
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
            {translations.userPage.breakModalTitle}
          </Typography>
          <Image url={BreakSVG} width={250} height={250} />
          <Button sx={{ px: 4, mt: 1 }} onClick={() => handleBreak(false)}>
            {translations.userPage.getBackFromBreakBtn}
          </Button>
        </Stack>
      </Modal>

      {/* {Call for help Modal} */}
      <Modal open={calledHelp}>
        <Stack alignItems="center">
          <Typography variant="h6">
            {translations.userPage.callingForHelpModalTitle}
          </Typography>
          <Image url={CallForHelpPic} width={250} height={250} />
          <Button sx={{ px: 4, mt: 1 }} onClick={() => setCalledHelp(false)}>
            {translations.userPage.getBackFromBreakBtn}
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
