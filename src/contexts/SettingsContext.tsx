import { createContext, ReactNode, useEffect, useState } from "react";
import axiosInstance from "../utils/axios";

import useSocket from "../hooks/useSocket";
import { events } from "../config/socketIo";

export type sampling_cycle_enum = 10 | 20 | 30 | 40 | 50 | 60;

interface SettingsContextProps {
  min_break_time: number;
  min_count_time: number;
  count_ref_per_hour: number;
  sampling_cycle_in_minutes: sampling_cycle_enum;
  register_page_availble: boolean;
  call_for_help_availble: boolean;
}

export const SettingsContext = createContext<SettingsContextProps | null>(null);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<SettingsContextProps | null>(null);

  const socket = useSocket();

  const getSettings = async () => {
    const { data } = await axiosInstance.get("/settings");
    setSettings(data);
  };

  useEffect(() => {
    getSettings();

    socket?.on(events.SETTINGS_UPDATED, getSettings);
  }, [socket]);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};
