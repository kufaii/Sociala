import axios from '@/instance';
import { View, Text, SafeAreaView, StyleSheet, FlatList, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const SeparatorW = () => <View style={{ width: 10 }} />;
const SeparatorH = () => <View style={{ height: 10 }} />;

const missions = [
    { id: 1, title: "Makan sambil kayang", points: 200 },
    { id: 2, title: "Berlari di atas air", points: 150 },
    { id: 3, title: "Mendaki pohon beringin", points: 300 },
    { id: 4, title: "Makan sambil kayang", points: 200 },
    { id: 5, title: "Berlari di atas air", points: 150 },
    { id: 6, title: "Mendaki pohon beringin", points: 300 },
    { id: 7, title: "Menari di tengah jalan", points: 180 },
    { id: 8, title: "Mendaki pohon beringin", points: 300 },
    { id: 8, title: "Makan sambil kayang", points: 200 },
    { id: 9, title: "Menari di tengah jalan", points: 180 },
    { id: 10, title: "Menari di tengah jalan", points: 180 },
];

const fetchMision = async () => {
    try {
        const {data} = await axios({})
    } catch (error) {
        console.log(error, "Error fetchMission")
    }
}

export default function Admin() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            <View>
                <Text style={{ fontSize: 50, marginBottom: 5 }}>Mission to accept</Text>
                {/* <View style={{ height: height / 1.6 }}> */}
                <View style={{ height: height / 1.6 }}>
                    <FlatList
                        data={missions}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={{ fontSize: 42 }}>{item.title}</Text>
                                    <View style={styles.pointsContainer}>
                                        <Text style={{ fontSize: 15, color: '#fff' }}>
                                            +{item.points}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ width: "100%", gap: 4, marginVertical: 8 }}>
                                    <Text style={styles.participantsTitle}>All Participants</Text>
                                    <FlatList
                                        data={[...Array(3)]}
                                        horizontal={true}
                                        renderItem={({ item }) => (
                                            <View style={styles.participant}>
                                                <View style={styles.participantAvatar} />
                                                <Text style={styles.participantName}>User 1</Text>
                                            </View>
                                        )}
                                        ItemSeparatorComponent={SeparatorW}
                                        showsHorizontalScrollIndicator={false}
                                        decelerationRate="fast"
                                    />
                                </View>
                                <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", height: 42 }}>
                                    <View style={styles.detailButton}>
                                        <Text style={{ fontSize: 24, color: '#333' }}>
                                            See detail
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: "row", gap: 5 }}>
                                        <View style={styles.actionButtonRed}>
                                            <Text style={{ fontSize: 24, color: '#333' }}>
                                                X
                                            </Text>
                                        </View>
                                        <View style={styles.actionButtonBlue}>
                                            <Text style={{ fontSize: 24, color: '#333' }}>
                                                Y
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                        ItemSeparatorComponent={SeparatorH}
                        showsVerticalScrollIndicator={false}
                        decelerationRate="fast"
                    />
                </View>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        backgroundColor: "#3ee",
    },
    title: {
        fontSize: 80,
        fontWeight: 'bold',
        textAlign: "center",
    },
    card: {
        height: 242,
        backgroundColor: '#eea',
        borderRadius: 20,
        padding: 12,
        justifyContent: "space-between",
    },
    pointsContainer: {
        backgroundColor: '#f25f4c',
        padding: 4,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
    },
    participantsTitle: {
        fontSize: 32,
        fontWeight: "bold",
        color: 'white',
    },
    participant: {
        width: 80,
        height: 80,
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
    },
    participantAvatar: {
        width: 40,
        height: 40,
        backgroundColor: "blue",
        borderRadius: 50,
    },
    participantName: {
        fontWeight: "bold",
        fontSize: 20,
    },
    detailButton: {
        backgroundColor: 'yellow',
        padding: 6,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
    },
    actionButtonRed: {
        backgroundColor: 'red',
        padding: 4,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
    },
    actionButtonBlue: {
        backgroundColor: 'blue',
        padding: 4,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
    },
});
