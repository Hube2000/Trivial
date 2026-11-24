import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

API_AMOUNT_OF_QUESTION_IN_BDD = "https://opentdb.com/api_count_global.php";
API = "https://opentdb.com/api.php?amount="; // need to add the number of question to fetch after the "="
//don't forget to add the &token=YOURTOKENHERE
API_GET_SESSION_TOKEN = "https://opentdb.com/api_token.php?command=request";
API_RESET_SESSION_TOKEN =
  "https://opentdb.com/api_token.php?command=reset&token="; // add the token after the "="

export default function Library() {
  const [session, SetSession] = useState(null);
  const [amountQuestionBDD, setAmountQuestionBDD] = useState(null);
  const [questions, setQuestions] = useState(null);
  useEffect(() => {
    chargerSession();
    GetAmountQuestionBDD();
  }, []);
  if (session === null || amountQuestionBDD == null || questions == null) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  async function GetAmountQuestionBDD() {
    const reponse = await fetch(API_AMOUNT_OF_QUESTION_IN_BDD); //getToken
    const data = await reponse.json();
    setAmountQuestionBDD(data);
  }
  //creation d'une session
  async function chargerSession() {
    const reponse = await fetch(API_GET_SESSION_TOKEN); //getToken
    const data = await reponse.json();
    SetSession(data);
  }

  return (
    <View>
      <Text>Library</Text>
    </View>
  );
}
