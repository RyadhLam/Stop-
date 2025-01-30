import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BackgroundGradient from '../components/BackgroundGradient';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';

export default function AccountScreen() {
  const navigation = useNavigation();
  const [userPhoto, setUserPhoto] = useState(null);
  const [userLocation, setUserLocation] = useState({
    latitude: 48.8566,
    longitude: 2.3522,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUserPhoto(result.assets[0].uri);
    }
  };

  return (
    <BackgroundGradient>
      <View style={styles.container}>
        {/* Menu Burger */}
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.openDrawer()}
        >
          <Ionicons name="reorder-three" size={45} color="#000000" />
        </TouchableOpacity>

        {/* Conteneur Photo */}
        <View style={styles.photoContainer}>
          <TouchableOpacity onPress={pickImage}>
            {userPhoto ? (
              <Image source={{ uri: userPhoto }} style={styles.userPhoto} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Ionicons name="camera" size={40} color="#fff" />
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Conteneur Infos */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Mes Informations</Text>
          <View style={styles.infoRow}>
            <Ionicons name="person-outline" size={24} color="#000" />
            <Text style={styles.infoText}>John Doe</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={24} color="#000" />
            <Text style={styles.infoText}>john.doe@email.com</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={24} color="#000" />
            <Text style={styles.infoText}>+33 6 12 34 56 78</Text>
          </View>
        </View>

        {/* Conteneur Map */}
        <View style={styles.mapContainer}>
          <Text style={styles.mapTitle}>Ma Position</Text>
          <MapView
            style={styles.map}
            initialRegion={userLocation}
          >
            <Marker coordinate={userLocation} />
          </MapView>
        </View>
      </View>
    </BackgroundGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: 100,
  },
  menuButton: {
    position: 'absolute',
    top: 45,
    right: 25,
    padding: 10,
    zIndex: 999,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  userPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  infoContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 15,
    padding: 20,
    margin: 20,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  infoText: {
    marginLeft: 15,
    fontSize: 16,
  },
  mapContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 15,
    padding: 20,
    margin: 20,
    marginTop: 20,
    height: 200,
  },
  mapTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  map: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
}); 