/* @type */
import React from 'react'
import $ from 'jquery'
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
    // const bms = this.props.store.hatena.bookmarks
    const bms = this.props.store.hatena.ranking
    const bucomeHash = this.props.store.bucome
    const comments = []
    bms.filter((b) => {
      return '' !== b.comment
    }).map((b) => {
      const u = `${b.user.slice(0,2)}/${b.user}`
      let s = null
      if (bucomeHash[b.user]) {
        s = <span className="ceg__star">{bucomeHash[b.user]}</span>
      }
      const e = (
        <div key={b.user} className="ceg__line">
          <div className="ceg__avatar">
            <img src={`//cdn1.www.st-hatena.com/users/${u}/profile_l.gif`}/>
            { s }
          </div>
          <div className="ceg__comment">
            <span>{b.comment}</span>
          </div>
        </div>
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
