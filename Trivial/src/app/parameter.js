import { useRouter } from "expo-router";
import { useState } from "react";

export default function Parameter() {
  const router = useRouter();
  const [param, setParam] = useState(null);

  return (
    <View>
      <Text>Param: {param}</Text>
      <Button title="Go to Index" onPress={() => router.push("/")} />
    </View>
  );
}
