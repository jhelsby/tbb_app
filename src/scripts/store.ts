import logger from 'redux-logger';

import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {all, fork} from 'redux-saga/effects';

import colorReducer from '../slices/colorSlice';
import rootNavReducer from '../slices/rootNavSlice';
import accountReducer from '../slices/accountSlice';
import readingsReducer from '../slices/readingsSlice';
import newsReducer from '../slices/newsSlice';
import bluetoothReducer from '../slices/bluetoothSlice';

import {bluetoothSaga} from './bluetoothSaga';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([fork(bluetoothSaga)]);
}

export const store = configureStore({
  reducer: {
    color: colorReducer,
    rootNav: rootNavReducer,
    account: accountReducer,
    readings: readingsReducer,
    news: newsReducer,
    bluetooth: bluetoothReducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(sagaMiddleware);
  },
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
