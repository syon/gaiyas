/* @type */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { fetchPosts, makeRanking } from './actions'
import Main from './components/Main.jsx'
import configureStore from './store/configureStore'
import './css/app.css'

const defaultUrl = new URL(location.href);
// Stop to load automatically if insertElement has data-lazy attribute when it has following param
// ?chrome-extension-gaiyas=<URL>
// Instead of it, wait for `postMessage({ type: 'gaiyas::fetch', url: <url> }, '*')`
const isPopupEmbed = defaultUrl.searchParams.has('chrome-extension-gaiyas');
// Wait for starting if insertElement is not found
// <div id='chrome-extension-gaiyas' />
// It should wait for `postMessage({ type: 'gaiyas::fetch', url: <url> }, '*')`
const insertElement = document.getElementById('chrome-extension-gaiyas');
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

if (isPopupEmbed || !insertElement) {
  // wait for message to start manually
  window.addEventListener('message', function(event) {
    const insertElement = document.getElementById('chrome-extension-gaiyas');
    if (event.data.type === 'gaiyas::fetch' && insertElement) {
      // popup.js send url or ?chrome-extension-gaiyas=<url>
      const url = event.data.url || defaultUrl.searchParams.get('chrome-extension-gaiyas');
      startLoad(url);
      ReactDOM.render(
        <Provider store={store}>
          <Main manual={isPopupEmbed}/>
        </Provider>,
        insertElement,
      )
    }
  });
} else {
  // start to load automatically
  startLoad(defaultUrl.toString());
  ReactDOM.render(
    <Provider store={store}>
      <Main manual={isPopupEmbed}/>
    </Provider>,
    insertElement,
  );

}
