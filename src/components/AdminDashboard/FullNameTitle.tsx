import { Avatar, Stack, Typography } from "@mui/material";
import { hasLoggedInToday } from "../../utils";

type FullNameProps = {
  onBreak: boolean;
  connected: boolean;
  lastLogin: Date;
  firstName: string;
  lastName: string;
  avatar: Buffer;
  need_help: boolean;
};

export default function FullNameTitle({
  onBreak,
  connected,
  lastLogin,
  firstName,
  lastName,
  avatar,
  need_help,
}: FullNameProps) {
  const nameColor = () => {
    if (onBreak) return "#ff3737";
    if (connected) return "#63d06f";
    if (!hasLoggedInToday(lastLogin)) return "#c4c4c4";
  };

  // conncted is false but the user did looged in today
  const oddLogging = () => {
    if (!connected && hasLoggedInToday(lastLogin)) {
      return (
        <Typography variant="caption" sx={{ color: "#c4c4c4" }}>
          <p style={{ color: "#ff3737", display: "inline-block" }}>(!)</p>
          {firstName + " " + lastName}
        </Typography>
      );
    }

    return null;
  };

  return (
    <Stack flexDirection="row" alignItems="center">
      <Avatar
        variant="rounded"
        src={`data:image/png;base64,${avatar}`}
        sx={{ width: 30, height: 30, mr: 1 }}
      />
      {oddLogging() || (
        <Typography variant="caption" sx={{ color: nameColor() }}>
          {firstName + " " + lastName} {need_help && " 🖐"}
        </Typography>
      )}
    </Stack>
  );
}
