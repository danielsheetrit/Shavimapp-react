import { useEffect, useState, ChangeEvent } from "react";
import { enqueueSnackbar } from "notistack";
import {
  Box,
  Typography,
  Paper,
  Checkbox,
  Stack,
  FormControlLabel,
  TextField,
  useMediaQuery,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

// locals
import AdminEventsEdit from "./AdminEventsEdit";
import axiosInstance from "../utils/axios";
import useSettings from "../hooks/useSettings";
import useI18n from "../hooks/useI18n";

const settingsInitState = {
  minBreakTime: 0,
  minCountTime: 0,
  registerPageAvailble: false,
  callForHelpAvailble: false,
  countRefPerHour: 0,
  samplingCycleInMinutes: 10,
};

export default function AdminSettings() {
  const [settings, setSettings] = useState(settingsInitState);

  const isMobile = !useMediaQuery("(min-width:450px)");
  const {
    translations: { adminSettings },
    direction,
  } = useI18n();
  const fetchedSettings = useSettings();

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = ev.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = ev.target;
    setSettings((prev) => ({ ...prev, [name]: checked }));
  };

  const updateSettings = async () => {
    const {
      minBreakTime,
      minCountTime,
      registerPageAvailble,
      callForHelpAvailble,
      countRefPerHour,
      samplingCycleInMinutes,
    } = settings;

    try {
      await axiosInstance.put("/settings", {
        settings: {
          min_break_time: minBreakTime,
          min_count_time: minCountTime,
          register_page_availble: registerPageAvailble,
          call_for_help_availble: callForHelpAvailble,
          count_ref_per_hour: countRefPerHour,
          sampling_cycle_in_minutes: samplingCycleInMinutes,
        },
      });

      enqueueSnackbar("Settings Updated Successfully", { variant: "success" });
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Failed to update Settings", { variant: "error" });
    }
  };

  useEffect(() => {
    if (fetchedSettings) {
      const {
        min_break_time,
        min_count_time,
        register_page_availble,
        call_for_help_availble,
        count_ref_per_hour,
        sampling_cycle_in_minutes,
      } = fetchedSettings;
      setSettings({
        minBreakTime: min_break_time,
        minCountTime: min_count_time,
        registerPageAvailble: register_page_availble,
        callForHelpAvailble: call_for_help_availble,
        countRefPerHour: count_ref_per_hour,
        samplingCycleInMinutes: sampling_cycle_in_minutes,
      });
    }
  }, [fetchedSettings]);

  return (
    <Box>
      <Typography variant="body1" color="initial">
        {adminSettings.settingsTitle}
      </Typography>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          mt: 4.5,
          borderRadius: 2,
          p: { xs: 3, sm: 5.5 },
        }}
      >
        <Typography sx={{ textDecoration: "underline" }} variant="h6">
          {adminSettings.genetalTitle}
        </Typography>
        <Stack
          flexDirection={isMobile ? "column" : "row"}
          alignItems={isMobile ? "start" : "center"}
          sx={{ mt: 2 }}
        >
          <Stack
            sx={{
              mr: direction === "left" ? 5 : 0,
              ml: direction === "left" ? 0 : 5,
              width: "100%",
            }}
          >
            <Typography sx={{ fontSize: 11 }}>
              {adminSettings.minBreakTimeLabel}
            </Typography>
            <TextField
              sx={{ mt: 0.5 }}
              value={settings.minBreakTime}
              onChange={handleChange}
              type="number"
              name="minBreakTime"
              size="small"
            />
          </Stack>
          <Stack sx={{ mt: isMobile ? 2 : 0, width: "100%" }}>
            <Typography sx={{ fontSize: 11 }}>
              {adminSettings.MinimalCountTimeLabel}
            </Typography>
            <TextField
              sx={{ mt: 0.5 }}
              value={settings.minCountTime}
              onChange={handleChange}
              type="number"
              name="minCountTime"
              size="small"
            />
          </Stack>
        </Stack>
        <Stack
          flexDirection={isMobile ? "column" : "row"}
          alignItems={isMobile ? "start" : "center"}
          sx={{ mt: 2 }}
        >
          <Stack
            sx={{
              mr: direction === "left" ? 5 : 0,
              ml: direction === "left" ? 0 : 5,
              width: "100%",
            }}
          >
            <Typography sx={{ fontSize: 11 }}>
              {adminSettings.countRefPerHourLabel}
            </Typography>
            <TextField
              sx={{ mt: 0.5 }}
              value={settings.countRefPerHour}
              onChange={handleChange}
              type="number"
              name="countRefPerHour"
              size="small"
            />
          </Stack>

          <Stack sx={{ mt: isMobile ? 2 : 0, width: "100%" }}>
            <Typography sx={{ fontSize: 11 }}>
              {adminSettings.samplingCycleInMinutesLabel}
            </Typography>
            <Select
              sx={{ mt: 0.5 }}
              value={settings.samplingCycleInMinutes}
              onChange={(ev) =>
                setSettings((prev) => ({
                  ...prev,
                  samplingCycleInMinutes: +ev.target.value,
                }))
              }
              size="small"
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={40}>40</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={60}>60</MenuItem>
            </Select>
          </Stack>
        </Stack>

        {/* Checkboxes */}
        <Stack
          flexDirection="row"
          alignItems="center"
          flexWrap="wrap"
          sx={{ mt: 4 }}
        >
          <FormControlLabel
            control={<Checkbox checked={settings.registerPageAvailble} />}
            label={adminSettings.RegisterAvailabilityCheckbox}
            name="registerPageAvailble"
            onChange={(ev) => handleCheckChange(ev as any)}
            sx={{
              mr: direction === "left" ? 5 : 0,
              ml: direction === "left" ? 0 : 5,
            }}
          />
          <FormControlLabel
            control={<Checkbox checked={settings.callForHelpAvailble} />}
            label={adminSettings.callForHelpCheckbox}
            name="callForHelpAvailble"
            onChange={(ev) => handleCheckChange(ev as any)}
          />
        </Stack>

        <Stack direction="row" justifyContent="end">
          <Button size="small" onClick={updateSettings} sx={{ mt: 3, px: 2 }}>
            {adminSettings.saveGeneralSettingsBtn}
          </Button>
        </Stack>
        <AdminEventsEdit />
      </Paper>
    </Box>
  );
}
