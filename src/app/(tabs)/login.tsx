import React from 'react';
import { Button, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { router, Link } from 'expo-router';
import { Text, View } from '@/mobile/components/Themed';
import { signIn } from '@/auth/authService';
import { setUserData } from '@/store/reducers/users';

export default function Login() {
  const dispatch = useDispatch();
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const userCredential = await signIn(email, password);

      dispatch(setUserData({ email: email }));

      console.log(userCredential.user);
      router.replace('/');
      // Redirect or perform additional actions
    } catch (error: any) {
      setError(error.message);
      console.error(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text>{error}</Text>
      <Text style={styles.title}>Please login or sign up</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          placeholder="Email"
          value={email}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={onChangePassword}
          placeholder="Password"
          value={password}
        />
      </SafeAreaView>
      <Button
        onPress={handleSubmit}
        title="Sign In"
        color="#841584"
        accessibilityLabel="Yo!"
      />
      <Link style={styles.link} href="/signup">
        Sign Up
      </Link>
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
  link: {
    color: 'blue',
    paddingTop: 10,
  },
});
