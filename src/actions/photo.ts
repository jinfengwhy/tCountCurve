import { getScanResultData } from "@/services/modules/photo"
import { SCAN } from "@/constants/photo"

export const changeScanData = (data) => {
  return {
    type: SCAN,
    payload: data
  }
}

export const getScanResultAction = params => {
  return (dispatch, getState) => {
    const state = getState();
    params.token = state.autho.token;
    return new Promise((resolve, reject) => {
      getScanResultData(params).then(res => {
        dispatch({ ...changeScanData(res), imgUrl: params.imgUrl });
        resolve(res);
      }).catch(reject);
    });
  }
}
