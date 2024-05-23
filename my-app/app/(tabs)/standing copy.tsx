import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions, FlatList } from "react-native";
// import styles from "@/style";

const { width, height } = Dimensions.get("window")
const Separator = () => <View style={{ height: 10 }} />;

export default function standings() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 52, textAlign: "center" }}>ladeboard</Text>
      <FlatList
        data={[...Array(10).keys()]}
        style={{ flex: 1 }}
        renderItem={({ item, index }) => (
          <View style={{
            backgroundColor: index < 3 ? "#ff8906" : "#ffc966",
            height: 120,
            borderRadius: 20,
            padding: 20,
            borderWidth: 2,
            flexDirection: "row",
            alignItems: "center"
          }}>
            {/* <Text style={{ fontSize: 40, fontWeight: "bold" }}>1st</Text> */}
            {index >= 3 && <Text style={{ fontSize: 30 }}>{index + 1 + "th"}</Text>}
            {index < 3 ? (
              <View style={{ position: "relative", alignItems: "center" }}>
                <Image source={{ uri: `https://i.pinimg.com/564x/a3/5d/6a/a35d6a94a5692a090ec9f49dba0480c5.jpg` }} style={{ height: 80, width: 80, borderRadius: 100 }} />
                <View style={{ backgroundColor: "yellow", justifyContent: "center", alignItems: "center", overflow: 'hidden', position: "absolute", top: 0, left: "50%", transform: [{ translateX: -22.5 }], borderRadius: 10, height: 20, width: 45 }}>
                  <Text style={{ fontSize: 20 }}>{index < 3 ? index + 1 + (index === 0 ? "st" : index === 1 ? "nd" : "rd") : index + 1 + "th"}
                  </Text>
                </View>
                <View style={{ height: 25, width: 40, borderRadius: 10, backgroundColor: "red", position: "absolute", bottom: 5, right: -5, justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ fontSize: 16, color: "white" }}>Lv. 20</Text>
                </View>
              </View>
            ) : null}
            <View style={{ marginLeft: 20 }}>
              <Text style={{ fontSize: 64 }}>Kenzy</Text>
            </View>
          </View>
        )
        }
        ItemSeparatorComponent={Separator}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    padding: 8,
  },
})