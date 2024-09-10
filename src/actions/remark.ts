import {
  PUT_REMARK,
} from '../constants/remark'

export const putRemarkAction = (counter: number, remark: string) => {
  return {
    type: PUT_REMARK,
    counter,
    remark,
  }
}
