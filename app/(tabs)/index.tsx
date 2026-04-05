import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, StyleSheet, SafeAreaView
} from 'react-native';

type Item = {
  id: number;
  name: string;
  checked: boolean;
};

export default function ShoppingList() {
  const [text, setText] = useState('');
  const [items, setItems] = useState<Item[]>([]);

  const addItem = () => {
    if (text.trim() === '') return;
    setItems([...items, { id: Date.now(), name: text, checked: false }]);
    setText('');
  };

  const toggleItem = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="new item"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.addButtonText}>ADD ITEM</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.titleBox}>
        <Text style={styles.titleText}>SHOPPING LIST</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => toggleItem(item.id)}
          >
            <Text style={styles.itemText}>{item.name}</Text>
            <View style={[styles.checkbox, item.checked && styles.checkboxChecked]}>
              {item.checked && <Text style={styles.checkmark}>✓</Text>}
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 60,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 15,
  },
  addButton: {
    backgroundColor: '#0099cc',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 6,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  titleBox: {
    borderWidth: 2,
    borderColor: '#000',
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  listItem: {
    backgroundColor: '#00bcd4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    marginBottom: 6,
    borderRadius: 4,
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  checkboxChecked: {
    backgroundColor: '#0055cc',
    borderColor: '#0055cc',
  },
  checkmark: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});