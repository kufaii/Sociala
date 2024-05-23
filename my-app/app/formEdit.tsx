import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Alert,
  Dimensions,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "@/instance";
import { AuthProperty } from "@/AuthProvider";
import { router } from "expo-router";

const { height, width } = Dimensions.get("window");

export default function UpdateProfile() {
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const { access_token } = AuthProperty();

  const pickImage = async (setImage) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("description", description);

    if (photo) {
      let localUri = photo;
      let filename = localUri.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      formData.append("photo", { uri: localUri, name: filename, type });
    }

    if (thumbnail) {
      let localUri = thumbnail;
      let filename = localUri.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      formData.append("thumbnail", { uri: localUri, name: filename, type });
    }
    console.log(formData, "<< form datanya");
    try {
      const response = await axios.patch("/user/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: access_token, // Sesuaikan dengan token autentikasi Anda
        },
      });
      console.log(response, "< === response");
      alert("Success", response.data.message);
      router.replace("/profile");
    } catch (error) {
      console.log(error.response?.data, "< error");
      alert("Error", error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description..."
          placeholderTextColor="#888"
        />
        <Text style={styles.label}>Photo</Text>
        {photo && <Image source={{ uri: photo }} style={styles.image} />}

        <Pressable
          style={styles.buttonContainer}
          onPress={() => pickImage(setPhoto)}
        >
          <Text>Pick photo</Text>
        </Pressable>
        <Text style={styles.label}>Thumbnail</Text>
        {thumbnail && (
          <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
        )}
        <Pressable
          style={styles.buttonContainer}
          onPress={() => pickImage(setThumbnail)}
        >
          <Text>Pick thumbnail</Text>
        </Pressable>
      </View>
      <Pressable
        style={styles.submitButtonContainer}
        onPress={() => handleSubmit()}
      >
        <Text>Save</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#ffffff", // Light blue background
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 30,
    justifyContent: "center",
    backgroundColor: "#ffffff", // Light blue background
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 76,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#f5f5f5",
  },
  imagePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  buttonContainer: {
    marginHorizontal: 5,
    marginBottom: 10,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#90caf9",
  },
  thumbnail: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#90caf9", // Light blue border
  },
  submitButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -100 }],
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    borderRadius: 5,
    backgroundColor: "#eecc6a", // Blue button background
  },
});
