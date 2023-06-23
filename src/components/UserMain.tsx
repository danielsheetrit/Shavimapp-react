import {
  Stack,
  Container,
  Card,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// icons
import CoffeeRoundedIcon from "@mui/icons-material/CoffeeRounded";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";

import useI18n from "../hooks/useI18n";

type UserMainProps = {
  handleBreak: (isBreak: boolean) => Promise<void>;
  handleCounter: () => Promise<void>;
  count: number | null;
};

export default function UserMain({
  handleBreak,
  count,
  handleCounter,
}: UserMainProps) {
  const theme = useTheme();
  const { translations } = useI18n();
  const isMobile = useMediaQuery("(min-width:600px)");

  return (
    <Container>
      <Stack
        flexDirection={isMobile ? "row" : "column"}
        alignItems="center"
        justifyContent="space-around"
        sx={{
          flexGrow: 1,
          width: "100%",
          backgroundColor: theme.palette.secondary.main,
          borderRadius: 2,
          my: 2,
          py: 3,
        }}
      >
        <Card
          onClick={() => handleBreak(true)}
          sx={{
            minWidth: isMobile ? 225 : "90%",
            height: 225,
            cursor: "pointer",
            borderRadius: 2,
            boxShadow: "none",
          }}
        >
          <Stack
            justifyContent="space-around"
            alignItems="center"
            sx={{ py: 3, height: "100%" }}
          >
            <Typography variant="h5">
              {translations.userPage.breakLabel}
            </Typography>

            <CoffeeRoundedIcon
              sx={{ fontSize: 90, color: theme.palette.primary.main }}
            />
          </Stack>
        </Card>

        <Card
          onClick={() => handleCounter()}
          sx={{
            minWidth: isMobile ? 225 : "90%",
            height: 225,
            cursor: "pointer",
            borderRadius: 2,
            boxShadow: "none",
            mt: isMobile ? 0 : 2,
          }}
        >
          <Stack
            justifyContent="space-around"
            alignItems="center"
            sx={{ py: 3, height: "100%" }}
          >
            <Typography variant="h5">{count || 0}</Typography>
            <ThumbUpOffAltRoundedIcon
              sx={{ fontSize: 90, color: theme.palette.primary.main }}
            />
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
