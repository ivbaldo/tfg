import {StyleSheet, View, Text} from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Link href="/about" style={styles.button}>
        Go to About Screen
      </Link>
      <Link href="/prueba" style={styles.button}>
        Go to Prueba Screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems : 'center',
    justifyContent : 'center',
  },
  text: {
    color : '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});