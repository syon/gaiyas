/* @type */
import React from 'react'
import $ from 'jquery'
import CommentList from './CommentList.jsx'
const T = React.PropTypes

module.exports = React.createClass({
  propTypes: {
    store: T.object.isRequired
  },
  getInitialState() {
    return {tab: 'New'}
  },
  switchRankingTab(ev) {
    ev.preventDefault()
    this.setState({tab: 'Ranking'})
    $('.ceg__comments').scrollTop(0)
  },
  switchNewTab(ev) {
    ev.preventDefault()
    this.setState({tab: 'New'})
    $('.ceg__comments').scrollTop(0)
  },
  toggleClose() {
    $('#chrome-extension-gaiyas').toggleClass('closed')
  },
  render() {
    const h = this.props.store.hatena
    let activeR = (this.state.tab === 'Ranking' ? 'ceg__active' : '')
    let activeN = (this.state.tab === 'New'     ? 'ceg__active' : '')
    return (
      <div className="ceg__wrap">
        <div className="ceg__header">
          <button className="ceg__toggle" onClick={this.toggleClose}>B!</button>
          <div className="ceg__title">Hatena Bookmark</div>
          <div className="ceg__cnt">{h.count}</div>
        </div>
        <div className="ceg__segmentcontrol">
          <div className="ceg__segments">
            <a href="#" className={`ceg__seg ${activeR}`} onClick={this.switchRankingTab}>Ranking</a>
            <a href="#" className={`ceg__seg ${activeN}`} onClick={this.switchNewTab}>New</a>
          </div>
        </div>
        <CommentList store={this.props.store} tab={this.state.tab} />
      </div>
    )
  }
})
