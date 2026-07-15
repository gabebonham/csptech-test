import { useTheme } from '@/hooks/use-theme';
import { Stack } from 'expo-router';


export default function RootLayout() {
  const colorScheme = useTheme();

  return (
    <>

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colorScheme.background },
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}