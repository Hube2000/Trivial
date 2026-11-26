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
  Span,
  ScrollView,
} from "react-native";
import QuestionComponent from "../Library/QuestionComponent";

//const
const API_AMOUNT_OF_QUESTION_IN_BDD =
  "https://opentdb.com/api_count_global.php";
const API = "https://opentdb.com/api.php?amount="; // need to add the number of question to fetch after the "="
//don't forget to add the &token=YOURTOKENHERE
const API_GET_SESSION_TOKEN =
  "https://opentdb.com/api_token.php?command=request";
const API_RESET_SESSION_TOKEN =
  "https://opentdb.com/api_token.php?command=reset&token="; // add the token after the "="

const API_GET_TYPES = "https://opentdb.com/api_category.php"; //get the list of categories
//main
export default function Library() {
  //questions fetching and gestion
  const [session, SetSession] = useState(null);
  const [amountQuestionBDD, setAmountQuestionBDD] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [ALLQuestions, setALLQuestions] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

  //filter
  const [typeListe, setTypeListe] = useState([]);
  const [selectedCategory, setselectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  useEffect(() => {
    LoadQuestions();
    GetTypeList();
  }, []);

  if (questions == null || session == null || amountQuestionBDD == null) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  // for the filter
  async function GetTypeList() {
    const typeListResponse = await fetch(API_GET_TYPES);
    const typeListData = await typeListResponse.json();
    const typeList = typeListData.trivia_categories.map((item) => item.name);
    setTypeListe(typeList);
  }

  async function LoadQuestions() {
    setLoadingMore(true);
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
    const questionsResponse = await fetch(`${API}50&token=${token}`); //limit of 50 quest per request
    const questionsData = await questionsResponse.json();

    if (questionsData.response_code !== 0) {
      console.log("API ERROR :", questionsData.response_code); //error 5 = timeout, to many request
      setLoadingMore(false);
      return;
    }
    let allQuestions = questionsData.results;
    setQuestions(allQuestions);

    //limit of 50 questions per request
    console.log("end of the question fetching cycle ");
    console.log("Requested : 50");
    console.log("Received : ", questionsData.results.length);

    //save in useState
    if (ALLQuestions == null) {
      setALLQuestions(allQuestions);
    } else {
      setALLQuestions([...ALLQuestions, ...allQuestions]);
    }
    setLoadingMore(false);
  }

  //filter for the lib

  const visibleQuestions = ALLQuestions.filter((question) => {
    if (
      selectedCategory &&
      question.category === selectedCategory &&
      selectedDifficulty &&
      question.difficulty === selectedDifficulty
    ) {
      return true;
    }
    if (
      selectedCategory &&
      question.category === selectedCategory &&
      selectedDifficulty == null
    ) {
      return true;
    }
    if (
      selectedDifficulty &&
      question.difficulty === selectedDifficulty &&
      selectedCategory == null
    ) {
      return true;
    }
    return false;
  });
  return (
    <View>
      {/* filter */}
      <Text>Filtré sur une categorie :</Text>
      <View style={styles.contentViewAllign}>
        <ScrollView horizontal={true}>
          {typeListe.map((typeItem) => (
            <Pressable
              key={typeItem}
              onPress={() => {
                if (selectedCategory === typeItem) {
                  setselectedCategory(null);
                } else setselectedCategory(typeItem);
              }}
            >
              <Text>| {typeItem} |</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <Text>Filtré sur une difficulté:</Text>

      <View>
        <ScrollView horizontal={true}>
          <Pressable
            key="easy"
            onPress={() => {
              if (selectedDifficulty === "easy") {
                setSelectedDifficulty(null);
              } else setSelectedDifficulty("easy");
            }}
            title="easy"
          >
            <Text>easy -</Text>
          </Pressable>
          <Pressable
            key="medium"
            onPress={() => {
              if (selectedDifficulty === "medium") {
                setSelectedDifficulty(null);
              } else setSelectedDifficulty("medium");
            }}
          >
            <Text> medium -</Text>
          </Pressable>
          <Pressable
            key="hard"
            onPress={() => {
              if (selectedDifficulty === "hard") {
                setSelectedDifficulty(null);
              } else setSelectedDifficulty("hard");
            }}
          >
            <Text> hard </Text>
          </Pressable>
        </ScrollView>
      </View>

      <Text>Library</Text>
      <Text>Type select : {selectedCategory}</Text>
      <Text>Difficulty select : {selectedDifficulty}</Text>
      <Text>nb de question :{ALLQuestions.length}</Text>
      <Pressable
        onPress={() => {
          setSelectedDifficulty(null);
          setselectedCategory(null);
        }}
      >
        <Text>Reset filtre</Text>
      </Pressable>
      <FlatList
        data={
          selectedDifficulty == null && selectedCategory == null
            ? ALLQuestions
            : visibleQuestions
        }
        keyExtractor={(item, index) => index.toString()}
        onEndReached={() => LoadQuestions()}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <View style={styles.question}>
            <QuestionComponent item={item} />
          </View>
        )}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator style={styles.loadingIndicator} size="large" />
          ) : null
        }
        ListEmptyComponent={
          <Text style={{ textAlign: "center" }}>
            Aucune question ne correspond à vos filtres
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  question: {
    padding: 7,
    borderColor: "darkgray",
    borderWidth: 1,
  },
  loadingIndicator: {
    padding: 25,
  },
  contentViewAllign: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
