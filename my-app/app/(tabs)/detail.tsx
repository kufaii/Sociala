import { Button, Dimensions, StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import CustomMarker from '../../components/customMarker';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get("window");

const users = [
    { name: "yo" },
    { name: "yo" },
    { name: "yo" },
    { name: "yo" },
];

const Separator = () => <View style={styles.separator} />;

export default function Map() {
    const initialLocation = { latitude: 37.78825, longitude: -122.4324 };
    const [myLocation, setMyLocation] = useState(initialLocation);
    const [pin, setPin] = useState({});
    const [region, setRegion] = useState({
        latitude: initialLocation.latitude,
        longitude: initialLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const mapRef = useRef(null);

    const local = { latitude: "37.78825", longitude: "-122.4324" };

    useEffect(() => {
        setPin(local);
        _getLocation();
    }, []);

    const _getLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                console.warn('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setMyLocation(location.coords);
        } catch (err) {
            console.warn(err);
        }
    };

    const focusOnLocation = () => {
        if (myLocation.latitude && myLocation.longitude) {
            const newRegion = {
                latitude: parseFloat(myLocation.latitude),
                longitude: parseFloat(myLocation.longitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            };
            if (mapRef.current) {
                mapRef.current.animateToRegion(newRegion, 1000);
            }
        }
    };

    const memoizedCustomMarker = useMemo(() => (
        myLocation.latitude && myLocation.longitude && (
            <CustomMarker
                coordinate={{
                    latitude: myLocation.latitude,
                    longitude: myLocation.longitude
                }}
                title='My current location'
                image={require('../../assets/images/partial-react-logo.png')}
            />
        )
    ), [myLocation]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.header}>Mision X</Text>
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
                <View style={styles.detailsContainer}>
                    <View>
                        <Text style={styles.descriptionTitle}>Description</Text>
                        <Text style={styles.descriptionText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, doloremque ipsum dolor sit amet consectetur adipisicing elit. Adipisci, doloremque?</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Location</Text>
                        <View style={styles.mapContainer}>
                            <MapView
                                style={styles.map}
                                region={region}
                                onRegionChangeComplete={setRegion}
                                ref={mapRef}
                                provider='google'
                            >
                                {myLocation.latitude && myLocation.longitude &&
                                    <Marker
                                        coordinate={{
                                            latitude: myLocation.latitude,
                                            longitude: myLocation.longitude
                                        }}
                                        title='My current location'
                                        description='I am here'
                                    />
                                }
                                {memoizedCustomMarker}
                                {pin.latitude && pin.longitude &&
                                    <Marker
                                        coordinate={{
                                            latitude: parseFloat(pin.latitude),
                                            longitude: parseFloat(pin.longitude)
                                        }}
                                        title='Default location'
                                        description='I am here'
                                    />
                                }
                            </MapView>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title='See detail location' onPress={focusOnLocation} />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#16161a',
        padding: 8,
    },
    content: {
        flex: 1,
        width: '90%',
        backgroundColor: "blue",
        alignSelf: 'center',
    },
    header: {
        textAlign: "center",
        fontSize: 75,
        fontWeight: "bold",
        color: 'white',
    },
    participantsContainer: {
        height: 150,
        marginVertical: 10,
    },
    participantsTitle: {
        fontSize: 25,
        fontWeight: "bold",
        color: 'white',
    },
    participantCard: {
        width: 100,
        height: 100,
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
    },
    participantAvatar: {
        width: 50,
        height: 50,
        backgroundColor: "blue",
        borderRadius: 50,
    },
    participantName: {
        fontWeight: "bold",
        fontSize: 20,
    },
    separator: {
        width: 10,
    },
    detailsContainer: {
        flex: 1,
        gap: 8,
    },
    descriptionTitle: {
        fontSize: 45,
        fontWeight: "bold",
        color: "white",
    },
    descriptionText: {
        fontSize: 20,
        color: 'white',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: "white",
        textAlign: "center",
        marginBottom: 16,
    },
    mapContainer: {
        height: 250,
        width: '100%',
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#ddd',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    buttonContainer: {
        marginTop: 20,
        width: '100%',
    },
});
