import { all } from 'redux-saga/effects';
import { loginSaga, otpSaga, signupSaga, socialLoginSaga } from './AuthSaga';
import { updateUserDataSaga } from './HomeSaga';
import { allApiSaga } from './HostApi';

export function* rootSaga() {
  yield all([loginSaga(), socialLoginSaga(), signupSaga(), otpSaga(), updateUserDataSaga(),
  allApiSaga()
  ]);
}
