/* @type */
import React from 'react'
import $ from 'jquery'
import TimeOrderList from './TimeOrderList.jsx'
import StarOrderList from './StarOrderList.jsx'
const T = React.PropTypes

module.exports = React.createClass({
  propTypes: {
    store: T.object.isRequired
  },
  getInitialState() {
    return { pos: 0 }
  },
  autoControl(commentCount) {
    if (commentCount > 0 && window.innerWidth > 1500) {
      $('#chrome-extension-gaiyas').removeClass('closed')
    } else {
      if (this.props.tab === 'New') {
        $('#chrome-extension-gaiyas').addClass('closed')
      }
    }
  },
  render() {
    let theList = null
    switch (this.props.tab) {
    case 'New':
      theList = <TimeOrderList store={this.props.store} autoControl={this.autoControl} />
      break
    case 'Ranking':
      theList = <StarOrderList store={this.props.store} autoControl={this.autoControl} />
      break
    }
    return (
      <div className="ceg__commentbox" ref="TheCommentList">
        { theList }
      </div>
    )
  }
})
