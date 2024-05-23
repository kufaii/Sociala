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
  pressVote: {
    width: 300,
    height: 40,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eecc6a",
    marginTop: 5,
    borderRadius: 5,
  },
  addPost: {
    width: 80,
    height: 55,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    position: "absolute",
    marginLeft: 70,
    marginBottom: 0,
    bottom: 20,
    right: -160,
  },
  uploadPost: {
    width: 150,
    height: 40,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
  },
});

export default styles;
