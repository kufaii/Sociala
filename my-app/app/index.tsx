import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  Pressable,
  Button,
} from "react-native";
import styles from "@/style";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function App() {
  const navigation = useNavigation();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  console.log(user, `<<<<<<<<<<`);

  const loginHandler = () => {
    // findOne{{user}}
  };

  const moveToStandings = () => {
    navigation.navigate("standing" as never);
  };

  const moveToRegister = () => {
    navigation.navigate("register" as never);
  };

  const pressButton = () => {
    console.log("Ketekan");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContent}>
        <View
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 25,
            borderWidth: 3,
            borderColor: "gray",
          }}
        >
          <View
            style={{
              flex: 3,
              // backgroundColor: "gray",
              borderRadius: 25,
              borderColor: "#eecc6a",
              borderWidth: 3,
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/images/home2.png")}
              style={{ width: 300, height: 300 }}
            />
          </View>

          <View style={{ flex: 3 }}>
            <TextInput
              style={[styles.input, { width: "100%" }]}
              placeholder="Username"
              onChangeText={(username) => setUser({ ...user, username })}
            />
            <TextInput
              style={[styles.input, { width: "100%", marginBottom: 20 }]}
              placeholder="Password"
              onChangeText={(password) => setUser({ ...user, password })}
              secureTextEntry={true}
            />

            <Pressable onPress={pressButton}>
              <View
                style={{
                  borderRadius: 30,
                  borderColor: "#eecc6a",
                  borderWidth: 1,
                  marginTop: 5,
                  backgroundColor: "#eecc6a",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 35,
                }}
              >
                <Text> Login </Text>
              </View>
            </Pressable>
          </View>

          <Pressable onPress={moveToStandings}>
            <Text>Standings</Text>
          </Pressable>

          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ marginTop: 5, marginBottom: 5 }}>
              You have not account? Register
              <Text
                onPress={moveToRegister}
                style={{ color: "blue", fontSize: 16 }}
              >
                {" "}
                here{" "}
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
