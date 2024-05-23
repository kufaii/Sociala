import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ProfileStandings from "@/components/ProfileStanding";
import styles from "@/style"; // Assuming this has some global styles you want to use
import axios from "axios";

interface StandingData {
  // rank: number;
  username: string;
  point: number;
  photo: string;
}

export default function Standing() {
  // const standingsData: StandingData[] = [
  //   {
  //     rank: 1,
  //     name: "Alice",
  //     level: 99,
  //     image:
  //       "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     rank: 2,
  //     name: "Bob",
  //     level: 95,
  //     image:
  //       "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     rank: 3,
  //     name: "Charlie",
  //     level: 90,
  //     image:
  //       "https://images.unsplash.com/photo-1502767089025-6572583495b0?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     rank: 4,
  //     name: "Dave",
  //     level: 85,
  //     image:
  //       "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     rank: 5,
  //     name: "Eve",
  //     level: 80,
  //     image:
  //       "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     rank: 6,
  //     name: "Frank",
  //     level: 75,
  //     image:
  //       "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     rank: 7,
  //     name: "Grace",
  //     level: 70,
  //     image:
  //       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     rank: 8,
  //     name: "Hank",
  //     level: 65,
  //     image:
  //       "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     rank: 9,
  //     name: "Ivy",
  //     level: 60,
  //     image:
  //       "https://images.unsplash.com/photo-1544725176-7c40e5a2e70f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     rank: 10,
  //     name: "Jack",
  //     level: 55,
  //     image:
  //       "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  // ];
  const [rank, setRank] = useState<StandingData[]>([]);

  const fetch = async () => {
    console.log(`sebelum fetch <<<`);

    try {
      const response = await axios({
        method: "GET",
        url: "https://b73b-114-79-23-184.ngrok-free.app/rank-user/",
      });
      // console.log(response.data, `<<< ressss`);
      // console.log(response, `<<< yang response`);

      setRank(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(rank, `<<<< rank`);

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
                    source={require("../assets/images/1st.png")}
                    style={styles.stadingImage}
                  />
                )}
                {index === 1 && (
                  <Image
                    source={require("../assets/images/2nd.png")}
                    style={styles.stadingImage}
                  />
                )}
                {index === 2 && (
                  <Image
                    source={require("../assets/images/3rd.png")}
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
                  source={require("../assets/images/4th.png")}
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
