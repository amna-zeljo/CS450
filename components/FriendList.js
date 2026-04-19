import React from "react";
import { FlatList, View } from "react-native";
import FriendItem from "./FriendItem";
import styles from "../config/styles";

export default function FriendList({ friends, onSelectFriend }) {
  return (
    <View style={styles.listWrapper}>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FriendItem friend={item} onSelectFriend={onSelectFriend} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}