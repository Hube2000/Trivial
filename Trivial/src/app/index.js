import { router } from "expo-router";
import {
  Text,
  View
} from "react-native";

export default function Index() {
  return (
    <View>
      <Text>Hello c un trivia</Text>
      <Text>Creer un lobby</Text>
      <Text>Librarie des question</Text>
      <Button
        title="Paramètre Lobby"
        onPress={() => router.push("/parameter")}
      />
    </View>
  );
}
