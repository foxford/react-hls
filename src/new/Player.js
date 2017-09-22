import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Player,
  BigPlayButton,
  ControlBar,
  VolumeMenuButton,
  PlaybackRateMenuButton
} from 'video-react'
import MobileDetect from 'mobile-detect'
import HLSSource from './HLSSource'
import QualityPicker from './QualityPicker'
import HlsLoader from './HLSLoader'
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

  componentDidMount () {
    this.videoElement = this.player.video.video
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

  _getDeviceName () {
    return new MobileDetect(window.navigator.userAgent).mobile()
  }

  render () {
    const {
      isHLS,
      src,
      autoPlay,
      muted,
      startTime,
      fluid,
      poster
    } = this.props
    const {
      activeTrack,
      tracks
    } = this.state
    const deviceName = this._getDeviceName()
    const isApple = deviceName === 'iPhone' || deviceName === 'iPad'

    return (
      <Player
        autoPlay={autoPlay}
        muted={muted}
        startTime={startTime}
        fluid={fluid}
        poster={poster}
        ref={(player) => { this.player = player }}
      >
        { (isHLS && !isApple)
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
          { tracks.length > 1 &&
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
  muted: PropTypes.bool.isRequired,
  startTime: PropTypes.number,
  fluid: PropTypes.bool,
  poster: PropTypes.string
}
ReactPlayer.defaultProps = {
  isHLS: true,
  autoPlay: false,
  muted: false,
  fluid: false
}

export { HlsLoader }
export default ReactPlayer
