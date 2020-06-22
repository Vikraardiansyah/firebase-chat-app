import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Room from './src/screens/Room';
import FriendList from './src/screens/FriendList';
import Location from './src/screens/Location';
import Profile from './src/screens/Profile';
import Splash from './src/screens/Splash';

const {Navigator, Screen} = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen name="Location" component={Location} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};
const App = () => {
  const [getData, setGetData] = useState(false);

  useEffect(() => {
    setTimeout(() => setGetData(true), 1000);
  });

  return (
    <NavigationContainer>
      <Navigator initialRouteName="Home">
        {getData ? (
          <>
            <Screen
              name="Home"
              component={DrawerStack}
              options={{
                headerShown: false,
              }}
            />
            <Screen name="Login" component={Login} />
            <Screen name="Register" component={Register} />
            <Screen
              name="Room"
              component={Room}
              options={{headerShown: false}}
            />
            <Screen name="Friend" component={FriendList} />
          </>
        ) : (
          <Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
        )}
      </Navigator>
    </NavigationContainer>
  );
};

export default App;
