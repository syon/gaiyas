// http://qiita.com/kompiro/items/d1ffcfcba7cc34d364f0
// import fetch from 'isomorphic-fetch'
import $ from 'jquery'

let B = {}
if (location.protocol === 'https:') {
  B.apiOrigin = 'https://b.hatena.ne.jp'
  B.starOrigin = 'https://s.hatena.com'
} else {
  B.apiOrigin = 'http://api.b.st-hatena.com'
  B.starOrigin = 'http://s.hatena.com'
}
const target_url = location.href

function receivePosts(data) {
  return {
    type: 'RECEIVE_POSTS',
    data: data,
    receivedAt: Date.now()
  }
}

export function fetchPosts() {
  return function (dispatch) {
    dispatch({ type: 'REQUEST_POSTS' })
    return $.ajax({
      dataType: 'jsonp', // Needs on development
      url: B.apiOrigin + '/entry/jsonlite/?url=' + target_url
    })
    .done(function(data) {
      dispatch(receivePosts(data))
    })
  }
}
