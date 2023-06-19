import { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getCurrentTimeAndDate } from "../utils";

export default function Clock({ days }: { days: string[] }) {
  const [currentTimeAndDate, setCurrentTimeAndDate] = useState(
    getCurrentTimeAndDate(days)
  );
  const { time, date } = currentTimeAndDate;
  const theme = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimeAndDate(getCurrentTimeAndDate(days));
    }, 1000);
    return () => clearInterval(interval);
  }, [days]);

  return (
    <Stack
      alignItems="center"
      sx={{
        backgroundColor: theme.palette.primary.main,
        borderRadius: 1,
        width: 150,
        px: 2,
        py: 1,
      }}
    >
      <Typography variant="h4" sx={{ color: "#fff", fontWeight: "bold" }}>
        {time}
      </Typography>
      <Typography sx={{ color: "#fff", fontSize: 12, fontWeight: 400 }}>
        {date}
      </Typography>
    </Stack>
  );
}
