import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Image, Text, ListItem, Button, Header} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window');

const Profile = ({navigation}) => {
  const [user, setUser] = useState('');
  const [dataUser, setDataUser] = useState({});
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userData => setUser(userData));
    return subscriber;
  });

  useEffect(() => {
    if (user) {
      database()
        .ref(`users/${user.uid}`)
        .once('value')
        .then(snapshot => {
          if (snapshot.val() !== null) {
            setDataUser(snapshot.val());
          }
        });
    }
  });

  const logout = () => {
    auth()
      .signOut()
      .then(() => navigation.navigate('Home'));
  };

  return (
    <>
      <Header
        placement="left"
        leftComponent={
          <MaterialIcons
            name="menu"
            size={30}
            style={styles.icon}
            onPress={() => navigation.toggleDrawer()}
          />
        }
        centerComponent={<Text style={styles.textHeader}>Profile</Text>}
        containerStyle={styles.header}
      />
      <Image
        style={styles.image}
        source={{
          uri: dataUser.image
            ? dataUser.image
            : 'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg',
        }}
      />
      <ListItem
        title={
          <>
            <Text style={styles.textInfo}>name</Text>
            <Text style={styles.textName}>{dataUser.name}</Text>
          </>
        }
        bottomDivider
      />
      <ListItem
        title={
          <>
            <Text style={styles.textInfo}>email</Text>
            <Text style={styles.textName}>{dataUser.email}</Text>
          </>
        }
        bottomDivider
      />
      <Button
        title="Logout"
        type="clear"
        titleStyle={styles.titleButton}
        onPress={logout}
      />
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width,
    height: height * 0.4,
  },
  textInfo: {
    color: '#7e7e7e',
  },
  textName: {
    fontSize: 20,
  },
  titleButton: {
    fontSize: 20,
  },
  header: {
    backgroundColor: 'white',
    height: 60,
  },
  icon: {marginBottom: 30},
  textHeader: {
    fontSize: 22,
    marginBottom: 30,
  },
});

export default Profile;
