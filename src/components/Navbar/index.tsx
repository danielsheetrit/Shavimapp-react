import { useEffect, useState, useCallback } from "react";
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
import useAuth from "../../hooks/useAuth";
import Image from "../Image";
import Logo from "../../assets/img/logo.svg";
import AvatarExample from "../../assets/img/avatar.svg";

const url = import.meta.env.VITE_REACT_APP_BASE_URL;

type EventsObjecType = { [key: string]: string };
type SingleEvent = { time: string; event: string };

export default function Navbar() {
  const [events, setEvents] = useState<EventsObjecType | null>(null);
  const [nextEvent, setNextEvent] = useState<SingleEvent | null>(null);

  const { user: { username } } = useAuth();
  const theme = useTheme();
  const tabletBP = useMediaQuery("(min-width:750px)");
  const mobileBP = useMediaQuery("(min-width:400px)");

  const language = "en";  // TODO

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
      const res = await fetch(`${url}/events/event-by-language/${language}`);

      if (res.ok) {
        const data = await res.json();
        const events: EventsObjecType = data.event.event_list;
        setEvents(events);
        setNextEvent(getNextEvent(events));
      }
    } catch (error) {
      console.error(error);
    }
  }, [getNextEvent]);

  useEffect(() => {
    if (!events) return;

    const intervalId = setInterval(() => {
      setNextEvent(getNextEvent(events));
    }, 60 * 1000); // Update every minute

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [events, getNextEvent]);

  useEffect(() => {
    if (!events) {
      getEvents();
    }
  }, [events, getEvents]);

  return (
    <Container maxWidth="md">
      <Stack sx={{ py: 2 }} flexDirection="row" justifyContent="space-between">
        <Image width={125} height={50} url={Logo} />

        {tabletBP && (
          <Stack>
            <Typography>Hi {username},</Typography>
            <Typography variant="h4">Welcome back👋</Typography>
          </Stack>
        )}

        <Divider orientation="vertical" flexItem />

        <Stack>
          <Button
            sx={{
              px: 2.5,
              py: 0.5,
              color: `${theme.palette.primary.main} !important`,
              backgroundColor: theme.palette.secondary.main,
            }}
            disabled
          >
            Next Event
          </Button>
          <Typography sx={{ fontWeight: 400, mt: 1 }}>
            {nextEvent
              ? `${nextEvent.time}: ${nextEvent.event}`
              : `No more events today.`}
          </Typography>
        </Stack>

        {mobileBP && (
          <Avatar
            sx={{ width: 80, height: 80 }}
            alt="example"
            src={AvatarExample}
          />
        )}
      </Stack>
    </Container>
  );
}
