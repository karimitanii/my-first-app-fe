import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [ready, setReady] = useState(false);
  const [seen, setSeen] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const v = await AsyncStorage.getItem("scalovate_seen_onboarding");
      setSeen(v === "1");
      setReady(true);
    })();
  }, []);

  if (!ready || seen === null) return null;
  return <Redirect href={seen ? "/welcome" : "/onboarding"} />;
}
