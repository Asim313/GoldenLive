import { put, takeLatest } from 'redux-saga/effects';
import {
    setLiveHost, setOfflineHost, topUpUserList, topUpHostAll, ListsendGiftTOHOstAll,
    popularHostListingAll, fresherHostListingAll, getListOfGiftAll, updateUserData,
    bannersData
} from '../Actions';
import { ACTION_TYPES } from '../ActionTypes';
import { ApiCallToken } from '../../Services/Apis';
//////Home Saga Generator Functions to be defined here

function* getAllApiSaga(params) {
    try {
        const res = yield ApiCallToken({
            params: params?.data?.token,
            route: 'list-all-host',
            verb: 'GET',
        });
        // console.log('1111111122222222222222222222222222222222222222222', res?.data?.offlineHostList)
        if (res?.data ?? []) {
          //  yield put(updateUserData(res?.data?.updatedData?.user ?? []));
            
            yield put(setOfflineHost(res?.data?.offlineHostList ?? []));
            // yield put(topUpUserList(res?.data?.topUpUserList ?? []));
            // yield put(topUpHostAll(res?.data?.topUpHostAll ?? []));
            // yield put(ListsendGiftTOHOstAll(res?.data?.ListsendGiftTOHOstAll ?? []));
            // yield put(popularHostListingAll(res?.data?.popularHostListingAll ?? []));
            // yield put(fresherHostListingAll(res?.data?.fresherHostListingAll ?? []));
            yield put(getListOfGiftAll(res?.data?.getListOfGiftAll ?? []));
            yield put(bannersData(res?.data?.getAllBanner ?? []));
        }
    } catch (error) {
        // console.log('error home screen getBanners func', error?.toString());
    }
}
export function* allApiSaga() {
    yield takeLatest(ACTION_TYPES.LIST_ALL_HOST_DATA, getAllApiSaga);
}




