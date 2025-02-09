import {
  PUT_PE_CACHE,
} from '../constants/peCache'

export const putPeCacheAction = (key: string, value: any) => {
  return {
    type: PUT_PE_CACHE,
    key,
    value,
  }
}
