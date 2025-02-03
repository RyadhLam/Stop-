import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useRef, useEffect } from 'react';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import BackgroundGradient from '../components/BackgroundGradient';
import { useNavigation } from '@react-navigation/native';

export default function CircleScreen() {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [emergencyLocation, setEmergencyLocation] = useState(null);
  
  const addContact = () => {
    setContacts([...contacts, { 
      id: Date.now(), 
      name: `Contact ${contacts.length + 1}`,
      phone: "06 XX XX XX XX",
      email: "contact@email.com",
      relation: "Ami(e)",
      photo: null
    }]);
  };

  const removeContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const openContactInfo = (contact) => {
    setSelectedContact(contact);
    setModalVisible(true);
  };

  const pickImage = async (contactId) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission refusée', 'Nous avons besoin de votre permission pour accéder à vos photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setContacts(contacts.map(contact => 
        contact.id === contactId 
          ? { ...contact, photo: result.assets[0].uri }
          : contact
      ));
    }
  };

  useEffect(() => {
    // Simuler la réception d'une alerte (à remplacer par votre système de notification)
    const checkEmergencies = async () => {
      if (emergencyLocation) {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        
        // Calculer la distance
        const distance = calculateDistance(
          currentLocation.coords.latitude,
          currentLocation.coords.longitude,
          emergencyLocation.latitude,
          emergencyLocation.longitude
        );

        // Ajuster la vitesse de pulsation en fonction de la proximité
        const pulseDuration = Math.max(300, Math.min(2000, distance * 10));
        startPulse(pulseDuration);
      }
    };

    const interval = setInterval(checkEmergencies, 5000);
    return () => clearInterval(interval);
  }, [emergencyLocation]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Formule de Haversine pour calculer la distance
    const R = 6371; // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const startPulse = (duration) => {
    // Implementation of startPulse function
  };

  return (
    <BackgroundGradient>
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.openDrawer()}
        >
          <Ionicons name="reorder-three" size={45} color="#000000" />
        </TouchableOpacity>

        <View style={styles.circleContainer}>
          <View style={styles.centerCircle}>
            <Text style={styles.centerText}>MOI</Text>
          </View>

          {contacts.map((contact, index) => (
            <View
              key={contact.id}
              style={[
                styles.branch,
                {
                  transform: [
                    { rotate: `${(360 / Math.max(contacts.length, 1)) * index}deg` },
                  ],
                },
              ]}
            >
              <TouchableOpacity 
                style={styles.contactCircle}
                onPress={() => openContactInfo(contact)}
              >
                {contact.photo ? (
                  <Image 
                    source={{ uri: contact.photo }} 
                    style={styles.contactPhoto}
                  />
                ) : (
                  <Text style={styles.contactText}>{contact.name}</Text>
                )}
                <TouchableOpacity 
                  style={styles.editPhotoButton}
                  onPress={() => pickImage(contact.id)}
                >
                  <Ionicons name="camera" size={16} color="#CD5C5C" />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          ))}

          {/* Modal d'informations du contact */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity 
                  style={styles.closeModalButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Ionicons name="close" size={24} color="#CD5C5C" />
                </TouchableOpacity>

                {selectedContact && (
                  <>
                    <View style={styles.contactHeader}>
                      <TouchableOpacity 
                        style={styles.contactAvatar}
                        onPress={() => pickImage(selectedContact.id)}
                      >
                        {selectedContact.photo ? (
                          <Image 
                            source={{ uri: selectedContact.photo }} 
                            style={styles.modalPhoto}
                          />
                        ) : (
                          <Ionicons name="person" size={40} color="#CD5C5C" />
                        )}
                        <View style={styles.editIconContainer}>
                          <Ionicons name="camera" size={16} color="#fff" />
                        </View>
                      </TouchableOpacity>
                      <Text style={styles.contactName}>{selectedContact.name}</Text>
                    </View>

                    <View style={styles.contactInfo}>
                      <View style={styles.infoRow}>
                        <Ionicons name="call-outline" size={24} color="#CD5C5C" />
                        <Text style={styles.infoText}>{selectedContact.phone}</Text>
                      </View>
                      
                      <View style={styles.infoRow}>
                        <Ionicons name="mail-outline" size={24} color="#CD5C5C" />
                        <Text style={styles.infoText}>{selectedContact.email}</Text>
                      </View>
                      
                      <View style={styles.infoRow}>
                        <Ionicons name="people-outline" size={24} color="#CD5C5C" />
                        <Text style={styles.infoText}>{selectedContact.relation}</Text>
                      </View>
                    </View>
                  </>
                )}
              </View>
            </View>
          </Modal>

          {/* Bouton d'ajout */}
          <TouchableOpacity 
            style={styles.addButton}
            onPress={addContact}
          >
            <Ionicons name="add-circle" size={60} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Bouton Reset */}
        <TouchableOpacity 
          style={styles.resetButton}
          onPress={() => {
            setContacts([]); // Reset les contacts
          }}
        >
          <Ionicons name="refresh-circle" size={45} color="#000000" />
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </BackgroundGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  circleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  centerText: {
    color: '#CD5C5C',
    fontSize: 18,
    fontWeight: 'bold',
  },
  branch: {
    position: 'absolute',
    width: 150,
    height: 3,
    backgroundColor: '#CD5C5C',
    top: '50%',
    left: '50%',
    transformOrigin: 'left',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  contactCircle: {
    position: 'absolute',
    right: -25,
    top: -24,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  contactText: {
    color: '#CD5C5C',
    fontSize: 12,
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  deleteButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  closeModalButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  contactHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  contactAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  contactName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#CD5C5C',
  },
  contactInfo: {
    marginTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  contactPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  editPhotoButton: {
    position: 'absolute',
    right: -5,
    bottom: -5,
    backgroundColor: '#fff',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CD5C5C',
  },
  modalPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editIconContainer: {
    position: 'absolute',
    right: -5,
    bottom: -5,
    backgroundColor: '#CD5C5C',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  menuButton: {
    position: 'absolute',
    top: 45,
    right: 25,
    padding: 10,
    zIndex: 999,
  },
  resetButton: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  resetText: {
    color: '#000000',
    fontSize: 12,
    marginTop: -5,
    fontWeight: 'bold',
  },
}); 