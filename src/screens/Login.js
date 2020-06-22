import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, ToastAndroid} from 'react-native';
import {Input, Button} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const signIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setErrorMessage();
        navigation.navigate('Home');
      })
      .catch(error => {
        if (error.code === 'auth/wrong-password') {
          setErrorMessage('wrong password');
          handleButtonPress();
        }
        if (error.code === 'auth/invalid-email') {
          setErrorMessage('invalid email');
          handleButtonPress();
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
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
        title="Login"
        onPress={() => {
          signIn();
        }}
        buttonStyle={styles.button}
        type="outline"
      />
      <Button
        title="Don't have account? Sign Up"
        onPress={() => navigation.navigate('Register')}
        buttonStyle={styles.button}
        type="clear"
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
  viewButton: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {marginLeft: 20, marginRight: 20, marginBottom: 5, borderRadius: 30},
});

export default Login;
