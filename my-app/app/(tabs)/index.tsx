import { AuthProperty } from "@/AuthProvider";
import { Link } from "expo-router";
import {
  Image,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Dimensions,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "@/instance";

const { height, width } = Dimensions.get("window");

const DATA = [
  { name: "Misi 1", location: "JAKARTA", poin: 150 },
  { name: "Misi 2", location: "SURABAYA Broo", poin: 500 },
  { name: "Misi 3", location: "JAKARTA", poin: 250 },
  { name: "Misi 4", location: "SURABAYA", poin: 450 },
  { name: "Misi 5", location: "JAKARTA", poin: 350 },
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
      console.log(data[0].Missions.name, "Data ress");

      handleSetDetail(res.data);
      console.log(userMission, "< <misi usereerrrr");
    } catch (error) {
      console.log(error, "< +===");
      console.log(error.response.data, "< +===");
    }
  };

  useEffect(() => {
    dataUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Hello {detailUser?.username}</Text>
          <Text style={styles.cardSubtitle}>
            Lv.{detailUser?.poin ? detailUser.point / 100 : 0}
          </Text>
        </View>
        <View>
          <Text style={styles.sectionTitle}>Daily mission :</Text>
          <Link href={"/detail/" + userMission?._id} style={styles.missionCard}>
            <Image
              source={{
                uri: "https://i.pinimg.com/564x/b2/ce/77/b2ce77463fa02f88282b5b59d34db30f.jpg",
              }}
              style={styles.missionImage}
            />
            <View style={styles.missionInfo}>
              <View style={styles.locationContainer}>
                <Text style={styles.locationText}>{userMission?.city}</Text>
              </View>
              <Text style={styles.missionName}>{userMission?.name}</Text>
              <View style={styles.poinContainer}>
                <Text style={styles.poinText}>+{userMission?.point}</Text>
              </View>
            </View>
            <Text style={styles.missionDescription}>
              {userMission?.description}
            </Text>
          </Link>
        </View>
        <View>
          <Text style={styles.sectionTitle}>Sosial mission for you :</Text>
          <FlatList
            data={DATA}
            horizontal
            renderItem={({ item }) => (
              <View style={styles.missionCard}>
                <Image
                  source={{
                    uri: "https://i.pinimg.com/564x/b2/ce/77/b2ce77463fa02f88282b5b59d34db30f.jpg",
                  }}
                  style={styles.missionImage}
                />
                <View style={styles.missionInfo}>
                  <View style={styles.locationContainer}>
                    <Text style={styles.locationText}>{item.location}</Text>
                  </View>
                  <Text style={styles.missionName}>{item.name}</Text>
                  <View style={styles.poinContainer}>
                    <Text style={styles.poinText}>+{item.poin}</Text>
                  </View>
                </View>
                <Text style={styles.missionDescription}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s.
                </Text>
              </View>
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
<<<<<<< HEAD
    backgroundColor: "#333",
    padding: 8,
  },
  innerContainer: {
    height: "90%",
    borderRadius: 20,
    gap: 25,
    padding: 12,
=======
    paddingTop: 28,
>>>>>>> a1ef223 (style: change profile page style)
  },
  innerContainer: {},
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
    backgroundColor: "#ff8906",
    height: 200,
    borderRadius: 20,
    padding: 20,
    justifyContent: "space-between",
    borderWidth: 2,
  },
  cardTitle: {
    fontSize: 35,
  },
  cardSubtitle: {
    fontSize: 24,
  },
  sectionTitle: {
    fontSize: 35,
    marginBottom: 8,
    color: "#fffffe",
  },
  missionCard: {
    height: 200,
    width: width - 40,
    borderRadius: 20,
    padding: 5,
    borderWidth: 2,
    backgroundColor: "#ff8906",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  missionImage: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    position: "absolute",
  },
  missionInfo: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "space-between",
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
    fontSize: 35,
    color: "#fffffe",
    zIndex: 1,
    fontWeight: "bold",
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
    zIndex: 1,
    fontWeight: "bold",
  },
  separator: {
    width: 10,
  },
});
