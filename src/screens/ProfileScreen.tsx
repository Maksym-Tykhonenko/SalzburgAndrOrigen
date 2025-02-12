import React, {useState} from 'react';
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
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: 'none',
    lastName: 'none',
    notifications: true,
    darkMode: false,
    avatarUri: '',
  });

  React.useEffect(() => {
    (async () => {
      try {
        const storedProfile = await AsyncStorage.getItem('userProfile');
        if (storedProfile) {
          setProfile(JSON.parse(storedProfile));
        }
      } catch (error) {
        console.log('Помилка завантаження профілю з AsyncStorage:', error);
      }
    })();
  }, []);

  // Змінити аватар
  const handleChangeAvatar = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
      });

      if (result.didCancel) {
        return;
      }
      if (result.errorCode) {
        Alert.alert('Помилка', result.errorMessage || 'Невідома помилка');
        return;
      }

      const assets = result.assets || [];
      if (assets.length > 0) {
        const photoUri = assets[0].uri;
        setProfile((prev: any) => ({...prev, avatarUri: photoUri}));
      }
    } catch (error) {
      Alert.alert('Помилка', 'Виникла помилка при виборі фото');
      console.log('ImagePicker error: ', error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsEditing(false);
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
      Alert.alert('Успіх', 'Зміни збережено!');
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося зберегти дані');
      console.log('Помилка збереження у AsyncStorage:', error);
    }
  };

  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity //onPress={() => setIsEditing(!isEditing)}
          >
            <View style={styles.editIconContainer}>
              <Edit color="#FF0000" size={24} />
            </View>
          </TouchableOpacity>

          <View style={styles.avatarWrapper}>
            <Avatar.Image
              size={120}
              source={profile.avatarUri ? {uri: profile.avatarUri} : undefined}
              style={styles.avatar}
            />
            <TouchableOpacity
              style={styles.cameraButton}
              //onPress={handleChangeAvatar}
            >
              <Camera color="#FFF" size={16} />
            </TouchableOpacity>
          </View>

          <Text style={styles.nameTitle}>{profile.name}</Text>
        </View>

        {/* Картка профілю */}
        <Card style={styles.card}>
          {isEditing ? (
            <>
              <TextInput
                label="Name"
                value={profile.name}
                onChangeText={text => setProfile({...profile, name: text})}
                style={styles.input}
              />
              <TextInput
                label="lastName"
                value={profile.lastName}
                onChangeText={text => setProfile({...profile, lastName: text})}
                style={styles.input}
              />
              <Button
                mode="contained"
                //onPress={handleSaveProfile}
                style={styles.saveButton}>
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <View style={styles.profileRow}>
                <User color="#FF0000" size={24} />
                <Text style={styles.profileText}>{profile.name}</Text>
              </View>
              <View style={styles.profileRow}>
                <User color="#FF0000" size={24} />
                <Text style={styles.profileText}>{profile.lastName}</Text>
              </View>
            </>
          )}
        </Card>

        {/* Картка налаштувань */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingRow}>
            <Settings color="#FF0000" size={24} />
            <Text style={styles.settingText}>Notifications</Text>
            <Switch
              value={profile.notifications}
              onValueChange={value =>
                setProfile({...profile, notifications: value})
              }
            />
          </View>
          {/* Якщо потрібен Dark Mode, розкоментуйте блок нижче */}
          {/* <View style={styles.settingRow}>
            <Settings color="#FF0000" size={24} />
            <Text style={styles.settingText}>Dark Mode</Text>
            <Switch
              value={profile.darkMode}
              onValueChange={value =>
                setProfile({ ...profile, darkMode: value })
              }
            />
          </View> */}
        </Card>

        <Button
          mode="outlined"
          //onPress={async () => {
          //  setProfile({
          //    name: 'none',
          //    lastName: 'none',
          //    notifications: true,
          //    darkMode: false,
          //    avatarUri: '',
          //  });
          //  await AsyncStorage.removeItem('userProfile');
          //}}
          icon={() => <LogOut color="#E74C3C" size={24} />}
          style={styles.logoutButton}
          labelStyle={styles.logoutText}>
          Reset
        </Button>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Білий фон
    padding: 16,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  editIconContainer: {
    marginBottom: 20,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    // Додаткові налаштування для аватару (за бажанням)
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF0000', // Червоний фон для кнопки зміни аватару
    borderRadius: 20,
    padding: 6,
  },
  nameTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF0000', // Червоний колір для імені
  },
  card: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#FFFFFF', // Білий фон для картки
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    elevation: 3,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#FF0000', // Червоний текст для профілю
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#FFFFFF', // Білий фон для інпутів
    borderColor: '#FF0000', // Червона рамка
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: '#FF0000', // Червона кнопка "Зберегти"
    borderRadius: 5,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF0000', // Червоний заголовок для розділів
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  settingText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    borderColor: '#E74C3C',
    marginTop: 20,
    borderWidth: 1,
  },
  logoutText: {
    color: '#E74C3C',
  },
});

export default ProfileScreen;
