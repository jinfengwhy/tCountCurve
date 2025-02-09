import {
  PUT_XD_CACHE,
} from '../constants/xdCache'

export const putXdCacheAction = (key: string, value: any) => {
  return {
    type: PUT_XD_CACHE,
    key,
    value,
  }
}
