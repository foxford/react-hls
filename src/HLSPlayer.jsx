import React, {Component, PropTypes} from 'react';
import Hls from 'hls.js/src';

class HLSPlayer extends Component {

  constructor(props, context) {
    super(props, context);
  }

  static propTypes = {
    source: PropTypes.string.isRequired,
    customControls: PropTypes.shape({
      bgColor: PropTypes.string
    })
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
    const { customControls } = this.props;
    const customControlsAttr = customControls ? 'controls' : false;
    const videoContainerStyles = {
      position: 'relative'
    };
    const videoStyles = {
      width:'100%',
      height: '100%'
    };
    const controlsPanelStyles = {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '5px',
      background: '#375a7f'
    };
    const buttonStyles = {
      background: 'rgba(0,0,0,.5)',
      color: '#eee'
    };

    return (
      <div style={videoContainerStyles}>
        <video style={videoStyles} ref={ (video) => { this.videoElement = video; } } controls={customControlsAttr} />
        {
          customControls &&
            <div style={controlsPanelStyles}>
              <button style={buttonStyles} type="button">Play</button>
              <input type="range" value="0" />
              <button style={buttonStyles} type="button">Mute</button>
              <input type="range" min="0" max="1" step="0.1" value="1" />
              <button style={buttonStyles} type="button">Full-Screen</button>
            </div>
        }
      </div>
    );
  }
}

export default HLSPlayer;

module.exports = HLSPlayer;