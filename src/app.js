/* @type */
import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import Main from './components/main.jsx'

import './css/app.css'

let store = {}

let B = {}
if (location.protocol === 'https:') {
  B.apiOrigin = 'https://b.hatena.ne.jp'
} else {
  B.apiOrigin = 'http://api.b.st-hatena.com'
}
const target_url = location.href

$.ajax({
  url: B.apiOrigin + '/entry/jsonlite/?url=' + target_url,
  dataType: 'jsonp',
  cache: false
})
  .done(function(data) {
    store.hatena = data
    render()
  })

function render() {
  ReactDOM.render(
    <Main store={store} />,
    document.getElementById('app')
  )
}

render()
