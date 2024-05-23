import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "@/instance";

interface StandingData {
  username: string;
  point: number;
  photo: string;
}
const defaultImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT00veDW-SlpBDqu7izpkCncMtChzPsamUqwA&usqp=CAU";

export default function Standing() {
  const [rank, setRank] = useState<StandingData[]>([]);

  const fetch = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "/rank-user/",
      });
      setRank(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        overScrollMode="never"
      >
        <View style={styles.leaderboardContainer}>
          <Text style={styles.leaderboardTitle}>Leaderboards</Text>

          <View style={styles.top3Container}>
            {rank.slice(0, 3).map((el, index) => (
              <View key={index} style={styles.standingViewTop3}>
                <Image
                  source={
                    index === 0
                      ? require("../../assets/images/1st.png")
                      : index === 1
                      ? require("../../assets/images/2nd.png")
                      : require("../../assets/images/3rd.png")
                  }
                  style={styles.standingImageTop3}
                />
                <View style={styles.containerCard}>
                  <Image
                    source={{ uri: el.photo || defaultImage }}
                    style={styles.imageTop3}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.usernameTop3}>@{el.username}</Text>
                    <Text style={styles.pointsTop3}>{el.point} points</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.top7Container}>
            {rank.slice(3, 6).map((el, index) => (
              <View key={index + 3} style={styles.standingView}>
                <Image
                  source={require("../../assets/images/4th.png")}
                  style={styles.standingImage}
                />
                <View style={styles.containerCard}>
                  <Image
                    source={{ uri: el.photo || defaultImage }}
                    style={styles.image}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.username}>{el.username}</Text>
                    <Text style={styles.points}>points {el.point}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  leaderboardContainer: {
    flex: 1,
    alignItems: "center",
  },
  leaderboardTitle: {
    fontSize: 36,
    paddingTop: 40,
    fontWeight: "500",
    marginBottom: 30,
  },
  top3Container: {
    marginBottom: 20,
  },
  standingViewTop3: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#eecc6a",
    padding: 15,
    borderRadius: 10,
    width: "100%",
  },
  standingImageTop3: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  imageTop3: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#f5f5f5",
    marginRight: 10,
  },
  usernameTop3: {
    fontSize: 18,
    fontWeight: "600",
  },
  pointsTop3: {
    fontSize: 14,
    color: "#0f0f0f",
  },
  top7Container: {
    alignItems: "center",
    width: "100%",
  },
  standingView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 8,
    width: "100%",
  },
  standingImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ddd",
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  points: {
    fontSize: 14,
    color: "#666",
  },
  containerCard: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 10,
    width: "50%",
  },
});
