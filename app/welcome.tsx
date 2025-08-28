import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Palette, ThemeColors } from "@/constants/colors";
import { PrimaryButton } from "@/components/PrimaryButton";
import { router } from "expo-router";
import { useAppTheme } from "@/hooks/useAppTheme";

export default function Welcome() {
  const { mode } = useAppTheme();
  const theme = ThemeColors[mode];

  return (
    <LinearGradient
      colors={[Palette.black, Palette.bg]}
      style={styles.container}
    >
      <View style={styles.center}>
        <Image
          source={require("@/assets/Scalovate_Logo_Black.png")}
          style={styles.logo}
        />
        <Text style={[styles.h1, { color: theme.text }]}>
          Welcome to Scalovate
        </Text>
        <Text style={[styles.sub, { color: theme.muted }]}>
          Where bold ideas become reliable software — faster.
        </Text>
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          title="Start using Journiq"
          onPress={() => router.push("/chat")}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "space-between" },
  center: { alignItems: "center", marginTop: 40 },
  logo: { width: 220, height: 80, resizeMode: "contain", tintColor: "#fff" },
  h1: { fontSize: 26, fontWeight: "800", marginTop: 16 },
  sub: { textAlign: "center", marginTop: 8, lineHeight: 20 },
  footer: { paddingBottom: 36 },
});
