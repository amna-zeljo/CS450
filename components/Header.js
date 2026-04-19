import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../config/styles";

export default function Header({ onOpenAddFriend }) {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Split the Bill</Text>
        <TouchableOpacity style={styles.addButton} onPress={onOpenAddFriend}>
          <Text style={styles.addButtonText}>ADD FRIEND</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
    </View>
  );
}