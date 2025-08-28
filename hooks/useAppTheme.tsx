import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Mode = "light" | "dark";

type CtxValue = {
  mode: Mode;
  setMode: (m: Mode) => void;
  toggle: () => void;
};

const ThemeCtx = createContext<CtxValue>({
  mode: "dark",
  setMode: () => {},
  toggle: () => {},
});

export function useAppTheme() {
  return useContext(ThemeCtx);
}

// DEFAULT export = the Provider component
export default function AppThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<Mode>("dark");

  useEffect(() => {
    AsyncStorage.getItem("app_theme").then((v) => {
      if (v === "light" || v === "dark") setMode(v);
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("app_theme", mode).catch(() => {});
  }, [mode]);

  const toggle = () => setMode((m) => (m === "dark" ? "light" : "dark"));

  return (
    <ThemeCtx.Provider value={{ mode, setMode, toggle }}>
      {children}
    </ThemeCtx.Provider>
  );
}
