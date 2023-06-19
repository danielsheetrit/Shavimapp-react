import { Box, Stack } from "@mui/material";
import Navbar from "../components/Navbar";
import UserFooter from "../components/UserFooter";

export default function User() {
  return (
    <Stack sx={{ height: "100vh" }}>
      <Navbar />
      <Box sx={{ flexGrow: 1 }}></Box>
      <UserFooter />
    </Stack>
  );
}
