import { ApiCallToken } from "../Apis";

export const hostRecordApis = async (data) => {
    try {
        const res = await ApiCallToken({
          params: data?.token,
          route: 'list/top-up/host',
          verb: 'GET',
        });         
        return res

    } catch (e) {
      console.log('list/top-up/host api error ', e.toString());
    }
}

export const gameRecordApis = async (data) => {
    try {
        const res = await ApiCallToken({
          params: data?.token,
          route: 'list/host/user/game/record',
          verb: 'GET',
        });         
        return res

    } catch (e) {
      console.log('list/host/user/game/record api error ', e.toString());
    }
}

export const usersRecordApi = async (data) => {
    try {
        const res = await ApiCallToken({
          params: data?.token,
          route: 'list/top-up/user',
          verb: 'GET',
        });         
        return res

    } catch (e) {
      console.log('list/top-up/user api error ', e.toString());
    }
}