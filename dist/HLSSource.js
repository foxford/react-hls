'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('!script-loader!hls.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HLSSource = function (_Component) {
  _inherits(HLSSource, _Component);

  function HLSSource() {
    _classCallCheck(this, HLSSource);

    var _this = _possibleConstructorReturn(this, (HLSSource.__proto__ || Object.getPrototypeOf(HLSSource)).apply(this, arguments));

    _this.hls = new Hls(_this.props.hlsOptions);
    _this.levelLabels = ['low', 'medium', 'high'];

    _this.onMediaAttached = _this.onMediaAttached.bind(_this);
    _this.onManifestParsed = _this.onManifestParsed.bind(_this);
    _this.onHlsError = _this.onHlsError.bind(_this);
    _this.onFragParsingMetadata = _this.onFragParsingMetadata.bind(_this);
    _this.onFragChanged = _this.onFragChanged.bind(_this);
    return _this;
  }

  _createClass(HLSSource, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var video = this.props.video;


      if (Hls.isSupported()) {
        this.hls.attachMedia(video);
        // hls events
        this.hls.on(Hls.Events.MEDIA_ATTACHED, this.onMediaAttached);
        this.hls.on(Hls.Events.MANIFEST_PARSED, this.onManifestParsed);
        this.hls.on(Hls.Events.ERROR, this.onHlsError);
        this.hls.on(Hls.Events.FRAG_PARSING_METADATA, this.onFragParsingMetadata);
        this.hls.on(Hls.Events.FRAG_CHANGED, this.onFragChanged);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.activeLevel !== nextProps.activeLevel) {
        this.hls.nextLevel = nextProps.activeLevel;
      }
    }
  }, {
    key: 'onMediaAttached',
    value: function onMediaAttached() {
      var src = this.props.src;


      this.hls.loadSource(src);
    }
  }, {
    key: 'onManifestParsed',
    value: function onManifestParsed(e, data) {
      var _props = this.props,
          video = _props.video,
          onManifestParsed = _props.hlsEvents.onManifestParsed,
          autoPlay = _props.autoPlay;


      this.hls.startLoad();
      if (autoPlay) video.play();
      onManifestParsed();
      this.buildTrackList(data.levels);
    }
  }, {
    key: 'onHlsError',
    value: function onHlsError(e, data) {
      var onError = this.props.hlsEvents.onError;


      onError(e, data);
    }
  }, {
    key: 'onFragParsingMetadata',
    value: function onFragParsingMetadata(e, data) {
      var onFragParsingMetadata = this.props.hlsEvents.onFragParsingMetadata;


      onFragParsingMetadata(e, data);
    }
  }, {
    key: 'onFragChanged',
    value: function onFragChanged(e, data) {
      var onFragChanged = this.props.hlsEvents.onFragChanged;


      onFragChanged(e, data);
    }
  }, {
    key: 'buildTrackList',
    value: function buildTrackList(levels) {
      var _this2 = this;

      var trackList = [];
      var activeLevel = null;

      if (levels.length > 1) {
        var autoLevel = {
          id: -1,
          label: 'auto'
        };
        if (this.hls.manualLevel === -1) activeLevel = -1;
        trackList.push(autoLevel);
      }

      levels.forEach(function (level, index) {
        var quality = {};

        quality.id = index;
        quality.label = _this2._levelLabel(level, index);
        trackList.push(quality);
        if (index === _this2.hls.manualLevel) activeLevel = index;
      });
      this.props.onLoadLevels(activeLevel, trackList);
    }
  }, {
    key: '_levelLabel',
    value: function _levelLabel(level, index) {
      if (level.height) return level.height + 'p';else if (level.width) return Math.round(level.width * 9 / 16) + 'p';else if (level.bitrate) return this.levelLabels[index] || parseInt(level.bitrate / 1000) + 'kbps';else return 0;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          src = _props2.src,
          type = _props2.type;


      return _react2.default.createElement('source', {
        src: src,
        type: type
      });
    }
  }]);

  return HLSSource;
}(_react.Component);

HLSSource.propTypes = {
  src: _propTypes2.default.string.isRequired,
  type: _propTypes2.default.string,
  video: _propTypes2.default.object,
  autoPlay: _propTypes2.default.bool.isRequired,
  hlsOptions: _propTypes2.default.object,
  hlsEvents: _propTypes2.default.object,
  onLoadLevels: _propTypes2.default.func,
  activeLevel: _propTypes2.default.number
};
HLSSource.defaultProps = {
  hlsOptions: {},
  type: 'application/x-mpegURL',
  hlsEvents: {
    onMediaAttached: function onMediaAttached() {},
    onManifestParsed: function onManifestParsed() {},
    onError: function onError() {},
    onFragChanged: function onFragChanged() {},
    onFragParsingMetadata: function onFragParsingMetadata() {}
  }
};

exports.default = HLSSource;