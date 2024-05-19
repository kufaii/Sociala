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
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ justifyContent: "space-between" }}>
              <View>
                <Text> Leader Board </Text>
              </View>
              <View>
                <ProfileStandings />
                <ProfileStandings />
                <ProfileStandings />
              </View>
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
            }}
          >
            <ProfileStandings />
            <ProfileStandings />
            <ProfileStandings />
            <ProfileStandings />
            <ProfileStandings />
            <ProfileStandings />
            <ProfileStandings />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
