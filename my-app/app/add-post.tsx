import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "@/style";
import axios from "axios";

export default function addPost() {
  const [content, setContent] = React.useState("Write your content here");

  const [upload1, setUpload1] = useState();
  const [upload2, setUpload2] = useState();

  const [post, setPost] = useState({
    image: "",
    content: "",
  });

  const uploadHandler = async () => {
    // const upload = await axios()
  };


  const postHandler = async () => {
    // const post = await axios()
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContent}>
        <View
          style={{
            flex: 1,
            padding: 10,
            // borderRadius: 25,
            // borderWidth: 3,
            // borderColor: "gray",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Text> -- ADD NEW POST -- </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 20,
              marginTop: 10,
              marginBottom: 40,
            }}
          >
            <View>
              <Image
                source={{
                  uri: "https://st5.depositphotos.com/1007566/66365/v/380/depositphotos_663653258-stock-illustration-pink-flower-illustration-design-white.jpg",
                }}
                style={{ width: 150, height: 150, borderRadius: 10 }}
              />
              <Pressable>
                <View style={styles.uploadPost}>
                  <Text style={{ textAlign: "center" }}> Upload </Text>
                </View>
              </Pressable>
            </View>
            <View>
              <Image
                source={require("../assets/images/blank-image.jpg")}
                style={{ width: 150, height: 150, borderRadius: 10 }}
              />
              <Pressable>
                <View style={styles.uploadPost}>
                  <Text style={{ textAlign: "center" }}>Upload</Text>
                </View>
              </Pressable>
            </View>
          </View>

          <Text
            style={{ textAlign: "center", textDecorationLine: "underline" }}
          >
            Description
          </Text>

          <View
            style={{
              // backgroundColor: value,
              //   borderBottomColor: "#000000",
              //   borderBottomWidth: 1,
              borderColor: "gray",
              borderWidth: 2,
              borderRadius: 10,
              width: 320,
              height: 200,
            }}
          >
            <TextInput
              textAlign="center"
              editable
              multiline
              numberOfLines={4}
              maxLength={256}
              onChangeText={(text) => setContent(text)}
              value={content}
              style={{ padding: 10 }}
            />
          </View>
          <Pressable>
            <View
              style={[
                styles.uploadPost,
                { width: 300, backgroundColor: "#eecc6a" },
              ]}
            >
              <Text style={{ textAlign: "center" }}> Submit </Text>
            </View>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

