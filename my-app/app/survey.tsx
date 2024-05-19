// import { Text, View, SafeAreaView } from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import styles from "@/style";
// import { useLocalSearchParams } from "expo-router";

// const questions = [
//   {
//     question: "",
//     answer: ["", ""],
//   },
// ];

// export default function Register() {
//   const personalDetail = useLocalSearchParams();
//   //   save the answer here

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAwareScrollView contentContainerStyle={styles.scrollContent}>
//         <View
//           style={{
//             flex: 1,
//             padding: 10,
//             borderRadius: 25,
//             borderWidth: 3,
//             borderColor: "gray",
//           }}
//         >
//           <View style={{ flex: 1, alignItems: "center" }}>
//             <Text style={{ marginTop: 20, marginBottom: 5 }}>
//               SURVEY DIKIT GAN
//             </Text>
//           </View>
//           <View style={{ flex: 2, alignItems: "center" }}>
//             <Text style={{ marginTop: 20, marginBottom: 5 }}>
//               Apakah anda menikmati petualangan kecil ketika menjelajahi daerah
//               sekitar anda?
//             </Text>
//             {/* in here, i want it to have 4 option:
//             1. i dont like to explore new things
//             2. not so much
//             3. i do enjoy it a bit
//             4. im enjoying it very much, i love it*/}
//           </View>
//         </View>
//       </KeyboardAwareScrollView>
//     </SafeAreaView>
//   );
// }

// kodingan chatgpt :skull
// PR: REDO PAKAI KODINGAN DEWEK, LOGIKANYA UDAH MASUK AING GAN
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
    question:
      "Apakah anda menikmati petualangan kecil ketika menjelajahi daerah sekitar anda?",
    options: [
      "I don't like to explore new things",
      "Not so much",
      "I do enjoy it a bit",
      "I'm enjoying it very much, I love it",
    ],
  },
  {
    question: "2 asdasdasdasddas",
    options: [
      "I don't like to explore new things",
      "Not so much",
      "I do enjoy it a bit",
      "I'm enjoying it very much, I love it",
    ],
  },
  {
    question: "3 asdasdasdaag",
    options: [
      "I don't like to explore new things",
      "Not so much",
      "I do enjoy it a bit",
      "I'm enjoying it very much, I love it",
    ],
  },
  {
    question: "4 asdoimasfimnfas",
    options: [
      "I don't like to explore new things",
      "Not so much",
      "I do enjoy it a bit",
      "I'm enjoying it very much, I love it",
    ],
  },
  // Add other questions here...
];

const Register: React.FC = () => {
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
          <Text style={styles.questionText}>
            {questions[currentQuestionIndex].question}
          </Text>
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
        <View style={styles.navigationContainer}>
          {currentQuestionIndex > 0 && (
            <Button title="Back" onPress={handleBack} />
          )}
          <Button
            title={
              currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"
            }
            onPress={handleNext}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  questionContainer: {
    flex: 1,
    padding: 10,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "gray",
    alignItems: "center",
  },
  questionText: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
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
    backgroundColor: "#c0e8e0",
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
});

export default Register;
