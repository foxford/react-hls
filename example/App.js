import React, { Component } from 'react'
import Player from '../dist/Player'
import { parseQueryString } from './utils'
import './style.css'

const DURATION = 60
const SOURCE = ''
const TOKEN = ''

class App extends Component {
  constructor () {
    super(...arguments)

    this.state = {
      source: SOURCE,
      token: TOKEN,
      duration: DURATION,
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
    const { source, token, duration } = this.state
    const urlChunks = []
    if (duration) urlChunks.push(`duration=${duration}`)
    if (source) urlChunks.push(`url=${source}`)
    if (token) urlChunks.push(`token=${token}`)
    const newUrl = `${window.location.href}?${urlChunks.join('&')}`
    if (source) {
      window.history.pushState({}, '', newUrl)
      this.setState({ readyToPlay: true })
    }
  }

  prepareChapters (duration = 0) {
    const chapters = [
      'Intro',
      'Chapter 1. Example of label', 'Chapter 2. Example of label',
      'Chapter 3. Example of label', 'Chapter 4. Example of label',
      'Outro'
    ]
    const getStartEnd = (length, list) => {
      const chunkLength = length / list.length
      return list.map((it, i) => ({
        start: i * chunkLength,
        end: i * chunkLength + chunkLength,
        label: it
      }))
    }
    return getStartEnd(duration, chapters)
  }

  setComponentState () {
    const { token, url, duration } = parseQueryString()
    const newState = {}

    if (token) newState.token = token
    if (url) newState.source = url
    if (duration) newState.duration = duration
    if (Object.keys(newState).length) {
      newState.readyToPlay = true
      this.setState(newState)
    } else {
      this.setState({ source: SOURCE, token: TOKEN, duration: DURATION, readyToPlay: false })
    }
  }

  render () {
    const { readyToPlay, source, token, duration } = this.state
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
      chapters: this.prepareChapters(duration)
    }

    return (
      <div className='player'>
        { !readyToPlay &&
          <form onSubmit={this.handlePlayButton}>
            <span>Video source:</span>
            <input
              defaultValue={source}
              type='text'
              onChange={(e) => { this.handleInputChange('source', e.target.value) }}
            />
            <br/>
            <span>Supposed duration:</span>
            <input
              defaultValue={duration}
              type='text'
              onChange={(e) => { this.handleInputChange('duration', e.target.value) }}
            />
            <br/>
            <span>Authorization token:</span>
            <input
              defaultValue={token}
              type='text'
              onChange={(e) => { this.handleInputChange('token', e.target.value) }}
            />
            <br/>
            <button type='submit'>Play</button>
          </form>
        }
        { readyToPlay && <Player {...playerOptions} /> }
      </div>
    )
  }
}

export default App
