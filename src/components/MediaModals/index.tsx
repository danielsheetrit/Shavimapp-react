import { useState, useMemo, useEffect } from "react";
import { Button } from "@mui/material";

// locals
import Modal from "../Modal";
import { IQuestion } from "../../interfaces/IQuestion";
import useI18n from "../../hooks/useI18n";

// modals
import Feeling from "./Feeling";
import axiosInstance from "../../utils/axios";
import Postcard from "./Postcard";
import Video from "./Video";

type MediaModalsType = {
  question: IQuestion;
};

export default function MediaModels({ question }: MediaModalsType) {
  const [open, setOpen] = useState(false);
  const [feelingAnswer, setFeelingAnswer] = useState("");
  const { translations } = useI18n();

  const handleSubmitModal = async () => {
    let answer: string;
    if (question.question_type === "feeling") {
      if (!feelingAnswer) {
        return;
      }

      answer = feelingAnswer;
    } else {
      answer = "ok";
    }

    try {
      await axiosInstance.put("/question", { answer, id: question._id });
    } catch (err) {
      console.error(err);
    } finally {
      setOpen(false);
      setFeelingAnswer("");
    }
  };

  const relmodal = useMemo(() => {
    let modal;

    switch (question.question_type) {
      case "feeling":
        modal = (
          <Feeling
            feelingAnswer={feelingAnswer}
            setFeelingAnswer={setFeelingAnswer}
          />
        );
        break;
      case "postcard":
        modal = <Postcard url={question.url} text={question.text} />;
        break;
      case "video":
        modal = <Video url={question.url} />;
        break;
      default:
        modal = null;
        break;
    }

    return modal;
  }, [question, feelingAnswer]);

  useEffect(() => {
    if (question) {
      setOpen(true);
    }
  }, [question]);

  return (
    <Modal open={open}>
      {relmodal}
      <Button sx={{ px: 4, my: 1 }} onClick={() => handleSubmitModal()}>
        {translations.userPage.getBackFromBreakBtn}
      </Button>
    </Modal>
  );
}
