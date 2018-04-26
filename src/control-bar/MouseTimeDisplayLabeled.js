import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { MouseTimeDisplay } from 'video-react'

import { calcLabelDimensions } from './DisplayBarLabeled'

const MouseTimeDisplayLabeled = (props) => {
  const {
    mouseTime,
    duration,
    className,
    width = 4,
    chapters = []
  } = props

  if (!duration || !mouseTime.time) return null

  const labelUnderneathCursor = chapters.filter((it) => {
    const {offset, timeWidth} = calcLabelDimensions(it.start, mouseTime, width)
    const isCursorAboveLabel = offset < timeWidth / 2

    return isCursorAboveLabel
  })

  return !labelUnderneathCursor.length
    ? (
      <MouseTimeDisplay
        duration={duration}
        mouseTime={mouseTime}
      />
    )
    : (
      <div>
        <MouseTimeDisplay
          className={classNames('video-react-mouse-display-label', className)}
          duration={duration}
          mouseTime={mouseTime}
          text={labelUnderneathCursor[0].label}
        />
        <style dangerouslySetInnerHTML={{
          __html: `.video-react-mouse-display-label:after {
            bottom: 1.45em;
            font-family: sans-serif;
            top: auto !important;
          }`}} />
      </div>
    )
}

const { number, string, shape, arrayOf } = PropTypes

MouseTimeDisplayLabeled.displayName = 'MouseTimeDisplayLabeled'

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
}

export {
  MouseTimeDisplayLabeled
}

export default MouseTimeDisplayLabeled
