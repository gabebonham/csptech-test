import { useTheme } from '@/hooks/use-theme';
import { Search } from 'lucide-react-native';
import { StyleSheet, TextInput, View } from 'react-native';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export function SearchBar({ value, onChangeText, placeholder = 'Buscar...' }: SearchBarProps) {
  const colorScheme = useTheme();

  return (
    <View style={[styles.searchBar, { backgroundColor: colorScheme.backgroundSelected }]}>
      <Search size={16} color={colorScheme.textSecondary} />
      <TextInput
        style={[styles.textInput, { color: colorScheme.text }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colorScheme.textSecondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 8,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  textInput: {
    fontSize: 14,
    flex: 1,
    outlineStyle: 'none' as any,  
  },
});