import { ProductCard } from '@/features/products/components/ProductCard';
import { useFavorites } from '@/features/products/hooks/useFavorites';
import { useProducts } from '@/features/products/hooks/useProducts';
import { useTheme } from '@/hooks/use-theme';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function FavoritesScreen() {
    const { data: products, isLoading, isError, isRefreshing, refetch } = useProducts();
    const { favoriteIds, toggleFavorite } = useFavorites();
    const router = useRouter();
    const colorScheme = useTheme()

    const favoriteProducts = useMemo(
        () => products?.filter((p) => favoriteIds.includes(p.id)) ?? [],
        [products, favoriteIds]
    );

    if (isLoading) {
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
            <Text style={styles.title}>Favoritos</Text>
            <FlatList
                data={favoriteProducts}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        isFavorite
                        onPress={(id) => router.push(`/products/${String(id)}`)}
                        onToggleFavorite={toggleFavorite}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.center}>
                        <Text>Você ainda não favoritou nenhum produto.</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: { flex: 1, paddingHorizontal: 20, paddingVertical: 56, gap: 16 },
    list: { gap: 16 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 60 },
    title: { fontSize: 24, fontWeight: 'bold' },
    retryButton: {
        marginTop: 12,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#222',
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
    errorText: { fontSize: 16 },
});