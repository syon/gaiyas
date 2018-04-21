/* @type */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { fetchPosts, makeRanking } from './actions'
import Main from './components/Main.jsx'
import configureStore from './store/configureStore'
import './css/app.css'

const url = new URL(location.href);
// ?chrome-extension-gaiyas=URL
// or
// location.href
const isPopupEmbed = url.searchParams.has("chrome-extension-gaiyas");
const targetUrl = isPopupEmbed
                  ? url.searchParams.get("chrome-extension-gaiyas")
                  : url.toString();
const store = configureStore

store.dispatch(fetchPosts(targetUrl)).then(() => {
  // console.log('store.dispatch(fetchPosts())', store.getState())
  const state = store.getState()
  if (!state.waiting.isWaiting) {
    store.dispatch(makeRanking(state.hatebu.hatena))
  } else {
    // console.log('Waiting...', store.getState())
  }
})

ReactDOM.render(
  <Provider store={store}>
    <Main manual={isPopupEmbed}/>
  </Provider>,
  document.getElementById('chrome-extension-gaiyas'),
)
