import { AuthProperty } from '@/AuthProvider';
import axios from '@/instance';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, SafeAreaView, Pressable, Dimensions, FlatList } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

export default function TabTwoScreen() {
  const { handleLogout } = AuthProperty();
  const { access_token } = AuthProperty();
  const [user, setUser] = useState({});
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/100');

  const emojisWithIcons = [
    { title: 'Adventure', icon: 'space-shuttle' },
    { title: 'Social', icon: 'users' },
    { title: 'Individu', icon: 'user' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text>{item.title}</Text>
    </View>
  );

  const fetchUser = async () => {
    try {
      console.log(access_token, "< === Access token");
      const { data } = await axios({
        url: "/user/my-profile",
        headers: {
          Authorization: access_token
        }
      });

      setUser(data);
      validateProfileImage(data.photo);
    } catch (error) {
      console.log(error, "Error =< >=");
    }
  };

  const validateProfileImage = (url) => {
    Image.prefetch(url)
      .then(() => {
        setProfileImage(url);
      })
      .catch(() => {
        setProfileImage('https://via.placeholder.com/100');
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "blue" }}>
      <View style={styles.headerImageContainer}>
        <Image
          source={{ uri: user.thumbnail || 'https://akcdn.detik.net.id/visual/2020/10/31/ebel_169.jpeg?w=900&q=90' }}
          style={styles.headerImage}
        />
        <Pressable style={styles.logoutButton} onPress={() => handleLogout()}>
          <IconM name="logout" style={styles.logoutIcon} />
        </Pressable>
      </View>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: profileImage }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.editProfileButton}>
          <Link href={"/formEdit"} style={styles.editProfilePressable}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </Link>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileUsername}>@{user.username}</Text>
          <Text style={styles.profileBio}>
            {user.description}
          </Text>
          <View style={styles.progressBarContainer}>
            <Image
              source={{
                uri: 'https://i.pinimg.com/564x/b2/ce/77/b2ce77463fa02f88282b5b59d34db30f.jpg',
              }}
              style={styles.progressBarImage}
            />
            <View style={styles.progressBarTextContainer}>
              <Text style={styles.progressBarTitle}>
                Progress bar
              </Text>
              <Text style={styles.progressBarText}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </Text>
            </View>
          </View>
          <View style={styles.historyContainer}>
            <Text style={styles.historyTitle}>History</Text>
            <SelectDropdown
              data={emojisWithIcons}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View style={styles.dropdownButtonStyle}>
                    {selectedItem && (
                      <Icon name={selectedItem.icon} />
                    )}
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {(selectedItem && selectedItem.title) || 'Select category'}
                    </Text>
                    <Icon name={isOpened ? 'sort-up' : 'sort-down'} style={styles.dropdownButtonArrowStyle} />
                  </View>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                    <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                    <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImageContainer: {
    width: '100%',
    height: 225,
    backgroundColor: '#d3d3d3',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: "blue",
    position: "relative",
    paddingHorizontal: 10,
  },
  logoutButton: {
    position: 'absolute',
    top: 50,
    right: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    padding: 10,
  },
  logoutIcon: {
    fontSize: 20,
    color: 'black',
  },
  profileContainer: {
    flexDirection: 'row',
    padding: 15,
    marginTop: -50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  editProfileButton: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  editProfilePressable: {
    backgroundColor: "black",
    borderRadius: 50,
    height: 35,
    width: 85,
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  editProfileText: {
    color: "white",
    textAlign: "center"
  },
  profileInfo: {
    flex: 1,
    paddingHorizontal: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileUsername: {
    color: 'gray',
    fontSize: 18,
  },
  profileBio: {
    marginVertical: 10,
    color: 'gray',
  },
  progressBarContainer: {
    height: 200,
    width: '100%',
    borderRadius: 20,
    padding: 5,
    borderWidth: 2,
    backgroundColor: '#ff8906',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  progressBarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    position: 'absolute',
  },
  progressBarTextContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  progressBarTitle: {
    fontSize: 28,
    color: '#fffffe',
    zIndex: 1,
    fontWeight: 'bold',
  },
  progressBarText: {
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 32,
    color: '#fffffe',
    zIndex: 1,
    fontWeight: 'bold',
  },
  historyContainer: {
    flex: 1,
    backgroundColor: "yellow",
    marginTop: 20,
  },
  historyTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  dropdownButtonStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    marginLeft: "auto",
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  historyItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
