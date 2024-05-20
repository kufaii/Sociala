import { View, Image, Text } from "react-native";

View;

export default function ProfileStandings() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-evenly",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
      }}
    >
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1713528199169-9488eb2d2b79?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          borderWidth: 2,
          // borderColor: "red",
          // position: "relative",
          padding: 20,
        }}
      />
      <Text>saya si nomor 1</Text>
      <Text>Level 99 </Text>
    </View>
  );
}
