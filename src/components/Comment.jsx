/* @type */
import React from 'react'
import ReactDOM from 'react-dom'
const T = React.PropTypes

module.exports = React.createClass({
  propTypes: {
    bookmark: T.object.isRequired,
    store: T.object.isRequired,
    pos: T.number.isRequired
  },
  getInitialState() {
    return { p: 9999, overred: false }
  },
  componentDidMount() {
    const tc = ReactDOM.findDOMNode(this.refs.TheComment)
    this.setState({ p: tc.offsetTop })
  },
  render() {
    const b = this.props.bookmark
    const bucomeHash = this.props.store.bucome
    const u = `${b.user.slice(0,2)}/${b.user}`
    let s = null
    if (bucomeHash[b.user]) {
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
          <img className="ceg__avatarimg" src={imgurl}/>
          { s }
        </div>
        <div className="ceg__comment">
          <span>{b.comment}</span>
        </div>
      </div>
    )
  }
})
