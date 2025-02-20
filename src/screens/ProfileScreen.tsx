import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Avatar,
  Card,
  Switch,
} from 'react-native-paper';
import {Edit, User, Settings, LogOut, Camera} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import {Background} from '../components/background';

export const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'none',
    lastName: 'none',
    notifications: true,
    darkMode: false,
    avatarUri: '',
  });

  useEffect(() => {
    (async () => {
      try {
        const storedProfile = await AsyncStorage.getItem('userProfile');
        if (storedProfile) {
          setProfile(JSON.parse(storedProfile));
        }
      } catch (error) {
        console.log('Error loading profile from AsyncStorage:', error);
      }
    })();
  }, []);

  // Зміна аватару
  const handleChangeAvatar = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
      });

      if (result.didCancel) return;
      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Unknown error');
        return;
      }

      const assets = result.assets || [];
      if (assets.length > 0) {
        const photoUri = assets[0].uri;
        setProfile((prev: any) => ({...prev, avatarUri: photoUri}));
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while selecting the photo');
      console.log('ImagePicker error: ', error);
    }
  };

  {/**const handleSaveProfile = async () => {
    try {
      setIsEditing(false);
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
      Alert.alert('Success', 'Profile saved!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile');
      console.log('Error saving to AsyncStorage:', error);
    }
  };

  const handleResetProfile = async () => {
    const defaultProfile = {
      name: 'none',
      lastName: 'none',
      notifications: true,
      darkMode: false,
      avatarUri: '',
    };
    setProfile(defaultProfile);
    await AsyncStorage.removeItem('userProfile');
  };
 */}
  return (
    
    <ScrollView style={styles.container}>
      <Background />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(!isEditing)}>
          <Edit color="#fff" size={20} />
        </TouchableOpacity>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={120}
            source={profile.avatarUri ? {uri: profile.avatarUri} : {uri: ''}}
            style={styles.avatar}
          />
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={handleChangeAvatar}>
            <Camera color="#fff" size={16} />
          </TouchableOpacity>
        </View>
        <Text style={styles.nameText}>
          {profile.name} {profile.lastName}
        </Text>
      </View>

      {/* Картка з даними профілю */}
      <Card style={styles.card}>
        <Card.Title title="Profile Details" titleStyle={styles.cardTitle} />
        <Card.Content>
          {isEditing ? (
            <>
              <TextInput
                label="First Name"
                value={profile.name}
                onChangeText={text => setProfile({...profile, name: text})}
                style={styles.input}
                mode="outlined"
                theme={{colors: {primary: '#FF0000'}}}
              />
              <TextInput
                label="Nickname"
                value={profile.lastName}
                onChangeText={text => setProfile({...profile, lastName: text})}
                style={styles.input}
                mode="outlined"
                theme={{colors: {primary: '#FF0000'}}}
              />
              <Button
                mode="contained"
                onPress={handleSaveProfile}
                style={styles.saveButton}>
                Save Changes
              </Button>
            </>
          ) : (
            <View style={styles.detailRow}>
              <User color="#FF0000" size={24} />
              <Text style={styles.detailText}>{profile.name}</Text>
            </View>
          )}
        </Card.Content>
      </Card>

      {/* Картка налаштувань */}
      <Card style={styles.card}>
        <Card.Title title="Settings" titleStyle={styles.cardTitle} />
        <Card.Content>
          <View style={styles.settingRow}>
            <Settings color="#FF0000" size={24} />
            <Text style={styles.settingText}>Notifications</Text>
            <Switch
              value={profile.notifications}
              onValueChange={value =>
                setProfile({...profile, notifications: value})
              }
              color="#FF0000"
            />
          </View>
        </Card.Content>
      </Card>

      {/* Кнопка скидання профілю */}
      <Button
        mode="outlined"
        onPress={handleResetProfile}
        icon={() => <LogOut color="#FF0000" size={24} />}
        style={styles.logoutButton}
        labelStyle={styles.logoutText}>
        Reset Profile
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    backgroundColor: '#FF0000',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'relative',
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  avatarContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  avatar: {
    borderWidth: 3,
    borderColor: '#fff',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#FF0000',
    borderRadius: 20,
    padding: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  card: {
    margin: 16,
    borderRadius: 10,
    borderColor: '#FF0000',
    borderWidth: 1,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    color: '#FF0000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#FF0000',
    marginTop: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
  logoutButton: {
    marginHorizontal: 16,
    marginVertical: 20,
    borderColor: '#FF0000',
  },
  logoutText: {
    color: '#FF0000',
  },
});
