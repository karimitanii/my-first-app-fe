import { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Colors } from "../constants/colors";
import { PrimaryButton } from "../components/PrimaryButton";
import { Brand } from "../components/Brand";
import { DotPager } from "../components/DotPager";

const { width } = Dimensions.get("window");

const slides = [
  {
    key: "s1",
    title: "Engineering the Future",
    body: "Scalovate crafts software that scales ideas into impact.",
  },
  {
    key: "s2",
    title: "Velocity by Design",
    body: "Beautiful front-ends, resilient back-ends, and data-driven decisions.",
  },
  {
    key: "s3",
    title: "Build. Ship. Evolve.",
    body: "From prototype to planet-scale — we’re with you at every step.",
  },
];

export default function Onboarding() {
  const listRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    setIndex(Math.round(x / width));
  };

  const next = async () => {
    if (index < slides.length - 1) {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
    } else {
      await AsyncStorage.setItem("scalovate_seen_onboarding", "1");
      router.replace("/welcome");
    }
  };

  return (
    <LinearGradient colors={[Colors.bg, Colors.black]} style={styles.container}>
      <View style={styles.header}>
        <Brand subtitle="Software Innovation" />
      </View>

      <FlatList
        ref={listRef}
        data={slides}
        keyExtractor={(i) => i.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={onScroll}
        renderItem={({ item }) => (
          <View style={{ width, paddingHorizontal: 24 }}>
            <View style={styles.card}>
              <Image
                source={require("../assets/Scalovate_Logo_Black.png")}
                style={styles.ghostLogo}
              />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <DotPager index={index} total={slides.length} />
        <PrimaryButton
          title={index < slides.length - 1 ? "Next" : "Get Started"}
          onPress={next}
          style={{ marginTop: 18 }}
        />
        <Text
          onPress={async () => {
            await AsyncStorage.setItem("scalovate_seen_onboarding", "1");
            router.replace("/welcome");
          }}
          style={styles.skip}
        >
          Skip
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingTop: 64, alignItems: "center" },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 24,
    marginTop: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 360,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  ghostLogo: {
    position: "absolute",
    right: -40,
    top: -20,
    width: 240,
    height: 240,
    opacity: 0.06,
    tintColor: Colors.white,
    resizeMode: "contain",
    transform: [{ rotate: "-8deg" }],
  },
  title: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  body: { color: Colors.muted, fontSize: 16, lineHeight: 22 },
  footer: { padding: 24, paddingBottom: 40 },
  skip: { color: Colors.muted, textAlign: "center", marginTop: 12 },
});
