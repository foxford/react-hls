import React, { Component } from 'react'
import Player from '../dist/Player'
import './style.css'

class App extends Component {
  render () {
    const playerOptions = {
      isHLS: true,
      src: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8',
      autoPlay: false,
      hlsOptions: {
        debug: true
      }
    }

    return (
      <div className='player'>
        <Player {...playerOptions} />
      </div>
    )
  }
}

export default App
