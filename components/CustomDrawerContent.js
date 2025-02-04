import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

export default function CustomDrawerContent(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      
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

const styles = StyleSheet.create({
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CD5C5C',
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  settingsText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
  },
}); 