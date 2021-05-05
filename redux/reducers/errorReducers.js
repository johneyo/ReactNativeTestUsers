import { GET_ERRORS, CLEAR_ERRORS, RESET_ERRORS } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        [action.payload.action]: action.payload.value,
      };
    case RESET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
