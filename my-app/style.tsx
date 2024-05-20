import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    paddingTop: 28,
  },
  input: {
    borderRadius: 15,
    borderColor: "#eecc6a",
    borderWidth: 2,
    height: 50,

    paddingLeft: 20,
    marginTop: 5,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingBottom: 1,
  },
  stadingImage: {
    width: 30,
    height: 30,
    marginLeft: 5,
  },
  standingView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default styles;
