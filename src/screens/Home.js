import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Home = ({navigation}) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  // const [listUsers, setListUsers] = useState();

  // Handle user state changes
  function onAuthStateChanged(userData) {
    setUser(userData);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    database()
      .ref('users')
      .on('value', snapshot => {
        // setListUsers(snapshot.val());
      });
  }, []);

  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  const maps = () => {
    navigation.navigate('Maps');
  };

  const chat = () => {
    navigation.navigate('Chat');
  };

  const chatExample = () => {
    navigation.navigate('ChatExample');
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  });

  if (initializing) {
    return null;
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Login First</Text>
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome {user.email}</Text>
      <Button title="Chat" onPress={chat} />
      <Button title="Example Chat" onPress={chatExample} />
      <Button title="Logout" onPress={logout} />
      <Button title="Maps" onPress={maps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
  },
});

export default Home;
