import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../config/styles";

export default function AddFriendModal({ visible, onClose, onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleAdd() {
    onAddFriend(name, image);
    setName("");
    setImage("");
  }

  function handleClose() {
    setName("");
    setImage("");
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Add new friend</Text>

          <View style={styles.modalRow}>
            <Text style={styles.modalLabel}>🧑‍🤝‍🧑 Name:</Text>
            <TextInput
              style={styles.modalInput}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.modalRow}>
            <Text style={styles.modalLabel}>🖼️ Image:</Text>
            <TextInput
              style={styles.modalInput}
              value={image}
              onChangeText={setImage}
            />
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalButton} onPress={handleAdd}>
              <Text style={styles.modalButtonText}>ADD FRIEND</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalButton} onPress={handleClose}>
              <Text style={styles.modalButtonText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}