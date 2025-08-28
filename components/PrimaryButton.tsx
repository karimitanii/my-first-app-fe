import { Pressable, Text, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../constants/colors";

export function PrimaryButton({
  title,
  onPress,
  style,
}: {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.wrap, style]}>
      <LinearGradient
        colors={[Colors.red700, Colors.red500, Colors.red300]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.btn}
      >
        <Text style={styles.txt}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { borderRadius: 16, overflow: "hidden" },
  btn: { paddingVertical: 14, paddingHorizontal: 18, borderRadius: 16 },
  txt: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
