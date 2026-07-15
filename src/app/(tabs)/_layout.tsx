import { useTheme } from '@/hooks/use-theme';
import { Tabs } from 'expo-router';
import { Grid2x2, Heart } from 'lucide-react-native';

export default function TabsLayout() {
    const colorScheme = useTheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colorScheme.tint,
                tabBarInactiveTintColor: colorScheme.textSecondary,
                tabBarStyle: {
                    backgroundColor: colorScheme.background,
                    borderTopColor: colorScheme.backgroundSelected,
                    height: 110,
                },

                tabBarItemStyle: {
                    paddingVertical: 4,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Produtos',
                    tabBarIcon: ({ color, size }) => <Grid2x2 size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title: 'Favoritos',
                    tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}