import { CategoriesComponent } from '@/features/products/components/CategoriesComponent';
import { ProductCard } from '@/features/products/components/ProductCard';
import { SearchBar } from '@/features/products/components/SearchBar';
import { useFavorites } from '@/features/products/hooks/useFavorites';
import { useProducts } from '@/features/products/hooks/useProducts';
import { useTheme } from '@/hooks/use-theme';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function ProductListScreen() {
    const { data: products, isLoading, isError, refetch, isRefreshing } = useProducts();
    const { favoriteIds, toggleFavorite } = useFavorites();
    const [searchQuery, setSearchQuery] = useState('');
    const colorScheme = useTheme()
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const handleRefresh = async () => {
        setSearchQuery('');
        setSelectedCategory(null);
        await refetch();
    };
    const filteredProducts = useMemo(() => {
        if (!products) return [];
        let result = products;

        if (selectedCategory) {
            result = result.filter((p) => p.category === selectedCategory);
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter((p) => p.title.toLowerCase().includes(query));
        }

        return result;
    }, [products, searchQuery, selectedCategory]);

    if (isLoading || isRefreshing) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (isError && !products) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>Não foi possível carregar os produtos.</Text>
                <Pressable onPress={refetch} style={[styles.retryButton, {backgroundColor:colorScheme.tint}]}>
                    <Text style={styles.retryButtonText}>Tentar novamente</Text>
                </Pressable>
            </View>
        );
    }
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Produtos</Text>
            <SearchBar value={searchQuery} onChangeText={setSearchQuery} placeholder="Buscar produtos..." />
            <CategoriesComponent selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

            <FlatList
                data={filteredProducts}

                keyExtractor={(item) => item.id.toString()}
                numColumns={1}
                contentContainerStyle={styles.list}
                onRefresh={handleRefresh}
                refreshing={isRefreshing}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        isFavorite={favoriteIds.includes(item.id)}
                        onPress={(id) => router.push(`/products/${String(id)}`)}
                        onToggleFavorite={toggleFavorite}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.center}>
                        <Text>Nenhum produto encontrado.</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: { flex: 1, paddingHorizontal: 20, paddingTop: 56, gap: 16 },
    searchBar: {
        borderRadius: 16,
        paddingVertical: 6,
        paddingHorizontal: 8,
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center'
    },
    textInput: {
        fontSize: 14,
    },
    list: { gap: 16 },
    row: { justifyContent: 'space-between', paddingHorizontal: 8 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 60 },
    errorText: { fontSize: 16 },
    title: { fontSize: 24, fontWeight: 'bold', },
    retryButton: {
        marginTop: 12,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
});