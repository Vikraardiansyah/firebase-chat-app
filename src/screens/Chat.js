import React, {useState, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const Chat = () => {
  const [messages, setMessages] = useState();
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userData => setUser(userData));
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    database()
      .ref('chats')
      .on('value', snapshot => {
        setMessages(snapshot.val());
        setLoading(true);
      });
  }, []);

  const onSend = message => {
    database()
      .ref('chats')
      .push(messages);
  };

  return (
    <>
      {loading ? (
        <GiftedChat
          showUserAvatar={true}
          messages={Object.values(messages)}
          onSend={message => onSend(message[0])}
          user={{
            _id: user.uid,
            name: 'Vikra Ardiansyah',
          }}
        />
      ) : null}
    </>
  );
};

export default Chat;
