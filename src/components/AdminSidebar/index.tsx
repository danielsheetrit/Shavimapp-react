import { useState, Dispatch, ReactNode, SetStateAction } from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Typography,
  Toolbar,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Menu as MenuIcon } from "@mui/icons-material";

// locals
import NavItems from "./NavItems";
import { CmpType } from "../../pages/Admin";
import { drawerWidth } from "../../config/mui";
import useAuth from "../../hooks/useAuth";
import useI18n from "../../hooks/useI18n";

type NavItemsProps = {
  currentCmp: CmpType;
  setCurrentCmp: Dispatch<SetStateAction<CmpType>>;
  children: ReactNode;
};

export default function AdminSiderbar({
  children,
  currentCmp,
  setCurrentCmp,
}: NavItemsProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user, logout } = useAuth();
  const theme = useTheme();
  const { direction } = useI18n()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", direction: "rtl" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "white",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ display: { sm: "none" }, boxShadow: 2 }}>
          <Stack
            sx={{ backgroundColor: "#eaeaea", borderRadius: 1.5 }}
            flexDirection="row"
            alignItems="center"
            onClick={handleDrawerToggle}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ ml: 1 }}
            >
              <MenuIcon sx={{ color: theme.palette.text.primary }} />
            </IconButton>
            <Typography
              sx={{ pr: 2, pl: 1 }}
              variant="body1"
              noWrap
              component="div"
            >
              {currentCmp}
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <NavItems
            logout={logout}
            avatar={user?.avatar}
            currentCmp={currentCmp}
            setCurrentCmp={setCurrentCmp}
          />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
          anchor={direction}
        >
          <NavItems
            logout={logout}
            avatar={user?.avatar}
            currentCmp={currentCmp}
            setCurrentCmp={setCurrentCmp}
          />
        </Drawer>
      </Box>
  
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: { xs: 2, sm: 5.5 },
          pt: { xs: 8, sm: 3 },
          pb: 5,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#FFFBF9",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
