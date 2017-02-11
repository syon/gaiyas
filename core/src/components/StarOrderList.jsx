/* @type */
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Comment from './Comment.jsx'

class StarOrderList extends Component {

  static propTypes = {
    hatebu: PropTypes.object.isRequired,
    ranking: PropTypes.object.isRequired,
    autoControl: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = { pos: 0 }
  }

  componentDidMount() {
    const tcl = ReactDOM.findDOMNode(this.refs.RefStarOrderList)
    if (tcl) {
      tcl.onscroll = (ev) => {
        this.setState({ pos: ev.target.scrollTop })
      }
    }
  }

  render() {
    const { hatebu, ranking, autoControl } = this.props
    const comments = ranking.slice(0, 20).filter((b) => {
      return b.comment !== ''
    }).map((b) => {
      return (
        <Comment key={b.user} bookmark={b} bucome={hatebu.bucome} pos={this.state.pos} />
      )
    })
    autoControl(comments.length)
    return (
      <div className="ceg__comments" ref="RefStarOrderList" data-pos={this.state.pos}>
        {comments}
      </div>
    )
  }
}

export default StarOrderList
