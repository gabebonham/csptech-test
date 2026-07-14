import { useFavorites } from '@/features/products/hooks/useFavorites';
import { useProducts } from '@/features/products/hooks/useProducts';
import { useTheme } from '@/hooks/use-theme';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Heart } from 'lucide-react-native';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const colorScheme = useTheme();

    const { data: products, isLoading } = useProducts();
    const { favoriteIds, toggleFavorite } = useFavorites();

    const product = products?.find((p) => p.id.toString() === id);
    const isFavorite = product ? favoriteIds.includes(product.id) : false;

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!product) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>Produto não encontrado.</Text>
            </View>
        );
    }

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={[styles.container, { backgroundColor: colorScheme.background }]}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.imageWrapper}>
                        <Pressable
                            style={[styles.backButton, { backgroundColor: colorScheme.background }]}
                            onPress={() => router.back()}
                            hitSlop={8}
                        >
                            <ArrowLeft size={22} color={colorScheme.text} />
                        </Pressable>

                        <Pressable
                            style={[styles.favoriteButton, { backgroundColor: colorScheme.background }]}
                            onPress={() => toggleFavorite(product.id)}
                            hitSlop={8}
                        >
                            <Heart
                                size={22}
                                color={isFavorite ? colorScheme.error : colorScheme.textSecondary}
                                fill={isFavorite ? colorScheme.error : 'transparent'}
                            />
                        </Pressable>

                        <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
                    </View>

                    <View style={styles.content}>
                        <Text
                            style={[
                                styles.category,
                                { backgroundColor: colorScheme.tintSecondary, color: colorScheme.background },
                            ]}
                        >
                            {product.category}
                        </Text>

                        <Text style={[styles.title, { color: colorScheme.text }]}>{product.title}</Text>

                        <Text style={[styles.price, { color: colorScheme.text }]}>
                            {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </Text>

                        {product.description && (
                            <>
                                <Text style={[styles.sectionTitle, { color: colorScheme.text }]}>Descrição</Text>
                                <Text style={[styles.description, { color: colorScheme.textSecondary }]}>
                                    {product.description}
                                </Text>
                            </>
                        )}
                    </View>
                </ScrollView>

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingVertical:16 },
    scrollContent: { paddingBottom: 32 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    errorText: { fontSize: 16 },

    imageWrapper: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: { width: '80%', height: '80%' },

    backButton: {
        position: 'absolute',
        top: 56,
        left: 20,
        zIndex: 10,
        borderRadius: 20,
        padding: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    favoriteButton: {
        position: 'absolute',
        top: 56,
        right: 20,
        zIndex: 10,
        borderRadius: 20,
        padding: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },

    content: { paddingHorizontal: 20, paddingTop: 20, gap: 8 },
    category: {
        fontSize: 11,
        fontWeight: '600',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 12,
        alignSelf: 'flex-start',
        textTransform: 'capitalize',
    },
    title: { fontSize: 20, fontWeight: 'bold', marginTop: 4 },
    ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
    ratingText: { fontSize: 13 },
    price: { fontSize: 22, fontWeight: '700', marginTop: 8 },

    sectionTitle: { fontSize: 15, fontWeight: '600', marginTop: 16 },
    description: { fontSize: 14, lineHeight: 20, marginTop: 4 },

    footer: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderTopWidth: 1,
    },
    cartButton: {
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
    },
    cartButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '700',
    },
});