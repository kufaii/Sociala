import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useLocalSearchParams } from "expo-router";

type Question = {
  question: string;
  options: string[];
};

const questions: Question[] = [
  {
    question: "Do you enjoy trying new and adventurous activities?",
    options: [
      "Nah, i hate it",
      "Not so much",
      "I do enjoy it a bit",
      "Ofcourse i enjoy it. I live for it",
    ],
  },
  {
    question: "Do you seek out opportunities to explore new place?",
    options: [
      "I wouldn't, even if i could",
      "Only if it necessary",
      "Sometimes i do it in my freetime",
      "I crave it. I long for it.",
    ],
  },
  {
    question:
      "Is it important for you to contribute to the well-being of others?",
    options: [
      "I live my life for myself",
      "If society told me to, maybe",
      "Sometimes, when i can",
      "Of course it is.",
    ],
  },
  {
    question: "Do you actively participate in volunteer or community service?",
    options: [
      "Never, it's not for me",
      "Only if I'm required to",
      "Sometimes, when I find the time",
      "Frequently, I love helping out",
    ],
  },
  {
    question: "Are you motivated to continuously learn and grow personally?",
    options: [
      "Not at all, I'm content",
      "Sometimes, when I'm in the mood",
      "I do learn something, just when im free",
      "Absolutely, it's a constant drive",
    ],
  },
  {
    question: "Do you set goals for self-improvement?",
    options: [
      "Never, I'm fine as I am",
      "Only if it's necessary",
      "Sometimes, only when it counts.",
      "Always.",
    ],
  },
  {
    question:
      "How often do you engage in activities aimed at enhancing your skills or knowledge?",
    options: [
      "Never, it's not my thing",
      "Only if I have to",
      "Sometimes, in my free time",
      "Regularly, it's a habit",
    ],
  },
];

export default function Survey() {
  const personalDetail = useLocalSearchParams();
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleOptionSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      console.log("Answers submitted:", answers);
    } else {
      // Submit or process the answers
      console.log("Answers submitted:", answers);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.questionContainer}>
          <View
            style={{
              marginVertical: 140,
              marginHorizontal: 15,
              width: "90%",
              flex: 1,
            }}
          >
            <Text style={{ fontSize: 14, textAlign: "center", color: "grey" }}>
              {currentQuestionIndex + 1}/{questions.length}
            </Text>
            <Text style={styles.questionText}>
              {questions[currentQuestionIndex].question}
            </Text>
            <View style={styles.answerContainer}>
              {questions[currentQuestionIndex].options.map(
                (option, optionIndex) => (
                  <TouchableOpacity
                    key={optionIndex}
                    style={[
                      styles.optionButton,
                      answers[currentQuestionIndex] === optionIndex &&
                        styles.selectedOption,
                    ]}
                    onPress={() => handleOptionSelect(optionIndex)}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>
          <View style={styles.navigationContainer}>
            <TouchableOpacity onPress={() => handleNext()}>
              <Text>
                {currentQuestionIndex < questions.length - 1
                  ? "Next"
                  : "Submit"}
              </Text>
            </TouchableOpacity>
            {currentQuestionIndex > 0 && (
              <TouchableOpacity onPress={() => handleBack()}>
                <Text>Back</Text>
              </TouchableOpacity>
            )}
            {/* <Button
              title={
                currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"
              }
              onPress={handleNext}
            />
            {currentQuestionIndex > 0 && (
              <Button title="Back" onPress={handleBack} />
            )} */}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  questionContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  questionText: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 22,
    textAlign: "center",
    textAlignVertical: "center",
    height: "35%",
  },
  answerContainer: {
    height: "65%",
  },
  optionButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
  },
  selectedOption: {
    backgroundColor: "#eecc6a",
  },
  navigationContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    padding: 40,
    width: "100%",
  },
});
