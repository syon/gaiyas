import { combineReducers } from 'redux'
import hatebuReducer from './HatebuReducer'
import tabReducer from './TabReducer'

export default combineReducers({
  hatebu: hatebuReducer,
  tab: tabReducer
})
