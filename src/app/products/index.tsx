import { ProductCard } from '@/features/products/components/ProductCard';
import { SearchBar } from '@/features/products/components/SearchBar';
import { useFavorites } from '@/features/products/hooks/useFavorites';
import { useProducts } from '@/features/products/hooks/useProducts';
import { useTheme } from '@/hooks/use-theme';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

export default function ProductListScreen() {
    const { data: products, isLoading, isError, refetch, isRefreshing } = useProducts();
    const { favoriteIds, toggleFavorite } = useFavorites();
    const [searchQuery, setSearchQuery] = useState('');

    const router = useRouter();
    const colorScheme = useTheme()
    const filteredProducts = useMemo(() => {
        if (!products) return [];
        if (!searchQuery.trim()) return products;

        const query = searchQuery.toLowerCase();
        return products.filter((product) =>
            product.title.toLowerCase().includes(query)
        );
    }, [products, searchQuery]);
    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }


    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Produtos</Text>
            <SearchBar value={searchQuery} onChangeText={setSearchQuery} placeholder="Buscar produtos..." />

            <FlatList
                data={filteredProducts}

                keyExtractor={(item) => item.id.toString()}
                numColumns={1}
                contentContainerStyle={styles.list}
                onRefresh={refetch}
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
    mainContainer: { flex: 1, padding: 20, gap: 16 },
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
});