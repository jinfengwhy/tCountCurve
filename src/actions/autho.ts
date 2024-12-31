import { getTokenData } from "@/services/modules/autho"
import { GET_TOKEN_DATA, SYNC_TOKEN_DATA } from "@/constants/autho"

export const getTokenAction = () => {
  return dispatch => {
    getTokenData().then(res => {
      dispatch({ type: GET_TOKEN_DATA, payload: res });
    });
  }
}

export const syncTokenAction = payload => {
  return { type: SYNC_TOKEN_DATA, payload }
}
