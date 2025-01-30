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

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      
      {/* Settings en bas */}
      <TouchableOpacity 
        style={styles.settingsButton}
        onPress={() => {
          props.navigation.navigate('Settings');
          props.navigation.closeDrawer();
        }}
      >
        <Ionicons name="settings-outline" size={28} color="#fff" />
        <Text style={styles.settingsText}>Paramètres</Text>
      </TouchableOpacity>
    </View>
  );
}

function DrawerNavigator() {
  const theme = useTheme();
  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });

  return (
    <Drawer.Navigator 
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="Home"
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: 'transparent',
          height: 150,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTransparent: true,
        headerTintColor: '#000000',
        headerTitle: () => (
          <View style={{ 
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            paddingTop: 15,
          }}>
            <Text style={{
              fontFamily: fontsLoaded ? 'Poppins_700Bold' : undefined,
              fontSize: 24,
              color: '#000000',
              marginLeft: 25,
            }}>
              Mon cercle
            </Text>
          </View>
        ),
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
            <Ionicons name="reorder-three" size={45} color="#000000" />
          </TouchableOpacity>
        ),
        drawerPosition: 'right',
        drawerStyle: {
          backgroundColor: 'rgba(128, 128, 128, 0.7)',
          width: 300,
        },
        overlayColor: 'rgba(0, 0, 0, 0.3)',
        drawerActiveTintColor: '#ffffff',
        drawerInactiveTintColor: '#ffffff',
        drawerLabelStyle: {
          fontSize: 22,
          fontWeight: '600',
          marginLeft: 12,
          marginVertical: 8,
          color: '#ffffff',
          textShadowColor: 'rgba(0, 0, 0, 0.75)',
          textShadowOffset: { width: -1, height: 1 },
          textShadowRadius: 10,
        },
        drawerItemStyle: {
          marginVertical: 5,
          borderRadius: 10,
          paddingVertical: 5,
        },
        sceneContainerStyle: {
          backgroundColor: 'transparent',
        },
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
        options={({ navigation }) => ({
          title: 'Mon Cercle',
          headerShown: false,
        })}
      />
      <Drawer.Screen 
        name="Account" 
        component={AccountScreen} 
        options={({ navigation }) => ({
          title: 'Mon Compte',
          headerShown: false,
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => navigation.openDrawer()}
              style={{ 
                position: 'absolute',
                top: 45,
                right: 25,
                padding: 10,
                zIndex: 999,
              }}
            >
              <Ionicons name="reorder-three" size={45} color="#000000" />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ 
          title: 'Paramètres',
          drawerItemStyle: { height: 0 }
        }} 
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <DrawerNavigator />
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
