import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../config/styles";

export default function FriendItem({ friend, onSelectFriend }) {
  let balanceText = `${friend.name} and you are even`;
  let balanceStyle = styles.neutralText;

  if (friend.balance < 0) {
    balanceText = `You owe ${friend.name} $${Math.abs(friend.balance)}`;
    balanceStyle = styles.negativeText;
  }

  if (friend.balance > 0) {
    balanceText = `${friend.name} owes you $${friend.balance}`;
    balanceStyle = styles.positiveText;
  }

  return (
    <View style={styles.friendRow}>
      <View style={styles.friendLeft}>
        <Image source={{ uri: friend.image }} style={styles.avatar} />
        <View style={styles.friendInfo}>
          <Text style={styles.friendName}>{friend.name}</Text>
          <Text style={[styles.friendBalance, balanceStyle]}>{balanceText}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.selectButton} onPress={() => onSelectFriend(friend)}>
        <Text style={styles.selectButtonText}>SELECT</Text>
      </TouchableOpacity>
    </View>
  );
}