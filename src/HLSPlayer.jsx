import React, {Component, PropTypes} from 'react';
import Hls from 'hls.js/src';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';

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
    })
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
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleDurationMouseDown = this.handleDurationMouseDown.bind(this);
    this.handleDurationMouseUp = this.handleDurationMouseUp.bind(this);
  }

  componentDidMount() {
    const { isPlaying, isMuted } = this.state;
    const { source } = this.props;

    if (Hls.isSupported()) {
      const hls = new Hls();

      hls.loadSource(source);
      hls.attachMedia(this.videoElement);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (isPlaying)
          this.videoElement.play();
        if (isMuted) {
          this.videoElement.muted = true;
          this.volumeBar.setState({
            value: 0
          });
        }
      });
    }

    this.videoElement.addEventListener('timeupdate', () => {
      this.durationBar.setState({
        value: (100 / this.videoElement.duration) * this.videoElement.currentTime
      });
    });

    this.videoElement.addEventListener('ended', () => {
      this.videoElement.pause();
    });
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

    this.videoElement.muted = !isMuted;
    this.volumeBar.setState({
      value: isMuted ? 1 : 0
    });

    this.setState({
      isMuted: !isMuted
    });
  }

  handleVolumeChange() {
    const volume = this.volumeBar.state.value;
    const isMuted = parseFloat(volume) <= 0;

    this.videoElement.volume = volume;
    this.videoElement.muted = isMuted;
    this.setState({
      isMuted: isMuted
    });
  }


  handleDurationChange() {
    this.videoElement.currentTime = this.videoElement.duration * (this.durationBar.state.value / 100);
  }

  handleDurationMouseDown() {
    this.videoElement.pause();
    this.setState({
      isPlaying: false
    });
  }

  handleDurationMouseUp() {
    this.videoElement.play();
    this.setState({
      isPlaying: true
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
      height: '100%',
      paddingBottom: '30px'
    };
    const controlsPanelStyles = {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'space-around',
      padding: '5px',
      zIndex: 100,
      background: customControls.panelBg
    };
    const buttonStyles = {
      background: customControls.buttonBg,
      color: customControls.buttonColor,
      border: 'none',
      outline: 'none'
    };
    const rangeDuration = {
      margin: '5px 10px'
    };
    const rangeVolume = {
      flexBasis: '10%',
      margin: '5px 10px'
    };
    let playBtnContent = '';
    let volumeBtnContent = '';

    if (isPlaying)
      playBtnContent = <span dangerouslySetInnerHTML={ this.rawHTML(customControls.pauseBtnContent) } />;
    else
      playBtnContent = <span dangerouslySetInnerHTML={ this.rawHTML(customControls.playBtnContent) } />;

    if (isMuted)
      volumeBtnContent = <span dangerouslySetInnerHTML={ this.rawHTML(customControls.muteBtnContent) } />;
    else
      volumeBtnContent = <span dangerouslySetInnerHTML={ this.rawHTML(customControls.volumeBtnContent) } />;

    return (
      <div style={videoContainerStyles}>
        <video style={videoStyles} ref={ (video) => { this.videoElement = video; } } controls={customControlsAttr} onClick={ this.handlePlayBtn } />
        {
          customControls &&
            <div style={controlsPanelStyles}>
              <button style={buttonStyles}
                      type="button"
                      onClick={ this.handlePlayBtn }>
                {playBtnContent}
              </button>
              <Slider
                style={rangeDuration}
                ref={ (bar) => { this.durationBar = bar; } }
                onAfterChange={ this.handleDurationChange }
              />
              <button style={buttonStyles}
                      type="button"
                      onClick={ this.handleVolumeBtn }>
                {volumeBtnContent}
              </button>
              <Slider
                style={rangeVolume}
                min={0}
                max={1}
                step={0.1}
                defaultValue={1}
                ref={ (bar) => { this.volumeBar = bar; } }
                onAfterChange={ this.handleVolumeChange }
              />
              <button style={buttonStyles}
                      type="button"
                      onClick={ this.handleFullScreenBtn }>
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