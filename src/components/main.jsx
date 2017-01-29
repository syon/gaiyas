/* @type */
import React from 'react'
import $ from 'jquery'
import Comments from './comments.jsx'
const T = React.PropTypes

module.exports = React.createClass({
  propTypes: {
    store: T.object.isRequired
  },
  toggleClose() {
    $('#chrome-extension-gaiyas').toggleClass('closed')
  },
  render() {
    const h = this.props.store.hatena
    return (
      <div className="ceg__wrap">
        <div className="ceg__header">
          <button className="ceg__toggle" onClick={this.toggleClose}>B!</button>
          <div className="ceg__title">Hatena Bookmark</div>
          <div className="ceg__cnt">{h.count}</div>
        </div>
        <Comments store={this.props.store} />
      </div>
    )
  }
})
