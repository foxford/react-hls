'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _MenuButton = require('video-react/lib/components/menu/MenuButton');

var _MenuButton2 = _interopRequireDefault(_MenuButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QualityPicker = function (_Component) {
  _inherits(QualityPicker, _Component);

  function QualityPicker() {
    _classCallCheck(this, QualityPicker);

    var _this = _possibleConstructorReturn(this, (QualityPicker.__proto__ || Object.getPrototypeOf(QualityPicker)).apply(this, arguments));

    _this.handleSelectItem = _this.handleSelectItem.bind(_this);
    return _this;
  }

  _createClass(QualityPicker, [{
    key: 'handleSelectItem',
    value: function handleSelectItem(index) {
      this.props.onSetTrack(index - 1);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          activeTrack = _props.activeTrack,
          tracks = _props.tracks;

      var activeTrackLabel = tracks.filter(function (item) {
        return item.id === activeTrack;
      })[0];
      var items = tracks.map(function (item, index) {
        return {
          label: item.label,
          value: index
        };
      });
      var selectedIndex = activeTrackLabel.id === -1 ? 0 : activeTrackLabel.id;

      return _react2.default.createElement(
        _MenuButton2.default,
        {
          items: items,
          selectedIndex: selectedIndex,
          onSelectItem: this.handleSelectItem
        },
        _react2.default.createElement(
          'div',
          { className: 'video-react-active-track-label' },
          activeTrackLabel.label
        )
      );
    }
  }]);

  return QualityPicker;
}(_react.Component);

QualityPicker.propTypes = {
  activeTrack: _propTypes2.default.number,
  tracks: _propTypes2.default.array,
  onSetTrack: _propTypes2.default.func
};

exports.default = QualityPicker;