import { useEffect, useState, useCallback, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Container,
  Divider,
  Stack,
  Typography,
  Avatar,
  useMediaQuery,
} from "@mui/material";

// locals
import useAuth from "../hooks/useAuth";
import useI18n from "../hooks/useI18n";
import Image from "./Image";
import Logo from "../assets/img/logo.svg";
import axiosInstance from "../utils/axios";
import useSocket from "../hooks/useSocket";
import { events as eventNames } from "../config/socketIo";

type EventsObjecType = { [key: string]: string };
type SingleEvent = { time: string; event: string };

export default function Navbar() {
  const [events, setEvents] = useState<EventsObjecType | null>(null);
  const [nextEvent, setNextEvent] = useState<SingleEvent | null>(null);

  const avatarRef = useRef<HTMLImageElement>(null);
  const { user } = useAuth();
  const { language, translations } = useI18n();
  const socket = useSocket();

  const theme = useTheme();
  const mobileBP = useMediaQuery("(min-width:400px)");

  const getNextEvent = useCallback((events: EventsObjecType) => {
    const now = new Date();
    const currentHour = now.getHours();

    if (currentHour >= 8 && currentHour < 12) {
      // Return the event of the next hour
      const hourStr = (currentHour + 1).toString();
      return { time: hourStr, event: events[hourStr] };
    }

    // If there are no more events today
    return null;
  }, []);

  const getEvents = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/events/event-by-language/${language}`
      );

      const events: EventsObjecType = response?.data?.event?.event_list;
      setEvents(events);
      setNextEvent(getNextEvent(events));
    } catch (error) {
      console.error(error);
    }
  }, [getNextEvent, language]);

  useEffect(() => {
    if (!events) return;

    const intervalId = setInterval(() => {
      setNextEvent(getNextEvent(events));
    }, 60 * 1000); // Update every minute

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [events, getNextEvent]);

  useEffect(() => {
    if (!events && language) {
      getEvents();
    }

    socket?.on(eventNames.EVENTS_UPDATED, () => getEvents());
  }, [events, getEvents, language, socket]);

  return (
    <Container maxWidth="md">
      <Stack sx={{ py: 2 }} flexDirection="row" justifyContent="space-between">
        <Image width={125} height={50} url={Logo} />

        <Stack sx={{ display: { xs: "none", sm: "block" } }}>
          <Typography>
            {translations.navbar.greeting1} {user?.username},
          </Typography>
          <Typography variant="h4">
            {translations.navbar.greeting2}👋
          </Typography>
        </Stack>

        <Divider orientation="vertical" flexItem />

        <Stack>
          <Button
            sx={{
              width: 125,
              py: 0.5,
              color: `${theme.palette.primary.main} !important`,
              backgroundColor: theme.palette.secondary.main,
            }}
            disabled
          >
            {translations.navbar.nextEvent}
          </Button>
          <Typography sx={{ fontWeight: 400, mt: 1 }}>
            {nextEvent
              ? `${nextEvent.time}: ${nextEvent.event}`
              : translations.navbar.noMoreEvents}
          </Typography>
        </Stack>

        {mobileBP && (
          <Avatar
            ref={avatarRef}
            sx={{ width: 65, height: 65 }}
            alt="avatar"
            src={`data:image/jpeg;base64,${user?.avatar}`}
          />
        )}
      </Stack>
    </Container>
  );
}
