import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="diagnostics" />
      <Stack.Screen name="call-shield" />
      <Stack.Screen name="explore" />
    </Stack>
  );
}