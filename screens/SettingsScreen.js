import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

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
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.settingsContainer}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  settingsContainer: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 50,
    minHeight: '100%',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
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
    color: '#333',
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  switch: {
    marginLeft: 10,
  }
}); 