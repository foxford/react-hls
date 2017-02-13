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

    return _possibleConstructorReturn(this, (HLSPlayer.__proto__ || Object.getPrototypeOf(HLSPlayer)).call(this, props, context));
  }

  _createClass(HLSPlayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var source = this.props.source;


      if (_src2.default.isSupported()) {
        var hls = new _src2.default();

        hls.loadSource(source);
        hls.attachMedia(this.videoElement);
        hls.on(_src2.default.Events.MANIFEST_PARSED, function () {
          _this2.videoElement.play();
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

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
        border: 'none'
      };
      var rangeDuration = {
        flexBasis: '60%'
      };
      var rangeVolume = {
        flexBasis: '10%'
      };

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
            { style: buttonStyles, type: 'button' },
            customControls.playBtnContent ? _react2.default.createElement('span', { dangerouslySetInnerHTML: this.rawHTML(customControls.playBtnContent) }) : 'Play'
          ),
          _react2.default.createElement('input', { style: rangeDuration, type: 'range', value: '0' }),
          _react2.default.createElement(
            'button',
            { style: buttonStyles, type: 'button' },
            customControls.volumeBtnContent ? _react2.default.createElement('span', { dangerouslySetInnerHTML: this.rawHTML(customControls.volumeBtnContent) }) : 'Mute'
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
  }], [{
    key: 'rawHTML',
    value: function rawHTML(html) {
      return { __html: html };
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
    volumeBtnContent: _react.PropTypes.string,
    fullScreenBtnContent: _react.PropTypes.string
  })
};
exports.default = HLSPlayer;


module.exports = HLSPlayer;