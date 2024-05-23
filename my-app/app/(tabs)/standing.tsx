import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ProfileStandings from "@/components/ProfileStanding";
import styles from "@/style"; // Assuming this has some global styles you want to use
import axios from "@/instance";

interface StandingData {
  // rank: number;
  username: string;
  point: number;
  photo: string;
}

export default function Standing() {
  const [rank, setRank] = useState<StandingData[]>([]);

  const fetch = async () => {
    console.log(`sebelum fetch <<<`);

    try {
      const response = await axios({
        method: "GET",
        url: "/rank-user/",
      });
      // console.log(response.data, `<<< ressss`);
      // console.log(response, `<<< yang response`);

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
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContent}>
        <View style={localStyles.leaderboardContainer}>
          <View style={localStyles.top3Container}>
            <Text style={localStyles.leaderboardTitle}>-- Leader Board --</Text>
            {rank.slice(0, 3).map((el, index) => (
              <View key={index} style={styles.standingView}>
                {index === 0 && (
                  <Image
                    source={require("../../assets/images/1st.png")}
                    style={styles.stadingImage}
                  />
                )}
                {index === 1 && (
                  <Image
                    source={require("../../assets/images/2nd.png")}
                    style={styles.stadingImage}
                  />
                )}
                {index === 2 && (
                  <Image
                    source={require("../../assets/images/3rd.png")}
                    style={styles.stadingImage}
                  />
                )}
                <ProfileStandings
                  username={el.username}
                  point={el.point}
                  photo={el.photo}
                />
              </View>
            ))}
          </View>
          <View style={localStyles.top7Container}>
            {rank.slice(3).map((el, index) => (
              <View key={index} style={styles.standingView}>
                {/* <Image
              source={{ uri: standing.image }}
              style={styles.stadingImage}
            /> */}
                <Image
                  source={require("../../assets/images/4th.png")}
                  style={styles.stadingImage}
                />
                <ProfileStandings
                  username={el.username}
                  point={el.point}
                  photo={el.photo}
                />
              </View>
            ))}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  leaderboardContainer: {
    flex: 1,
    padding: 10,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "gray",
    justifyContent: "center",
  },
  top3Container: {
    flex: 1,
    borderRadius: 25,
    borderColor: "#eecc6a",
    borderWidth: 2,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  leaderboardTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  top7Container: {
    flex: 2,
    borderRadius: 25,
    borderColor: "#eecc6a",
    borderWidth: 2,
    marginBottom: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
