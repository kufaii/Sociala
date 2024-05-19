import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
    // borderRadius: 10,
    // backgroundColor: "#eecc6a",
  },
  input: {
    borderRadius: 30,
    borderColor: "#eecc6a",
    borderWidth: 2,
    height: 40,

    paddingLeft: 20,
    marginTop: 5,
    backgroundColor: "white",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingBottom: 1,
  },
  standingView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  standingImage: {
    width: 40,
    height: 40,
    alignItems: "center",
  },
});

export default styles;
