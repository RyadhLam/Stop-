import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

export default function BackgroundGradient({ children }) {
  return (
    <LinearGradient
      colors={['#fdbfd5', '#ebc6de', '#c8b8a2']}
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 