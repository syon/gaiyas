/* @type */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { fetchPosts, makeRanking } from './actions'
import Main from './components/Main.jsx'
import configureStore from './store/configureStore'
import './css/app.css'

const defaultUrl = new URL(location.href);
// ?chrome-extension-gaiyas=<URL>
// or
// postMessage({ type: "gaiyas::fetch", url: <url> }, "*")
// or
// location.href
const isPopupEmbed = defaultUrl.searchParams.has("chrome-extension-gaiyas");
const store = configureStore
const startLoad = (url) => {
  store.dispatch(fetchPosts(url)).then(() => {
    // console.log('store.dispatch(fetchPosts())', store.getState())
    const state = store.getState()
    if (!state.waiting.isWaiting) {
      store.dispatch(makeRanking(state.hatebu.hatena))
    } else {
      // console.log('Waiting...', store.getState())
    }
  })
};

if (isPopupEmbed) {
  window.addEventListener("message", function(event) {
    if (event.data.type === "gaiyas::fetch") {
      // popup.js send url or ?chrome-extension-gaiyas=<url>
      const url = event.data.url || defaultUrl.searchParams.get("chrome-extension-gaiyas");
      startLoad(url);
    }
  });
} else {
  startLoad(defaultUrl.toString())
}

ReactDOM.render(
  <Provider store={store}>
    <Main manual={isPopupEmbed}/>
  </Provider>,
  document.getElementById('chrome-extension-gaiyas'),
)
