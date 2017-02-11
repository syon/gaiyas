/* @type */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'
import CommentBox from './CommentBox.jsx'
import { makeRanking } from '../actions'

class Main extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    hatebu: PropTypes.object.isRequired,
    tab: PropTypes.string.isRequired,
    waiting: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.toggleClose = this.toggleClose.bind(this)
    this.pleaseMore = this.pleaseMore.bind(this)
    this.switchRankingTab = this.switchRankingTab.bind(this)
    this.switchNewTab = this.switchNewTab.bind(this)
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

  render() {
    const { hatebu, tab } = this.props
    const h = hatebu
    const activeR = (tab === 'Ranking' ? 'ceg__active' : '')
    const activeN = (tab === 'New' ? 'ceg__active' : '')
    return (
      <div className="ceg__wrap">
        <div className="ceg__header">
          <button className="ceg__toggle" onClick={this.toggleClose}>B!</button>
          <div className="ceg__title">Hatena Bookmark</div>
          <div className="ceg__cnt">{h.hatena.count}</div>
        </div>
        <div className="ceg__segmentcontrol">
          <div className="ceg__segments">
            <button className={`ceg__seg ${activeR}`} onClick={this.switchRankingTab}>Ranking</button>
            <button className={`ceg__seg ${activeN}`} onClick={this.switchNewTab}>New</button>
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
    waiting: state.waiting,
  }
}

export default connect(select)(Main)