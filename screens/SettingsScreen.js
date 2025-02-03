import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import BackgroundGradient from '../components/BackgroundGradient';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    location: false,
    notifications: true,
    soundEffects: true,
    dataSync: false,
    emergencyAlerts: true,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const navigation = useNavigation();

  const settingsItems = [
    {
      key: 'location',
      title: 'Localisation',
      description: 'Autoriser l\'accès à la localisation',
      icon: 'location-outline'
    },
    {
      key: 'notifications',
      title: 'Notifications',
      description: 'Activer les notifications push',
      icon: 'notifications-outline'
    },
    {
      key: 'soundEffects',
      title: 'Sons',
      description: 'Activer les effets sonores',
      icon: 'volume-high-outline'
    },
    {
      key: 'dataSync',
      title: 'Synchronisation',
      description: 'Synchroniser les données en arrière-plan',
      icon: 'sync-outline'
    },
    {
      key: 'emergencyAlerts',
      title: 'Alertes d\'urgence',
      description: 'Recevoir les alertes d\'urgence',
      icon: 'warning-outline'
    },
    {
      key: 'logout',
      title: 'Déconnexion',
      description: 'Se déconnecter de l\'application',
      icon: 'log-out-outline'
    }
  ];

  return (
    <BackgroundGradient>
      <ScrollView style={styles.container}>
        <View style={styles.settingsContainer}>
          <View style={styles.settingsList}>
            {settingsItems.map((item) => (
              <View key={item.key} style={styles.settingItem}>
                <View style={styles.settingIcon}>
                  <Ionicons name={item.icon} size={24} color="#CD5C5C" />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>{item.title}</Text>
                  <Text style={styles.settingDescription}>{item.description}</Text>
                </View>
                <Switch
                  value={settings[item.key]}
                  onValueChange={() => toggleSetting(item.key)}
                  trackColor={{ false: '#767577', true: '#CD5C5C' }}
                  thumbColor={settings[item.key] ? '#fff' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  style={styles.switch}
                />
              </View>
            ))}
          </View>
          
          <TouchableOpacity 
            onPress={() => navigation.navigate('Login')}
            style={styles.logoutButton}
          >
            <Text style={styles.logoutText}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </BackgroundGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: 150,
  },
  settingsContainer: {
    backgroundColor: 'transparent',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 50,
    flex: 1,
    justifyContent: 'space-between',
  },
  settingsList: {
    flex: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  settingDescription: {
    fontSize: 14,
    color: '#333',
    marginTop: 2,
  },
  switch: {
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: '#CD5C5C',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 100,
    marginHorizontal: 30,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
}); 