// http://qiita.com/kompiro/items/d1ffcfcba7cc34d364f0
// https://github.com/reactjs/redux/blob/master/examples/real-world/src/store/configureStore.prod.js
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore)

const configureStore = createStoreWithMiddleware(rootReducer)

export default configureStore
