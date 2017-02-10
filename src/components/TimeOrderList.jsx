/* @type */
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Comment from './Comment.jsx'

class TimeOrderList extends Component {
  constructor() {
    super()
    this.state = { pos: 0 }
  }

  componentDidMount() {
    const tcl = ReactDOM.findDOMNode(this.refs.RefTimeOrderList)
    if (tcl) {
      tcl.onscroll = (ev) => {
        this.setState({ pos: ev.target.scrollTop })
      }
    }
  }

  render() {
    const bms = this.props.hatebu.hatena.bookmarks
    const comments = []
    bms.filter((b) => {
      return '' !== b.comment
    }).map((b) => {
      const e = (
        <Comment key={b.user} bookmark={b} bucome={this.props.hatebu.bucome} pos={this.state.pos} />
      )
      comments.push(e)
    })
    this.props.autoControl(comments.length)
    return (
      <div className="ceg__comments" ref="RefTimeOrderList" data-pos={this.state.pos}>
        {comments}
      </div>
    )
  }
}

TimeOrderList.propTypes = {
  hatebu: PropTypes.object.isRequired,
  autoControl: PropTypes.func.isRequired,
}

export default TimeOrderList
