import { useState, useEffect, ChangeEvent } from "react";
import axiosInstance from "../utils/axios";
import {
  MenuItem,
  Select,
  Stack,
  Typography,
  SelectChangeEvent,
  TextField,
  Button,
} from "@mui/material";

interface event {
  event_list: {
    9: string;
    10: string;
    11: string;
    12: string;
  };
  language: string;
}

const eventsInitState = {
  9: "",
  10: "",
  11: "",
  12: "",
};

export default function AdminEventsEdit() {
  const [events, setEvents] = useState<[] | event[]>([]);
  const [currentEvent, setCurrentEvent] = useState(eventsInitState);
  const [currentLng, setCurrentLng] = useState("");

  const getEvents = async () => {
    try {
      const { data } = await axiosInstance.get("/events");

      const events: event[] = data.events;

      setEvents(events);
      setCurrentEvent(events[0].event_list);
      setCurrentLng(events[0].language);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelect = (ev: SelectChangeEvent) => {
    const selectedLng = ev.target.value as string;
    setCurrentLng(selectedLng);

    const relEvent = events.find((event) => event.language === selectedLng);

    if (relEvent) {
      setCurrentEvent(relEvent.event_list);
    }
  };

  const handleChange = (
    ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = ev.target;
    console.log(currentEvent);

    setCurrentEvent((prev) => ({ ...prev, [name]: value }));
  };

  const updateEvents = async () => {
    try {
      await axiosInstance.put("/events", {
        event: {
          event_list: currentEvent,
          language: currentLng,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <Stack sx={{ mt: 3 }} flexDirection="row" alignItems="center">
        <Typography sx={{ textDecoration: "underline", mr: 1 }} variant="h6">
          Events
        </Typography>
        <Typography variant="body2">
          (Update Each Language separately)
        </Typography>
      </Stack>

      <Stack sx={{ width: "50%", mt: 3 }}>
        <Typography sx={{ fontSize: 11 }}>Pick Language to edit</Typography>
        <Select
          sx={{ mt: 0.5 }}
          value={currentLng}
          onChange={handleSelect}
          size="small"
        >
          <MenuItem value={"en"}>English</MenuItem>
          <MenuItem value={"he"}>Hebrew</MenuItem>
          <MenuItem value={"ru"}>Russian</MenuItem>
          <MenuItem value={"ar"}>Arabic</MenuItem>
        </Select>
      </Stack>

      <Stack sx={{ width: "100%", mt: 2 }}>
        <Typography sx={{ fontSize: 11 }}>8 - 9</Typography>
        <TextField
          sx={{ mt: 0.5 }}
          value={currentEvent[9]}
          onChange={handleChange}
          type="text"
          name="9"
          size="small"
        />
      </Stack>

      <Stack sx={{ width: "100%", mt: 2 }}>
        <Typography sx={{ fontSize: 11 }}>9 - 10</Typography>
        <TextField
          sx={{ mt: 0.5 }}
          value={currentEvent[10]}
          onChange={handleChange}
          type="text"
          name="10"
          size="small"
        />
      </Stack>

      <Stack sx={{ width: "100%", mt: 2 }}>
        <Typography sx={{ fontSize: 11 }}>10 - 11</Typography>
        <TextField
          sx={{ mt: 0.5 }}
          value={currentEvent[11]}
          onChange={handleChange}
          type="text"
          name="11"
          size="small"
        />
      </Stack>

      <Stack sx={{ width: "100%", mt: 2 }}>
        <Typography sx={{ fontSize: 11 }}>11 - 12</Typography>
        <TextField
          sx={{ mt: 0.5 }}
          value={currentEvent[12]}
          onChange={handleChange}
          type="text"
          name="12"
          size="small"
        />
      </Stack>

      <Stack direction="row" justifyContent="end">
        <Button onClick={updateEvents} sx={{ mt: 3, px: 2, alignSelf: "end" }}>
          Save Events
        </Button>
      </Stack>
    </>
  );
}
