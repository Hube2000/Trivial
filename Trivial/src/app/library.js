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

//const
const API_AMOUNT_OF_QUESTION_IN_BDD =
  "https://opentdb.com/api_count_global.php";
const API = "https://opentdb.com/api.php?amount="; // need to add the number of question to fetch after the "="
//don't forget to add the &token=YOURTOKENHERE
const API_GET_SESSION_TOKEN =
  "https://opentdb.com/api_token.php?command=request";
const API_RESET_SESSION_TOKEN =
  "https://opentdb.com/api_token.php?command=reset&token="; // add the token after the "="

//main
export default function Library() {
  const [session, SetSession] = useState(null);
  const [amountQuestionBDD, setAmountQuestionBDD] = useState(null);
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    chargerQuestions();
  }, []);

  if (questions == null || session == null || amountQuestionBDD == null) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  async function chargerQuestions() {
    //get token
    const tokenResponse = await fetch(API_GET_SESSION_TOKEN);
    const tokenData = await tokenResponse.json();
    const token = tokenData.token;
    SetSession(token);

    //get amount of questions
    const amountResponse = await fetch(API_AMOUNT_OF_QUESTION_IN_BDD);
    const amountData = await amountResponse.json();
    const amount = amountData.overall.total_num_of_questions;
    setAmountQuestionBDD(amount);

    //1st getquestion
    const questionsResponse = await fetch(`${API}${amount}&token=${token}`);
    const questionsData = await questionsResponse.json();
    let allQuestions = questionsData.results;
    setQuestions(allQuestions);

    //limit of 50 questions per request
    console.log("fin de la recup des questions");
    console.log("nombre demande :", amount);
    console.log("nombre recu :", questionsData.results.length);
  }

  //filter for the lib

  //
  return (
    <View>
      <Text>Library</Text>
      <FlatList
        data={questions}
        keyExtractor={(item) => item.question}
        renderItem={({ item }) => <Text>{item.question}</Text>}
      />
    </View>
  );
}
