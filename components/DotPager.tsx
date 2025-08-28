import { View, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

export function DotPager({ index, total }: { index: number; total: number }) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            {
              opacity: index === i ? 1 : 0.35,
              width: index === i ? 22 : 8,
              backgroundColor: Colors.red500,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: { height: 8, borderRadius: 999 },
});
