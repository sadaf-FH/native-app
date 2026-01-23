import { all, fork } from 'redux-saga/effects';
import { watchUserActions } from './userSaga';
import { watchThemeActions } from './themeSaga';

export default function* rootSaga() {
  yield all([
    fork(watchUserActions),
    fork(watchThemeActions),
  ]);
}