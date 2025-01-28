import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import CircleScreen from './screens/CircleScreen';
import AccountScreen from './screens/AccountScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Home"
        screenOptions={({ navigation }) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: '#CD5C5C',
            height: 150,  // Augmentation de la hauteur à 150
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: '#fff',
          headerTitle: '',
          headerLeft: () => null,
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => navigation.openDrawer()}
              style={{ 
                marginRight: 25,
                marginTop: 15,
                padding: 10
              }}
            >
              <Ionicons name="reorder-three" size={45} color="#fff" />
            </TouchableOpacity>
          ),
          drawerPosition: 'right',
          drawerStyle: {
            backgroundColor: '#CD5C5C', // Même couleur que le fond
            width: 300,
          },
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#fff',
          drawerLabelStyle: {
            fontSize: 22,
            fontWeight: '500',
            marginLeft: 12,
            marginVertical: 8,
          },
          drawerItemStyle: {
            marginVertical: 5,
            borderRadius: 10,
            paddingVertical: 5,
          },
          sceneContainerStyle: {
            backgroundColor: '#CD5C5C' // Même couleur que le fond
          },
          overlayColor: 'transparent', // Rend l'overlay transparent
        })}
      >
        <Drawer.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Accueil' }}
        />
        <Drawer.Screen 
          name="Circle" 
          component={CircleScreen} 
          options={{ title: 'Mon Cercle' }}
        />
        <Drawer.Screen 
          name="Account" 
          component={AccountScreen} 
          options={{ title: 'Mon Compte' }}
        />
      </Drawer.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CD5C5C',  // Indian Red, un rouge plus mat
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#CD5C5C',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
