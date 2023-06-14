import { Box, Stack, useMediaQuery } from "@mui/material";

import Image from "./Image";
import Logo from "../assets/img/logo.svg";
import AuthIllustration from "../assets/img/auth_ill.svg";

export default function AuthHero() {
  const cmpBP = useMediaQuery("(min-width:930px)");

  return (
    <>
      {cmpBP && (
        <Box sx={{ flexGrow: 1, backgroundColor: "#F5F5F5" }}>
          <Stack
            sx={{ height: "100%", padding: 3 }}
            justifyContent="space-around"
            alignItems="center"
          >
            <Image url={Logo} width={180} height={70} />
            <Image url={AuthIllustration} width={470} height={290} />
          </Stack>
        </Box>
      )}
    </>
  );
}
