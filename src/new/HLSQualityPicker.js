import React, { Component } from 'react'
import PropTypes from 'prop-types'

class HLSQualityPicker extends Component {
  render () {
    const { hls, levels } = this.props

    console.log(hls, levels)

    return (
      <div>quality</div>
    )
  }
}

HLSQualityPicker.propTypes = {
  hls: PropTypes.object,
  levels: PropTypes.array
}

export default HLSQualityPicker
