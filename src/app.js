/* @type */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { fetchPosts } from './actions'
import Main from './components/Main.jsx'
import configureStore from './store/configureStore'

const store = configureStore

import './css/app.css'

store.dispatch(fetchPosts()).then(() =>
  console.log('store.dispatch(fetchPosts())', store.getState())
)

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('chrome-extension-gaiyas')
)
