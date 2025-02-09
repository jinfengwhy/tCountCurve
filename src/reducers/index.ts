import { combineReducers } from 'redux'
import counter from './counter'
import remark from './remark';
import photo from './photo';
import autho from './autho';
import peForm from './peForm'
import peCache from './peCache'
import pbForm from './pbForm'
import pbCache from './pbCache'

export default combineReducers({
  counter,
  remark,
  photo,
  autho,
  peForm,
  peCache,
  pbForm,
  pbCache
})
