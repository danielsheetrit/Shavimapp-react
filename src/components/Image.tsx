import { Box } from "@mui/material";

type ImageProps = {
  width: number;
  height: number;
  url: string;
};

export default function Image({ width, height, url }: ImageProps) {
  return (
    <Box
      sx={{
        width,
        height,
      }}
    >
      <img src={url} style={{ width: "100%", height: "100%" }} />
    </Box>
  );
}
