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
import { Link } from "expo-router";

export default function Register() {
  const navigation = useNavigation();

  const registerHandler = () => {
    // insertOne{{user}}
  };

  const pressButton = () => {
    // console.log("Ketekan juga");
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
              placeholder="Name"
            />
            <TextInput
              style={[styles.input, { width: "100%" }]}
              placeholder="Email"
            />
            <TextInput
              style={[styles.input, { width: "100%" }]}
              placeholder="Phone number"
            />
            <TextInput
              style={[styles.input, { width: "100%" }]}
              placeholder="Username"
            />
            <TextInput
              style={[styles.input, { width: "100%", marginBottom: 20 }]}
              placeholder="Password"
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
                <Text> Register </Text>
              </View>
            </Pressable>
          </View>

          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ marginTop: 5, marginBottom: 5 }}>
              You have already have account?
              <Link
                href={"/login"}
                style={{ color: "blue", fontSize: 16 }}
              >
                Login
              </Link>
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
