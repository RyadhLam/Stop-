import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function CircleScreen() {
  const [contacts, setContacts] = useState([]);

  const addContact = () => {
    setContacts([...contacts, { id: Date.now(), name: `Contact ${contacts.length + 1}` }]);
  };

  const removeContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Cercle central (utilisateur) */}
      <View style={styles.centerCircle}>
        <Text style={styles.centerText}>MOI</Text>
      </View>

      {/* Branches et contacts */}
      {contacts.map((contact, index) => (
        <View
          key={contact.id}
          style={[
            styles.branch,
            {
              transform: [
                { rotate: `${(360 / Math.max(contacts.length, 1)) * index}deg` },
              ],
            },
          ]}
        >
          <View style={styles.contactCircle}>
            <Text style={styles.contactText}>{contact.name}</Text>
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => removeContact(contact.id)}
            >
              <Ionicons name="close-circle" size={24} color="#CD5C5C" />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Bouton d'ajout */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={addContact}
      >
        <Ionicons name="add-circle" size={60} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CD5C5C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  centerText: {
    color: '#CD5C5C',
    fontSize: 18,
    fontWeight: 'bold',
  },
  branch: {
    position: 'absolute',
    width: 150,
    height: 2,
    backgroundColor: '#fff',
    top: '50%',
    left: '50%',
    transformOrigin: 'left',
  },
  contactCircle: {
    position: 'absolute',
    right: -25,
    top: -24,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactText: {
    color: '#CD5C5C',
    fontSize: 12,
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  deleteButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
}); 