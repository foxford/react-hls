import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '!script-loader!hls.js'

class HLSSource extends Component {
  constructor () {
    super(...arguments)

    this.hls = new Hls(this.props.options)

    this.onMediaAttached = this.onMediaAttached.bind(this)
    this.onManifestParsed = this.onManifestParsed.bind(this)
    this.onHlsError = this.onHlsError.bind(this)
    this.onFragParsingMetadata = this.onFragParsingMetadata.bind(this)
    this.onFragChanged = this.onFragChanged.bind(this)
  }

  componentDidMount () {
    const { video } = this.props

    if (Hls.isSupported()) {
      this.hls.attachMedia(video)
      // hls events
      this.hls.on(Hls.Events.MEDIA_ATTACHED, this.onMediaAttached)
      this.hls.on(Hls.Events.MANIFEST_PARSED, this.onManifestParsed)
      this.hls.on(Hls.Events.ERROR, this.onHlsError)
      this.hls.on(Hls.Events.FRAG_PARSING_METADATA, this.onFragParsingMetadata)
      this.hls.on(Hls.Events.FRAG_CHANGED, this.onFragChanged)
    }
  }

  onMediaAttached () {
    const { src } = this.props

    this.hls.loadSource(src)
  }

  onManifestParsed (e, data) {
    const {
      video,
      events: { onManifestParsed },
      onLoadLevels,
      autoPlay
    } = this.props

    this.hls.startLoad()
    if (autoPlay) video.play()
    onManifestParsed()
    if (data.levels.length > 1) {
      onLoadLevels(data.levels)
    }
  }

  onHlsError (e, data) {
    const { events: { onError } } = this.props

    onError(e, data)
  }

  onFragParsingMetadata (e, data) {
    const { events: { onFragParsingMetadata } } = this.props

    onFragParsingMetadata(e, data)
  }

  onFragChanged (e, data) {
    const { events: { onFragChanged } } = this.props

    onFragChanged(e, data)
  }

  render () {
    const { src, type } = this.props

    return (
      <source
        src={src}
        type={type}
      />
    )
  }
}

HLSSource.propTypes = {
  src: PropTypes.string.isRequired,
  type: PropTypes.string,
  video: PropTypes.object,
  autoPlay: PropTypes.bool.isRequired,
  options: PropTypes.object,
  events: PropTypes.object,
  onLoadLevels: PropTypes.func
}
HLSSource.defaultProps = {
  options: {},
  type: 'application/x-mpegURL',
  events: {
    onMediaAttached: () => {},
    onManifestParsed: () => {},
    onError: () => {},
    onFragChanged: () => {},
    onFragParsingMetadata: () => {}
  }
}

export default HLSSource
