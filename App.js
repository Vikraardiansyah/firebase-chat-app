import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Chat from './src/screens/Chat';
import ChatExample from './src/screens/ChatExample';
import Maps from './src/screens/Maps';

const {Navigator, Screen} = createStackNavigator();

const App = () => {
  // useEffect(() => {
  //   // auth()
  //   //   .signInAnonymously()
  //   //   .then(() => {
  //   //     console.log('User signed in anonymously');
  //   //   })
  //   //   .catch(error => {
  //   //     if (error.code === 'auth/operation-not-allowed') {
  //   //       console.log('Enable anonymous in your firebase console.');
  //   //     }
  //   //     console.error(error);
  //   //   });
  // }, []);

  return (
    <NavigationContainer>
      <Navigator initialRouteName="Home">
        <Screen name="Home" component={Home} />
        <Screen name="Login" component={Login} />
        <Screen name="Register" component={Register} />
        <Screen name="Chat" component={Chat} />
        <Screen name="ChatExample" component={ChatExample} />
        <Screen name="Maps" component={Maps} />
      </Navigator>
    </NavigationContainer>
  );
};

export default App;
