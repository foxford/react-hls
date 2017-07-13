import React, { Component } from 'react'
import Player from '../dist/Player'
import './style.css'

class App extends Component {
  render () {
    const playerOptions = {
      isHLS: true,
      src: 'https://media-store-rc.foxford.ru:10002/api/v1/buckets/foxford-media.webinar.hls/objects/42456.master.m3u8',
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
