import { useRouter } from "expo-router";
import { useState } from "react";

// Les URLs des API
const API = "https://opentdb.com/api.php?"; // Le lien API ne marche pas sans la précision du nombre de question (amount=x)
const API_CATEGORY = "https://opentdb.com/api_category.php";
export default function Parameter() {
  const router = useRouter();
  const [param, setParam] = useState(null);

  return (
    <View>
      <Text>Param: {param}</Text>
      <Button title="Aller à l'Index" onPress={() => router.push("/")} />
    </View>
  );
}
