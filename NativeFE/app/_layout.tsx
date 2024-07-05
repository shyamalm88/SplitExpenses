import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { theme } from "@/core/theme";
import { IconComponentProvider } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { MD3DarkTheme, MD3LightTheme, Provider } from "react-native-paper";
import { ContactProvider } from "./Context/LedgerContactContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  // const theme = {
  //   ...MD3DarkTheme,

  //   // Specify a custom property
  //   custom: "property",

  //   // Specify a custom property in nested object
  //   colors: {
  //     ...MD3DarkTheme.colors,
  //     primary: "#007F73",
  //     onPrimary: "rgb(255, 255, 255)",
  //     primaryContainer: "rgb(240, 219, 255)",
  //     onPrimaryContainer: "rgb(44, 0, 81)",
  //     secondary: "rgb(102, 90, 111)",
  //     onSecondary: "rgb(255, 255, 255)",
  //     secondaryContainer: "rgb(237, 221, 246)",
  //     onSecondaryContainer: "rgb(33, 24, 42)",
  //     tertiary: "rgb(128, 81, 88)",
  //     onTertiary: "rgb(255, 255, 255)",
  //     tertiaryContainer: "rgb(255, 217, 221)",
  //     onTertiaryContainer: "rgb(50, 16, 23)",
  //     error: "rgb(186, 26, 26)",
  //     onError: "rgb(255, 255, 255)",
  //     errorContainer: "rgb(255, 218, 214)",
  //     onErrorContainer: "rgb(65, 0, 2)",
  //     background: "rgb(255, 251, 255)",
  //     onBackground: "rgb(29, 27, 30)",
  //     surface: "rgb(255, 251, 255)",
  //     onSurface: "rgb(29, 27, 30)",
  //     surfaceVariant: "rgb(233, 223, 235)",
  //     onSurfaceVariant: "rgb(74, 69, 78)",
  //     outline: "rgb(124, 117, 126)",
  //     outlineVariant: "rgb(204, 196, 206)",
  //     shadow: "rgb(0, 0, 0)",
  //     scrim: "rgb(0, 0, 0)",
  //     inverseSurface: "rgb(50, 47, 51)",
  //     inverseOnSurface: "rgb(245, 239, 244)",
  //     inversePrimary: "rgb(220, 184, 255)",
  //     elevation: {
  //       level0: "transparent",
  //       level1: "rgb(248, 242, 251)",
  //       level2: "rgb(244, 236, 248)",
  //       level3: "rgb(240, 231, 246)",
  //       level4: "rgb(239, 229, 245)",
  //       level5: "rgb(236, 226, 243)",
  //     },
  //     surfaceDisabled: "rgba(29, 27, 30, 0.12)",
  //     onSurfaceDisabled: "rgba(29, 27, 30, 0.38)",
  //     backdrop: "rgba(51, 47, 55, 0.4)",
  //   },
  // };

  return (
    <Provider theme={theme}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <ContactProvider>
          <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <Stack
              screenOptions={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: "#f4511e",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
              initialRouteName="(auth)"
            >
              <Stack.Screen name="index" />
              <Stack.Screen name="(individualPages)" />
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="+not-found" />
            </Stack>
          </IconComponentProvider>
        </ContactProvider>
      </ThemeProvider>
    </Provider>
  );
}
