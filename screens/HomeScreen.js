import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated, Modal, Dimensions } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

export default function HomeScreen({ navigation }) {
  const [status, setStatus] = useState('normal');
  const [showHelp, setShowHelp] = useState(false);
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;
  const [location, setLocation] = useState(null);
  const [emergencyActive, setEmergencyActive] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const statusItems = [
    { 
      id: 'normal', 
      color: '#000000',
      text: 'Normal',
      icon: 'checkmark-circle-outline'
    },
    { 
      id: 'warning', 
      color: '#000000',
      text: 'Attention',
      icon: 'alert-circle-outline'
    },
    { 
      id: 'danger', 
      color: '#000000',
      text: 'Danger',
      icon: 'warning-outline'
    },
    { 
      id: 'critical', 
      color: '#000000',
      text: 'Critique',
      icon: 'flash-outline'
    }
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission refusée', 'La géolocalisation est nécessaire pour les alertes');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const showHelpModal = () => {
    setShowHelp(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 50,
      friction: 8
    }).start();
  };

  const hideHelpModal = () => {
    Animated.spring(slideAnim, {
      toValue: Dimensions.get('window').height,
      useNativeDriver: true,
      tension: 50,
      friction: 8
    }).start(() => setShowHelp(false));
  };

  const startEmergencyPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handleEmergency = async () => {
    if (!location) {
      Alert.alert('Erreur', 'Impossible d\'obtenir votre position');
      return;
    }

    setEmergencyActive(true);
    startEmergencyPulse();

    // Envoyer l'alerte aux contacts du cercle
    Alert.alert(
      "Alerte envoyée !",
      "Vos contacts ont été notifiés de votre position",
      [{ text: "OK" }]
    );

    // Ici, vous devriez implémenter la logique pour envoyer la position aux contacts
    // Par exemple via une API ou Firebase
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[
        styles.pulseContainer,
        {
          transform: [{ scale: emergencyActive ? pulseAnim : 1 }],
        }
      ]}>
        <TouchableOpacity 
          style={[
            styles.alertButton
          ]}
          onPress={handleEmergency}
        >
          <Ionicons 
            name={statusItems.find(item => item.id === status).icon} 
            size={50} 
            color="#FFFFFF" 
          />
          <Text style={styles.buttonText}>ALERTE</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          {statusItems.find(item => item.id === status).text.toUpperCase()}
        </Text>
        <TouchableOpacity 
          style={styles.helpButton}
          onPress={showHelpModal}
        >
          <Ionicons name="help-circle" size={28} color="#CD5C5C" />
        </TouchableOpacity>
        <View style={styles.buttonsContainer}>
          <View style={styles.statusButtons}>
            {statusItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.statusButton,
                  { transform: [{ scale: status === item.id ? 1.1 : 1 }] }
                ]}
                onPress={() => handleStatusChange(item.id)}
              >
                {status === item.id && (
                  <View style={styles.selectedOverlay}>
                    <Ionicons name={item.icon} size={30} color="#FFFFFF" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <Modal
        visible={showHelp}
        transparent={true}
        animationType="none"
        onRequestClose={hideHelpModal}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={hideHelpModal}
        >
          <Animated.View 
            style={[
              styles.helpModal,
              {
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <View style={styles.helpHeader}>
              <Text style={styles.helpTitle}>Code Couleur</Text>
              <TouchableOpacity onPress={hideHelpModal}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            {statusItems.map((item) => (
              <View key={item.id} style={styles.helpItem}>
                <View style={[styles.colorDot, { backgroundColor: item.color }]} />
                <View style={styles.helpItemText}>
                  <Text style={styles.helpItemTitle}>{item.text}</Text>
                  <Text style={styles.helpItemDescription}>
                    {item.id === 'normal' && "Situation sous contrôle"}
                    {item.id === 'warning' && "Vigilance requise"}
                    {item.id === 'danger' && "Intervention nécessaire"}
                    {item.id === 'critical' && "Situation critique - Action immédiate"}
                  </Text>
                </View>
              </View>
            ))}
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 150,
  },
  alertButton: {
    width: 180,
    height: 180,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  statusContainer: {
    position: 'absolute',
    bottom: 100,
    width: '90%',
    alignItems: 'center',
  },
  statusText: {
    color: '#333333',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 25,
    letterSpacing: 1,
  },
  helpButton: {
    position: 'absolute',
    right: 20,
    top: -40,
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 20,
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
  },
  buttonsContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#eaeaea',
  },
  statusButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 5,
    gap: 15,
  },
  statusButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedOverlay: {
    width: '100%',
    height: '100%',
    borderRadius: 27.5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  helpModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    paddingTop: 15,
    minHeight: '50%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  helpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  helpTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  colorDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  helpItemText: {
    flex: 1,
  },
  helpItemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  helpItemDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  pulseContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 