/* @type */
import React from 'react'
const T = React.PropTypes

module.exports = React.createClass({
  propTypes: {
    store: T.object.isRequired
  },
  getInitialState() {
    return {
      text: 'Hello world!'
    }
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
    return (
      <div className="ceg__wrap">
        <div className="ceg__header">
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
