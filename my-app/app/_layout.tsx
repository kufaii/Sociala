import { AuthProvider } from "@/AuthProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="detail/[id]" options={{ headerShown: false }} />
        <Stack.Screen
          name="detailSocial/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="survey" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="formEdit"
          options={{ presentation: "modal", title: "Form edit profile" }}
        />
      </Stack>
    </AuthProvider>
  );
}
