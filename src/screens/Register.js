import React, {useState} from 'react';
import {View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.navigate('Login');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
      });
    database()
      .ref('users')
      .push({email, password});
  };

  return (
    <View>
      <Input
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={emailText => setEmail(emailText)}
      />
      <Input
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry={true}
        value={password}
        onChangeText={passwordText => setPassword(passwordText)}
      />
      <Button title="Sign Up" onPress={signUp} />
    </View>
  );
};

export default Register;
