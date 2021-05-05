/* eslint-disable no-underscore-dangle */

import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
  CombinedState,
} from 'redux';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
// import storage from "redux-persist/lib/storage";
import appReducer from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // blacklist: ["bitcoin", "settings"],
};

const rootReducer = (
  state: CombinedState<{errors: any; auth: {Users: any}}> | undefined,
  action: any,
) => {
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  compose(applyMiddleware(...middleware)),
);
export const persistor = persistStore(store);
