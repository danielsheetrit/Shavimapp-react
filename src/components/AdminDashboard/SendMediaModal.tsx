import { useState, Dispatch, SetStateAction, useEffect } from "react";
import {
  Button,
  Tab,
  Tabs,
  Typography,
  Box,
  Stack,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Modal from "../Modal";
import axiosInstance from "../../utils/axios";
import { enqueueSnackbar } from "notistack";
import useAuth from "../../hooks/useAuth";

type EditModalType = {
  currentReceiver: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface IMedia {
  _id: string;
  type: "img" | "video";
  name: string;
  writer: string;
  url: string;
}

// -------------------------------------------------------------------------

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Stack
          alignItems="start"
          sx={{ p: 3, textAlign: "left", width: "100%" }}
        >
          {children}
        </Stack>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const tabStyle = {
  flex: 1,
  fontWeight: 600,
  color: "#081735",
  textTransform: "none",
};

const questionTypes = [
  { type: "feeling", relTab: 0 },
  { type: "postcard", relTab: 1 },
  { type: "video", relTab: 2 },
];

// -----------------------------------------------------------------------------

export default function SendMediaModal({
  open,
  setOpen,
  currentReceiver,
}: EditModalType) {
  const [tab, setTab] = useState(0);
  const [media, setMedia] = useState<IMedia[] | []>([]);
  const [mediaToSend, setMediaToSend] = useState<IMedia["_id"] | "none">(
    "none"
  );
  const [text, setText] = useState("");

  const { user } = useAuth();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleSelect = (ev: SelectChangeEvent) => {
    const mediaId = ev.target.value as string;
    setMediaToSend(mediaId);
  };

  const getMedia = async () => {
    try {
      const res = await axiosInstance.get("/media");
      setMedia(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const SendMedia = async () => {
    if (tab === 1 && mediaToSend === "none" && !text) {
      enqueueSnackbar("Either One of the fields has to be full", {
        variant: "error",
      });
      return;
    }

    if (tab === 2 && mediaToSend === "none") {
      enqueueSnackbar("Video must be selected!", {
        variant: "error",
      });
      return;
    }

    const questionType = questionTypes.find((type) => type.relTab === tab);
    const mediaUrl = media.find((item) => item._id === mediaToSend);

    try {
      await axiosInstance.post("/question", {
        isSystem: false,
        sender: user?._id,
        receiver: currentReceiver,
        question_type: questionType?.type,
        url: mediaUrl?.url || "",
        text,
      });
      enqueueSnackbar("Message sent!", {
        variant: "success",
      });
    } catch (err) {
      console.error(err);
      enqueueSnackbar(err.message, {
        variant: "error",
      });
    } finally {
      setOpen(false);
      setMediaToSend("none");
      setText("");
    }
  };

  useEffect(() => {
    if (tab !== 0 && media.length === 0) {
      getMedia();
    }
  }, [tab, media]);

  return (
    <Modal open={open} anotherStyle={{ p: 0 }}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab sx={tabStyle} label="Feeling" {...a11yProps(0)} />
            <Tab sx={tabStyle} label="Postcard" {...a11yProps(1)} />
            <Tab sx={tabStyle} label="Video" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          <Typography>
            Send "How do you feel" message with emojies 😀😐😡
          </Typography>
        </TabPanel>

        <TabPanel value={tab} index={1}>
          <Typography>You can choose to send Image or Text or Both</Typography>

          <Typography sx={{ fontSize: 11, mt: 2 }}>Pick Image</Typography>
          <Select
            size="small"
            onChange={handleSelect}
            sx={{ width: 200, mt: 0.5 }}
            defaultValue="none"
          >
            <MenuItem value={"none"}>None</MenuItem>
            {media.length > 0 &&
              media.map((item) => {
                if (item.type === "img") {
                  return (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  );
                }
              })}
          </Select>

          <Stack sx={{ width: "100%", mt: 2 }}>
            <Typography sx={{ fontSize: 11 }}>What do you want say?</Typography>
            <TextField
              sx={{ mt: 0.5 }}
              value={text}
              onChange={(ev) => setText(ev.target.value)}
              type="text"
              size="small"
            />
          </Stack>
        </TabPanel>

        <TabPanel value={tab} index={2}>
          <Typography>Choose Video to send</Typography>
          <Select
            size="small"
            onChange={handleSelect}
            sx={{ width: 200, mt: 2 }}
            defaultValue="none"
          >
            <MenuItem value={"none"}>None</MenuItem>
            {media.length > 0 &&
              media.map((item) => {
                if (item.type === "video") {
                  return (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  );
                }
              })}
          </Select>
        </TabPanel>
      </Box>

      <Stack flexDirection="row" sx={{ p: 3 }}>
        <Button sx={{ flexBasis: 100, mr: 1 }} onClick={() => SendMedia()}>
          Send
        </Button>
        <Button
          sx={{
            flexBasis: 75,
            backgroundColor: "#ccc",
            "&:hover": {
              backgroundColor: "#ccc",
            },
          }}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
      </Stack>
    </Modal>
  );
}
