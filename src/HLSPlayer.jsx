import React, {Component, PropTypes} from 'react';
import Hls from 'hls.js/src';

class HLSPlayer extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      isPlaying: false,
      isMuted: false
    };

    this.handlePlayBtn = this.handlePlayBtn.bind(this);
    this.handleFullScreenBtn = this.handleFullScreenBtn.bind(this);
    this.handleVolumeBtn = this.handleVolumeBtn.bind(this);
  }

  static propTypes = {
    source: PropTypes.string.isRequired,
    customControls: PropTypes.shape({
      panelBg: PropTypes.string,
      buttonBg: PropTypes.string,
      buttonColor: PropTypes.string,
      playBtnContent: PropTypes.string,
      pauseBtnContent: PropTypes.string,
      volumeBtnContent: PropTypes.string,
      muteBtnContent: PropTypes.string,
      fullScreenBtnContent: PropTypes.string
    })
  };

  componentDidMount() {
    const { isPlaying } = this.state;
    const { source } = this.props;

    if (Hls.isSupported()) {
      const hls = new Hls();

      hls.loadSource(source);
      hls.attachMedia(this.videoElement);

      if (isPlaying) {
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          this.videoElement.play();
        });
      }
    }
  }

  rawHTML(html) {
    return { __html: html };
  }

  handlePlayBtn() {
    const { isPlaying } = this.state;

    if (isPlaying)
      this.videoElement.pause();
    else
      this.videoElement.play();

    this.setState({
      isPlaying: !isPlaying
    });
  }

  handleFullScreenBtn() {
    if (this.videoElement.requestFullscreen)
      this.videoElement.requestFullscreen();
    else if (this.videoElement.mozRequestFullScreen)
      this.videoElement.mozRequestFullScreen();
    else if (this.videoElement.webkitRequestFullscreen)
      this.videoElement.webkitRequestFullscreen();
  }

  handleVolumeBtn() {
    const { isMuted } = this.state;

    this.videoElement.mute = !isMuted;

    this.setState({
      isMuted: !isMuted
    });
  }

  render() {
    const { isPlaying, isMuted } = this.state;
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
      border: 'none',
      outline: 'none'
    };
    const rangeDuration = {
      flexBasis: '60%'
    };
    const rangeVolume = {
      flexBasis: '10%'
    };
    let playBtnContent = '';
    let volumeBtnContent = '';

    if (isPlaying)
      playBtnContent = customControls.playBtnContent ? <span dangerouslySetInnerHTML={ this.rawHTML(customControls.playBtnContent) } /> : 'Play';
    else
      playBtnContent = customControls.pauseBtnContent ? <span dangerouslySetInnerHTML={ this.rawHTML(customControls.pauseBtnContent) } /> : 'Pause';

    if (isMuted)
      volumeBtnContent = customControls.volumeBtnContent ? <span dangerouslySetInnerHTML={ this.rawHTML(customControls.volumeBtnContent) } /> : 'Mute';
    else
      volumeBtnContent = customControls.muteBtnContent ? <span dangerouslySetInnerHTML={ this.rawHTML(customControls.muteBtnContent) } /> : 'Unmute';

    return (
      <div style={videoContainerStyles}>
        <video style={videoStyles} ref={ (video) => { this.videoElement = video; } } controls={customControlsAttr} />
        {
          customControls &&
            <div style={controlsPanelStyles}>
              <button style={buttonStyles} type="button" onClick={ this.handlePlayBtn }>{playBtnContent}</button>
              <input style={rangeDuration} type="range" value="0" />
              <button style={buttonStyles} type="button" onClick={ this.handleVolumeBtn }>{volumeBtnContent}</button>
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