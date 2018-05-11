import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MenuButton from 'video-react/lib/components/menu/MenuButton'
import './ChapterPicker.css'

class CustomMenuButton extends MenuButton {
  componentWillReceiveProps (nextProps) {
    if (nextProps.selectedIndex !== this.props.selectedIndex) {
      this.setState({activateIndex: nextProps.selectedIndex})
    }
  }
}

class ChapterPicker extends Component {
  constructor () {
    super()

    this.state = {
      currentChapterIndex: 0
    }

    this.handleSelectItem = this.handleSelectItem.bind(this)
    this._updateSelectedItem = this._updateSelectedItem.bind(this)

    this.intervalId = null
  }

  componentDidMount () {
    this.intervalId = setInterval(this._updateSelectedItem, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.intervalId)
  }

  handleSelectItem (index) {
    const { actions, items } = this.props

    actions.seek(items[index].start)
  }

  _updateSelectedItem () {
    const { player: { currentTime }, items } = this.props
    let currentChapterIndex = null

    items.forEach((chapter, index) => {
      if (currentTime >= chapter.start && currentTime < chapter.end) {
        currentChapterIndex = index
      }
    })

    if (currentChapterIndex !== this.state.currentChapterIndex) {
      this.setState({currentChapterIndex})
    }
  }

  render () {
    const { currentChapterIndex } = this.state
    const { items } = this.props
    const menuItems = items.map((item, index) => (
      {
        label: item.label,
        value: index
      }
    ))

    return (
      <CustomMenuButton
        items={menuItems}
        selectedIndex={currentChapterIndex}
        onSelectItem={this.handleSelectItem}
        className='video-react-chapter-picker'
      >
        <div className='video-react-active-track-label'>&nbsp;</div>
      </CustomMenuButton>
    )
  }
}

ChapterPicker.propTypes = {
  actions: PropTypes.object,
  player: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired
  }))
}

export default ChapterPicker
