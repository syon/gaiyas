/* @type */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { fetchPosts } from './actions'
// import $ from 'jquery'
// import moment from 'moment'
import Main from './components/Main.jsx'
import configureStore from './store/configureStore'

const store = configureStore

import './css/app.css'

store.dispatch(fetchPosts()).then(() =>
  console.log('store.dispatch(fetchPosts())', store.getState())
)

/*
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
  B.starOrigin = 'https://s.hatena.com'
} else {
  B.apiOrigin = 'http://api.b.st-hatena.com'
  B.starOrigin = 'http://s.hatena.com'
}
const target_url = location.href

$.ajax({
  dataType: 'jsonp', // Needs on development
  url: B.apiOrigin + '/entry/jsonlite/?url=' + target_url
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
        dataType: 'jsonp', // Needs on development
        url: `${B.starOrigin}/entry.json?uri=http://b.hatena.ne.jp/${b.user}/${yyyymmdd}%23bookmark-${data.eid}`
      })
        .done((data) => {
          if (data.entries.length > 0) {
            const stars = data.entries[0].stars
            store.bucome[b.user] = stars.length
            applyStarCountForRanking(b.user, stars.length)
            // console.log(store.hatena.ranking)
          }
        })
        .always(() => {
          remain_cnt = remain_cnt - 1
          if (remain_cnt == 0) {
            finishMakeRanking()
          }
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
}

function finishMakeRanking() {
  store.hatena.ranking = store.hatena.ranking.filter((b) => {
    return b.star > 0
  }).sort((a, b) => {
    if (a.star > b.star) return -1
    if (a.star < b.star) return 1
    return 0
  })
  render(store)
}
*/

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('chrome-extension-gaiyas')
)
