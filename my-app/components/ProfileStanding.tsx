import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

interface ProfileStandingsProps {
  username: string;
  point: number;
  photo: string;
}

const defaultImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT00veDW-SlpBDqu7izpkCncMtChzPsamUqwA&usqp=CAU"; // Replace with your default image URL

// const truncate = (str: string, maxLength: number) => {
//   return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
// >> {truncate(username, 8)} ; user
// >> {truncate(`Points ${point}`, 8)}
// };

export default function ProfileStandings({
  username,
  point,
  photo,
}: ProfileStandingsProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: photo || defaultImage }}
        style={[styles.image, { alignContent: "center" }]}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.text, { textDecorationLine: "underline" }]}>
          {username}
        </Text>
        <Text style={[styles.text, { fontSize: 12 }]}>points {point}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    padding: 20,
    marginLeft: 50,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 40,
    // justifyContent: "flex-start",
  },
  textContainer: {
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
    marginLeft: 5,
  },
});
