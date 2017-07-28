import React, { Component } from 'react'
import Player from '../dist/Player'
import { parseQueryString } from './utils'
import './style.css'

class App extends Component {
  constructor () {
    super(...arguments)

    this.state = {
      source: '',
      token: '',
      readyToPlay: false
    }

    this.handlePlayButton = this.handlePlayButton.bind(this)

    window.addEventListener('popstate', () => {
      this.setComponentState()
    })
  }

  componentWillMount () {
    this.setComponentState()
  }

  handleInputChange (field, value) {
    this.setState({ [field]: value })
  }

  handlePlayButton () {
    const { source, token } = this.state
    let newUrl = ''
    if (source) newUrl += `/?url=${source}`
    if (token) newUrl += `&token=${token}`
    if (source) {
      this.setState({ readyToPlay: true })
      window.history.pushState({}, '', newUrl)
    }
  }

  setComponentState () {
    const { token, url } = parseQueryString()
    const newState = {}

    if (token) newState.token = token
    if (url) newState.source = url
    if (Object.keys(newState).length) {
      newState.readyToPlay = true
      this.setState(newState)
    } else {
      this.setState({ source: '', token: '', readyToPlay: false })
    }
  }

  render () {
    const { readyToPlay, source, token } = this.state
    const playerOptions = {
      isHLS: true,
      src: source,
      autoPlay: true,
      fluid: true,
      hlsOptions: {
        debug: false,
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
            <button onClick={this.handlePlayButton} type='button'>Play</button>
          </div>
        }
        { readyToPlay && <Player {...playerOptions} /> }
      </div>
    )
  }
}

export default App
