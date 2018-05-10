'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HlsLoader = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _videoReact = require('video-react');

var _mobileDetect = require('mobile-detect');

var _mobileDetect2 = _interopRequireDefault(_mobileDetect);

var _HLSSource = require('./HLSSource');

var _HLSSource2 = _interopRequireDefault(_HLSSource);

var _QualityPicker = require('./QualityPicker');

var _QualityPicker2 = _interopRequireDefault(_QualityPicker);

var _ChapterPicker = require('./ChapterPicker');

var _ChapterPicker2 = _interopRequireDefault(_ChapterPicker);

var _HLSLoader = require('./HLSLoader');

var _HLSLoader2 = _interopRequireDefault(_HLSLoader);

var _ProgressControlLabeled = require('./control-bar/ProgressControlLabeled');

require('video-react/dist/video-react.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactPlayer = function (_Component) {
  _inherits(ReactPlayer, _Component);

  function ReactPlayer() {
    _classCallCheck(this, ReactPlayer);

    var _this = _possibleConstructorReturn(this, (ReactPlayer.__proto__ || Object.getPrototypeOf(ReactPlayer)).apply(this, arguments));

    _this.state = {
      activeTrack: -1,
      tracks: []
    };

    _this.onLoadLevels = _this.onLoadLevels.bind(_this);
    _this.onSetTrack = _this.onSetTrack.bind(_this);
    return _this;
  }

  _createClass(ReactPlayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.videoElement = this.player.video.video;
    }
  }, {
    key: 'onLoadLevels',
    value: function onLoadLevels(activeTrack, tracks) {
      this.setState({
        activeTrack: activeTrack,
        tracks: tracks
      });
    }
  }, {
    key: 'onSetTrack',
    value: function onSetTrack(activeTrack) {
      this.setState({ activeTrack: activeTrack });
    }
  }, {
    key: '_getDeviceName',
    value: function _getDeviceName() {
      return new _mobileDetect2.default(window.navigator.userAgent).mobile();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          isHLS = _props.isHLS,
          src = _props.src,
          autoPlay = _props.autoPlay,
          muted = _props.muted,
          startTime = _props.startTime,
          fluid = _props.fluid,
          poster = _props.poster,
          chapters = _props.chapters;
      var _state = this.state,
          activeTrack = _state.activeTrack,
          tracks = _state.tracks;

      var deviceName = this._getDeviceName();
      var isApple = deviceName === 'iPhone' || deviceName === 'iPad';
      var hasChapters = chapters && chapters.length > 1;

      return _react2.default.createElement(
        _videoReact.Player,
        {
          autoPlay: autoPlay,
          muted: muted,
          startTime: startTime,
          fluid: fluid,
          poster: poster,
          ref: function ref(player) {
            _this2.player = player;
          }
        },
        isHLS && !isApple ? _react2.default.createElement(_HLSSource2.default, _extends({
          isVideoChild: true
        }, this.props, {
          activeLevel: activeTrack,
          onLoadLevels: this.onLoadLevels
        })) : _react2.default.createElement('source', { src: src }),
        _react2.default.createElement(_videoReact.BigPlayButton, { position: 'center' }),
        _react2.default.createElement(
          _videoReact.ControlBar,
          null,
          hasChapters && _react2.default.createElement(_ProgressControlLabeled.ProgressControlLabeled, _extends({}, this.props, {
            key: 'progress-control',
            order: 6
          })),
          _react2.default.createElement(_videoReact.VolumeMenuButton, { order: 7.9 }),
          _react2.default.createElement(_videoReact.PlaybackRateMenuButton, {
            rates: [3, 2.5, 2, 1.75, 1.5, 1.25, 1, 0.75, 0.5],
            order: 7.1
          }),
          tracks.length > 1 && _react2.default.createElement(_QualityPicker2.default, {
            activeTrack: activeTrack,
            tracks: tracks,
            onSetTrack: this.onSetTrack,
            order: 7.5
          }),
          hasChapters && _react2.default.createElement(_ChapterPicker2.default, {
            items: chapters,
            order: 8
          })
        )
      );
    }
  }]);

  return ReactPlayer;
}(_react.Component);

ReactPlayer.propTypes = {
  isHLS: _propTypes2.default.bool.isRequired,
  src: _propTypes2.default.string.isRequired,
  autoPlay: _propTypes2.default.bool.isRequired,
  muted: _propTypes2.default.bool.isRequired,
  startTime: _propTypes2.default.number,
  fluid: _propTypes2.default.bool,
  poster: _propTypes2.default.string,
  chapters: _propTypes2.default.array
};
ReactPlayer.defaultProps = {
  isHLS: true,
  autoPlay: false,
  muted: false,
  fluid: false
};

exports.HlsLoader = _HLSLoader2.default;
exports.default = ReactPlayer;