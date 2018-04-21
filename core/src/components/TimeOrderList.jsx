/* @type */
import PropTypes from 'prop-types';

import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Comment from './Comment.jsx'

class TimeOrderList extends Component {

  static propTypes = {
    hatebu: PropTypes.object.isRequired,
    autoControl: PropTypes.func.isRequired,
  }

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
    const { hatebu } = this.props
    const comments = hatebu.hatena.bookmarks.filter((b) => {
      return b.comment !== ''
    }).map((b) => {
      return (
        <Comment
          key={b.user}
          bookmark={b}
          bucome={this.props.hatebu.bucome}
          pos={this.state.pos}
        />
      )
    })
    this.props.autoControl(comments.length)
    return (
      <div className="ceg__comments" ref="RefTimeOrderList" data-pos={this.state.pos}>
        {comments}
      </div>
    )
  }
}

export default TimeOrderList
