/* @type */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'
import CommentList from './CommentList.jsx'

class Main extends Component {

  constructor(){
    super()
    this.switchRankingTab = this.switchRankingTab.bind(this)
    this.switchNewTab = this.switchNewTab.bind(this)
  }

  switchRankingTab(ev) {
    ev.preventDefault()
    this.props.dispatch({ type: 'TAB_RANKING' })
    $('.ceg__comments').scrollTop(0)
  }

  switchNewTab(ev) {
    ev.preventDefault()
    this.props.dispatch({ type: 'TAB_NEW' })
    $('.ceg__comments').scrollTop(0)
  }

  toggleClose() {
    $('#chrome-extension-gaiyas').toggleClass('closed')
  }

  render() {
    const { hatebu, tab } = this.props
    const h = hatebu
    let activeR = (tab === 'Ranking' ? 'ceg__active' : '')
    let activeN = (tab === 'New'     ? 'ceg__active' : '')
    return (
      <div className="ceg__wrap">
        <div className="ceg__header">
          <button className="ceg__toggle" onClick={this.toggleClose}>B!</button>
          <div className="ceg__title">Hatena Bookmark</div>
          <div className="ceg__cnt">{h.hatena.count}</div>
        </div>
        <div className="ceg__segmentcontrol">
          <div className="ceg__segments">
            <a href="#" className={`ceg__seg ${activeR}`} onClick={this.switchRankingTab}>Ranking</a>
            <a href="#" className={`ceg__seg ${activeN}`} onClick={this.switchNewTab}>New</a>
          </div>
        </div>
        <CommentList store={hatebu} tab={tab} />
      </div>
    )
  }
}

Main.propTypes = {
  hatebu: PropTypes.object.isRequired,
  tab: PropTypes.string.isRequired
}

function select(state) {
  return {
    hatebu: state.hatebu,
    tab: state.tab
  }
}

export default connect(select)(Main)
