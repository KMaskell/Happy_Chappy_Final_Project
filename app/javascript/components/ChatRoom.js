import React from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
import axios from 'axios';
import Messages from './Messages'

class ChatRoom extends React.Component {
  state = {
    messages: [],
    activeConversation: 2,
    text: ""
  };

  handleReceivedMessage = response => {
    let messages = this.state.messages
    if(messages.every((message) => {
      return message.id != response.id
    })) {
      messages.push(response)
    }
    this.setState({
      messages: messages
    })
    console.log(this.state.messages)
  };

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    axios
      .post(`${API_ROOT}/messages`, {
        text: this.state.text,
        conversation_id: this.state.activeConversation
      })
    this.setState({ text: '' });
  };

  render = () => {
    return (
      <div className="conversationsList">

        <ActionCableConsumer
          channel={{ channel: 'MessagesChannel', conversation: this.state.activeConversation }}
          onReceived={this.handleReceivedMessage}
        />

        <Messages messages={this.state.messages}/>

        <div className="newMessageForm">
          <form onSubmit={this.handleSubmit}>
            <label>New Message:</label>
            <br />
            <input
              type="text"
              value={this.state.text}
              onChange={this.handleChange}
            />
            <input type="submit" />
          </form>
       </div>
      </div>
    );
  };
}

export default ChatRoom;