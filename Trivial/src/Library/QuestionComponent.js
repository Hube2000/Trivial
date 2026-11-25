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
    <View>
      <Text>{item.question}</Text>
      <Text>
        {item.type} - {item.difficulty} - {item.category}
      </Text>
    </View>
  );
}
