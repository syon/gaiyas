import { combineReducers } from 'redux'
import hatebuReducer from './HatebuReducer'
import tabReducer from './TabReducer'
import waitingReducer from './WaitingReducer'

export default combineReducers({
  hatebu: hatebuReducer,
  tab: tabReducer,
  waiting: waitingReducer,
})
