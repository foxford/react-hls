'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _src = require('hls.js/src');

var _src2 = _interopRequireDefault(_src);

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
      isPlaying: false,
      isMuted: false
    };

    _this.handlePlayBtn = _this.handlePlayBtn.bind(_this);
    _this.handleFullScreenBtn = _this.handleFullScreenBtn.bind(_this);
    _this.handleVolumeBtn = _this.handleVolumeBtn.bind(_this);
    return _this;
  }

  _createClass(HLSPlayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var isPlaying = this.state.isPlaying;
      var source = this.props.source;


      if (_src2.default.isSupported()) {
        var hls = new _src2.default();

        hls.loadSource(source);
        hls.attachMedia(this.videoElement);

        if (isPlaying) {
          hls.on(_src2.default.Events.MANIFEST_PARSED, function () {
            _this2.videoElement.play();
          });
        }
      }
    }
  }, {
    key: 'rawHTML',
    value: function rawHTML(html) {
      return { __html: html };
    }
  }, {
    key: 'handlePlayBtn',
    value: function handlePlayBtn() {
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


      this.videoElement.mute = !isMuted;

      this.setState({
        isMuted: !isMuted
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          isPlaying = _state.isPlaying,
          isMuted = _state.isMuted;
      var customControls = this.props.customControls;

      var customControlsAttr = customControls ? 'controls' : false;
      var videoContainerStyles = {
        position: 'relative'
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
        justifyContent: 'space-around',
        padding: '5px',
        background: customControls && customControls.panelBg || '#000'
      };
      var buttonStyles = {
        background: customControls && customControls.buttonBg || 'rgba(0,0,0,.5)',
        color: customControls && customControls.buttonColor || '#eee',
        border: 'none',
        outline: 'none'
      };
      var rangeDuration = {
        flexBasis: '60%'
      };
      var rangeVolume = {
        flexBasis: '10%'
      };
      var playBtnContent = '';
      var volumeBtnContent = '';

      if (isPlaying) playBtnContent = customControls.playBtnContent ? _react2.default.createElement('span', { dangerouslySetInnerHTML: this.rawHTML(customControls.playBtnContent) }) : 'Play';else playBtnContent = customControls.pauseBtnContent ? _react2.default.createElement('span', { dangerouslySetInnerHTML: this.rawHTML(customControls.pauseBtnContent) }) : 'Pause';

      if (isMuted) volumeBtnContent = customControls.volumeBtnContent ? _react2.default.createElement('span', { dangerouslySetInnerHTML: this.rawHTML(customControls.volumeBtnContent) }) : 'Mute';else volumeBtnContent = customControls.muteBtnContent ? _react2.default.createElement('span', { dangerouslySetInnerHTML: this.rawHTML(customControls.muteBtnContent) }) : 'Unmute';

      return _react2.default.createElement(
        'div',
        { style: videoContainerStyles },
        _react2.default.createElement('video', { style: videoStyles, ref: function ref(video) {
            _this3.videoElement = video;
          }, controls: customControlsAttr }),
        customControls && _react2.default.createElement(
          'div',
          { style: controlsPanelStyles },
          _react2.default.createElement(
            'button',
            { style: buttonStyles, type: 'button', onClick: this.handlePlayBtn },
            playBtnContent
          ),
          _react2.default.createElement('input', { style: rangeDuration, type: 'range', value: '0' }),
          _react2.default.createElement(
            'button',
            { style: buttonStyles, type: 'button', onClick: this.handleVolumeBtn },
            volumeBtnContent
          ),
          _react2.default.createElement('input', { style: rangeVolume, type: 'range', min: '0', max: '1', step: '0.1', value: '1' }),
          _react2.default.createElement(
            'button',
            { style: buttonStyles, type: 'button' },
            customControls.fullScreenBtnContent ? _react2.default.createElement('span', { dangerouslySetInnerHTML: this.rawHTML(customControls.fullScreenBtnContent) }) : 'Full-screen'
          )
        )
      );
    }
  }]);

  return HLSPlayer;
}(_react.Component);

HLSPlayer.propTypes = {
  source: _react.PropTypes.string.isRequired,
  customControls: _react.PropTypes.shape({
    panelBg: _react.PropTypes.string,
    buttonBg: _react.PropTypes.string,
    buttonColor: _react.PropTypes.string,
    playBtnContent: _react.PropTypes.string,
    pauseBtnContent: _react.PropTypes.string,
    volumeBtnContent: _react.PropTypes.string,
    muteBtnContent: _react.PropTypes.string,
    fullScreenBtnContent: _react.PropTypes.string
  })
};
exports.default = HLSPlayer;


module.exports = HLSPlayer;