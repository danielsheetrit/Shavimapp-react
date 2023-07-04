import { Stack } from "@mui/material";
import UpIcon from "@mui/icons-material/ExpandLessOutlined";
import DownIcon from "@mui/icons-material/ExpandMoreOutlined";

type ValueIndicatorProps = {
  currentVal: number;
  oldVal: number;
};

export default function ValueIndicator({
  currentVal,
  oldVal,
}: ValueIndicatorProps) {
  if (!currentVal) {
    return <p>0</p>;
  }

  return (
    <Stack flexDirection="row">
      <p>
        {currentVal > oldVal ? (
          <UpIcon sx={{ fontSize: 16, color: "red" }} />
        ) : (
          <DownIcon sx={{ fontSize: 16 }} />
        )}
      </p>
      <p>{currentVal}</p>
    </Stack>
  );
}
