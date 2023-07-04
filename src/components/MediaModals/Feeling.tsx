import { Dispatch, SetStateAction } from "react";
import { Box, Stack, Typography } from "@mui/material";
import useI18n from "../../hooks/useI18n";

type FeelingProps = {
  feelingAnswer: string;
  setFeelingAnswer: Dispatch<SetStateAction<string>>;
};

export default function Feeling({
  setFeelingAnswer,
  feelingAnswer,
}: FeelingProps) {
  const { translations } = useI18n();
  const lng = translations.userPage.userModals.feeling;

  const options = [
    {
      title: lng.goodMood,
      emoji: "😀",
      answer: "good",
    },
    {
      title: lng.ok,
      emoji: "😐",
      answer: "ok",
    },
    {
      title: lng.littleDown,
      emoji: "😕",
      answer: "little down",
    },
    {
      title: lng.sad,
      emoji: "🙁",
      answer: "sad",
    },
    {
      title: lng.bad,
      emoji: "😡",
      answer: "bad",
    },
  ];

  return (
    <Box>
      <Typography variant="h6">{lng.modalTitle}</Typography>
      <Stack direction="row" sx={{ my: 2 }}>
        {options.map((el) => {
          return (
            <Box
              sx={{
                width: '100%',
                p: 1,
                borderRadius: 1,
                backgroundColor:
                  feelingAnswer === el.answer ? "#FFEFE9" : "transparent",
                cursor: "pointer",
              }}
              onClick={() => setFeelingAnswer(el.answer)}
              key={el.answer}
            >
              <Typography variant="h4">{el.emoji}</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, mt: 1 }}>
                {el.title}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
