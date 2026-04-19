import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, KeyboardAvoidingView, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./config/styles";
import friendsData from "./data/friends";
import { Header, FriendList, AddFriendModal, SplitBillModal } from "./components";

const STORAGE_KEY = "friends";

export default function App() {
  const [friends, setFriends] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState(null);

  const selectedFriend = friends.find((friend) => friend.id === selectedFriendId) ?? null;

  useEffect(() => {
    async function loadFriends() {
      const storedFriends = await AsyncStorage.getItem(STORAGE_KEY);

      if (storedFriends) {
        setFriends(JSON.parse(storedFriends));
      } else {
        setFriends(friendsData);
      }

      setIsReady(true);
    }

    loadFriends();
  }, []);

  useEffect(() => {
    async function saveFriends() {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(friends));
    }

    if (isReady) {
      saveFriends();
    }
  }, [friends, isReady]);

  function openAddFriend() {
    setShowAddFriend(true);
  }

  function closeAddFriend() {
    setShowAddFriend(false);
  }

  function handleAddFriend(name, image) {
    const newFriend = {
      id: Date.now(),
      name,
      image,
      balance: 0,
    };

    setFriends((currentFriends) => [...currentFriends, newFriend]);
    setShowAddFriend(false);
  }

  function handleSelectFriend(friend) {
    setSelectedFriendId(friend.id);
  }

  function handleCloseSplitBill() {
    setSelectedFriendId(null);
  }

  function handleSplitBill(delta) {
    setFriends((currentFriends) =>
      currentFriends.map((friend) =>
        friend.id === selectedFriendId
          ? { ...friend, balance: friend.balance + delta }
          : friend
      )
    );

    setSelectedFriendId(null);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Header onOpenAddFriend={openAddFriend} />
        <FriendList friends={friends} onSelectFriend={handleSelectFriend} />
        <AddFriendModal
          visible={showAddFriend}
          onClose={closeAddFriend}
          onAddFriend={handleAddFriend}
        />
        <SplitBillModal
          friend={selectedFriend}
          onClose={handleCloseSplitBill}
          onSplitBill={handleSplitBill}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}