'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcLabelDimensions = exports.DisplayBarLabeled = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var calcLabelDimensions = function calcLabelDimensions(time, mouseTime, width) {
  var mtime = mouseTime.time,
      position = mouseTime.position;


  var posTimeRatio = position / mtime;

  var timePosRatio = Math.pow(posTimeRatio, -1);

  var mouseTimeOffset = Math.abs(time - mtime);


  var labelWidthInPos = width;
  var labelWidthInTime = Math.round(labelWidthInPos * timePosRatio);


  if (!labelWidthInTime) {
    labelWidthInTime = 1;
    labelWidthInPos = labelWidthInTime * posTimeRatio;
  }

  return {
    timePosRatio: timePosRatio,
    offset: mouseTimeOffset,
    timeWidth: labelWidthInTime,
    posWidth: labelWidthInPos
  };
};

var DisplayBarLabeled = function DisplayBarLabeled(props) {
  var duration = props.duration,
      mouseTime = props.mouseTime,
      currentTime = props.currentTime,
      _props$width = props.width,
      width = _props$width === undefined ? 4 : _props$width,
      _props$chapters = props.chapters,
      chapters = _props$chapters === undefined ? [] : _props$chapters,
      _props$classes = props.classes,
      classes = _props$classes === undefined ? {} : _props$classes;


  if (!duration || !mouseTime.time) return null;

  var Labels = chapters.map(function (it) {
    var _calcLabelDimensions = calcLabelDimensions(it.start, mouseTime, width),
        timePosRatio = _calcLabelDimensions.timePosRatio,
        offset = _calcLabelDimensions.offset,
        pxWidth = _calcLabelDimensions.posWidth,
        timeWidth = _calcLabelDimensions.timeWidth;

    var shiftLeft = it.start * 100 / duration;
    var isCursorAboveLabel = offset < timeWidth / 2;
    var isLabelPassed = it.start <= currentTime;
    var shouldColorLabels = timePosRatio / duration <= 1.5 * 1e-2;


    var styles = {
      left: shiftLeft + '%',
      position: 'absolute',
      transform: 'translate(-50%)',
      width: pxWidth + 'px',
      height: '.3em'
    };

    return _react2.default.createElement('div', {
      key: it.label,
      className: (0, _classnames2.default)('video-react-progress-labels', classes.item),
      style: !shouldColorLabels ? styles : _extends({}, styles, {
        backgroundColor: isCursorAboveLabel ? '#06ff60' : isLabelPassed ? '#ffec17' : '#ffec17'
      })
    });
  });

  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)('video-react-progress-labels', classes.outer) },
    Labels
  );
};

var string = _propTypes2.default.string,
    number = _propTypes2.default.number,
    arrayOf = _propTypes2.default.arrayOf,
    shape = _propTypes2.default.shape;


DisplayBarLabeled.displayName = 'DisplayBarLabeled';

DisplayBarLabeled.propTypes = {
  classes: shape({
    item: string,
    outer: string
  }),
  duration: number.isRequired,
  mouseTime: shape({
    time: number || null,
    position: number || null
  }),
  currentTime: number.isRequired,
  width: number,
  chapters: arrayOf(shape({
    start: number.isRequired,
    end: number.isRequired,
    label: string.isRequired
  }))
};

exports.DisplayBarLabeled = DisplayBarLabeled;
exports.calcLabelDimensions = calcLabelDimensions;
exports.default = DisplayBarLabeled;