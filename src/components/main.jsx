/* @type */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'
import CommentBox from './CommentBox.jsx'
import { makeRanking } from '../actions'

class Main extends Component {

  constructor(){
    super()
    this.pleaseMore = this.pleaseMore.bind(this)
    this.switchRankingTab = this.switchRankingTab.bind(this)
    this.switchNewTab = this.switchNewTab.bind(this)
  }

  pleaseMore() {
    if (this.props.waiting.isWaiting) {
      this.props.dispatch({ type: 'GO_AHEAD' })
      this.props.dispatch(makeRanking(this.props.hatebu.hatena))
    }
  }

  switchRankingTab(ev) {
    ev.preventDefault()
    this.pleaseMore()
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
        <CommentBox store={hatebu} tab={tab} />
      </div>
    )
  }
}

Main.propTypes = {
  hatebu: PropTypes.object.isRequired,
  tab: PropTypes.string.isRequired,
  waiting: PropTypes.object.isRequired
}

function select(state) {
  return {
    hatebu: state.hatebu,
    tab: state.tab,
    waiting: state.waiting
  }
}

export default connect(select)(Main)
