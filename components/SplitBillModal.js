import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../config/styles";

export default function SplitBillModal({ friend, onClose, onSplitBill }) {
  const [billValue, setBillValue] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  useEffect(() => {
    if (friend) {
      setBillValue("");
      setYourExpense("");
      setWhoIsPaying("user");
    }
  }, [friend]);

  if (!friend) {
    return null;
  }

  const friendExpense =
    billValue !== "" && yourExpense !== ""
      ? String(Number(billValue) - Number(yourExpense))
      : "";

  function handleSplit() {
    if (billValue === "" || yourExpense === "") {
      return;
    }

    const totalBill = Number(billValue);
    const yourPart = Number(yourExpense);
    const friendPart = totalBill - yourPart;
    const delta = whoIsPaying === "user" ? friendPart : -yourPart;

    onSplitBill(delta);
  }

  return (
    <Modal visible={Boolean(friend)} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.splitModalCard}>
          <Text style={styles.splitModalTitle}>Split a bill with {friend.name}</Text>

          <View style={styles.splitRow}>
            <Text style={styles.splitLabel}>💰 Bill value:</Text>
            <TextInput
              style={styles.splitInput}
              keyboardType="numeric"
              value={billValue}
              onChangeText={setBillValue}
            />
          </View>

          <View style={styles.splitRow}>
            <Text style={styles.splitLabel}>🧑‍🤝‍🧑 Your expense:</Text>
            <TextInput
              style={styles.splitInput}
              keyboardType="numeric"
              value={yourExpense}
              onChangeText={setYourExpense}
            />
          </View>

          <View style={styles.splitRow}>
            <Text style={styles.splitLabel}>🧑‍🤝‍🧑 {friend.name}'s expense:</Text>
            <TextInput
              style={styles.splitInput}
              value={friendExpense}
              editable={false}
            />
          </View>

          <Text style={styles.payerTitle}>Who is paying the bill?</Text>

          <View style={styles.payerOptions}>
            <TouchableOpacity
              style={styles.payerOption}
              onPress={() => setWhoIsPaying("user")}
            >
              <View style={styles.radioOuter}>
                {whoIsPaying === "user" ? <View style={styles.radioInner} /> : null}
              </View>
              <Text style={styles.payerText}>You</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.payerOption}
              onPress={() => setWhoIsPaying("friend")}
            >
              <View style={styles.radioOuter}>
                {whoIsPaying === "friend" ? <View style={styles.radioInner} /> : null}
              </View>
              <Text style={styles.payerText}>{friend.name}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.splitDivider} />

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalButton} onPress={handleSplit}>
              <Text style={styles.modalButtonText}>SPLIT BILL</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalButton} onPress={onClose}>
              <Text style={styles.modalButtonText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}