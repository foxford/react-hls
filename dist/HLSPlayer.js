'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _src = require('hls.js/src');

var _src2 = _interopRequireDefault(_src);

var _rcSlider = require('rc-slider');

var _rcSlider2 = _interopRequireDefault(_rcSlider);

require('rc-slider/assets/index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HLSPlayer = function (_Component) {
  _inherits(HLSPlayer, _Component);

  function HLSPlayer(props, context) {
    _classCallCheck(this, HLSPlayer);

    var _this = _possibleConstructorReturn(this, (HLSPlayer.__proto__ || Object.getPrototypeOf(HLSPlayer)).call(this, props, context));

    _this.state = {
      isPlaying: _this.props.isPlaying,
      isMuted: _this.props.isMuted,
      showPlaybackMenu: false,
      activeRate: 4,
      currentTime: '00:00',
      duration: '00:00'
    };


    _this.handlePlayBtn = _this.handlePlayBtn.bind(_this);
    _this.handleFullScreenBtn = _this.handleFullScreenBtn.bind(_this);
    _this.handleVolumeBtn = _this.handleVolumeBtn.bind(_this);
    _this.handleVolumeChange = _this.handleVolumeChange.bind(_this);
    _this.handleDurationChange = _this.handleDurationChange.bind(_this);
    _this.handlePlayBackBtn = _this.handlePlayBackBtn.bind(_this);
    return _this;
  }

  _createClass(HLSPlayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _state = this.state,
          isPlaying = _state.isPlaying,
          isMuted = _state.isMuted;
      var source = this.props.source;


      if (_src2.default.isSupported()) {
        var hls = new _src2.default();

        hls.loadSource(source);
        hls.attachMedia(this.videoElement);

        hls.on(_src2.default.Events.MANIFEST_PARSED, function () {
          if (isPlaying) _this2.videoElement.play();
          if (isMuted) {
            _this2.videoElement.muted = true;
            _this2.volumeBar.setState({
              value: 0
            });
          }
        });
      }

      this.videoElement.addEventListener('timeupdate', function () {
        _this2.durationBar.setState({
          value: 100 / _this2.videoElement.duration * _this2.videoElement.currentTime
        });
        _this2.setState({
          currentTime: formatTime(_this2.videoElement.currentTime, _this2._hasHours())
        });
      });

      this.videoElement.addEventListener('canplay', function () {
        _this2.setState({
          duration: formatTime(_this2.videoElement.duration, _this2._hasHours()),
          currentTime: formatTime(0, _this2._hasHours())
        });
      });

      this.videoElement.addEventListener('ended', function () {
        _this2.videoElement.pause();
      });
    }
  }, {
    key: '_hasHours',
    value: function _hasHours() {
      return this.videoElement.duration / 3600 >= 1.0;
    }
  }, {
    key: 'rawHTML',
    value: function rawHTML(html) {
      return { __html: html };
    }
  }, {
    key: 'handlePlayBtn',
    value: function handlePlayBtn(e) {
      e.stopPropagation();

      var isPlaying = this.state.isPlaying;


      if (isPlaying) this.videoElement.pause();else this.videoElement.play();

      this.setState({
        isPlaying: !isPlaying
      });
    }
  }, {
    key: 'handleFullScreenBtn',
    value: function handleFullScreenBtn() {
      if (this.videoElement.requestFullscreen) this.videoElement.requestFullscreen();else if (this.videoElement.mozRequestFullScreen) this.videoElement.mozRequestFullScreen();else if (this.videoElement.webkitRequestFullscreen) this.videoElement.webkitRequestFullscreen();
    }
  }, {
    key: 'handleVolumeBtn',
    value: function handleVolumeBtn() {
      var isMuted = this.state.isMuted;


      this.videoElement.muted = !isMuted;
      this.volumeBar.setState({
        value: isMuted ? 1 : 0
      });

      this.setState({
        isMuted: !isMuted
      });
    }
  }, {
    key: 'handleVolumeChange',
    value: function handleVolumeChange() {
      var volume = this.volumeBar.state.value;
      var isMuted = parseFloat(volume) <= 0;

      this.videoElement.volume = volume;
      this.videoElement.muted = isMuted;
      this.setState({
        isMuted: isMuted
      });
    }
  }, {
    key: 'handleDurationChange',
    value: function handleDurationChange() {
      this.videoElement.currentTime = this.videoElement.duration * (this.durationBar.state.value / 100);
    }
  }, {
    key: 'handlePlayBackBtn',
    value: function handlePlayBackBtn() {
      var showPlaybackMenu = this.state.showPlaybackMenu;


      this.setState({
        showPlaybackMenu: !showPlaybackMenu
      });
      this.playbackMenu.style.left = this.playbackBtn.offsetLeft - 10 + 'px';
    }
  }, {
    key: 'handlePlayBackRateChange',
    value: function handlePlayBackRateChange(rate) {
      this.setState({
        activeRate: rate.id,
        showPlaybackMenu: false
      });
      this.videoElement.playbackRate = rate.value;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state2 = this.state,
          isPlaying = _state2.isPlaying,
          isMuted = _state2.isMuted,
          currentTime = _state2.currentTime,
          duration = _state2.duration,
          showPlaybackMenu = _state2.showPlaybackMenu,
          activeRate = _state2.activeRate;
      var _props = this.props,
          isCustom = _props.isCustom,
          customControls = _props.customControls;

      var customControlsAttr = isCustom ? false : 'controls';

      var videoContainerStyles = {
        position: 'relative'
      };
      var videoStyles = {
        width: '100%',
        height: '100%',
        paddingBottom: '30px'
      };
      var controlsPanelStyles = {
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
      var buttonStyles = {
        background: customControls.buttonBg,
        color: customControls.buttonColor,
        border: 'none',
        outline: 'none'
      };
      var activeBtnStyles = _extends({}, buttonStyles, { background: '#fff', color: '#000' });
      var rangeDuration = {
        margin: '5px 10px'
      };
      var rangeVolume = {
        flexBasis: '10%',
        margin: '5px 10px'
      };
      var timers = {
        padding: customControls.timePadding
      };
      var playbackMenu = {
        position: 'absolute',
        display: 'flex',
        top: '-157px',
        flexDirection: 'column',
        background: customControls.panelBg
      };

      var playBtnContent = '';
      var volumeBtnContent = '';

      var playbackRates = [{
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
      var playbackRatesList = playbackRates.map(function (item) {
        return _react2.default.createElement(
          'button',
          { key: item.id,
            style: activeRate === item.id ? activeBtnStyles : buttonStyles,
            type: 'button',
            onClick: _this3.handlePlayBackRateChange.bind(_this3, item)
          },
          item.value
        );
      });

      if (isPlaying) playBtnContent = _react2.default.createElement('span', { dangerouslySetInnerHTML: this.rawHTML(customControls.pauseBtnContent) });else playBtnContent = _react2.default.createElement('span', { dangerouslySetInnerHTML: this.rawHTML(customControls.playBtnContent) });

      if (isMuted) volumeBtnContent = _react2.default.createElement('span', { dangerouslySetInnerHTML: this.rawHTML(customControls.muteBtnContent) });else volumeBtnContent = _react2.default.createElement('span', { dangerouslySetInnerHTML: this.rawHTML(customControls.volumeBtnContent) });

      return _react2.default.createElement(
        'div',
        { style: videoContainerStyles },
        _react2.default.createElement('video', { style: videoStyles, ref: function ref(video) {
            _this3.videoElement = video;
          }, controls: customControlsAttr, onClick: this.handlePlayBtn }),
        customControls && _react2.default.createElement(
          'div',
          { style: controlsPanelStyles },
          _react2.default.createElement(
            'button',
            { style: buttonStyles,
              type: 'button',
              onClick: this.handlePlayBtn },
            playBtnContent
          ),
          _react2.default.createElement(
            'span',
            { style: timers },
            currentTime
          ),
          _react2.default.createElement(_rcSlider2.default, {
            style: rangeDuration,
            ref: function ref(bar) {
              _this3.durationBar = bar;
            },
            onChange: this.handleDurationChange,
            onAfterChange: this.handleDurationChange
          }),
          _react2.default.createElement(
            'span',
            { style: timers },
            duration
          ),
          _react2.default.createElement(
            'button',
            { style: buttonStyles,
              type: 'button',
              onClick: this.handleVolumeBtn },
            volumeBtnContent
          ),
          _react2.default.createElement(_rcSlider2.default, {
            style: rangeVolume,
            min: 0,
            max: 1,
            step: 0.1,
            defaultValue: 1,
            ref: function ref(bar) {
              _this3.volumeBar = bar;
            },
            onChange: this.handleVolumeChange,
            onAfterChange: this.handleVolumeChange
          }),
          _react2.default.createElement(
            'button',
            { style: buttonStyles,
              type: 'button',
              ref: function ref(playback) {
                _this3.playbackBtn = playback;
              },
              onClick: this.handlePlayBackBtn
            },
            _react2.default.createElement('span', { dangerouslySetInnerHTML: this.rawHTML(customControls.playBackRateContent) })
          ),
          _react2.default.createElement(
            'div',
            { style: playbackMenu,
              ref: function ref(menu) {
                _this3.playbackMenu = menu;
              }
            },
            showPlaybackMenu && playbackRatesList
          ),
          _react2.default.createElement(
            'button',
            { style: buttonStyles,
              type: 'button',
              onClick: this.handleFullScreenBtn },
            _react2.default.createElement('span', { dangerouslySetInnerHTML: this.rawHTML(customControls.fullScreenBtnContent) })
          )
        )
      );
    }
  }]);

  return HLSPlayer;
}(_react.Component);

HLSPlayer.defaultProps = {
  isPlaying: false,
  isMuted: false,
  isCustom: true,
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
HLSPlayer.propTypes = {
  isPlaying: _react.PropTypes.bool,
  isMuted: _react.PropTypes.bool,
  isCustom: _react.PropTypes.bool,
  source: _react.PropTypes.string.isRequired,
  customControls: _react.PropTypes.shape({
    panelBg: _react.PropTypes.string,
    buttonBg: _react.PropTypes.string,
    buttonColor: _react.PropTypes.string,
    timePadding: _react.PropTypes.string,
    playBtnContent: _react.PropTypes.string,
    pauseBtnContent: _react.PropTypes.string,
    volumeBtnContent: _react.PropTypes.string,
    muteBtnContent: _react.PropTypes.string,
    fullScreenBtnContent: _react.PropTypes.string,
    playBackRateContent: _react.PropTypes.string
  })
};
exports.default = HLSPlayer;


module.exports = HLSPlayer;

function formatTime(time, isHours) {
  if (isHours) {
    var h = Math.floor(time / 3600);

    time = time - h * 3600;

    var m = Math.floor(time / 60);
    var s = Math.floor(time % 60);

    return lead0(h, 2) + ':' + lead0(m, 2) + ':' + lead0(s, 2);
  } else {
    var _m = Math.floor(time / 60);
    var _s = Math.floor(time % 60);

    return lead0(_m, 2) + ':' + lead0(_s, 2);
  }
}

function lead0(val, n) {
  var nz = "" + val;
  while (nz.length < n) {
    nz = "0" + nz;
  }
  return nz;
}