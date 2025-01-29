import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider, useTheme } from './context/ThemeContext';

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

  return (
    <Drawer.Navigator 
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="Home"
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: '#FFFFFF',
          height: 150,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: '#CD5C5C',
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
            <Ionicons name="reorder-three" size={45} color="#CD5C5C" />
          </TouchableOpacity>
        ),
        drawerPosition: 'right',
        drawerStyle: {
          backgroundColor: '#CD5C5C',
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
          backgroundColor: '#FFFFFF'
        },
        overlayColor: 'transparent',
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
