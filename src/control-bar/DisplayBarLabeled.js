import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const calcLabelDimensions = (time, mouseTime, width) => {
  const {time: mtime, position} = mouseTime

  const posTimeRatio = position / mtime
  // how much px for sec
  const timePosRatio = Math.pow(posTimeRatio, -1) // eslint-disable-line no-unused-vars
  // how much sec for px

  const mouseTimeOffset = Math.abs(time - mtime)
  // bias between time and cursor (according to the position on the timeline) to both sides

  let labelWidthInPos = width
  let labelWidthInTime = Math.round(labelWidthInPos * timePosRatio)
  // sec = px * sec / px

  if (!labelWidthInTime) {
    labelWidthInTime = 1
    labelWidthInPos = labelWidthInTime * posTimeRatio
  }

  return {
    timePosRatio,
    offset: mouseTimeOffset,
    timeWidth: labelWidthInTime,
    posWidth: labelWidthInPos
  }
}

const DisplayBarLabeled = (props) => {
  const {
    duration,
    mouseTime,
    currentTime,
    width = 4,
    chapters = [],
    classes = {}
  } = props

  if (!duration || !mouseTime.time) return null

  const Labels = chapters.map((it) => {
    const {
      timePosRatio, offset, posWidth: pxWidth, timeWidth
    } = calcLabelDimensions(it.start, mouseTime, width)

    const shiftLeft = it.start * 100 / duration
    const isCursorAboveLabel = offset < timeWidth / 2
    const isLabelPassed = it.start <= currentTime
    const shouldColorLabels = timePosRatio / duration <= 1.5 * 1e-2
    // means that 1px should not contain more that 1.5% of video
    // in that case markers cover the whole seek bar

    const styles = {
      left: `${shiftLeft}%`,
      position: 'absolute',
      transform: 'translate(-50%)',
      width: `${pxWidth}px`,
      height: '.3em'
    }

    return <div
      key={it.label}
      className={classNames('video-react-progress-labels', classes.item)}
      style={!shouldColorLabels ? styles : {
        ...styles,
        backgroundColor: isCursorAboveLabel
          ? '#06ff60' : (isLabelPassed ? '#ffec17' : '#ffec17')
      }}
    />
  })

  return <div className={classNames('video-react-progress-labels', classes.outer)}>
    {Labels}
  </div>
}

const {string, number, arrayOf, shape} = PropTypes

DisplayBarLabeled.displayName = 'DisplayBarLabeled'

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
}

export {
  DisplayBarLabeled,
  calcLabelDimensions
}

export default DisplayBarLabeled
