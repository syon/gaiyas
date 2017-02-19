import { combineReducers } from 'redux'
import hatebuReducer from './HatebuReducer'
import tabReducer from './TabReducer'
import tabCntReducer from './TabCntReducer'
import waitingReducer from './WaitingReducer'

export default combineReducers({
  hatebu: hatebuReducer,
  tab: tabReducer,
  tabCnt: tabCntReducer,
  waiting: waitingReducer,
})
