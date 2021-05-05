import {ADD_USERS, GET_USERS, DELETE_USER} from '../actions/types';

const initialState = {
  Users: [],
  page: 0,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        Users: action.payload,
        page: 1,
      };
    case ADD_USERS:
      return {
        ...state,
        Users: [...state.Users, ...action.payload],
        page: state.page + 1,
      };
    case DELETE_USER:
      return {
        ...state,
        Users: [...state.Users.filter((user) => user.id !== action.payload)],
      };
    default:
      return state;
  }
}
