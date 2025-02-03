import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated, Modal, Dimensions, ScrollView, Image } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useFonts, Poppins_700Bold, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const CARD_WIDTH = windowWidth * 0.8;

export default function HomeScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
  });

  const [status, setStatus] = useState('normal');
  const [showHelp, setShowHelp] = useState(false);
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;
  const [location, setLocation] = useState(null);
  const [emergencyActive, setEmergencyActive] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [isWarning, setIsWarning] = useState(false);
  const pulseAnimations = [
    useRef(new Animated.Value(1)).current,
    useRef(new Animated.Value(1)).current,
    useRef(new Animated.Value(1)).current,
  ];

  const scrollViewRef = useRef(null);

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

  const carouselItems = [
    {
      id: 1,
      title: "ALERTE",
      image: require('../assets/icons8-alert-50.png'),
      color: "#FF0000"
    },
    {
      id: 2,
      title: "APPEL",
      image: require('../assets/icons8-heart-50.png'),
      color: "#000000"
    },
    {
      id: 3,
      title: "MESSAGE",
      image: require('../assets/icons8-spock-50.png'),
      color: "#000000"
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

  const startWarningAnimation = () => {
    setIsWarning(true);
    pulseAnimations.forEach((anim, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 400),
          Animated.parallel([
            Animated.timing(anim, {
              toValue: 2,
              duration: 1500,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0,
              duration: 1500,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    });
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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      colors={['#FFFFFF', '#F8F8F8', '#F0F0F0']}
      style={styles.container}
    >
      <View style={styles.carouselContainer}>
        <TouchableOpacity 
          style={styles.arrowButton}
          onPress={() => scrollViewRef.current.scrollTo({ x: 0, animated: true })}
        >
          <Ionicons name="chevron-back" size={30} color="rgba(128, 128, 128, 0.6)" />
        </TouchableOpacity>

        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          decelerationRate="fast"
          snapToInterval={windowWidth * 0.8 + 20}
        >
          {carouselItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.carouselItem, { backgroundColor: 'transparent' }]}
              onPress={() => {
                if (item.id === 1) startWarningAnimation();
              }}
            >
              <Image 
                source={item.image}
                style={styles.itemImage}
                resizeMode="contain"
              />
              <Text style={styles.carouselText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity 
          style={[styles.arrowButton, styles.rightArrow]}
          onPress={() => {
            const lastItemOffset = (carouselItems.length - 1) * (windowWidth * 0.8 + 20);
            scrollViewRef.current.scrollTo({ x: lastItemOffset, animated: true });
          }}
        >
          <Ionicons name="chevron-forward" size={30} color="rgba(128, 128, 128, 0.6)" />
        </TouchableOpacity>
      </View>

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
        <LinearGradient
          colors={['#fdbfd5', '#ebc6de', '#FAFAFA']}
          style={styles.buttonsContainer}
        >
          <Text style={styles.alertText}>ALERTE</Text>
        </LinearGradient>
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 150,
    paddingTop: 150,
  },
  carouselContainer: {
    position: 'absolute',
    top: '60%',
    left: 0,
    right: 0,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: -100 }],
  },
  scrollContent: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  arrowButton: {
    position: 'absolute',
    left: 30,
    zIndex: 2,
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 8,
  },
  rightArrow: {
    left: undefined,
    right: 30,
  },
  itemImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
    tintColor: '#FFFFFF',
  },
  carouselItem: {
    width: windowWidth * 0.7,
    height: 180,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
  },
  carouselText: {
    color: '#FFFFFF',
    fontSize: 20,
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
    borderRadius: 25,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 15,
    borderWidth: 1,
    borderColor: '#eaeaea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 2,
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
}); 