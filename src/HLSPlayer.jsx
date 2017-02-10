import React, {Component} from 'react';
const Hls = require('hls.js'); // for Hls object visibility

class HLSPlayer extends Component {
  render() {
    return (
      <div>
        HLS Player!
      </div>
    );
  }
}

export default HLSPlayer;

module.exports = HLSPlayer;