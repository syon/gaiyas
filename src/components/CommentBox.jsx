/* @type */
import React, { Component, PropTypes } from 'react'
import $ from 'jquery'
import TimeOrderList from './TimeOrderList.jsx'
import StarOrderList from './StarOrderList.jsx'
import ProgressBar from './ProgressBar.jsx'

class CommentBox extends Component {

  static propTypes = {
    hatebu: PropTypes.object.isRequired,
    tab: PropTypes.string.isRequired,
    waiting: PropTypes.object.isRequired,
    manual: PropTypes.bool.isRequired,
  }

  constructor() {
    super()
    this.autoControl = this.autoControl.bind(this)
    this.state = { pos: 0 }
  }

  autoControl(commentCount) {
    if (!this.props.manual) {
      if (commentCount > 0 && window.innerWidth > 1500) {
        $('#chrome-extension-gaiyas').removeClass('closed')
      } else if (this.props.tab === 'New') {
        $('#chrome-extension-gaiyas').addClass('closed')
      }
    }
  }

  render() {
    const waiting = this.props.waiting
    let theList = null
    let progress = null
    switch (this.props.tab) {
      case 'New':
        theList = (
          <TimeOrderList
            hatebu={this.props.hatebu}
            autoControl={this.autoControl}
          />
        )
        break
      case 'Ranking':
        theList = (
          <StarOrderList
            hatebu={this.props.hatebu}
            ranking={this.props.hatebu.ranking}
            autoControl={this.autoControl}
          />
        )
        progress = waiting.progressRate < 1 ? <ProgressBar rate={waiting.progressRate} /> : null
        break
      default:
    }
    return (
      <div className="ceg__commentbox" ref="TheCommentList">
        { progress }
        { theList }
      </div>
    )
  }
}

export default CommentBox
