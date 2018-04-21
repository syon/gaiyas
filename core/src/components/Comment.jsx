/* @type */
import PropTypes from 'prop-types';

import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import moment from 'moment'

class Comment extends Component {

  static propTypes = {
    bookmark: PropTypes.object.isRequired,
    bucome: PropTypes.object.isRequired,
    pos: PropTypes.number.isRequired,
  }

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
    let star = null
    if (bucomeHash && bucomeHash[b.user]) {
      star = `★${bucomeHash[b.user]}`
    }
    if (this.state.p < this.props.pos + 1000 && !this.state.overred) {
      this.setState({ overred: true })
    }
    let imgurl = ''
    if (this.state.overred) {
      imgurl = `https://cdn1.www.st-hatena.com/users/${u}/profile_l.gif`
    }
    const timestamp = moment(b.timestamp, 'YYYY/MM/DD HH:mm:ss').format('YYYY.M.D')
    return (
      <div key={b.user} className="ceg__line" ref="TheComment">
        <div className="ceg__commenter">
          <div className="ceg__cmtr-left">
            <div className="ceg__user">
              <div className="ceg__avatar">
                <img className="ceg__avatarimg" src={imgurl} alt={b.user} />
              </div>
              <div className="ceg__username">{ b.user }</div>
            </div>
          </div>
          <div className="ceg__cmtr-right">
            <div className="ceg__star">{ star }</div>
            <div className="ceg__timestamp">{ timestamp }</div>
          </div>
        </div>
        <div className="ceg__comment">
          <span>{b.comment}</span>
        </div>
      </div>
    )
  }
}

export default Comment
