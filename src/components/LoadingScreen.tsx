import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { ScaleLoader } from "react-spinners";

export default function LoadingScreen() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        right: 0,
        bottom: 0,
        zIndex: 99999,
        width: "100%",
        height: "100%",
        position: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ScaleLoader
        color={theme.palette.primary.main}
        loading
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Box>
  );
}
