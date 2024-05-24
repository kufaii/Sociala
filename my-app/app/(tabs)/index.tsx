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

const separatorW = () => <View style={{ width: 10 }}></View>;

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
  const { access_token, detailUser } = AuthProperty();
  const [userData, setUserData] = useState<UserData>();
  const { handleSetDetail } = AuthProperty();
  const [userMission, setUserMission] = useState<Missions | null>(null);
  const [socialMission, setSocialMission] = useState([]);


  const dataUser = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "/user/my-profile",
        headers: {
          authorization: access_token,
        },
      });

      const resSocial = await axios({
        method: "GET",
        url: "/social/mission",
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
      setSocialMission(resSocial.data);
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
          <Image
            source={require("../../assets/images/logo-doang.png")}
            style={{ height: 32, width: 20 }}
          />
        </View>
        <View style={{ paddingHorizontal: 30 }}>
          <Text style={styles.mainSectionTitle}>
            Here's daily mission for you:
          </Text>
          <View style={styles.mainMissionCard}>
            <Link href={"/detail/" + userMission?._id}>
              <Text style={styles.missionName}>
                {userMission?.name
                  ? userMission?.name
                  : "Yay! you already finished all mission"}
              </Text>
            </Link>
            <Text
              style={{
                textAlign: "right",
                marginTop: 10,
                fontWeight: "500",
                color: "#ffffff",
              }}
            >
              {userMission?.point ? `+ ${userMission?.point}` : ""}
            </Text>
          </View>
        </View>
        <View style={{ paddingTop: 20, paddingHorizontal: 10 }}>
          <Text style={styles.sectionTitle}>Sosial mission for you :</Text>
          <FlatList
            data={socialMission}
            horizontal
            renderItem={({ item }) => (
              <Link href={"/detailSocial/" + item?._id}>
                <View style={styles.missionCard}>
                  <Image
                    source={{
                      uri:
                        item.thumbnail ||
                        "https://i.pinimg.com/564x/b2/ce/77/b2ce77463fa02f88282b5b59d34db30f.jpg",
                    }}
                    style={styles.missionImage}
                  />
                  <View style={styles.missionInfo}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 20,
                      }}
                    >
                      <Text style={styles.locationText}>{item.city}</Text>
                      <Text style={styles.poinText}>+{item.point}</Text>
                    </View>
                    <Text style={styles.missionName}>{item.name}</Text>
                  </View>
                  <Text
                    style={{
                      marginVertical: 5,
                      paddingHorizontal: 30,
                    }}
                  >
                    Participant:
                  </Text>
                  <View style={{ paddingHorizontal: 30, flexDirection: "row", gap: 5 }}>
                    {item.participants?.length ? (
                      item.participants?.map((el) => (
                        <Image
                          source={{
                            uri: el.photo,
                          }}
                          style={{ width: 40, height: 40, borderRadius: 20 }}
                        />
                      ))
                    ) : (
                      <Text style={{ fontWeight: "600", fontStyle: "italic" }}>
                        Be the first to join!
                      </Text>
                    )}
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
    alignItems: "center",
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
    height: 355,
    width: width - 40,
    // borderBottomRightRadius: 20,
    // borderBottomLeftRadius: 20,
    borderRadius: 20,
    backgroundColor: "#eecc6a",
  },
  missionImage: {
    width: "100%",
    height: "55%",
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
    width: 30,
    height: 30,
    backgroundColor: "grey",
    borderRadius: 10,
  },
});
