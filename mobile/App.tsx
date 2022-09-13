import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <Text>Olá André</Text>
      <Text>Iniciando Projeto nlw-eSports</Text>
      <Text>Preparar para decolagem do foguete! ...3...2...1</Text>
      <Text>Iniciar Decolagem! Boa Sorte</Text>
      <Button title='Decolagem!' style={styles.button} />
      <StatusBar style="auto" />
    </View>
  );
}

interface ButtonProps {
  title: string;
  style: object;
}

function Button(props: ButtonProps) {
  return (
    <TouchableOpacity>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90ee90',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#fff',
    marginTop: '15px',
  }
});
