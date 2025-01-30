import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_700Bold, Poppins_500Medium } from '@expo-google-fonts/poppins';

export default function LoginScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      colors={['#34c7f5', '#7ec09b', '#c8b8a2']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/Logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.formContainer}>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.loginButtonText}>Se connecter</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.createAccountButton}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={styles.createAccountText}>Crée ton compte</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    marginTop: -20,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#000000',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
  },
  createAccountButton: {
    marginTop: 20,
    padding: 10,
  },
  createAccountText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    textDecorationLine: 'underline',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 15,
  },
  logo: {
    width: 500,
    height: 500,
  },
}); 