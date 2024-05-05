import React from 'react';
import { useSelector } from 'react-redux';
import { Button, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '@/mobile/components/Themed';
import useWebSocket from '@/shared/hooks/useWebSocket';

export default function Chat() {
  const state = useSelector((state: any) => state.user.userData);

  const { messages, sendMessage, status } = useWebSocket(
    'ws://localhost:8080' ?? 'wss://be-test-mongo-express.azurewebsites.net',
  );
  const [input, setInput] = React.useState('');
  const username = state.email ?? 'anonymous';
  const handleSend = () => {
    if (input) {
      sendMessage({ type: 'chat-message', username, content: input });
      setInput('');
    }
  };
  return (
    <View>
      <Text>User: {username}</Text>
      <Text>Status: {status}</Text>
      {messages
        .filter((message) => message.type === 'chat-message')
        .map((message, index) => (
          <Text key={index}>{message.message}</Text>
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
