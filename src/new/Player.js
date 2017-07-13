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
import HLSQualityPicker from './HLSQualityPicker'
import 'video-react/dist/video-react.css'

class ReactPlayer extends Component {
  constructor () {
    super(...arguments)

    this.state = {
      hlsLevels: []
    }

    this.onLoadLevels = this.onLoadLevels.bind(this)
  }

  onLoadLevels (levels) {
    this.setState({ hlsLevels: levels })
  }

  render () {
    const {
      isHLS,
      src,
      autoPlay,
      muted
    } = this.props
    const { hlsLevels } = this.state

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
            onLoadLevels={this.onLoadLevels}
          />
          : <source src={src} />
        }
        <BigPlayButton position='center' />
        <ControlBar>
          <VolumeMenuButton order={6} />
          <PlaybackRateMenuButton
            rates={[3, 2.5, 2, 1.75, 1.5, 1.25, 1, 0.75, 0.5]}
            order={7}
          />
          { hlsLevels.length > 0 &&
            <HLSQualityPicker hls={this.player.hls} levels={hlsLevels} />
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
