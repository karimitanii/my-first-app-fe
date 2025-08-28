export const Palette = {
  black: "#0A0A0A",
  white: "#FFFFFF",
  red900: "#7F1D1D",
  red700: "#9F2F2F",
  red500: "#C65454",
  red300: "#DE7E7E",
  red100: "#F2C1C1",
  bg: "#0B0B0C",
  card: "#111113",
  border: "#1F1F22",
  muted: "#9CA3AF",
};

const tint = Palette.red500;

export const ThemeColors = {
  light: {
    text: "#000000",
    background: "#FFFFFF",
    tint,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tint,
    card: "#F7F7F7",
    border: "#E5E7EB",
    muted: "#6B7280",
    input: "#FFFFFF",
    ghost: "rgba(0,0,0,0.04)",
  },
  dark: {
    text: "#ECEDEE",
    background: Palette.bg,
    tint,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tint,
    card: Palette.card,
    border: Palette.border,
    muted: Palette.muted,
    input: "#141416",
    ghost: "rgba(255,255,255,0.06)",
  },
};

export type Theme = keyof typeof ThemeColors;

// Back-compat:
export const Colors = Palette;
