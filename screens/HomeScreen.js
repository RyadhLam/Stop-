import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.circleButton}
        onPress={() => Alert.alert(
          "Alerte !",
          "Ceci est une alerte",
          [{ text: "OK", onPress: () => console.log("OK Pressé") }]
        )}
      >
        <Text style={styles.buttonText}>ALERTE</Text>
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
    paddingTop: -75,  // Pour compenser la hauteur du header
  },
  circleButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 20,
    fontWeight: 'bold',
  }
}); 