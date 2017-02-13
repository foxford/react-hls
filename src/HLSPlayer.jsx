import React, {Component, PropTypes} from 'react';
import Hls from 'hls.js/src';

class HLSPlayer extends Component {

  constructor(props, context) {
    super(props, context);
  }

  static propTypes = {
    source: PropTypes.string.isRequired,
    customControls: PropTypes.shape({
      panelBg: PropTypes.string,
      buttonBg: PropTypes.string,
      buttonColor: PropTypes.string,
      playBtnContent: PropTypes.string,
      volumeBtnContent: PropTypes.string,
      fullScreenBtnContent: PropTypes.string
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

  rawHTML(html) {
    return { __html: html };
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
      display: 'flex',
      justifyContent: 'space-around',
      padding: '5px',
      background: customControls && customControls.panelBg || '#000'
    };
    const buttonStyles = {
      background: customControls && customControls.buttonBg || 'rgba(0,0,0,.5)',
      color: customControls && customControls.buttonColor || '#eee',
      border: 'none'
    };
    const rangeDuration = {
      flexBasis: '60%'
    };
    const rangeVolume = {
      flexBasis: '10%'
    };

    return (
      <div style={videoContainerStyles}>
        <video style={videoStyles} ref={ (video) => { this.videoElement = video; } } controls={customControlsAttr} />
        {
          customControls &&
            <div style={controlsPanelStyles}>
              <button style={buttonStyles} type="button">
                { customControls.playBtnContent ? <span dangerouslySetInnerHTML={ this.rawHTML(customControls.playBtnContent) } /> : 'Play' }
              </button>
              <input style={rangeDuration} type="range" value="0" />
              <button style={buttonStyles} type="button">
                { customControls.volumeBtnContent ? <span dangerouslySetInnerHTML={ this.rawHTML(customControls.volumeBtnContent) } /> : 'Mute' }
              </button>
              <input style={rangeVolume} type="range" min="0" max="1" step="0.1" value="1" />
              <button style={buttonStyles} type="button">
                { customControls.fullScreenBtnContent ? <span dangerouslySetInnerHTML={ this.rawHTML(customControls.fullScreenBtnContent) } /> : 'Full-screen' }
              </button>
            </div>
        }
      </div>
    );
  }
}

export default HLSPlayer;

module.exports = HLSPlayer;