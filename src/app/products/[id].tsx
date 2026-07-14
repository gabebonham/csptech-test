import { useProduct } from '@/features/products/hooks/useProduct';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: product } = useProduct(parseInt(id, 10));

  return (
    <View style={styles.container}>
      <Text>{product?.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});