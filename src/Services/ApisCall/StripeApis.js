import { ApiCallToken } from "../Apis";

export const buyBeansFromStripe = async (data) => {
    try {
        const res = await ApiCallToken({
          params: data?.token,
          paramsBody: data?.paramsBody,
          route: 'stripe-payment',
          verb: 'POST',
        });     

        return res

    } catch (e) {
      console.log('stripe-payment to update beans ', e.toString());
    }
}