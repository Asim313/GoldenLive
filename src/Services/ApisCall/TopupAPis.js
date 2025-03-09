import { ApiCallToken } from "../Apis";

export const luckyRewardList = async (data) => {
    try {
        const res = await ApiCallToken({
          params: data?.token,
          route: 'list/lucky/reward',
          verb: 'GET',
        });         
        return res

    } catch (e) {
      console.log('/list/lucky/reward ', e.toString());
    }
}