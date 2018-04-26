import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { ProgressControl } from 'video-react'

import { SeekBarLabeled } from './SeekBarLabeled'

class ProgressControlLabeled extends ProgressControl {
  render () {
    const { className } = this.props
    return (
      <div
        onMouseMove={this.handleMouseMoveThrottle}
        className={classNames('video-react-progress-control video-react-control', className)}
      >
        <SeekBarLabeled
          mouseTime={this.state.mouseTime}
          ref={
            (c) => {
              this.seekBar = c
            }
          }
          {...this.props}
        />
      </div>
    )
  }
}

const { shape, arrayOf, number, string } = PropTypes

ProgressControlLabeled.propTypes = {
  ...ProgressControl.propTypes,
  chapters: arrayOf(shape({
    start: number.isRequired,
    end: number.isRequired,
    label: string.isRequired
  }))
}

export {
  ProgressControlLabeled
}

export default ProgressControlLabeled
