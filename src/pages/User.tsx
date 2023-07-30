import { useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { IQuestion } from "../interfaces/IQuestion";

// hooks
import useAuth from "../hooks/useAuth";
import useSocket from "../hooks/useSocket";
import useSettings from "../hooks/useSettings";
import useI18n from "../hooks/useI18n";

// components
import UserNavbar from "../components/UserNavbar";
import UserMain from "../components/UserMain";
import UserFooter from "../components/UserFooter";
import Modal from "../components/Modal";
import Image from "../components/Image";
import MediaModels from "../components/MediaModals";

// locals
import BreakSVG from "../assets/img/break_ill.svg";
import CallForHelpPic from "../assets/img/call-for-help.jpg";
import { debounce } from "../utils";
import axiosInstance from "../utils/axios";
import { events } from "../config/socketIo";

export default function User() {
  const [onBreak, setOnBreak] = useState(false);
  const [calledHelp, setCalledHelp] = useState(false);
  const [count, setCount] = useState<number>(0);
  const [question, setQuestion] = useState<IQuestion | null>(null);

  const { user } = useAuth();
  const { translations } = useI18n();
  const { min_break_time } = useSettings();
  const socket = useSocket();

  const handleBreak = async (isBreak: boolean) => {
    try {
      setOnBreak(isBreak);

      await axiosInstance.put("/breaks/status", {
        id: user?._id,
        isBreak,
      });

      const getValidateBreak = debounce(async () => {
        try {
          await axiosInstance.put("/breaks/validate", {
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

  const handleHelp = async (isHelp: boolean) => {
    setCalledHelp(isHelp);

    await axiosInstance.post("/actions/help", {
      id: user?._id,
      name: `${user?.first_name} ${user?.last_name}`,
      needHelp: isHelp,
    });
  };

  const handleCounter = async () => {
    try {
      const offset = new Date().getTimezoneOffset();
      const response = await axiosInstance.put("/clicks", {
        id: user?._id,
        offset,
        milli: Date.now(),
      });
      setCount(response?.data?.count);
    } catch (err) {
      console.error(err);
    }
  };

  const getCounter = async (id: string) => {
    try {
      const offset = new Date().getTimezoneOffset();
      const milli = Date.now();
      const { data } = await axiosInstance.get(
        `/clicks/${id}/${milli}/${offset}`
      );
      setCount(data.count);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) {
      getCounter(user._id);
    }

    socket?.on(events.QUESTION_CREATED, (data) => {
      if (user?._id === data.question.receiver) {
        setQuestion(data.question);
      }
    });
  }, [socket, user]);

  return (
    <>
      {question && <MediaModels question={question} />}

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
          <Button sx={{ px: 4, mt: 1 }} onClick={() => handleHelp(false)}>
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
