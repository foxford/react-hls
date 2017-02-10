import React, {Component} from 'react';
import Hls from 'hls.js/lib';

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
      <video style={ { width:'100%', height: '100%' } } ref={ (video) => { this.videoElement = video; } } controls />
    );
  }
}

export default HLSPlayer;

module.exports = HLSPlayer;