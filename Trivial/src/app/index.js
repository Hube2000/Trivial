import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Index() {
  return (
    <View>
      <Text>Hello c un trivia</Text>
      <Text>Creer un lobby</Text>
      <Link href="/library">Library</Link>
    </View>
  );
}
