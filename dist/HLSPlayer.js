'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('/Users/etolchennikov/Projects/react-hls/node_modules/redbox-react/lib/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('/Users/etolchennikov/Projects/react-hls/node_modules/react-transform-catch-errors/lib/index.js');

var _index4 = _interopRequireDefault(_index3);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _index5 = require('/Users/etolchennikov/Projects/react-hls/node_modules/react-transform-hmr/lib/index.js');

var _index6 = _interopRequireDefault(_index5);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _src = require('hls.js/src');

var _src2 = _interopRequireDefault(_src);

var _rcSlider = require('rc-slider');

var _rcSlider2 = _interopRequireDefault(_rcSlider);

var _screenfull = require('screenfull');

var _screenfull2 = _interopRequireDefault(_screenfull);

require('rc-slider/assets/index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  HLSPlayer: {
    displayName: 'HLSPlayer'
  }
};

var _UsersEtolchennikovProjectsReactHlsNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
  filename: 'src/HLSPlayer.jsx',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _UsersEtolchennikovProjectsReactHlsNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
  filename: 'src/HLSPlayer.jsx',
  components: _components,
  locals: [],
  imports: [_react3.default, _index2.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _UsersEtolchennikovProjectsReactHlsNode_modulesReactTransformHmrLibIndexJs2(_UsersEtolchennikovProjectsReactHlsNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}

var HLSPlayer = _wrapComponent('HLSPlayer')((_temp = _class = function (_Component) {
  _inherits(HLSPlayer, _Component);

  function HLSPlayer(props, context) {
    _classCallCheck(this, HLSPlayer);

    var _this = _possibleConstructorReturn(this, (HLSPlayer.__proto__ || Object.getPrototypeOf(HLSPlayer)).call(this, props, context));

    _this.state = {
      isPlaying: _this.props.autoPlay,
      isMuted: _this.props.autoMute,
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
      var _props = this.props,
          source = _props.source,
          disableControls = _props.disableControls;


      if (_src2.default.isSupported()) {
        var hls = new _src2.default();

        hls.loadSource(source);
        hls.attachMedia(this.videoElement);

        hls.on(_src2.default.Events.MANIFEST_PARSED, function () {
          if (isPlaying) _this2.videoElement.play();
          if (isMuted) {
            _this2.videoElement.muted = true;
            if (!disableControls) {
              _this2.volumeBar.setState({
                value: 0
              });
            }
          }
        });
      }

      this.videoElement.addEventListener('timeupdate', function () {
        if (!disableControls) {
          _this2.durationBar.setState({
            value: 100 / _this2.videoElement.duration * _this2.videoElement.currentTime
          });
          _this2.setState({
            currentTime: formatTime(_this2.videoElement.currentTime, _this2._hasHours())
          });
        }
      });

      this.videoElement.addEventListener('canplay', function () {
        if (!disableControls) {
          _this2.setState({
            duration: formatTime(_this2.videoElement.duration, _this2._hasHours()),
            currentTime: formatTime(0, _this2._hasHours())
          });
        }
      });

      this.videoElement.addEventListener('ended', function () {
        _this2.videoElement.pause();
      });

      window.addEventListener('click', this.hidePlayBackMenu.bind(this));
      window.addEventListener('resize', this.hidePlayBackMenu.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('click', this.hidePlayBackMenu.bind(this));
      window.removeEventListener('resize', this.hidePlayBackMenu.bind(this));
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
    key: 'hidePlayBackMenu',
    value: function hidePlayBackMenu() {
      if (this.state.showPlaybackMenu) {
        this.setState({
          showPlaybackMenu: false
        });
      }
    }
  }, {
    key: 'handlePlayBtn',
    value: function handlePlayBtn(e) {
      if (this.props.disableControls) return;

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
      if (_screenfull2.default.enabled) _screenfull2.default.toggle(this.videoContainer);
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
    value: function handlePlayBackBtn(e) {
      e.stopPropagation();

      var showPlaybackMenu = this.state.showPlaybackMenu;


      this.setState({
        showPlaybackMenu: !showPlaybackMenu
      });

      this.playbackMenu.style.display = !showPlaybackMenu ? 'flex' : 'none';
      this.playbackMenu.style.top = -this.playbackMenu.clientHeight + 'px';
      this.playbackMenu.style.left = this.playbackBtn.offsetLeft - 10 + 'px';
    }
  }, {
    key: 'handlePlayBackRateChange',
    value: function handlePlayBackRateChange(e, rate) {
      e.stopPropagation();

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
      var _props2 = this.props,
          customControls = _props2.customControls,
          disableControls = _props2.disableControls;


      var videoContainerStyles = {
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#000'
      };
      var videoStyles = {
        width: '100%',
        height: '100%'
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
        padding: customControls.timePadding,
        fontSize: customControls.timeSize,
        whiteSpace: 'nowrap',
        color: customControls.buttonColor
      };
      var playbackMenu = {
        position: 'absolute',
        display: showPlaybackMenu ? 'flex' : 'none',
        flexDirection: 'column',
        background: customControls.panelBg
      };

      var playBtnContent = '';
      var volumeBtnContent = '';

      var playbackRates = [{
        id: 1,
        value: 3
      }, {
        id: 2,
        value: 2.5
      }, {
        id: 3,
        value: 2
      }, {
        id: 4,
        value: 1.5
      }, {
        id: 5,
        value: 1.25
      }, {
        id: 6,
        value: 1
      }, {
        id: 7,
        value: 0.75
      }, {
        id: 8,
        value: 0.5
      }];
      var playbackRatesList = playbackRates.map(function (item) {
        return _react3.default.createElement(
          'button',
          { key: item.id,
            style: activeRate === item.id ? activeBtnStyles : buttonStyles,
            type: 'button',
            onClick: function onClick(e) {
              _this3.handlePlayBackRateChange(e, item);
            }
          },
          item.value,
          'x'
        );
      });

      if (isPlaying) playBtnContent = _react3.default.createElement('span', { dangerouslySetInnerHTML: this.rawHTML(customControls.pauseBtnContent) });else playBtnContent = _react3.default.createElement('span', { dangerouslySetInnerHTML: this.rawHTML(customControls.playBtnContent) });

      if (isMuted) volumeBtnContent = _react3.default.createElement('span', { dangerouslySetInnerHTML: this.rawHTML(customControls.muteBtnContent) });else volumeBtnContent = _react3.default.createElement('span', { dangerouslySetInnerHTML: this.rawHTML(customControls.volumeBtnContent) });

      return _react3.default.createElement(
        'div',
        { style: videoContainerStyles,
          ref: function ref(container) {
            _this3.videoContainer = container;
          }
        },
        _react3.default.createElement('video', { style: videoStyles,
          ref: function ref(video) {
            _this3.videoElement = video;
          },
          onClick: this.handlePlayBtn
        }),
        !disableControls && _react3.default.createElement(
          'div',
          { style: controlsPanelStyles },
          _react3.default.createElement(
            'button',
            { style: buttonStyles,
              type: 'button',
              onClick: this.handlePlayBtn },
            playBtnContent
          ),
          _react3.default.createElement(
            'span',
            { style: timers },
            currentTime,
            ' / ',
            duration
          ),
          _react3.default.createElement(_rcSlider2.default, {
            style: rangeDuration,
            ref: function ref(bar) {
              _this3.durationBar = bar;
            },
            onAfterChange: this.handleDurationChange
          }),
          _react3.default.createElement(
            'button',
            { style: buttonStyles,
              type: 'button',
              onClick: this.handleVolumeBtn },
            volumeBtnContent
          ),
          _react3.default.createElement(_rcSlider2.default, {
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
          _react3.default.createElement(
            'button',
            { style: buttonStyles,
              type: 'button',
              ref: function ref(playback) {
                _this3.playbackBtn = playback;
              },
              onClick: this.handlePlayBackBtn
            },
            _react3.default.createElement('span', { dangerouslySetInnerHTML: this.rawHTML(customControls.playBackRateContent) })
          ),
          _react3.default.createElement(
            'div',
            { style: playbackMenu,
              ref: function ref(menu) {
                _this3.playbackMenu = menu;
              }
            },
            playbackRatesList
          ),
          _react3.default.createElement(
            'button',
            { style: buttonStyles,
              type: 'button',
              onClick: this.handleFullScreenBtn },
            _react3.default.createElement('span', { dangerouslySetInnerHTML: this.rawHTML(customControls.fullScreenBtnContent) })
          )
        )
      );
    }
  }]);

  return HLSPlayer;
}(_react2.Component), _class.defaultProps = {
  autoPlay: false,
  autoMute: false,
  disableControls: false,
  source: '',
  customControls: {
    panelBg: '#000',
    buttonBg: 'none',
    buttonColor: '#fff',
    timePadding: '0',
    timeSize: 'inherit',
    playBtnContent: 'Play',
    pauseBtnContent: 'Pause',
    volumeBtnContent: 'Mute',
    muteBtnContent: 'Unmute',
    fullScreenBtnContent: 'Full-screen',
    playBackRateContent: 'Rate'
  }
}, _class.propTypes = {
  autoPlay: _react2.PropTypes.bool,
  autoMute: _react2.PropTypes.bool,
  disableControls: _react2.PropTypes.bool,
  source: _react2.PropTypes.string.isRequired,
  customControls: _react2.PropTypes.shape({
    panelBg: _react2.PropTypes.string,
    buttonBg: _react2.PropTypes.string,
    buttonColor: _react2.PropTypes.string,
    timePadding: _react2.PropTypes.string,
    timeSize: _react2.PropTypes.string,
    playBtnContent: _react2.PropTypes.string,
    pauseBtnContent: _react2.PropTypes.string,
    volumeBtnContent: _react2.PropTypes.string,
    muteBtnContent: _react2.PropTypes.string,
    fullScreenBtnContent: _react2.PropTypes.string,
    playBackRateContent: _react2.PropTypes.string
  })
}, _temp));

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