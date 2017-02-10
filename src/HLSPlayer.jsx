import React, {Component} from 'react';
require('hls.js');

class HLSPlayer extends Component {

  componentDidMount() {
    if (Hls.isSupported()) {
      const hls = new Hls();

      hls.loadSource('http://www.streambox.fr/playlists/test_001/stream.m3u8');
      hls.attachMedia(this.videoElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.videoElement.play();
      });
    }
  }

  render() {
    return (
      <video ref={ (video) => { this.videoElement = video; } } />
    );
  }
}

export default HLSPlayer;

module.exports = HLSPlayer;