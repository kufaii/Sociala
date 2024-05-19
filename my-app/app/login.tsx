import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import styles from "@/style";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Link } from "expo-router";
import axios from "@/instance"; //sesuaikan link via ngrok
import { AuthProperty } from "@/AuthProvider";

interface Respons {
  data: { access_token: string }
}

export default function App() {
  const { handleLogin } = AuthProperty()

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  console.log(user, `<<<<<<<<<<`);

  const loginAction = async () => {
    try {// const { data }: Respons = await axios({
      //   method: "POST",
      //   url: "/login",
      //   data: user,
      // })
      console.log("masuk nihh")
      const { data }: Respons = await axios({
        url: "/login",
      })


      console.log(data, "< == login")

      handleLogin(`Bearer ${data.access_token}`)
    } catch (e) {
      console.log(e, "<")
    }
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

            <Pressable onPress={loginAction}>
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

          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ marginTop: 5, marginBottom: 5 }}>
              You have not account?
              <Link
                href={"/register"}
                style={{ color: "blue", fontSize: 16 }}
              >
                Register
              </Link>
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
