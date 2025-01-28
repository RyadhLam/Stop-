import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function CircleScreen() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const addContact = () => {
    setContacts([...contacts, { 
      id: Date.now(), 
      name: `Contact ${contacts.length + 1}`,
      phone: "06 XX XX XX XX",
      email: "contact@email.com",
      relation: "Ami(e)"
    }]);
  };

  const removeContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const openContactInfo = (contact) => {
    setSelectedContact(contact);
    setModalVisible(true);
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
          <TouchableOpacity 
            style={styles.contactCircle}
            onPress={() => openContactInfo(contact)}
          >
            <Text style={styles.contactText}>{contact.name}</Text>
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => removeContact(contact.id)}
            >
              <Ionicons name="close-circle" size={24} color="#CD5C5C" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      ))}

      {/* Modal d'informations du contact */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#CD5C5C" />
            </TouchableOpacity>

            {selectedContact && (
              <>
                <View style={styles.contactHeader}>
                  <View style={styles.contactAvatar}>
                    <Ionicons name="person" size={40} color="#CD5C5C" />
                  </View>
                  <Text style={styles.contactName}>{selectedContact.name}</Text>
                </View>

                <View style={styles.contactInfo}>
                  <View style={styles.infoRow}>
                    <Ionicons name="call-outline" size={24} color="#CD5C5C" />
                    <Text style={styles.infoText}>{selectedContact.phone}</Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Ionicons name="mail-outline" size={24} color="#CD5C5C" />
                    <Text style={styles.infoText}>{selectedContact.email}</Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Ionicons name="people-outline" size={24} color="#CD5C5C" />
                    <Text style={styles.infoText}>{selectedContact.relation}</Text>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  deleteButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  closeModalButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  contactHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  contactAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  contactName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#CD5C5C',
  },
  contactInfo: {
    marginTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
}); 