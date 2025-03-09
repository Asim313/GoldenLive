import {ApiCall, ApiUpdateUserData, NodeApiUserUpdatedData} from '../../Services/Apis';
import {put, takeLatest} from 'redux-saga/effects';
import {activeStoreData, setChats, setFriends, setParticipants, updateUserData} from '../Actions';
import {ACTION_TYPES} from '../ActionTypes';

//////Home Saga Generator Functions to be defined here
function* updatedUserData(params) {
    try {
      // console.log('hereeeeeee', params)
     const res = yield NodeApiUserUpdatedData({
        params: params?.data?.token,
        // paramsBody: params?.data?.user?.id,
        route: 'user-updated-data',
        verb: 'GET',
      });
      // console.log("updae uer store active store", JSON.stringify(res))
      if(res?.data) {
        console.log('user data updated successfully', res?.data?.nick_name)
        yield put(activeStoreData(res?.active_store))
        yield put(updateUserData(res?.data));
      } else {
        console.log("no data")
      }

    } catch (e) {
      console.log('updateUserData -- ', e.toString());
    }
  }
  export function* updateUserDataSaga() {
    yield takeLatest(ACTION_TYPES.UPDATED_DATA, updatedUserData);
  }
  