import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.navigate('Home');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
      });
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <Input
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry={true}
        value={password}
        onChangeText={password => setPassword(password)}
      />
      <View style={styles.viewButton}>
        <Button title="Login" onPress={signIn} buttonStyle={styles.button} />
        <Button
          title="Sign Up"
          onPress={() => navigation.navigate('Register')}
          buttonStyle={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewButton: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    width: 150,
    margin: 10,
  },
});

export default Login;
