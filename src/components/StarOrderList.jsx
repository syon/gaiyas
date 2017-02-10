/* @type */
import React from 'react'
import ReactDOM from 'react-dom'
import Comment from './Comment.jsx'
const T = React.PropTypes

module.exports = React.createClass({
  propTypes: {
    store: T.object.isRequired,
    hatebu: T.object.isRequired,
    ranking: T.object.isRequired,
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
    const { hatebu, ranking, autoControl } = this.props
    const bms = ranking.slice(0, 20)
    const comments = []
    bms.filter((b) => {
      return '' !== b.comment
    }).map((b) => {
      const e = (
        <Comment key={b.user} bookmark={b} bucome={hatebu.bucome} pos={this.state.pos} />
      )
      comments.push(e)
    })
    autoControl(comments.length)
    return (
      <div className="ceg__comments" ref="RefStarOrderList" data-pos={this.state.pos}>
        {comments}
      </div>
    )
  }
})
