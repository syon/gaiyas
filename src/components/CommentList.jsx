/* @type */
import React from 'react'
import $ from 'jquery'
import Comment from './Comment.jsx'
const T = React.PropTypes

module.exports = React.createClass({
  propTypes: {
    store: T.object.isRequired
  },
  autoControl(commentCount) {
    if (commentCount > 0 && window.innerWidth > 1500) {
      $('#chrome-extension-gaiyas').removeClass('closed')
    } else {
      $('#chrome-extension-gaiyas').addClass('closed')
    }
  },
  render() {
    let bms = this.props.store.hatena.bookmarks
    switch (this.props.tab) {
    case 'New':
      bms = this.props.store.hatena.bookmarks
      break
    case 'Ranking':
      bms = this.props.store.hatena.ranking
      break
    }
    const comments = []
    bms.filter((b) => {
      return '' !== b.comment
    }).map((b) => {
      const e = (
        <Comment key={b.user} bookmark={b} store={this.props.store} />
      )
      comments.push(e)
    })
    this.autoControl(comments.length)
    return (
      <div className="ceg__comments">
        {comments}
      </div>
    )
  }
})
