import { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from '@/instance';
import { AuthProperty } from '@/AuthProvider';
import { router } from 'expo-router';

const { height, width } = Dimensions.get("window")

export default function UpdateProfile() {
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const { access_token } = AuthProperty()

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
        formData.append('description', description);

        if (photo) {
            let localUri = photo;
            let filename = localUri.split('/').pop();
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            formData.append('photo', { uri: localUri, name: filename, type });
        }

        if (thumbnail) {
            let localUri = thumbnail;
            let filename = localUri.split('/').pop();
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            formData.append('thumbnail', { uri: localUri, name: filename, type });
        }
        console.log(formData, "<< form datanya")
        try {
            const response = await axios.patch('/user/update-profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': access_token, // Sesuaikan dengan token autentikasi Anda
                },
            });
            console.log(response, "< === response")
            alert('Success', response.data.message);
            router.replace("/profile")
        } catch (error) {
            console.log(error.response?.data, "< error")
            alert('Error', error.response?.data?.message || 'Something went wrong');
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
                    placeholder="Enter description"
                    placeholderTextColor="#888"
                />
                <View style={styles.imagePickerContainer}>
                    <View style={styles.buttonContainer}>
                        <Button title="Pick Photo" onPress={() => pickImage(setPhoto)} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="Pick Thumbnail" onPress={() => pickImage(setThumbnail)} />
                    </View>
                </View>

                {photo && <Image source={{ uri: photo }} style={styles.image} />}
                {thumbnail && <Image source={{ uri: thumbnail }} style={styles.thumbnail} />}

                <View style={styles.buttonContainer}>
                    <Button title="Update Profile" onPress={handleSubmit} />
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        height,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#e3f2fd',  // Light blue background
    },
    form: {
        height: height / 2,
        width,
        padding: 20,
        justifyContent: "center",
        backgroundColor: '#fff',  // Light blue background
    },
    label: {
        fontSize: 42,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#1e88e5',  // Dark blue color for label
    },
    input: {
        height: 56,
        borderColor: '#90caf9',  // Light blue border
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#ffffff',  // White background
    },
    imagePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    buttonContainer: {
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#64b5f6',  // Blue button background
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#90caf9',  // Light blue border
    },
    thumbnail: {
        width: '100%',
        height: 100,
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#90caf9',  // Light blue border
    },
});