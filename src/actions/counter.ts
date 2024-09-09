import {
  ADD,
  MINUS,
  RESET,
  EDIT
} from '../constants/counter'

export const add = () => {
  return {
    type: ADD
  }
}
export const minus = () => {
  return {
    type: MINUS
  }
}
export const reset = () => {
  return {
    type: RESET
  }
}
export const edit = (value: number) => {
  return {
    type: EDIT,
    value
  }
}

// 异步的action
export function asyncAdd () {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}
