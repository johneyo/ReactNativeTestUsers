import axios from 'axios';
import {Alert} from 'react-native';
import {GET_USERS, ADD_USERS, DELETE_USER} from './types';
const URL = 'https://reqres.in';
export const getUsers = (callback: () => void) => (dispatch: any) => {
  axios
    .get(`${URL}/api/users?per_page=6`)
    .then(
      (res) => (
        dispatch({
          type: 'GET_USERS',
          payload: res.data.data,
        }),
        callback()
      ),
    )
    .catch((err) => console.log(err.response.data));
};
export const getMoreUsers = (page: number, callback: () => void) => (
  dispatch: any,
) => {
  console.log('page number is ', page);
  axios
    .get(`${URL}/api/users?page=${page}&per_page=6`)
    .then(
      (res) => (
        res.data.data.length < 1
          ? Alert.alert('No more users')
          : dispatch({
              type: 'ADD_USERS',
              payload: res.data.data,
            }),
        callback()
      ),
    )
    .catch((err) => console.log(err));
};
