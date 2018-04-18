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
      console.log('pop state')
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
    let newUrl = window.location.href
    if (source) newUrl += `?url=${source}`
    if (token) newUrl += `&token=${token}`
    if (source) {
      window.history.pushState({}, '', newUrl)
      this.setState({ readyToPlay: true })
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
      autoPlay: false,
      fluid: true,
      hlsOptions: {
        debug: true,
        xhrSetup: (xhr) => {
          if (!token) return false
          xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        }
      },
      chapters: [
        {start: 0, end: 10, label: 'Intro'},
        {start: 10, end: 20, label: 'Chapter 1. Example of label'},
        {start: 20, end: 30, label: 'Chapter 2. Example of label'},
        {start: 30, end: 40, label: 'Chapter 3. Example of label'},
        {start: 40, end: 50, label: 'Chapter 4. Example of label'},
        {start: 50, end: 60, label: 'Outro'}
      ]
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
