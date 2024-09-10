import { combineReducers } from 'redux'
import counter from './counter'
import remark from './remark';

export default combineReducers({
  counter,
  remark
})
