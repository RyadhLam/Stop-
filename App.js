import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins';

import HomeScreen from './screens/HomeScreen';
import CircleScreen from './screens/CircleScreen';
import AccountScreen from './screens/AccountScreen';
import SettingsScreen from './screens/SettingsScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import CustomDrawerContent from './components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Drawer.Navigator 
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          initialRouteName="Login"
        >
          <Drawer.Screen 
            name="Login" 
            component={LoginScreen}
            options={{
              headerShown: false,
              drawerItemStyle: { display: 'none' }
            }}
          />
          
          <Drawer.Screen 
            name="SignUp" 
            component={SignUpScreen}
            options={{
              headerShown: false,
              drawerItemStyle: { display: 'none' }
            }}
          />

          <Drawer.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ 
              headerTitle: '',
              headerRight: ({ navigation }) => (
                <TouchableOpacity 
                  onPress={() => navigation.openDrawer()}
                  style={{ marginRight: 25, marginTop: 15, padding: 10 }}
                >
                  <Ionicons name="reorder-three" size={45} color="#000000" />
                </TouchableOpacity>
              )
            }}
          />

          <Drawer.Screen 
            name="Circle" 
            component={CircleScreen} 
            options={{ 
              headerTitle: ''
            }}
          />

          <Drawer.Screen 
            name="Account" 
            component={AccountScreen} 
            options={{ 
              headerTitle: ''
            }}
          />

          <Drawer.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{ 
              headerTitle: ''
            }}
          />
        </Drawer.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CD5C5C',
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
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 20,
  },
  settingsText: {
    color: '#fff',
    fontSize: 22,
    marginLeft: 12,
    fontWeight: '500',
  }
});
