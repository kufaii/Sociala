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
import { Link } from "expo-router";
import axios from "@/instance"; //sesuaikan link via ngrok
import pureAxios, { AxiosError } from "axios";
import { AuthProperty } from "@/AuthProvider";

interface Respons {
  data: { access_token: string };
}

export default function App() {
  const { handleLogin } = AuthProperty();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const loginAction = async () => {
    try {
      // const { data }: Respons = await axios({
      //   method: "POST",
      //   url: "/login",
      //   data: user,
      // })
      const { data }: Respons = await axios({
        url: "/user/login",
        method: "POST",
        data: user,
      });
      handleLogin(`Bearer ${data.access_token}`);
    } catch (error) {
      if (pureAxios.isAxiosError(error)) {
        // error is an AxiosError
        alert(error.response?.data?.message);
      } else {
        // Handle other types of errors (if any)
        alert("An unexpected error occurred");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContent}>
        <View
          style={{
            flex: 1,
            padding: 15,
          }}
        >
          <View
            style={{
              flex: 3,
              // backgroundColor: "gray",
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

            <Pressable onPress={loginAction}>
              <View
                style={{
                  borderRadius: 15,
                  marginTop: 5,
                  backgroundColor: "#eecc6a",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 50,
                }}
              >
                <Text> Login </Text>
              </View>
            </Pressable>
          </View>

          {/* <Pressable onPress={moveToStandings}>
            <Text>Standings</Text>
          </Pressable> */}

          <View
            style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
          >
            <Text style={{ fontSize: 14, marginRight: 2, color: "grey" }}>
              Dont have an account? Register
            </Text>
            <Link href={"/register"} style={{ color: "#eecc6a", fontSize: 14 }}>
              here
            </Link>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
