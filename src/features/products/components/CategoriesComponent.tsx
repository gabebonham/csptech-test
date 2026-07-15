import { useCategories } from '@/features/products/hooks/useCategories';
import { useTheme } from '@/hooks/use-theme';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
    selectedCategory: string | null;
    onSelectCategory: (category: string | null) => void;
};

export function CategoriesComponent({ selectedCategory, onSelectCategory }: Props) {
    const colorScheme = useTheme();
    const { data: categories, isLoading, isError } = useCategories();

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" />
            </View>
        );
    }

    if (isError || !categories) {
        return null;
    }

    const allCategories = ['Todos', ...categories];

    return (
        <View style={styles.wrapper}>
            <FlatList
                data={allCategories}
                keyExtractor={(item) => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => {
                    const isSelected =
                        item === 'Todos' ? selectedCategory === null : selectedCategory === item;

                    return (
                        <Pressable
                            style={[
                                styles.chip,
                                {
                                    backgroundColor: isSelected ? colorScheme.tint : colorScheme.background,
                                    borderColor: isSelected ? colorScheme.tint : colorScheme.backgroundSelected,
                                },
                            ]}
                            onPress={() => onSelectCategory(item === 'Todos' ? null : item)}
                        >
                            <Text
                                style={[
                                    styles.chipText,
                                    { color: isSelected ? '#fff' : colorScheme.textSecondary },
                                ]}
                            >
                                {item}
                            </Text>
                        </Pressable>
                    );
                }}
            /></View>
    );
}

const styles = StyleSheet.create({
    wrapper: { height: 32 },
    loadingContainer: { height: 40, justifyContent: 'center', paddingLeft: 4 },
    list: { gap: 8, paddingHorizontal: 2 },
    chip: {
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 16,
    },
    chipText: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
});