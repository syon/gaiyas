/* @type */
import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import moment from 'moment'
import Main from './components/main.jsx'

import './css/app.css'

let store = {
  hatena: {
    bookmarks: [],
    count: ''
  },
  bucome: []
}

let B = {}
if (location.protocol === 'https:') {
  B.apiOrigin = 'https://b.hatena.ne.jp'
} else {
  B.apiOrigin = 'http://api.b.st-hatena.com'
}
const target_url = location.href

$.ajax({
  url: B.apiOrigin + '/entry/jsonlite/?url=' + target_url,
  // dataType: 'jsonp', // Needs on development
  cache: false
})
  .done(function(data) {
    store.hatena = data
    render(store)
    data.bookmarks.map((b) => {
      const yyyymmdd = moment(b.timestamp, 'YYYY/MM/DD HH:mm:ss').format('YYYYMMDD')
      $.ajax({
        url: `http://s.hatena.com/entry.json?uri=http://b.hatena.ne.jp/${b.user}/${yyyymmdd}%23bookmark-${data.eid}`,
        // dataType: 'jsonp', // Needs on development
        cache: false
      })
        .done((data) => {
          if (data.entries.length > 0) {
            const stars = data.entries[0].stars
            if (stars.length > 0) {
              store.bucome[b.user] = stars.length
              // console.log('Star Count', b.user, stars.length)
              render(store)
            }
          }
        })
    })
  })

function render(store) {
  ReactDOM.render(
    <Main store={store} />,
    document.getElementById('chrome-extension-gaiyas')
  )
}

render(store)
