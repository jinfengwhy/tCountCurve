import {
  PUT_PB_CACHE,
} from '../constants/pbCache'

export const putPbCacheAction = (key: string, value: any) => {
  return {
    type: PUT_PB_CACHE,
    key,
    value,
  }
}
