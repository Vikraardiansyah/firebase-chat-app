import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, ToastAndroid} from 'react-native';
import {Input, Button} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [visibleToast, setvisibleToast] = useState(false);
  const [securityText, setSecurityText] = useState(true);
  const [icon, setIcon] = useState('md-eye-off');

  useEffect(() => setvisibleToast(false), [visibleToast]);

  const handleButtonPress = () => {
    setvisibleToast(true);
  };

  const Toast = ({visible, message}) => {
    if (visible) {
      ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        25,
        50,
      );
      return null;
    }
    return null;
  };

  const showPassword = () => {
    setSecurityText(!securityText);
    if (icon === 'md-eye') {
      setIcon('md-eye-off');
    } else {
      setIcon('md-eye');
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userData => setUser(userData));
    return subscriber;
  });

  useEffect(() => {
    if (user !== null) {
      const userUid = user.uid;
      database()
        .ref(`users/${user.uid}`)
        .set({uid: userUid, name, email});
    }
  }, [name, user, email]);

  const signUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        setErrorMessage('');
        navigation.navigate('Home');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setErrorMessage('email address is already in use');
          handleButtonPress();
        }

        if (error.code === 'auth/invalid-email') {
          setErrorMessage('That email address is invalid!');
          handleButtonPress();
        }

        if (error.code === 'auth/weak-password') {
          setErrorMessage('password must be 6 character');
          handleButtonPress();
        }

        console.log(error.code);
      });
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Input
        placeholder="Name"
        autoCapitalize="words"
        value={name}
        onChangeText={nameText => setName(nameText)}
      />
      <Input
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={emailText => setEmail(emailText)}
      />
      <Input
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry={securityText}
        value={password}
        onChangeText={passwordText => setPassword(passwordText)}
        rightIcon={<Ionicons name={icon} size={22} onPress={showPassword} />}
      />
      <Button
        buttonStyle={styles.button}
        type="outline"
        title="Sign Up"
        onPress={signUp}
      />
      <Button
        buttonStyle={styles.button}
        type="clear"
        title="Have account? Login"
        onPress={goToLogin}
      />
      <Toast visible={visibleToast} message={errorMessage} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  button: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    borderRadius: 30,
  },
});

export default Register;
