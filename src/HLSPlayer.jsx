import React, {Component, PropTypes} from 'react';
import Hls from 'hls.js/src';

class HLSPlayer extends Component {

  static defaultProps = {
    isPlaying: false,
    isMuted: false,
    isCustom: true,
    source: '',
    customControls: {
      panelBg: '#000',
      buttonBg: 'none',
      buttonColor: '#fff',
      playBtnContent: 'Play',
      pauseBtnContent: 'Pause',
      volumeBtnContent: 'Mute',
      muteBtnContent: 'Unmute',
      fullScreenBtnContent: 'Full-screen'
    }
  };

  static propTypes = {
    isPlaying: PropTypes.bool,
    isMuted: PropTypes.bool,
    isCustom: PropTypes.bool,
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
    }).isRequired
  };

  state = {
    isPlaying: this.props.isPlaying,
    isMuted: this.props.isMuted
  };

  constructor(props, context) {
    super(props, context);

    this.handlePlayBtn = this.handlePlayBtn.bind(this);
    this.handleFullScreenBtn = this.handleFullScreenBtn.bind(this);
    this.handleVolumeBtn = this.handleVolumeBtn.bind(this);
  }

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
    const { isCustom, customControls } = this.props;
    const customControlsAttr = isCustom ? false : 'controls';
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
      background: customControls.panelBg
    };
    const buttonStyles = {
      background: customControls.buttonBg,
      color: customControls.buttonColor,
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
      playBtnContent = <span dangerouslySetInnerHTML={ this.rawHTML(customControls.pauseBtnContent) } />;
    else
      playBtnContent = <span dangerouslySetInnerHTML={ this.rawHTML(customControls.playBtnContent) } />;

    if (isMuted)
      volumeBtnContent = <span dangerouslySetInnerHTML={ this.rawHTML(customControls.volumeBtnContent) } />;
    else
      volumeBtnContent = <span dangerouslySetInnerHTML={ this.rawHTML(customControls.muteBtnContent) } />;

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
                { <span dangerouslySetInnerHTML={ this.rawHTML(customControls.fullScreenBtnContent) } /> }
              </button>
            </div>
        }
      </div>
    );
  }
}

export default HLSPlayer;

module.exports = HLSPlayer;