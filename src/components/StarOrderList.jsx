/* @type */
import React from 'react'
import ReactDOM from 'react-dom'
import Comment from './Comment.jsx'
const T = React.PropTypes

module.exports = React.createClass({
  propTypes: {
    store: T.object.isRequired,
    autoControl: T.func.isRequired
  },
  getInitialState() {
    return { pos: 0 }
  },
  componentDidMount() {
    const tcl = ReactDOM.findDOMNode(this.refs.RefStarOrderList)
    if (tcl) {
      tcl.onscroll = (ev) => {
        this.setState({ pos: ev.target.scrollTop })
      }
    }
  },
  render() {
    let bms = this.props.store.ranking.slice(0, 20)
    const comments = []
    bms.filter((b) => {
      return '' !== b.comment
    }).map((b) => {
      const e = (
        <Comment key={b.user} bookmark={b} store={this.props.store} pos={this.state.pos} />
      )
      comments.push(e)
    })
    this.props.autoControl(comments.length)
    return (
      <div className="ceg__comments" ref="RefStarOrderList" data-pos={this.state.pos}>
        {comments}
      </div>
    )
  }
})
