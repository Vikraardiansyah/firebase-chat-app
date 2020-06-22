import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';

const FriendList = ({navigation}) => {
  const [listUsers, setListUsers] = useState({});
  const [user, setUser] = useState('');

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userData => setUser(userData));
    return subscriber;
  });

  useEffect(() => {
    const subscriber = database()
      .ref('users')
      .on('value', snapshot => {
        if (snapshot.val() !== null) {
          setListUsers(snapshot.val());
        }
      });
    return () => subscriber();
  });

  const goToChat = dataFriend => {
    navigation.navigate('Room', {
      dataFriend,
    });
  };

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({item}) => {
    if (item.uid !== user.uid) {
      return (
        <TouchableOpacity onPress={() => goToChat(item)}>
          <ListItem title={item.name} bottomDivider chevron />
        </TouchableOpacity>
      );
    }
  };
  return (
    <>
      <FlatList
        keyExtractor={keyExtractor}
        data={Object.values(listUsers)}
        renderItem={renderItem}
      />
    </>
  );
};
export default FriendList;
