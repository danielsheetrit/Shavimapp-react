import { Stack, Typography } from "@mui/material";

type PosrcardProps = {
  url: string;
  text: string;
};

// Postcard is a combination of image and text
export default function Postcard({ url, text }: PosrcardProps) {
  return (
    <Stack>
      {text && (
        <Typography variant="h6" sx={{ p: 1 }}>
          {text}
        </Typography>
      )}
      {url && (
        <img
          src={url}
          style={{ width: "100%", height: 275, marginBottom: 10, borderRadius: 5 }}
        />
      )}
    </Stack>
  );
}
