import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../constants/colors";
import { PrimaryButton } from "../components/PrimaryButton";
import { router } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const canSubmit = email.includes("@") && pass.length >= 6;

  return (
    <LinearGradient colors={[Colors.bg, Colors.black]} style={styles.container}>
      <Text style={styles.title}>Log in</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="you@scalovate.com"
          placeholderTextColor={Colors.muted}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={[styles.label, { marginTop: 16 }]}>Password</Text>
        <TextInput
          value={pass}
          onChangeText={setPass}
          placeholder="••••••••"
          placeholderTextColor={Colors.muted}
          style={styles.input}
          secureTextEntry
        />

        <PrimaryButton
          title="Continue"
          onPress={() => router.replace("/welcome")}
          style={{ marginTop: 18, opacity: canSubmit ? 1 : 0.6 }}
        />

        <Pressable>
          <Text style={styles.forgot}>Forgot password?</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: {
    color: Colors.white,
    fontSize: 26,
    fontWeight: "800",
    marginTop: 16,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 16,
  },
  label: { color: Colors.muted, fontSize: 12, marginBottom: 6 },
  input: {
    color: Colors.white,
    backgroundColor: "#141416",
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  forgot: { color: Colors.red300, textAlign: "center", marginTop: 14 },
});
