import React, { Component } from "react"
import Mood from './Mood'
import ChuckNorrisFact from './ChuckNorrisFact'
import RandomJoke from './RandomJoke'
import RandomMeme from './RandomMeme'
import sad from '../../assets/images/sad'
import happy from '../../assets/images/happy'
import okay from '../../assets/images/okay'
import silly from '../../assets/images/silly'
import axios from 'axios'
import PieChart from 'react-minimal-pie-chart';
import { passCsrfToken } from '../util/helpers'

import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from 'styled-components';

class Index extends React.Component {

  state = {
    happy: 0,
    sad: 0,
    silly: 0,
    okay: 0,
    currentMood: ""
  }

  componentDidMount() {
    passCsrfToken(document, axios)
    this.setMoods(this)
  }

  handleClick = (mood) => {
    let currentMood = { currentMood: mood }
    this.createMood(currentMood, this.setMoods)
    this.setState({
      currentMood: mood
    })
  }

  createMood(currentMood, callback) {
    axios
      .post('/api/moods', currentMood)
      .then(response => {
        console.log(response)
        console.log(response.data)
        callback(this)
      })
      .catch(error => {
        console.log(error)
      })
  }

  setMoods(self) {
    axios
      .get('/api/moods')
      .then(response => {
        self.setState({
          happy: response.data.happy,
          sad: response.data.sad,
          okay: response.data.okay,
          silly: response.data.silly,
          currentMood: response.data.currentMood
        });
      })
  }


  theme = {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#EF6C00',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#EF6C00',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',

  };



  steps = [
    {
      id: "Greet",
      message: "Hello, How are you feeling today?",
      trigger: "Today"
    },
    {
      id: "Today",
      component: (
        <div className="mood-wrapper">
          <Mood moodType='happy' moodImage={happy} handleClick={this.handleClick} currentMood={this.state.currentMood} />
          <Mood moodType='okay' moodImage={okay} handleClick={this.handleClick} currentMood={this.state.currentMood} />
          <Mood moodType='silly' moodImage={silly} handleClick={this.handleClick} currentMood={this.state.currentMood} />
          <Mood moodType='sad' moodImage={sad} handleClick={this.handleClick} currentMood={this.state.currentMood} />
          {() => this.state.current_mood}
        </div>
      ),
      trigger: 'Mood'
    }, {
      id: "Mood",
      message: `My mood is {previousValue}`,
      end: true,
    }
  ];

  config = {
    width: "70vw",
    height: "80vh",

  };
  render() {
    return (

      <div className='mood-container'>
        {/* <h1 className='welcome-sentence title is-1'>Hello.
        <br />
          How are you feeling today?</h1>
        <div className="mood-wrapper">
          <Mood moodType='happy' moodImage={happy} handleClick={this.handleClick} currentMood={this.state.currentMood}/>
          <Mood moodType='okay' moodImage={okay} handleClick={this.handleClick} currentMood={this.state.currentMood}/>
          <Mood moodType='silly' moodImage={silly} handleClick={this.handleClick} currentMood={this.state.currentMood}/>
          <Mood moodType='sad' moodImage={sad} handleClick={this.handleClick} currentMood={this.state.currentMood}/>
        </div>
        <PieChart
          data={[
            { title: 'Okay', value: this.state.okay, color: '#C13C37' },
            { title: 'Happy', value: this.state.happy, color: '#E38627' },
            { title: 'Silly', value: this.state.silly, color: '#6A4335' },
            { title: 'Sad', value: this.state.sad, color: '#6A2135' }
          ]}
          style={{ height: '15vw' }}
          label
          animate
          labelStyle={{
            fontSize: '10px',
            fontColor: '#FFFFFF',
            fontFamily: 'sans-serif',
            fill: '#121212'
          }}
        />
        <div className="entertainment-container">
          <ChuckNorrisFact />
          <RandomJoke />
          <RandomMeme />
        </div> */}
        <h1>hello happy chappy</h1>

        <div className="chat-container">
          <ThemeProvider theme={this.theme}>
            <ChatBot steps={this.steps}  {...this.config} />
          </ThemeProvider >
        </div>
      </div>
    );
  }
}

export default Index
