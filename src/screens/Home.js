import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, View, SafeAreaView} from 'react-native';
import {ListItem, Text, Button, Header} from 'react-native-elements';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Home = ({navigation}) => {
  const [user, setUser] = useState();
  const [allChat, setAllChat] = useState([]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userData => setUser(userData));
    return subscriber;
  });

  useEffect(() => {
    if (user) {
      const subscriber = database()
        .ref(`chats/${user.uid}`)
        .orderByKey()
        .on('value', snapshot => {
          if (snapshot.val() !== null) {
            let data = Object.values(snapshot.val());
            setAllChat(data);
          }
        });
      return () => subscriber();
    }
  }, [user]);

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => goToRoom(item.data)}>
      {item.data ? (
        <ListItem
          title={item.data.name}
          subtitle={item.data.message}
          leftAvatar={{
            source: {
              uri: item.data.avatar
                ? item.data.avatar
                : 'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg',
            },
          }}
          bottomDivider
          rightElement={
            <Text>
              {new Date(item.data.createdAt)
                .toLocaleTimeString()
                .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3')}
            </Text>
          }
        />
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );

  const goToRoom = dataFriend => {
    navigation.navigate('Room', {
      dataFriend,
    });
  };

  const goToFriendList = () => {
    navigation.navigate('Friend');
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          placement="left"
          centerComponent={<Text style={styles.textHeader}>ChitChat</Text>}
          containerStyle={styles.header}
        />
        <View style={styles.content}>
          <Text style={styles.text}>You must login first</Text>
          <Button
            buttonStyle={styles.button}
            title="Login"
            type="clear"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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
        centerComponent={<Text style={styles.textHeader}>ChitChat</Text>}
        containerStyle={styles.header}
      />
      <FlatList
        keyExtractor={keyExtractor}
        data={allChat}
        renderItem={renderItem}
      />
      <View style={styles.buttonMessageView}>
        <Button
          icon={<MaterialIcons name="message" size={32} color="white" />}
          buttonStyle={styles.buttonMessage}
          onPress={goToFriendList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    height: 60,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  icon: {marginBottom: 30},
  textHeader: {
    fontSize: 22,
    marginBottom: 30,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
  },
  button: {
    marginLeft: 120,
    marginRight: 120,
  },
  buttonMessageView: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 1,
  },
  buttonMessage: {
    borderRadius: 50,
    padding: 13,
  },
});

export default Home;
