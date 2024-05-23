import React, { useState } from "react";
import { View, Text, SafeAreaView, Pressable, FlatList } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Post from "@/components/Post";
import styles from "@/style";
import { useNavigation } from "@react-navigation/native";

export default function ListPost() {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // flat list sementara
  const [listPost, setListPost] = useState([]);

  const navigation = useNavigation();

  const toAddPost = () => {
    console.log(`gogogo`);

    navigation.navigate("add-post" as never);
  };

  const fetchPost = async () => {
    // const response = await axios("/")
    // set data
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          padding: 10,
          borderRadius: 25,
          borderWidth: 3,
          borderColor: "gray",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500", textAlign: "center" }}>
          List Post
        </Text>
        <View
          style={{
            flex: 1,
            borderRadius: 25,
            marginBottom: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FlatList
            data={data}
            renderItem={({ item }) => <Post key={item} />}
            keyExtractor={(item) => item.toString()}
          />
          <Pressable>
            <View style={styles.addPost}>
              <Text onPress={toAddPost}>Add Post</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
