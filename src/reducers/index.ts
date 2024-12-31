import { combineReducers } from 'redux'
import counter from './counter'
import remark from './remark';
import photo from './photo';
import autho from './autho';

export default combineReducers({
  counter,
  remark,
  photo,
  autho,
})
