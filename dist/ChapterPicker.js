'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _MenuButton2 = require('video-react/lib/components/menu/MenuButton');

var _MenuButton3 = _interopRequireDefault(_MenuButton2);

require('./ChapterPicker.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomMenuButton = function (_MenuButton) {
  _inherits(CustomMenuButton, _MenuButton);

  function CustomMenuButton() {
    _classCallCheck(this, CustomMenuButton);

    return _possibleConstructorReturn(this, (CustomMenuButton.__proto__ || Object.getPrototypeOf(CustomMenuButton)).apply(this, arguments));
  }

  _createClass(CustomMenuButton, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.selectedIndex !== this.props.selectedIndex) {
        this.setState({ activateIndex: nextProps.selectedIndex });
      }
    }
  }]);

  return CustomMenuButton;
}(_MenuButton3.default);

var ChapterPicker = function (_Component) {
  _inherits(ChapterPicker, _Component);

  function ChapterPicker() {
    _classCallCheck(this, ChapterPicker);

    var _this2 = _possibleConstructorReturn(this, (ChapterPicker.__proto__ || Object.getPrototypeOf(ChapterPicker)).call(this));

    _this2.state = {
      currentChapterIndex: 0
    };

    _this2.handleSelectItem = _this2.handleSelectItem.bind(_this2);
    _this2._updateSelectedItem = _this2._updateSelectedItem.bind(_this2);

    _this2.intervalId = null;
    return _this2;
  }

  _createClass(ChapterPicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.intervalId = setInterval(this._updateSelectedItem, 1000);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.intervalId);
    }
  }, {
    key: 'handleSelectItem',
    value: function handleSelectItem(index) {
      var _props = this.props,
          actions = _props.actions,
          items = _props.items;


      actions.seek(items[index].start);
    }
  }, {
    key: '_updateSelectedItem',
    value: function _updateSelectedItem() {
      var _props2 = this.props,
          currentTime = _props2.player.currentTime,
          items = _props2.items;

      var currentChapterIndex = null;

      items.forEach(function (chapter, index) {
        if (currentTime >= chapter.start && currentTime < chapter.end) {
          currentChapterIndex = index;
        }
      });

      if (currentChapterIndex !== this.state.currentChapterIndex) {
        this.setState({ currentChapterIndex: currentChapterIndex });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var currentChapterIndex = this.state.currentChapterIndex;
      var items = this.props.items;

      var menuItems = items.map(function (item, index) {
        return {
          label: item.label,
          value: index
        };
      });

      return _react2.default.createElement(
        CustomMenuButton,
        {
          items: menuItems,
          selectedIndex: currentChapterIndex,
          onSelectItem: this.handleSelectItem,
          className: 'video-react-chapter-picker'
        },
        _react2.default.createElement(
          'div',
          { className: 'video-react-active-track-label' },
          '\xA0'
        )
      );
    }
  }]);

  return ChapterPicker;
}(_react.Component);

ChapterPicker.propTypes = {
  actions: _propTypes2.default.object,
  player: _propTypes2.default.object,
  items: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    start: _propTypes2.default.number.isRequired,
    end: _propTypes2.default.number.isRequired,
    label: _propTypes2.default.string.isRequired
  }))
};

exports.default = ChapterPicker;