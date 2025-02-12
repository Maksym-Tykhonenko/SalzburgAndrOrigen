import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';

import { launchImageLibrary } from 'react-native-image-picker';

import Header from '../components/Header';

export default function AlbumScreen() {
  const [albums, setAlbums] = useState([
    {
      id: '1',
      title: 'First Album',
      photos: [],
    },
  ]);

  const [albumTitle, setAlbumTitle] = useState('');

  const addAlbum = () => {
    if (!albumTitle.trim()) return;
    const newAlbum = {
      id: Date.now().toString(),
      title: albumTitle,
      photos: [],
    };
    setAlbums(prev => [...prev, newAlbum]);
    setAlbumTitle('');
  };

  const addPhotoToAlbum = async (albumId: string) => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
      });

      if (result.didCancel) {
        return;
      }
      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Unknown error');
        return;
      }

      const assets = result.assets || [];
      if (assets.length > 0) {
        const photoUri = assets[0].uri;
        setAlbums((prevAlbums: any) =>
          prevAlbums.map((album: any) => {
            if (album.id === albumId) {
              return {
                ...album,
                photos: [...album.photos, photoUri],
              };
            }
            return album;
          }),
        );
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while selecting the photo');
      console.error('ImagePicker error: ', error);
    }
  };

  const renderAlbumItem = ({ item }: any) => {
    return (
      <View style={styles.albumContainer}>
        <Text style={styles.albumTitle}>{item.title}</Text>
        <FlatList
          data={item.photos}
          keyExtractor={(photo, index) => index.toString()}
          horizontal
          renderItem={({ item: photoUri }) => (
            <Image source={{ uri: photoUri }} style={styles.photo} resizeMode="cover" />
          )}
          style={styles.photoList}
          showsHorizontalScrollIndicator={false}
        />
        <TouchableOpacity style={styles.button} //onPress={() => addPhotoToAlbum(item.id)}
        >
          <Text style={styles.buttonText}>Add Photo</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.addAlbumContainer}>
        <TextInput
          style={styles.input}
          value={albumTitle}
          onChangeText={setAlbumTitle}
          placeholder="New album name"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.addButton} //onPress={addAlbum}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={albums}
        keyExtractor={item => item.id}
        renderItem={renderAlbumItem}
        contentContainerStyle={{ paddingBottom: 20, marginHorizontal: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    backgroundColor: '#FF0000',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  addAlbumContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#FF0000',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#000',
    backgroundColor: '#FFF',
  },
  addButton: {
    backgroundColor: '#FF0000',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  albumContainer: {
    backgroundColor: '#FFF',
    borderColor: '#FF0000',
    borderWidth: 2,
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  albumTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FF0000',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FF0000',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderColor: '#FF0000',
    borderWidth: 2,
    marginRight: 10,
  },
  photoList: {
    marginBottom: 10,
  },
});
