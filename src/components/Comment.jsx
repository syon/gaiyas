/* @type */
import React from 'react'
const T = React.PropTypes

module.exports = React.createClass({
  propTypes: {
    bookmark: T.object.isRequired,
    store: T.object.isRequired
  },
  render() {
    const b = this.props.bookmark
    const bucomeHash = this.props.store.bucome
    const u = `${b.user.slice(0,2)}/${b.user}`
    let s = null
    if (bucomeHash[b.user]) {
      s = <span className="ceg__star">{bucomeHash[b.user]}</span>
    }
    return (
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
  }
})
