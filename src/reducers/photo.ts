import { SCAN } from "@/constants/photo";

const INITIAL_STATE = {
  imgUrl: '',
  data: null,
};

export default function index(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SCAN:
      return {
        imgUrl: action.imgUrl,
        data: action.payload,
      };
    default:
      return state;
  }
}
