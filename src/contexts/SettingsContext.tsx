import { createContext, ReactNode, useEffect, useState } from "react";
import axiosInstance from "../utils/axios";

interface SettingsContextProps {
  min_break_time: number;
  min_count_time: number;
  register_page_availble: boolean;
  call_for_help_availble: boolean;
}

export const SettingsContext = createContext<SettingsContextProps | null>(null);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<SettingsContextProps | null>(null);

  const getSettings = async () => {
    const { data } = await axiosInstance.get("/settings");
    setSettings(data);
  };

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};
