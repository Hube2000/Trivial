import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  sleep,
} from "react-native";

export default function QuestionComponent({ item }) {
  return (
    <View style={styles.questionBox}>
      <Text style={styles.question}>{item.question}</Text>
      <Text style={styles.spec}>
        {item.type} - {item.difficulty} - {item.category}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  questionBox: {},
  question: {
    fontWeight: "bold",
  },
  Spec: {
    fontSize: 16,
    color: "#666",
  },
});
