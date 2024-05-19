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
              borderWidth: 3,
              marginBottom: 10,
              justifyContent: "space-evenly",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "800" }}>
              -- Leader Board --
            </Text>
            <View style={styles.standingView}>
              <Image
                source={require("../assets/images/1st.png")}
                style={styles.standingImage}
              />
              <ProfileStandings />
            </View>
            <View style={styles.standingView}>
              <Image
                source={require("../assets/images/2nd.png")}
                style={styles.standingImage}
              />
              <ProfileStandings />
            </View>
            <View style={styles.standingView}>
              <Image
                source={require("../assets/images/3rd.png")}
                style={styles.standingImage}
              />
              <ProfileStandings />
            </View>
          </View>
          <View
            style={{
              flex: 2,
              // backgroundColor: "gray",
              borderRadius: 25,
              borderColor: "#eecc6a",
              borderWidth: 3,
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
              gap:10
            }}
          >
            <View style={styles.standingView}>
              <Image
                source={require("../assets/images/4th.png")}
                style={styles.standingImage}
              />
              <ProfileStandings />
            </View>
            <View style={styles.standingView}>
              <Image
                source={require("../assets/images/4th.png")}
                style={styles.standingImage}
              />
              <ProfileStandings />
            </View>
            <View style={styles.standingView}>
              <Image
                source={require("../assets/images/4th.png")}
                style={styles.standingImage}
              />
              <ProfileStandings />
            </View>
            <View style={styles.standingView}>
              <Image
                source={require("../assets/images/4th.png")}
                style={styles.standingImage}
              />
              <ProfileStandings />
            </View>
            <View style={styles.standingView}>
              <Image
                source={require("../assets/images/4th.png")}
                style={styles.standingImage}
              />
              <ProfileStandings />
            </View>
            <View style={styles.standingView}>
              <Image
                source={require("../assets/images/4th.png")}
                style={styles.standingImage}
              />
              <ProfileStandings />
            </View>
            <View style={styles.standingView}>
              <Image
                source={require("../assets/images/4th.png")}
                style={styles.standingImage}
              />
              <ProfileStandings />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
