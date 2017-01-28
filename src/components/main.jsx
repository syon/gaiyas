/* @type */
import React from 'react'
import $ from 'jquery'
const T = React.PropTypes

module.exports = React.createClass({
  propTypes: {
    store: T.object.isRequired
  },
  autoControl(commentCount) {
    if (commentCount > 0 && window.innerWidth > 1200) {
      $('#chrome-extension-gaiyas').removeClass('closed')
    } else {
      $('#chrome-extension-gaiyas').addClass('closed')
    }
  },
  toggleClose() {
    $('#chrome-extension-gaiyas').toggleClass('closed')
  },
  render() {
    const h = this.props.store.hatena
    const comments = []
    h.bookmarks.filter((b) => {
      return '' !== b.comment
    }).map((b) => {
      const u = `${b.user.slice(0,2)}/${b.user}`
      const e = (
        <div key={b.user} className="ceg__line">
          <div className="ceg__avatar">
            <img src={`//cdn1.www.st-hatena.com/users/${u}/profile_l.gif`}/>
          </div>
          <div className="ceg__comment">{b.comment}</div>
        </div>
      )
      comments.push(e)
    })
    this.autoControl(comments.length)
    return (
      <div className="ceg__wrap">
        <div className="ceg__header">
          <button className="ceg__toggle" onClick={this.toggleClose}>B!</button>
          <div className="ceg__title">Hatena Bookmark</div>
          <div className="ceg__cnt">{h.count}</div>
        </div>
        <div className="ceg__comments">
          {comments}
        </div>
      </div>
    )
  }
})
