import { Dispatch, ReactNode, SetStateAction } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  Typography,
  Stack,
  Box,
  Button,
  Avatar,
} from "@mui/material";
import {
  PeopleOutline as ManagementIcon,
  ExploreOutlined as UsersIcon,
  SettingsOutlined as SettingsIcon,
  ArrowForwardIosRounded,
  LoginOutlined,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// locals
import useI18n from "../../hooks/useI18n";
import { CmpType } from "../../pages/Admin";
import Logo from "../../assets/img/logo.svg";
import Clock from "../Clock";
import Image from "../Image";

type DrawerItemsType = {
  title: string;
  cmp: CmpType;
  icon: ReactNode;
};

type NavItemsProps = {
  logout: () => Promise<void>;
  avatar: Buffer | undefined;
  currentCmp: CmpType;
  setCurrentCmp: Dispatch<SetStateAction<CmpType>>;
};

export default function NavItems({
  currentCmp,
  setCurrentCmp,
  avatar,
  logout,
}: NavItemsProps) {
  const { translations } = useI18n();
  const { palette } = useTheme();

  const drawerItems: DrawerItemsType[] = [
    {
      title: translations.adminNavbar.navItems.users,
      cmp: "users",
      icon: <UsersIcon />,
    },
    {
      title: translations.adminNavbar.navItems.management,
      cmp: "management",
      icon: <ManagementIcon />,
    },
    {
      title: translations.adminNavbar.navItems.settings,
      cmp: "settings",
      icon: <SettingsIcon />,
    },
  ];

  return (
    <Stack sx={{ px: 1, py: 2.5, height: "100%" }} alignItems="center">
      <Box sx={{ my: 2 }}>
        <Image width={125} height={50} url={Logo} />
      </Box>

      <List sx={{ width: "100%" }}>
        {drawerItems.map((item) => (
          <ListItem key={item.cmp} disablePadding>
            <ListItemButton
              onClick={() => setCurrentCmp(item.cmp)}
              sx={{
                color: currentCmp === item.cmp ? "#fff" : "#8F95B2",
                backgroundColor:
                  currentCmp === item.cmp
                    ? palette.primary.main
                    : "transparent",
                borderRadius: 1.5,
              }}
            >
              {item.icon}

              <Typography
                sx={{
                  color: currentCmp === item.cmp ? "#fff" : "#8F95B2",
                  fontSize: 13,
                  fontWeight: 600,
                  width: "100%",
                  ml: 1.5
                }}
              >
                {item.title}
              </Typography>
              <ArrowForwardIosRounded sx={{ fontSize: 13 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Stack
        sx={{ height: "100%", width: "100%" }}
        alignItems="center"
        justifyContent="center"
      >
        <Clock days={translations.userFooter.days} />
      </Stack>

      <Button
        onClick={() => logout()}
        sx={{
          borderRadius: 1.5,
          py: 1,
          width: "100%",
          backgroundColor: '#FFFBF9',
        }}
      >
        <Stack
          sx={{ width: "100%" }}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack flexDirection="row" alignItems="center">
            {avatar && (
              <Avatar
                src={`data:image/jpeg;base64,${avatar}`}
                variant="rounded"
                sx={{ width: 25, height: 25, mr: 1 }}
              />
            )}
            <Typography sx={{ fontSize: 13 }}>
              {translations.userFooter.logoutBtn}
            </Typography>
          </Stack>
          <LoginOutlined sx={{ color: "#8F95B2", fontSize: 20, mr: 2 }} />
        </Stack>
      </Button>
    </Stack>
  );
}
