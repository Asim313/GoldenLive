import {ApiCall, VerApiCall} from '../../Services/Apis';
import {put, takeLatest} from 'redux-saga/effects';
import {setLoginData} from '../Actions';
import {ACTION_TYPES} from '../ActionTypes';

function* loginRequest(params) {
  // console.log(params.data.params, params.data.setMyLoginError);
  try {
    console.log('In SAGA LOGIN')
    const res = yield ApiCall({
      params: params.data.params,
      route: 'login',
      verb: 'POST',
    });

    if (res.code == 200) {
      console.log('res == 200', res.data);
      params.data.setMyLoginError(true);
      //   yield put({ type: ACTIONS.LOGIN_ERRORS, loginErrors: res });
      yield put(setLoginData(res.data));
    } else if (res.code !== 200) {
      console.log('res.responseCode !== 200....', res);
      params.data.setMyLoginError(true);
      alert("" + res?.message )

      // if(res.message == undefined) {
      //   alert("Try again after 5 minutes" )
      // }
      // else {

      //   alert("Error: " + res.message )
      // }
      
      // yield put(setLoginData(res.body));
    }
  } catch (e) {
    console.log('saga login error -- ', e.toString());
  }
}
export function* loginSaga() {
  yield takeLatest(ACTION_TYPES.LOGIN_REQUEST, loginRequest);
}


//gmail social login
function* socialLoginRequest(params) {
  // console.log(params.data.params, params.data.setMyLoginError);
  try {
    const res = yield ApiCall({
      params: params.data.params,
      route: 'sign-up/user/social-sign-up-user',
      verb: 'POST',
    });
    if (res.code == 200) {
      // console.log('res social login ', res.data);
      params.data.setMyLoginError(true);
      yield put(setLoginData(res.data));
    } else if (res.code !== 200) {
      console.log('res.responseCode !== 200....', res);
      params.data.setMyLoginError(true);
      if(res.message == undefined) {
        alert("System in maintenance")
      }
      else {
        alert("Error: " + res.message )
      }
      
      // yield put(setLoginData(res.body));
    }
  } catch (e) {
    console.log('saga login error -- ', e.toString());
  }
}
export function* socialLoginSaga() {
  yield takeLatest(ACTION_TYPES.SOCIAL_LOGIN_REQUEST, socialLoginRequest);
}


function* otpRequest(params) {
   console.log(params.data.params, params.data.setMyLoginError);
  try {
    const res = yield ApiCall({
      params: params.data.params,
      route: 'sign-up/user/social-sign-up-user-number',
      verb: 'POST',
    });

    if (res.code == 200) {
      console.log('res == 200 ... ', res.data);
      params.data.setMyLoginError(true);
      //   yield put({ type: ACTIONS.LOGIN_ERRORS, loginErrors: res });
      yield put(setLoginData(res.data));
    } else if (res.code !== 200) {
      console.log('res.responseCode !== 200....', res);
      // yield put(setLoginData(res.body));
    }
  } catch (e) {
    console.log('saga login error -- ', e.toString());
  }
}
export function* otpSaga() {
  yield takeLatest(ACTION_TYPES.OTP_REQUEST, otpRequest);
}
function* signupRequest(params) {
  // console.log(params.data.params, params.data.setMyLoginError);
  try {
    const res = yield ApiCall({
      params: params.data.params,
      route: 'sign-up/user',
      verb: 'POST',
    });

    if (res.header.httpStatusCode == 200) {
      console.log('res !== 200 ... ', res.header);
      params.data.setMyLoginError(true);
      //   yield put({ type: ACTIONS.LOGIN_ERRORS, loginErrors: res });
      yield put(setLoginData(res.body));
    } else if (res.responseCode !== 200) {
      console.log('res.responseCode == 200....', res.header);
      // yield put(setLoginData(res.body));
    }
  } catch (e) {
    console.log('saga login error -- ', e.toString());
  }
}
export function* signupSaga() {
  yield takeLatest(ACTION_TYPES.SIGNUP_REQUEST, signupRequest);
}
