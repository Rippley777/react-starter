import React from 'react';
import { useSelector } from 'react-redux';
import { Button, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '@/mobile/components/Themed';
import useWebSocket from '@/hooks/useWebSocket';

export default function Chat() {
  const state = useSelector((state: any) => state.user.userData);

  const { messages, sendMessage, status } = useWebSocket(
    'wss://be-test-mongo-express.azurewebsites.net',
  );
  const [input, setInput] = React.useState('');
  const username = state.email ?? 'anonymous';
  const handleSend = () => {
    if (input) {
      sendMessage(`${username}: ${input}`);
      setInput('');
    }
  };
  return (
    <View>
      <Text>User: {username}</Text>
      <Text>Status: {status}</Text>
      {messages.map((message, index) => (
        <Text key={index}>{message}</Text>
      ))}
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Enter message"
      />
      <Button title="Send Message" onPress={handleSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    height: 40,
    margin: 12,
    minWidth: 200,
    borderColor: '#bbb',
    borderWidth: 1,
    padding: 10,
  },
});
