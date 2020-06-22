import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';

class Example extends React.Component {
  state = {
    messages: [
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date().getTime(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ],
  };

  componentDidUpdate(_, previousState) {
    if (previousState !== this.state) {
      console.log(this.state.messages);
    }
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    console.log(this.state.messages);
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    );
  }
}

export default Example;
