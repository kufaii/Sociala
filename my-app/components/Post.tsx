import styles from "@/style";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  Pressable,
  FlatList,
} from "react-native";

export default function Post() {
  //props > loop
  return (
    <View>
      <Image
        source={{
          uri: "https://images.tokopedia.net/blog-tokopedia-com/uploads/2021/04/film-action.jpg",
        }}
        style={{
          width: 300,
          height: 150,
          justifyContent: "center",
          marginTop: 20,
          borderRadius: 10,
        }}
      />
      <Pressable>
        <View style={styles.pressVote}>
          <Text>Vote</Text>
        </View>
      </Pressable>
    </View>
  );
}
