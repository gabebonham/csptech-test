import { useTheme } from '@/hooks/use-theme';
import { Heart } from 'lucide-react-native';
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Product } from "../types/ProductType";

export function ProductCard(
    { product, onToggleFavorite, onPress, isFavorite }:
        { product: Product; onToggleFavorite: (id: number) => void; onPress: (id: number) => void; isFavorite: boolean }
) {
    const colorScheme = useTheme()

    return <Pressable style={[styles.card, { borderColor: colorScheme.backgroundSelected }]} onPress={() => onPress(product.id)}>
        <View style={styles.imageContainer}>
            <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
        </View>


        <View style={styles.info}>
            <View style={styles.titleRow}>
                <Text style={styles.name} numberOfLines={2}>
                    {product.title}
                </Text>
                <Pressable
                    style={styles.favoriteButton}
                    onPress={() => onToggleFavorite(product.id)}
                    hitSlop={8}
                >
                    <Heart
                        size={20}
                        color={isFavorite ? colorScheme.error : colorScheme.textSecondary}
                        fill={isFavorite ? colorScheme.error : 'transparent'}
                    />
                </Pressable></View>
            <Text style={[styles.category, { backgroundColor: colorScheme.tintSecondary, color: colorScheme.background, }]}>{product.category}</Text>
            <Text style={styles.price}>
                {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Text>
        </View>
    </Pressable>
}
const styles = StyleSheet.create({
    imageContainer: {
        width: '30%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 1,
    },
    card: {
        borderWidth: 2,
        width: '100%',
        borderRadius: 12,
        backgroundColor: '#fff',
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: '90%',
        height: '90%',
        backgroundColor: '#f0f0f0',
        borderRadius: 8
    },
    favoriteButton: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 20,
        padding: 6,
    },
    info: {
        padding: 8,
        flex: 1,
        height:'100%'
    },
    name: {
        fontSize: 13,
        fontWeight: '600',
        color: '#222',
        flexShrink: 1,
    },
    price: {
        marginTop: 4,
        fontSize: 14,
        fontWeight: '700',
        color: '#111',
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 8,
    },
    category: {
        fontSize: 10,

        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginTop: 2,
    },
});