import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from "react-native";
import React, { useEffect, useRef, useState, useMemo } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import CustomMarker from "../../components/customMarker";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import axios from "@/instance";
import { AuthProperty } from "@/AuthProvider";

interface Location {
  latitude: number;
  longitude: number;
}

interface MissionDetail {
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
  participants: { userId: string; username: string }[];
}

const { width, height } = Dimensions.get("window");

const users = [{ name: "yo" }, { name: "yo" }, { name: "yo" }, { name: "yo" }];

const Separator = () => <View style={styles.separator} />;

export default function Map() {
  const { access_token } = AuthProperty();
  const { id } = useLocalSearchParams();

  const initialLocation = { latitude: -2.5, longitude: 118.0 };
  const [myLocation, setMyLocation] = useState<Location>(initialLocation);
  const [pin, setPin] = useState<Location | null>(null);
  const [missionDetail, setMissionDetail] = useState<MissionDetail>({});
  const [region, setRegion] = useState({
    latitude: initialLocation.latitude,
    longitude: initialLocation.longitude,
    latitudeDelta: 23.0,
    longitudeDelta: 46.0,
  });

  const mapRef = useRef<MapView>(null);

  const misionLocation = missionDetail.location;

  const fetchDetail = async () => {
    try {
      const { data } = await axios.get(`/mission/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: access_token,
        },
      });
      console.log("ini data>>>>> ", data);

      setMissionDetail(data[0]);

      if (data.location) {
        setPin({
          latitude: parseFloat(data.location.latitude),
          longitude: parseFloat(data.location.longitude),
        });
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const _getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.warn("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setMyLocation(location.coords);
    } catch (err) {
      console.warn(err);
    }
  };

  const focusOnLocation = () => {
    if (
      missionDetail.location?.latitude &&
      missionDetail.location?.longtitude
    ) {
      const newRegion = {
        latitude: parseFloat(missionDetail?.location?.latitude),
        longitude: parseFloat(missionDetail?.location?.longtitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 1000);
      }
    }
  };
  const handleUpload = async (source) => {
    try {
      let result;
      if (source === "camera") {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      }

      if (!result.cancelled) {
        const uri = result.assets[0].uri;

        // Membuat objek FormData
        const formData = new FormData();
        formData.append("image", {
          uri,
          type: "image/jpeg",
          name: "photo.jpg",
        });

        // Mengirimkan permintaan POST dengan Axios
        console.log(
          "ini id mission nya >>>.",
          missionDetail.DetailMission[0]._id
        );

        const { data } = await axios.post(
          `/mission/${missionDetail.DetailMission[0]._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: access_token,
            },
          }
        );

        console.log("Upload success:", data);
        alert("Upload Success", "File has been uploaded successfully.");
        router.replace("/");
      }
    } catch (error) {
      console.error(
        "Error uploading file:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to upload", "An error occurred while uploading the file.");
    }
  };

  useEffect(() => {
    fetchDetail();
    _getLocation();
  }, []);

  const memoizedCustomMarker = useMemo(
    () =>
      myLocation?.latitude &&
      myLocation?.longitude && (
        <CustomMarker
          coordinate={{
            latitude: myLocation.latitude,
            longitude: myLocation.longitude,
          }}
          title="My current location"
          image={require("../../assets/images/partial-react-logo.png")}
        />
      ),
    [myLocation]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>{missionDetail?.name}</Text>
        {missionDetail?.participants?.length > 1 && (
          <View style={styles.participantsContainer}>
            <Text style={styles.participantsTitle}>All Participants</Text>
            <FlatList
              data={users}
              horizontal
              renderItem={({ item }) => (
                <View style={styles.participantCard}>
                  <View style={styles.participantAvatar} />
                  <Text style={styles.participantName}>User 1</Text>
                </View>
              )}
              ItemSeparatorComponent={Separator}
              snapToInterval={width - 30}
              showsHorizontalScrollIndicator={false}
              decelerationRate="fast"
            />
          </View>
        )}
        <View style={styles.detailsContainer}>
          <View>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              {missionDetail.description}
            </Text>
          </View>
          <View>
            <Text style={styles.title}>Location</Text>
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={setRegion}
                ref={mapRef}
                provider={"google"}
              >
                {/* {myLocation?.latitude && myLocation?.longitude &&
                                    <Marker
                                        coordinate={{
                                            latitude: myLocation.latitude,
                                            longitude: myLocation.longitude
                                        }}
                                        title='My current location'
                                        description='I am here'
                                    />
                                } */}
                {memoizedCustomMarker}
                {missionDetail.location && (
                  <Marker
                    coordinate={{
                      latitude: parseFloat(misionLocation.latitude),
                      longitude: parseFloat(misionLocation.longtitude),
                    }}
                    title="Default location"
                    description="I am here"
                  />
                )}
                {/* {pin?.latitude && pin?.longitude &&
                                    (<Marker
                                        coordinate={{
                                            latitude: pin.latitude,
                                            longitude: pin.longitude
                                        }}
                                        title='Default location'
                                        description='I am here'
                                    />)
                                } */}
              </MapView>
            </View>
            <View style={styles.buttonContainer}>
              <Button title="See detail location" onPress={focusOnLocation} />
            </View>
          </View>
          <View style={styles.uploadButtonsContainer}>
            <Pressable
              style={styles.uploadButton}
              onPress={() => handleUpload("camera")}
            >
              <Text style={styles.uploadText}>Take Photo</Text>
            </Pressable>
            <Pressable
              style={styles.uploadButton}
              onPress={() => handleUpload("library")}
            >
              <Text style={styles.uploadText}>Choose Photo</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#16161a", padding: 8 },
  content: {
    flex: 1,
    width: "90%",
    backgroundColor: "blue",
    alignSelf: "center",
  },
  header: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  detailsContainer: { flex: 1, gap: 8 },
  descriptionTitle: { fontSize: 45, fontWeight: "bold", color: "white" },
  descriptionText: { fontSize: 20, color: "white" },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 16,
  },
  mapContainer: {
    height: 250,
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#ddd",
  },
  map: { ...StyleSheet.absoluteFillObject },
  buttonContainer: { marginTop: 20, width: "100%" },
  uploadButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  uploadButton: {
    backgroundColor: "yellow",
    borderRadius: 25,
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadText: { color: "black", fontWeight: "bold" },
  uploadedImage: {
    width: "100%",
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});
