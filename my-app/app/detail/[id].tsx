import { Dimensions, StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect, useRef, useState, useMemo } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import CustomMarker from "../../components/customMarker";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import axios from "@/instance";
import { AuthProperty } from "@/AuthProvider";
import Icon from "react-native-vector-icons/FontAwesome5";

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

  const [isAccept, setIsAccept] = useState(false);
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
        <View style={styles.detailContent}>
          <Text style={styles.header}>{missionDetail?.name}</Text>
          <Text style={styles.descriptionTitle}>Description:</Text>
          <Text style={styles.descriptionText}>
            {missionDetail.description}
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <View>
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
            <Pressable style={styles.buttonContainer} onPress={focusOnLocation}>
              <Text>See detail location</Text>
            </Pressable>
          </View>
          <View style={styles.uploadButton}>
            <Pressable
              onPress={() => handleUpload("camera")}
              style={styles.iconContainer}
            >
              <Icon name="camera" size={30} />
            </Pressable>
            <Text style={styles.uploadText}>Take Photo</Text>
          </View>
          <View style={styles.uploadButton2}>
            <Pressable
              onPress={() => handleUpload("library")}
              style={styles.iconContainer}
            >
              <Icon name="archive" size={30} />
            </Pressable>
            <Text style={styles.uploadText}>Choose Photo</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16161a",
    paddingVertical: 20,
  },
  content: {
    flex: 1,
    width: "90%",
    height: "90%",
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    alignSelf: "center",
  },
  detailContent: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detailsContainer: { flex: 1, gap: 8 },
  descriptionTitle: { fontSize: 16, fontWeight: "500" },
  descriptionText: { fontSize: 16 },
  title: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 5,
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
  buttonContainer: {
    marginTop: 10,
    width: "100%",
    height: 30,
    backgroundColor: "#eecc6a",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  uploadButtonsContainer: {
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -100 }],
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
  },
  uploadButton: {
    width: 100,
    height: 80,
    justifyContent: "space-between",
    alignItems: "center",
    bottom: 30,
    right: 20,
    position: "absolute",
    paddingVertical: 15,
  },
  uploadButton2: {
    width: 100,
    height: 80,
    justifyContent: "space-between",
    alignItems: "center",
    bottom: 30,
    left: 20,
    position: "absolute",
    paddingVertical: 15,
  },
  uploadText: {
    color: "black",
    fontWeight: "500",
    position: "relative",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 60,
    backgroundColor: "#eecc6a",
    borderRadius: 60,
  },
  uploadedImage: {
    width: "100%",
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});
