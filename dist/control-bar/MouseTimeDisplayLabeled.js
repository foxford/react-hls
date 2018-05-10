'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MouseTimeDisplayLabeled = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _videoReact = require('video-react');

var _DisplayBarLabeled = require('./DisplayBarLabeled');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MouseTimeDisplayLabeled = function MouseTimeDisplayLabeled(props) {
  var mouseTime = props.mouseTime,
      duration = props.duration,
      className = props.className,
      _props$width = props.width,
      width = _props$width === undefined ? 4 : _props$width,
      _props$chapters = props.chapters,
      chapters = _props$chapters === undefined ? [] : _props$chapters;


  if (!duration || !mouseTime.time) return null;

  var labelUnderneathCursor = chapters.filter(function (it) {
    var _calcLabelDimensions = (0, _DisplayBarLabeled.calcLabelDimensions)(it.start, mouseTime, width),
        offset = _calcLabelDimensions.offset,
        timeWidth = _calcLabelDimensions.timeWidth;

    var isCursorAboveLabel = offset < timeWidth / 2;

    return isCursorAboveLabel;
  });

  return !labelUnderneathCursor.length ? _react2.default.createElement(_videoReact.MouseTimeDisplay, {
    duration: duration,
    mouseTime: mouseTime
  }) : _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_videoReact.MouseTimeDisplay, {
      className: (0, _classnames2.default)('video-react-mouse-display-label', className),
      duration: duration,
      mouseTime: mouseTime,
      text: labelUnderneathCursor[0].label
    }),
    _react2.default.createElement('style', { dangerouslySetInnerHTML: {
        __html: '.video-react-mouse-display-label:after {\n            bottom: 1.45em;\n            font-family: sans-serif;\n            top: auto !important;\n          }' } })
  );
};

var number = _propTypes2.default.number,
    string = _propTypes2.default.string,
    shape = _propTypes2.default.shape,
    arrayOf = _propTypes2.default.arrayOf;


MouseTimeDisplayLabeled.displayName = 'MouseTimeDisplayLabeled';

MouseTimeDisplayLabeled.propTypes = {
  className: string,
  duration: number.isRequired,
  mouseTime: shape({
    time: number || null,
    position: number || null
  }),
  width: number,
  chapters: arrayOf(shape({
    start: number.isRequired,
    end: number.isRequired,
    label: string.isRequired
  }))
};

exports.MouseTimeDisplayLabeled = MouseTimeDisplayLabeled;
exports.default = MouseTimeDisplayLabeled;