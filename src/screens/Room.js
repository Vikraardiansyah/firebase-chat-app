import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Header, Text} from 'react-native-elements';
import {GiftedChat} from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Room = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState('');
  const [dataUser, setDataUser] = useState({});
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userData => setUser(userData));
    return subscriber;
  });

  useEffect(() => {
    database()
      .ref(`users/${user.uid}`)
      .once('value')
      .then(snapshot => {
        if (snapshot.val() !== null) {
          setDataUser(snapshot.val());
        }
      });
  });

  useEffect(() => {
    const {uid} = route.params.dataFriend;
    const subscriber = database()
      .ref(`chats/${user.uid}/${uid}/messages`)
      .on('value', snapshot => {
        if (snapshot.val() !== null) {
          setMessages(Object.values(snapshot.val()));
        }
      });
    return () => subscriber();
  }, [route, user]);

  const onSend = message => {
    const {dataFriend} = route.params;
    message.createdAt = database.ServerValue.TIMESTAMP;
    database()
      .ref(`chats/${user.uid}/${dataFriend.uid}/messages`)
      .push(message);
    database()
      .ref(`chats/${user.uid}/${dataFriend.uid}/data`)
      .set({
        message: message.text,
        createdAt: message.createdAt,
        email: dataFriend.email,
        name: dataFriend.name,
        uid: dataFriend.uid,
        avatar: dataFriend.avatar,
      });
    database()
      .ref(`chats/${dataFriend.uid}/${user.uid}/messages`)
      .push(message);
    database()
      .ref(`chats/${dataFriend.uid}/${user.uid}/data`)
      .set({
        message: message.text,
        createdAt: message.createdAt,
        email: dataUser.email,
        name: dataUser.name,
        uid: dataUser.uid,
        avatar: dataUser.avatar,
      });
  };

  return (
    <>
      <Header
        placement="left"
        leftComponent={
          <MaterialIcons
            name="arrow-back"
            size={30}
            style={styles.icon}
            onPress={() => navigation.goBack()}
          />
        }
        centerComponent={
          <Text style={styles.textHeader}>{route.params.dataFriend.name}</Text>
        }
        containerStyle={styles.header}
      />
      <GiftedChat
        messages={messages}
        onSend={message => onSend(message[0])}
        user={{
          _id: user.uid,
          name: dataUser.name,
        }}
      />
    </>
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
  icon: {marginBottom: 30},
  textHeader: {
    fontSize: 18,
    marginBottom: 30,
  },
});

export default Room;
