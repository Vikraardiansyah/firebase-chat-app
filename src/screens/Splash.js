import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Image} from 'react-native';
import SpalshIcon from '../images/chitchat.png';

class Splash extends Component {
  async componentDidMount() {
    const data = await this.navigateToHome();
    if (data !== null) {
      this.props.navigation.navigate('Home');
    }
  }

  navigateToHome = async () => {
    const wait = time => new Promise(resolve => setTimeout(resolve, time));
    return wait(2000).then(() => this.props.navigation.navigate('Home'));
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar showHideTransition="fade" />
        <Image style={styles.image} source={SpalshIcon} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Splash;
