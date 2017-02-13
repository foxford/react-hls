import React, {Component, PropTypes} from 'react';
const Hls = require('hls.js/src');

class HLSPlayer extends Component {

  constructor(props, context) {
    super(props, context);
  }

  static propTypes = {
    source: PropTypes.string.isRequired
  };

  componentDidMount() {
    const { source } = this.props;

    if (Hls.isSupported()) {
      const hls = new Hls();

      hls.loadSource(source);
      hls.attachMedia(this.videoElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.videoElement.play();
      });
    }
  }

  render() {
    return (
      <video style={ { width:'100%', height: '100%' } } ref={ (video) => { this.videoElement = video; } } controls />
    );
  }
}

export default HLSPlayer;

module.exports = HLSPlayer;