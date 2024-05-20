import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "@/style";
import ProfileStandings from "@/components/ProfileStanding";

export default function standing() {
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
              flex: 1,
              // backgroundColor: "gray",
              borderRadius: 25,
              borderColor: "#eecc6a",
              borderWidth: 2,
              marginBottom: 10,
              justifyContent: "space-evenly",
              alignItems: "center",
              // marginRight:50
              // alignContent:"center"
              // alignSelf:"center"
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "700" }}>
              -- Leader Board --
            </Text>

            {/* ----------- Ini yang top 3 ----------- */}

            <View style={styles.standingView}>
              <Image
                source={require("../assets/images/1st.png")}
                style={styles.stadingImage}
              />
              <ProfileStandings />
            </View>

            <View style={styles.standingView}>
              <Image
                source={require("../assets/images/2nd.png")}
                style={styles.stadingImage}
              />
              <ProfileStandings />
            </View>

            <View style={styles.standingView}>
              <Image
                source={require("../assets/images/3rd.png")}
                style={styles.stadingImage}
              />
              <ProfileStandings />
            </View>

            {/* ----------- Ini yang top 3 -----------*/}
          </View>
          <View
            style={{
              flex: 2,
              // backgroundColor: "gray",
              borderRadius: 25,
              borderColor: "#eecc6a",
              borderWidth: 2,
              marginBottom: 10,
              justifyContent: "space-evenly",
              alignItems: "center",
              gap:10
            }}
          >
            {/* ----------- ini yang top 7 ----------- */}
            <View style={styles.standingView}>
              <Image
                source={require("../assets/images/4th.png")}
                style={styles.stadingImage}
              />
              <ProfileStandings />
            </View>
            <View style={styles.standingView}>
              <Image
                source={require("../assets/images/4th.png")}
                style={styles.stadingImage}
              />
              <ProfileStandings />
            </View>
            <View style={styles.standingView}>
              <Image
                source={require("../assets/images/4th.png")}
                style={styles.stadingImage}
              />
              <ProfileStandings />
            </View>
            <View style={styles.standingView}>
              <Image
                source={require("../assets/images/4th.png")}
                style={styles.stadingImage}
              />
              <ProfileStandings />
            </View>
            <View style={styles.standingView}>
              <Image
                source={require("../assets/images/4th.png")}
                style={styles.stadingImage}
              />
              <ProfileStandings />
            </View>
            <View style={styles.standingView}>
              <Image
                source={require("../assets/images/4th.png")}
                style={styles.stadingImage}
              />
              <ProfileStandings />
            </View>
            <View style={styles.standingView}>
              <Image
                source={require("../assets/images/4th.png")}
                style={styles.stadingImage}
              />
              <ProfileStandings />
            </View>
            {/* ----------- ini yang top 7 ----------- */}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
