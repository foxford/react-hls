import React from 'react'
import classNames from 'classnames'
import { SeekBar, Slider, LoadProgressBar, PlayProgressBar } from 'video-react'
import { formatTime } from 'video-react/lib/utils'

import { MouseTimeDisplayLabeled } from './MouseTimeDisplayLabeled'
import { DisplayBarLabeled } from './DisplayBarLabeled'

class SeekBarLabeled extends SeekBar {
  render () {
    const { player: { currentTime, seekingTime, duration, buffered }, mouseTime } = this.props
    const time = seekingTime || currentTime
    // TODO: allow to redefine default SeekBar's childrens
    return (
      <Slider
        ref={(input) => {
          this.slider = input
        }}
        label='video progress bar'
        className={classNames('video-react-progress-holder', this.props.className)}
        valuenow={(this.getPercent() * 100).toFixed(2)}
        valuetext={formatTime(time, duration)}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        getPercent={this.getPercent}
        stepForward={this.stepForward}
        stepBack={this.stepBack}
      >
        <LoadProgressBar
          buffered={buffered}
          currentTime={time}
          duration={duration}
        />
        <MouseTimeDisplayLabeled
          chapters={this.props.chapters}
          duration={duration}
          mouseTime={mouseTime}
        />
        <PlayProgressBar
          currentTime={time}
          duration={duration}
        />
        <DisplayBarLabeled
          chapters={this.props.chapters}
          currentTime={time}
          duration={duration}
          mouseTime={mouseTime}
        />
      </Slider>
    )
  }
}

export {
  SeekBarLabeled
}

export default SeekBarLabeled
