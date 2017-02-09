// http://qiita.com/kompiro/items/d1ffcfcba7cc34d364f0
// import fetch from 'isomorphic-fetch'
import $ from 'jquery'
import moment from 'moment'

let B = {}
if (location.protocol === 'https:') {
  B.apiOrigin = 'https://b.hatena.ne.jp'
  B.starOrigin = 'https://s.hatena.com'
} else {
  B.apiOrigin = 'http://api.b.st-hatena.com'
  B.starOrigin = 'http://s.hatena.com'
}
const target_url = location.href

let theRanking = []
let bucome = {}

function makeRanking(dispatch, data) {
  theRanking = Object.assign([], data.bookmarks)
  let remain_cnt = data.bookmarks.length
  data.bookmarks.forEach((b) => {
    const yyyymmdd = moment(b.timestamp, 'YYYY/MM/DD HH:mm:ss').format('YYYYMMDD')
    $.ajax({
      // dataType: 'jsonp', // Needs on development
      url: `${B.starOrigin}/entry.json?uri=http://b.hatena.ne.jp/${b.user}/${yyyymmdd}%23bookmark-${data.eid}`
    })
      .done((data) => {
        if (data.entries.length > 0) {
          const stars = data.entries[0].stars
          bucome[b.user] = stars.length
          applyStarCountForRanking(b.user, stars.length)
          // console.log(theRanking)
        }
      })
      .always(() => {
        remain_cnt = remain_cnt - 1
        if (remain_cnt == 0) {
          finishMakeRanking(dispatch)
        }
        // console.log(remain_cnt)
      })
  })
}

function matchUser(element) {
  return element.user === this
}

function applyStarCountForRanking(user, star_cnt) {
  let b = theRanking.find(matchUser, user)
  b.star = star_cnt
}

function finishMakeRanking(dispatch) {
  theRanking = theRanking.filter((b) => {
    return b.star > 0
  }).sort((a, b) => {
    if (a.star > b.star) return -1
    if (a.star < b.star) return 1
    return 0
  })
  dispatch({
    type: 'MAKE_RANKING',
    ranking: theRanking,
    bucome: bucome
  })
}

export function fetchPosts() {
  return function (dispatch) {
    return $.ajax({
      // dataType: 'jsonp', // Needs on development
      url: B.apiOrigin + '/entry/jsonlite/?url=' + target_url
    })
    .done(function(data) {
      dispatch({ type: 'RECEIVED_1ST', data: data })
      makeRanking(dispatch, data)
    })
  }
}
