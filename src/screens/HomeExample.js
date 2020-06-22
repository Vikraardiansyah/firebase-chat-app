import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Home = ({navigation}) => {
  // Set an initializing state whilst Firebase connects
  const [user, setUser] = useState();
  // const [listUsers, setListUsers] = useState();

  // Handle user state changes
  function onAuthStateChanged(userData) {
    setUser(userData);
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

  const chatList = () => {
    navigation.navigate('ChatList');
  };

  const chatExample = () => {
    navigation.navigate('ChatExample');
  };

  const friendlist = () => {
    navigation.navigate('FriendList');
  };

  const location = () => {
    navigation.navigate('Location');
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  });

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
      <Button title="Chat" onPress={chatList} />
      <Button title="Example Chat" onPress={chatExample} />
      <Button title="Logout" onPress={logout} />
      <Button title="Maps" onPress={maps} />
      <Button title="Friend List" onPress={friendlist} />
      <Button title="Location" onPress={location} />
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
