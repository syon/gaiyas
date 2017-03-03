/* @type */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'
import CommentBox from './CommentBox.jsx'
import { makeRanking } from '../actions'
import bubbleIcon from '../icons/bubble.svg'
import bookmarkIcon from '../icons/bookmark.svg'
import voiceIcon from '../icons/voice.svg'

class Main extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    hatebu: PropTypes.object.isRequired,
    tab: PropTypes.string.isRequired,
    tabCnt: PropTypes.number.isRequired,
    waiting: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.toggleClose = this.toggleClose.bind(this)
    this.pleaseMore = this.pleaseMore.bind(this)
    this.switchRankingTab = this.switchRankingTab.bind(this)
    this.switchNewTab = this.switchNewTab.bind(this)
    this.switchAllTab = this.switchAllTab.bind(this)
    this.state = { manual: false }
  }

  toggleClose() {
    this.setState({ manual: true })
    $('#chrome-extension-gaiyas').toggleClass('closed')
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

  switchAllTab(ev) {
    ev.preventDefault()
    this.props.dispatch({ type: 'TAB_ALL' })
    $('.ceg__comments').scrollTop(0)
  }

  render() {
    const { hatebu, tab, tabCnt } = this.props
    const activeR = (tab === 'Ranking' ? 'ceg__active' : '')
    const activeN = (tab === 'New' ? 'ceg__active' : '')
    const activeA = (tab === 'All' ? 'ceg__active' : '')
    return (
      <div className="ceg__wrap">
        <div className="ceg__header">
          <button className="ceg__toggle" onClick={this.toggleClose}>
            <img src={bubbleIcon} alt="" />
          </button>
          <div className="ceg__cnt">
            <img src={bookmarkIcon} alt="" />
            <span>{hatebu.hatena.count}</span>
          </div>
          <div className="ceg__cnt">
            <img src={voiceIcon} alt="" />
            <span>{tabCnt.tabN}</span>
          </div>
        </div>
        <div className="ceg__segmentcontrol">
          <div className="ceg__segments">
            <button className={`ceg__seg ${activeR}`} onClick={this.switchRankingTab}>Ranking</button>
            <button className={`ceg__seg ${activeN}`} onClick={this.switchNewTab}>{`New ${tabCnt.tabN}`}</button>
            <button className={`ceg__seg ${activeA}`} onClick={this.switchAllTab}>{`All ${tabCnt.tabA}`}</button>
          </div>
        </div>
        <CommentBox {...this.props} manual={this.state.manual} />
      </div>
    )
  }
}

function select(state) {
  return {
    hatebu: state.hatebu,
    tab: state.tab,
    tabCnt: state.tabCnt,
    waiting: state.waiting,
  }
}

export default connect(select)(Main)
