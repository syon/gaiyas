/* @type */
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

class Comment extends Component {
  constructor() {
    super()
    this.state = { p: 9999, overred: false }
  }

  componentDidMount() {
    this.onMount()
  }

  onMount() {
    const tc = ReactDOM.findDOMNode(this.refs.TheComment)
    this.setState({ p: tc.offsetTop })
  }

  render() {
    const b = this.props.bookmark
    const bucomeHash = this.props.bucome
    const u = `${b.user.slice(0, 2)}/${b.user}`
    let s = null
    if (bucomeHash && bucomeHash[b.user]) {
      s = <span className="ceg__star">{bucomeHash[b.user]}</span>
    }
    if (this.state.p < this.props.pos + 1000 && !this.state.overred) {
      this.setState({ overred: true })
    }
    let imgurl = ''
    if (this.state.overred) {
      imgurl = `//cdn1.www.st-hatena.com/users/${u}/profile_l.gif`
    }
    return (
      <div key={b.user} className="ceg__line" ref="TheComment">
        <div className="ceg__avatar">
          <img className="ceg__avatarimg" src={imgurl} alt={b.user} />
          { s }
        </div>
        <div className="ceg__comment">
          <span>{b.comment}</span>
        </div>
      </div>
    )
  }
}

Comment.propTypes = {
  bookmark: PropTypes.object.isRequired,
  bucome: PropTypes.object.isRequired,
  pos: PropTypes.number.isRequired,
}

export default Comment
