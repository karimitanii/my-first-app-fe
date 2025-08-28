import { Image, View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

export function Brand({
  size = 28,
  subtitle,
}: {
  size?: number;
  subtitle?: string;
}) {
  return (
    <View style={styles.row}>
      <Image
        source={require("../assets/Scalovate_Logo_Black.png")}
        style={{
          width: size * 4,
          height: size * 1.4,
          resizeMode: "contain",
          tintColor: Colors.white,
        }}
      />
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { alignItems: "center", gap: 8 },
  subtitle: {
    color: Colors.red300,
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
});
