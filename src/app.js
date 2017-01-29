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
    ranking: [],
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
    // console.log(data)
    store.hatena = data
    store.hatena.ranking = Object.assign([], data.bookmarks)
    render(store)
    let remain_cnt = data.bookmarks.length
    data.bookmarks.forEach((b) => {
      const yyyymmdd = moment(b.timestamp, 'YYYY/MM/DD HH:mm:ss').format('YYYYMMDD')
      $.ajax({
        url: `http://s.hatena.com/entry.json?uri=http://b.hatena.ne.jp/${b.user}/${yyyymmdd}%23bookmark-${data.eid}`,
        // dataType: 'jsonp', // Needs on development
        cache: false
      })
        .done((data) => {
          if (data.entries.length > 0) {
            const stars = data.entries[0].stars
            store.bucome[b.user] = stars.length
            applyStarCountForRanking(b.user, stars.length)
            // console.log(store.hatena.ranking)
            render(store)
          }
        })
        .always(() => {
          remain_cnt = remain_cnt - 1
          // console.log(remain_cnt)
        })
    })
  })

function matchUser(element) {
  return element.user === this
}

function applyStarCountForRanking(user, star_cnt) {
  let b = store.hatena.ranking.find(matchUser, user)
  b.star = star_cnt
  store.hatena.ranking.sort((a, b) => {
    if (a.star > b.star) return -1
    if (a.star < b.star) return 1
    return 0
  })
}

function render(store) {
  ReactDOM.render(
    <Main store={store} />,
    document.getElementById('chrome-extension-gaiyas')
  )
}

render(store)
