import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  Modal,
  ScrollView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Palette, ThemeColors } from "../constants/colors";
import { useAppTheme } from "../hooks/useAppTheme";

function MenuSheet({
  visible,
  onClose,
  onLogin,
  onToggleTheme,
  mode,
}: {
  visible: boolean;
  onClose: () => void;
  onLogin: () => void;
  onToggleTheme: () => void;
  mode: "light" | "dark";
}) {
  const theme = ThemeColors[mode];
  const Item = ({
    title,
    onPress,
    active = false,
  }: {
    title: string;
    onPress?: () => void;
    active?: boolean;
  }) => (
    <Pressable onPress={onPress} style={{ paddingVertical: 14 }}>
      <Text
        style={{
          color: active ? theme.tint : theme.text,
          fontWeight: active ? "700" : "500",
        }}
      >
        {title}
      </Text>
    </Pressable>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <View />
      </Pressable>
      <View
        style={[
          styles.menuPanel,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <Image
          source={require("../assets/journiq_red.png")}
          style={{
            width: 120,
            resizeMode: "contain",
            marginBottom: 8,
            opacity: mode === "dark" ? 0.9 : 0.7,
          }}
        />
        <Item title="Home" active />
        <Item title="Travel Plans" />
        <Item title="Pricing" />
        <Item title="Become a Partner" />
        <View
          style={{
            height: 1,
            backgroundColor: theme.border,
            marginVertical: 10,
          }}
        />
        <Item title="Login" onPress={onLogin} />
        <Pressable
          onPress={onToggleTheme}
          style={{
            paddingVertical: 14,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: theme.text, fontWeight: "500" }}>Theme</Text>
          <Text style={{ color: theme.muted }}>
            {mode === "dark" ? "Dark" : "Light"}
          </Text>
        </Pressable>

        <View
          style={{
            height: 1,
            backgroundColor: theme.border,
            marginVertical: 10,
          }}
        />
        <Item title="Privacy Policy" />
        <Item title="Terms of Business" />
        <Item title="Contact" />
        <Pressable
          onPress={onClose}
          style={[styles.closeBtn, { borderColor: theme.border }]}
        >
          <Text style={{ color: theme.muted }}>Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

function LoginModal({
  visible,
  onClose,
  mode,
}: {
  visible: boolean;
  onClose: () => void;
  mode: "light" | "dark";
}) {
  const theme = ThemeColors[mode];
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackdrop} />
      <View
        style={[
          styles.loginCard,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <Text style={[styles.loginTitle, { color: theme.text }]}>
          Welcome Back
        </Text>
        <Pressable style={[styles.oauthBtn, { borderColor: theme.border }]}>
          <Text style={{ color: theme.text }}>🔴 Continue with Google</Text>
        </Pressable>

        <Text style={[styles.label, { color: theme.muted }]}>
          Email Address
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.input,
              color: theme.text,
              borderColor: theme.border,
            },
          ]}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor={theme.muted}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={[styles.label, { color: theme.muted, marginTop: 12 }]}>
          Password
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.input,
              color: theme.text,
              borderColor: theme.border,
            },
          ]}
          value={pass}
          onChangeText={setPass}
          placeholder="Enter your password"
          placeholderTextColor={theme.muted}
          secureTextEntry
        />

        <Pressable
          style={[styles.signInBtn, { backgroundColor: Palette.red500 }]}
          onPress={onClose}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>Sign In</Text>
        </Pressable>

        <Pressable onPress={onClose} style={{ paddingVertical: 10 }}>
          <Text style={{ color: theme.muted }}>Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

export default function Chat() {
  const { mode, toggle } = useAppTheme();
  const theme = ThemeColors[mode];
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [message, setMessage] = useState("");

  const messages = [
    { id: "1", from: "Dana", text: "Nice to meet you! I'm Dana. " },
    {
      id: "2",
      from: "Dana",
      text: "Tell me—any destination calling your name?",
    },
    { id: "3", from: "Dana", text: "Still planning your trip? 🌍" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* Top bar */}
      <View style={[styles.topbar, { borderColor: theme.border }]}>
        <Image
          source={require("../assets/journiq_red.png")}
          style={{
            width: 110,
            height: 28,
            resizeMode: "contain",
            opacity: mode === "dark" ? 0.95 : 0.7,
          }}
        />
        <Pressable
          onPress={() => setMenuOpen(true)}
          hitSlop={12}
          style={styles.hamburger}
        >
          <View style={[styles.hbar, { backgroundColor: theme.text }]} />
          <View style={[styles.hbar, { backgroundColor: theme.text }]} />
          <View style={[styles.hbar, { backgroundColor: theme.text }]} />
        </Pressable>
      </View>

      {/* Watermark */}
      <Image
        source={require("../assets/journiq_red.png")}
        style={{
          position: "absolute",
          alignSelf: "center",
          top: "28%",
          width: 240,
          height: 240,
          opacity: mode === "dark" ? 0.08 : 0.06,
          resizeMode: "contain",
        }}
      />

      {/* chat content */}
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        <View style={{ alignSelf: "flex-start", marginBottom: 6 }}>
          <View
            style={[
              styles.agentBadge,
              { backgroundColor: theme.ghost, borderColor: theme.border },
            ]}
          >
            <Text style={{ color: theme.text, fontWeight: "700" }}>Dana</Text>
          </View>
        </View>

        {messages.map((m) => (
          <View
            key={m.id}
            style={{
              marginBottom: 10,
              alignSelf: "flex-start",
              maxWidth: "90%",
            }}
          >
            <View style={{ borderRadius: 14, overflow: "hidden" }}>
              <LinearGradient
                colors={
                  mode === "dark"
                    ? [Palette.card, Palette.card]
                    : ["#ffffff", "#ffffff"]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  padding: 12,
                  borderWidth: 1,
                  borderColor: theme.border,
                }}
              >
                <Text style={{ color: theme.text }}>{m.text}</Text>
              </LinearGradient>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* input bar */}
      <View
        style={[
          styles.inputBar,
          { backgroundColor: theme.background, borderColor: theme.border },
        ]}
      >
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="please enter destination"
          placeholderTextColor={theme.muted}
          style={[
            styles.textInput,
            {
              backgroundColor: theme.input,
              color: theme.text,
              borderColor: theme.border,
            },
          ]}
        />
        <Pressable
          onPress={() => setMessage("")}
          style={[styles.sendBtn, { backgroundColor: Palette.red500 }]}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>➤</Text>
        </Pressable>
      </View>

      {/* menus/modals */}
      <MenuSheet
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        onLogin={() => {
          setMenuOpen(false);
          setLoginOpen(true);
        }}
        onToggleTheme={toggle}
        mode={mode}
      />
      <LoginModal
        visible={loginOpen}
        onClose={() => setLoginOpen(false)}
        mode={mode}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topbar: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hamburger: { gap: 4, padding: 6 },
  hbar: { width: 20, height: 2, borderRadius: 2 },
  agentBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  inputBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: Platform.select({ web: 10, default: 0 }),
    flexDirection: "row",
    gap: 8,
    padding: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  menuPanel: {
    position: "absolute",
    top: 20,
    right: 16,
    width: 260,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  closeBtn: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: "center",
    marginTop: 6,
  },
  loginCard: {
    position: "absolute",
    top: "20%",
    left: "7%",
    right: "7%",
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
  },
  loginTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 10,
    textAlign: "left",
  },
  oauthBtn: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  label: { fontSize: 12, marginTop: 8 },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  signInBtn: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 14,
  },
});
