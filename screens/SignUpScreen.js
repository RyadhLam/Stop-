import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useFonts, Poppins_700Bold, Poppins_500Medium } from '@expo-google-fonts/poppins';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function SignUpScreen({ navigation }) {
  const [gender, setGender] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <LinearGradient
      colors={['#fdbfd5', '#ebc6de', '#c8b8a2']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={30} color="#000" />
          </TouchableOpacity>

          <Text style={styles.title}>Inscription</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Votre nom"
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Votre prénom"
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.inputContainer}>
            <TouchableOpacity 
              style={styles.input}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>
                {date.toLocaleDateString('fr-FR')}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onDateChange}
                maximumDate={new Date()}
                minimumDate={new Date(1900, 0, 1)}
              />
            )}
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.genderContainer}>
              <TouchableOpacity 
                style={[
                  styles.genderButton,
                  gender === 'F' && styles.genderButtonActive
                ]}
                onPress={() => setGender('F')}
              >
                <Ionicons 
                  name="woman" 
                  size={24} 
                  color={gender === 'F' ? '#fff' : '#000'} 
                />
                <Text style={[
                  styles.genderText,
                  gender === 'F' && styles.genderTextActive
                ]}>Femme</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[
                  styles.genderButton,
                  gender === 'H' && styles.genderButtonActive
                ]}
                onPress={() => setGender('H')}
              >
                <Ionicons 
                  name="man" 
                  size={24} 
                  color={gender === 'H' ? '#fff' : '#000'} 
                />
                <Text style={[
                  styles.genderText,
                  gender === 'H' && styles.genderTextActive
                ]}>Homme</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.signUpButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.signUpButtonText}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins_700Bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 80,
  },
  inputContainer: {
    marginBottom: 60,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  genderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 15,
    width: '48%',
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
  genderButtonActive: {
    backgroundColor: '#000',
  },
  genderText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#000',
  },
  genderTextActive: {
    color: '#fff',
  },
  signUpButton: {
    backgroundColor: '#000',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
  },
  dateText: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#666',
    textAlign: 'left',
  },
}); 