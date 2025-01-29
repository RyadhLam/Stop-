import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function AccountScreen() {
  const [userInfo, setUserInfo] = useState({
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@email.com",
    telephone: "06 12 34 56 78",
    photo: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState({...userInfo});

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission refusée', 'Nous avons besoin de votre permission pour accéder à vos photos');
      return;
    }

    Alert.alert(
      "Modifier la photo",
      "Choisissez une option",
      [
        {
          text: "Prendre une photo",
          onPress: async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Permission refusée', 'Nous avons besoin de votre permission pour utiliser la caméra');
              return;
            }
            const result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });
            if (!result.canceled) {
              setUserInfo(prev => ({
                ...prev,
                photo: result.assets[0].uri
              }));
            }
          }
        },
        {
          text: "Choisir dans la galerie",
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });
            if (!result.canceled) {
              setUserInfo(prev => ({
                ...prev,
                photo: result.assets[0].uri
              }));
            }
          }
        },
        {
          text: "Supprimer la photo",
          style: 'destructive',
          onPress: () => {
            setUserInfo(prev => ({
              ...prev,
              photo: null
            }));
          }
        },
        {
          text: "Annuler",
          style: 'cancel'
        }
      ]
    );
  };

  const handleEdit = () => {
    if (isEditing) {
      // Sauvegarder les modifications
      setUserInfo(editedInfo);
      Alert.alert("Succès", "Vos informations ont été mises à jour");
    }
    setIsEditing(!isEditing);
  };

  const renderField = (label, value, field, icon) => (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={24} color="#CD5C5C" />
      <View style={styles.infoTextContainer}>
        <Text style={styles.infoLabel}>{label}</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editedInfo[field]}
            onChangeText={(text) => setEditedInfo(prev => ({...prev, [field]: text}))}
          />
        ) : (
          <Text style={styles.infoValue}>{value}</Text>
        )}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.avatarContainer}
          onPress={pickImage}
        >
          {userInfo.photo ? (
            <Image 
              source={{ uri: userInfo.photo }} 
              style={styles.avatar}
            />
          ) : (
            <Ionicons name="person-circle" size={100} color="#fff" />
          )}
          <View style={styles.editIconContainer}>
            <Ionicons name="camera" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={handleEdit}
        >
          <Ionicons 
            name={isEditing ? "checkmark" : "create-outline"} 
            size={24} 
            color="#fff" 
          />
        </TouchableOpacity>

        <View style={styles.infoSection}>
          {renderField("Nom", userInfo.nom, "nom", "person-outline")}
          {renderField("Prénom", userInfo.prenom, "prenom", "person-outline")}
          {renderField("Email", userInfo.email, "email", "mail-outline")}
          {renderField("Téléphone", userInfo.telephone, "telephone", "call-outline")}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#CD5C5C',
  },
  avatarContainer: {
    width: '100%',
    height: 300,
    position: 'absolute',
    top: 0,
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  editIconContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#CD5C5C',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    zIndex: 2,
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 50,
    minHeight: 500,
    marginTop: -30,
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  editButton: {
    position: 'absolute',
    right: 30,
    top: -20,
    backgroundColor: '#CD5C5C',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 2,
  },
  input: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    borderBottomWidth: 1,
    borderBottomColor: '#CD5C5C',
    paddingVertical: 4,
    marginTop: 2,
  },
}); 