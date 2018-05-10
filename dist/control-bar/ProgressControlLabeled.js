'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressControlLabeled = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _videoReact = require('video-react');

var _SeekBarLabeled = require('./SeekBarLabeled');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProgressControlLabeled = function (_ProgressControl) {
  _inherits(ProgressControlLabeled, _ProgressControl);

  function ProgressControlLabeled() {
    _classCallCheck(this, ProgressControlLabeled);

    return _possibleConstructorReturn(this, (ProgressControlLabeled.__proto__ || Object.getPrototypeOf(ProgressControlLabeled)).apply(this, arguments));
  }

  _createClass(ProgressControlLabeled, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var className = this.props.className;

      return _react2.default.createElement(
        'div',
        {
          onMouseMove: this.handleMouseMoveThrottle,
          className: (0, _classnames2.default)('video-react-progress-control video-react-control', className)
        },
        _react2.default.createElement(_SeekBarLabeled.SeekBarLabeled, _extends({
          mouseTime: this.state.mouseTime,
          ref: function ref(c) {
            _this2.seekBar = c;
          }
        }, this.props))
      );
    }
  }]);

  return ProgressControlLabeled;
}(_videoReact.ProgressControl);

var shape = _propTypes2.default.shape,
    arrayOf = _propTypes2.default.arrayOf,
    number = _propTypes2.default.number,
    string = _propTypes2.default.string;


ProgressControlLabeled.propTypes = _extends({}, _videoReact.ProgressControl.propTypes, {
  chapters: arrayOf(shape({
    start: number.isRequired,
    end: number.isRequired,
    label: string.isRequired
  }))
});

exports.ProgressControlLabeled = ProgressControlLabeled;
exports.default = ProgressControlLabeled;