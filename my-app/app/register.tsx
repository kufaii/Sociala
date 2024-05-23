import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  Image,
  Pressable,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "@/style";
import { useState } from "react";
import { Link, router } from "expo-router";

export default function Register() {
  const navigation = useNavigation();
  const [personalDetail, setPersonalDetail] = useState({
    name: "",
    email: "",
    username: "",
    phoneNumber: "",
    password: "",
    category: "",
  });

  const pressButton = () => {
    // console.log("Ketekan juga");
    router.push({
      pathname: "survey",
      params: { ...personalDetail },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContent}>
        <View
          style={{
            flex: 1,
            padding: 10,
          }}
        >
          <View
            style={{
              flex: 3,
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/images/tulisan.png")}
              style={{ width: 300, height: 200, resizeMode: "contain" }}
            />
          </View>

          <View style={{ flex: 3 }}>
            <TextInput
              style={[styles.input, { width: "100%" }]}
              placeholder="Name"
              value={personalDetail.name}
              onChangeText={(el) =>
                setPersonalDetail({ ...personalDetail, name: el })
              }
            />
            <TextInput
              style={[styles.input, { width: "100%" }]}
              placeholder="Email"
              value={personalDetail.email}
              onChangeText={(el) =>
                setPersonalDetail({ ...personalDetail, email: el })
              }
            />
            <TextInput
              style={[styles.input, { width: "100%" }]}
              placeholder="Phone number"
              value={personalDetail.phoneNumber}
              onChangeText={(el) =>
                setPersonalDetail({ ...personalDetail, phoneNumber: el })
              }
            />
            <TextInput
              style={[styles.input, { width: "100%" }]}
              placeholder="Username"
              value={personalDetail.username}
              onChangeText={(el) =>
                setPersonalDetail({ ...personalDetail, username: el })
              }
            />
            <TextInput
              style={[styles.input, { width: "100%", marginBottom: 20 }]}
              placeholder="Password"
              value={personalDetail.password}
              onChangeText={(el) =>
                setPersonalDetail({ ...personalDetail, password: el })
              }
              secureTextEntry={true}
            />

            <Pressable onPress={pressButton}>
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
                <Text> Register </Text>
              </View>
            </Pressable>
          </View>

          <View
            style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
          >
            <Text style={{ fontSize: 14, marginRight: 2, color: "grey" }}>
              Already have an account? Login
            </Text>
            <Link href={"/login"} style={{ color: "#eecc6a", fontSize: 14 }}>
              here
            </Link>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
