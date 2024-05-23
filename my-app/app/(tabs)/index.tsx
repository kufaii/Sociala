import { AuthProperty } from "@/AuthProvider";
import { Link, useNavigation } from "expo-router";
import {
  Image,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Dimensions,
  FlatList,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "@/instance";

const { height, width } = Dimensions.get("window");

const DATA = [
  { name: "Begal Di Pasar Turi", location: "JAKARTA", poin: 150 },
  { name: "Clean Up the Beach", location: "SURABAYA", poin: 500 },
  { name: "Meditation in the Park", location: "JAKARTA", poin: 250 },
  { name: "Surabaya Food Crawl", location: "SURABAYA", poin: 450 },
  { name: "Street Art Tour", location: "JAKARTA", poin: 350 },
];

interface Location {
  latitude: string;
  longitude: string;
}

interface Missions {
  _id: string;
  name: string;
  description: string;
  point: number;
  location: Location;
  thumbnail: string;
  type: string;
  city: string;
  category: string;
  pointMin: number;
}

interface MissionItem {
  _id: string;
  status: string;
  missionId: string;
  userId: string;
  vote: number;
  Missions: Missions;
}

interface UserData {
  _id: string;
  name: string;
  location: string;
  username: string;
  category: string;
  description: string | null;
  phoneNumber: string;
  photo: string;
  point: number;
  thumbnail: string | null;
  onGoingMissions: MissionItem[];
}

const Separator = () => <View style={styles.separator} />;

export default function HomeScreen() {
  const { access_token } = AuthProperty();
  const [userData, setUserData] = useState<UserData>();
  const { handleSetDetail, detailUser } = AuthProperty();
  const [userMission, setUserMission] = useState<Missions | null>(null);

  // Pastikan detailUser tidak undefined
  // console.log(detailUser, "< == detail user");

  const dataUser = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "/user/my-profile",
        headers: {
          authorization: access_token,
        },
      });

      const { data } = await axios({
        url: "/mission/my-mission",
        headers: {
          authorization: access_token,
        },
      });

      setUserMission(data[0].Missions);

      handleSetDetail(res.data);
      console.log("ini res data", res.data);
    } catch (error) {
      console.log(error, "< +===");
      console.log(error.response.data, "< +===");
    }
  };

  useEffect(() => {
    dataUser();
  }, []);

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Hello {detailUser?.username}</Text>
          <Text style={{ fontSize: 30 }}>X</Text>
        </View>
        <View style={{ paddingHorizontal: 30 }}>
          <Text style={styles.mainSectionTitle}>
            Here's daily mission for you:
          </Text>
          <View style={styles.mainMissionCard}>
            <Link href={"/detail/" + userMission?._id}>
              <Text style={styles.missionName}>{userMission?.name}</Text>
            </Link>
            <Text
              style={{
                textAlign: "right",
                marginTop: 10,
                fontWeight: "500",
                color: "#ffffff",
              }}
            >
              +{userMission?.point}
            </Text>
          </View>
        </View>
        <View style={{ paddingTop: 30, paddingHorizontal: 10 }}>
          <Text style={styles.sectionTitle}>Sosial mission for you :</Text>
          <FlatList
            data={DATA}
            horizontal
            renderItem={({ item }) => (
              <Link href={"/detail/" + userMission?._id}>
                <View style={styles.missionCard}>
                  <Image
                    source={{
                      uri: "https://i.pinimg.com/564x/b2/ce/77/b2ce77463fa02f88282b5b59d34db30f.jpg",
                    }}
                    style={styles.missionImage}
                  />
                  <View style={styles.missionInfo}>
                    <View
                      style={{
                        paddingTop: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 20,
                      }}
                    >
                      <Text style={styles.locationText}>{item.location}</Text>
                      <Text style={styles.poinText}>+{item.poin}</Text>
                    </View>
                    <Text style={styles.missionName}>{item.name}</Text>
                  </View>
                  <Text
                    style={{
                      marginTop: 10,
                      marginBottom: 5,
                      paddingHorizontal: 30,
                    }}
                  >
                    Participant:
                  </Text>
                  <View style={styles.userContainer}>
                    <View style={styles.userBox} />
                    <View style={styles.userBox} />
                    <View style={styles.userBox} />
                  </View>
                </View>
              </Link>
            )}
            ItemSeparatorComponent={Separator}
            snapToInterval={width - 30}
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 28,
  },
  innerContainer: {
    paddingTop: 20,
  },
  header: {
    alignItems: "center",
  },
  headerText: {
    fontSize: 45,
    color: "#fffffe",
    fontWeight: "bold",
    textAlign: "center",
  },
  subHeaderText: {
    fontSize: 20,
    color: "#a7a9be",
    textAlign: "center",
  },
  card: {
    height: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderRadius: 10,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 30,
  },
  cardSubtitle: {
    fontSize: 23,
  },
  mainSectionTitle: {
    fontSize: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 26,
    marginBottom: 8,
  },
  mainMissionCard: {
    height: 125,
    width: "auto",
    borderRadius: 10,
    padding: 20,
    backgroundColor: "#eecc6a",
  },
  missionCard: {
    height: 430,
    width: width - 40,
    // borderBottomRightRadius: 20,
    // borderBottomLeftRadius: 20,
    borderRadius: 20,
    backgroundColor: "#eecc6a",
  },
  missionImage: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    resizeMode: "cover",
  },
  missionInfo: {
    width: "100%",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  locationContainer: {
    backgroundColor: "#f25f4c",
    padding: 8,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  locationText: {
    fontSize: 15,
    color: "#fff",
    zIndex: 1,
  },
  missionName: {
    fontSize: 20,
    fontWeight: "600",
    paddingHorizontal: 20,
  },
  poinContainer: {
    backgroundColor: "#f25f4c",
    padding: 8,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  poinText: {
    fontSize: 15,
    color: "#fff",
    zIndex: 1,
  },
  missionDescription: {
    fontSize: 24,
    textAlign: "center",
    paddingTop: 32,
    color: "#fffffe",
    fontWeight: "bold",
  },
  separator: {
    width: 10,
  },
  userContainer: {
    flexDirection: "row",
    paddingHorizontal: 30,
    gap: 10,
  },
  userBox: {
    width: 50,
    height: 50,
    backgroundColor: "grey",
    borderRadius: 10,
  },
});
