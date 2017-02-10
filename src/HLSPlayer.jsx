import React, {Component} from 'react';
import 'script-loader!hls.js';

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