import React, {Component, PropTypes} from 'react';
import Hls from 'hls.js/src';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';

class HLSPlayer extends Component {

  static defaultProps = {
    isPlaying: false,
    isMuted: false,
    disableControls: false,
    source: '',
    customControls: {
      panelBg: '#000',
      buttonBg: 'none',
      buttonColor: '#fff',
      timePadding: '0',
      playBtnContent: 'Play',
      pauseBtnContent: 'Pause',
      volumeBtnContent: 'Mute',
      muteBtnContent: 'Unmute',
      fullScreenBtnContent: 'Full-screen',
      playBackRateContent: 'Rate'
    }
  };

  static propTypes = {
    isPlaying: PropTypes.bool,
    isMuted: PropTypes.bool,
    disableControls: PropTypes.bool,
    source: PropTypes.string.isRequired,
    customControls: PropTypes.shape({
      panelBg: PropTypes.string,
      buttonBg: PropTypes.string,
      buttonColor: PropTypes.string,
      timePadding: PropTypes.string,
      playBtnContent: PropTypes.string,
      pauseBtnContent: PropTypes.string,
      volumeBtnContent: PropTypes.string,
      muteBtnContent: PropTypes.string,
      fullScreenBtnContent: PropTypes.string,
      playBackRateContent: PropTypes.string
    })
  };

  state = {
    isPlaying: this.props.isPlaying,
    isMuted: this.props.isMuted,
    showPlaybackMenu: false,
    activeRate: 4,
    currentTime: '00:00',
    duration: '00:00'
  };

  constructor(props, context) {
    super(props, context);

    this.handlePlayBtn = this.handlePlayBtn.bind(this);
    this.handleFullScreenBtn = this.handleFullScreenBtn.bind(this);
    this.handleVolumeBtn = this.handleVolumeBtn.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handlePlayBackBtn = this.handlePlayBackBtn.bind(this);
  }

  componentDidMount() {
    const { isPlaying, isMuted } = this.state;
    const { source, disableControls } = this.props;

    if (Hls.isSupported()) {
      const hls = new Hls();

      hls.loadSource(source);
      hls.attachMedia(this.videoElement);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (isPlaying)
          this.videoElement.play();
        if (isMuted) {
          this.videoElement.muted = true;
          if (!disableControls) {
            this.volumeBar.setState({
              value: 0
            });
          }
        }
      });
    }

    this.videoElement.addEventListener('timeupdate', () => {
      if (!disableControls) {
        this.durationBar.setState({
          value: (100 / this.videoElement.duration) * this.videoElement.currentTime
        });
        this.setState({
          currentTime: formatTime(this.videoElement.currentTime, this._hasHours())
        });
      }
    });

    this.videoElement.addEventListener('canplay', () => {
      if (!disableControls) {
        this.setState({
          duration: formatTime(this.videoElement.duration, this._hasHours()),
          currentTime: formatTime(0, this._hasHours())
        });
      }
    });

    this.videoElement.addEventListener('ended', () => {
      this.videoElement.pause();
    });
  }

  _hasHours() {
    return (this.videoElement.duration / 3600) >= 1.0;
  }

  rawHTML(html) {
    return { __html: html };
  }

  handlePlayBtn(e) {
    if (this.props.disableControls)
      return;

    e.stopPropagation();

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

  handlePlayBackBtn() {
    const { showPlaybackMenu } = this.state;

    this.setState({
      showPlaybackMenu: !showPlaybackMenu
    });
    this.playbackMenu.style.left = this.playbackBtn.offsetLeft - 10 + 'px';
  }

  handlePlayBackRateChange(rate) {
    this.setState({
      activeRate: rate.id,
      showPlaybackMenu: false
    });
    this.videoElement.playbackRate = rate.value;
  }

  render() {
    const { isPlaying, isMuted, currentTime, duration, showPlaybackMenu, activeRate } = this.state;
    const { customControls, disableControls } = this.props;

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
      padding: '5px',
      justifyContent: 'space-around',
      zIndex: 100,
      background: customControls.panelBg
    };
    const buttonStyles = {
      background: customControls.buttonBg,
      color: customControls.buttonColor,
      border: 'none',
      outline: 'none'
    };
    const activeBtnStyles = { ...buttonStyles, ...{ background: '#fff', color: '#000' } };
    const rangeDuration = {
      margin: '5px 10px'
    };
    const rangeVolume = {
      flexBasis: '10%',
      margin: '5px 10px'
    };
    const timers = {
      padding: customControls.timePadding
    };
    const playbackMenu = {
      position: 'absolute',
      display: 'flex',
      top: '-157px',
      flexDirection: 'column',
      background: customControls.panelBg
    };

    let playBtnContent = '';
    let volumeBtnContent = '';

    const playbackRates = [{
      id: 1,
      value: 2
    }, {
      id: 2,
      value: 1.5
    }, {
      id: 3,
      value: 1.25
    }, {
      id: 4,
      value: 1
    }, {
      id: 5,
      value: 0.75
    }, {
      id: 6,
      value: 0.5
    }];
    const playbackRatesList = playbackRates.map(item =>
      <button key={item.id}
              style={ activeRate === item.id ? activeBtnStyles : buttonStyles }
              type="button"
              onClick={ this.handlePlayBackRateChange.bind(this,item) }
      >
        {item.value}
      </button>
    );

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
        <video style={videoStyles}
               ref={ (video) => { this.videoElement = video; } }
               onClick={ this.handlePlayBtn }
        />
        {
          !disableControls &&
            <div style={controlsPanelStyles}>
              <button style={buttonStyles}
                      type="button"
                      onClick={ this.handlePlayBtn }>
                {playBtnContent}
              </button>
              <span style={timers}>{currentTime}</span>
              <Slider
                style={rangeDuration}
                ref={ (bar) => { this.durationBar = bar; } }
                onChange={ this.handleDurationChange }
                onAfterChange={ this.handleDurationChange }
              />
              <span style={timers}>{duration}</span>
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
                onChange={ this.handleVolumeChange }
                onAfterChange={ this.handleVolumeChange }
              />
              <button style={buttonStyles}
                      type="button"
                      ref={ (playback) => { this.playbackBtn = playback; } }
                      onClick={ this.handlePlayBackBtn }
              >
                { <span dangerouslySetInnerHTML={ this.rawHTML(customControls.playBackRateContent) } /> }
              </button>
              <div style={playbackMenu}
                   ref={ (menu) => { this.playbackMenu = menu; } }
              >
                {
                  showPlaybackMenu && playbackRatesList
                }
              </div>
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

function formatTime(time, isHours) {
  if (isHours) {
    const h = Math.floor(time / 3600);

    time = time - h * 3600;

    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);

    return `${lead0(h,2)}:${lead0(m,2)}:${lead0(s,2)}`;
  } else {
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);

    return `${lead0(m,2)}:${lead0(s,2)}`;
  }
}

function lead0(val, n) {
  let nz = "" + val;
  while (nz.length < n) {
    nz = "0" + nz;
  }
  return nz;
}