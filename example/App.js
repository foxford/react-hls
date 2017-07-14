import React, { Component } from 'react'
import Player from '../dist/Player'
import './style.css'

class App extends Component {
  constructor () {
    super(...arguments)

    this.state = {
      source: 'https://media-store-rc.foxford.ru:10002/api/v1/buckets/foxford-media.webinar.hls/objects/42456.master.m3u8',
      token: '',
      readyToPlay: false
    }
  }

  handleInputChange (field, value) {
    this.setState({ [field]: value })
  }

  render () {
    const { readyToPlay, source, token } = this.state
    const playerOptions = {
      isHLS: true,
      src: source,
      autoPlay: true,
      fluid: true,
      hlsOptions: {
        debug: true,
        xhrSetup: (xhr) => {
          if (!token) return false
          xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        }
      }
    }

    return (
      <div className='player'>
        { !readyToPlay &&
          <div>
            <span>Video source:</span>
            <input
              defaultValue={source}
              type='text'
              onChange={(e) => { this.handleInputChange('source', e.target.value) }}
            />
            <span>Authorization token:</span>
            <input
              defaultValue={token}
              type='text'
              onChange={(e) => { this.handleInputChange('token', e.target.value) }}
            />
            <button onClick={() => { this.setState({ readyToPlay: true }) }} type='button'>Play</button>
          </div>
        }
        { readyToPlay && <Player {...playerOptions} /> }
      </div>
    )
  }
}

export default App
