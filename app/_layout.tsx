import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { View, Image } from "react-native";
import AppThemeProvider from "../hooks/useAppTheme"; // default import
import { Palette } from "../constants/colors";

SplashScreen.preventAutoHideAsync().catch(() => {});
//letsgo
// Simple overlay so WEB also shows a splash
function SplashOverlay() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Palette.bg,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../assets/Scalovate_Logo_Black.png")}
        style={{
          width: 220,
          height: 80,
          resizeMode: "contain",
          tintColor: "#fff",
        }}
      />
    </View>
  );
}

export default function RootLayout() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setBooting(false);
      SplashScreen.hideAsync().catch(() => {});
    }, 2200); // longer splash duration
    return () => clearTimeout(t);
  }, []);

  if (booting) return <SplashOverlay />;

  return (
    <AppThemeProvider>
      <Stack screenOptions={{ headerShown: false, animation: "fade" }} />
    </AppThemeProvider>
  );
}
