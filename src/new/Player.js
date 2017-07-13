import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Player,
  BigPlayButton,
  ControlBar,
  VolumeMenuButton,
  PlaybackRateMenuButton
} from 'video-react'
import HLSSource from './HLSSource'
import QualityPicker from './QualityPicker'
import 'video-react/dist/video-react.css'

class ReactPlayer extends Component {
  constructor () {
    super(...arguments)

    this.state = {
      activeTrack: -1,
      tracks: []
    }

    this.onLoadLevels = this.onLoadLevels.bind(this)
    this.onSetTrack = this.onSetTrack.bind(this)
  }

  onLoadLevels (activeTrack, tracks) {
    this.setState({
      activeTrack,
      tracks
    })
  }

  onSetTrack (activeTrack) {
    this.setState({ activeTrack })
  }

  render () {
    const {
      isHLS,
      src,
      autoPlay,
      muted
    } = this.props
    const {
      activeTrack,
      tracks
    } = this.state

    return (
      <Player
        autoPlay={autoPlay}
        muted={muted}
        ref={(player) => { this.player = player }}
      >
        { isHLS
          ? <HLSSource
            isVideoChild
            {...this.props}
            activeLevel={activeTrack}
            onLoadLevels={this.onLoadLevels}
          />
          : <source src={src} />
        }
        <BigPlayButton position='center' />
        <ControlBar>
          <VolumeMenuButton order={7} />
          <PlaybackRateMenuButton
            rates={[3, 2.5, 2, 1.75, 1.5, 1.25, 1, 0.75, 0.5]}
            order={7.1}
          />
          { tracks.length > 0 &&
            <QualityPicker
              activeTrack={activeTrack}
              tracks={tracks}
              onSetTrack={this.onSetTrack}
              order={8}
            />
          }
        </ControlBar>
      </Player>
    )
  }
}

ReactPlayer.propTypes = {
  isHLS: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  autoPlay: PropTypes.bool.isRequired,
  muted: PropTypes.bool.isRequired
}
ReactPlayer.defaultProps = {
  isHLS: true,
  autoPlay: false,
  muted: false
}

export default ReactPlayer
