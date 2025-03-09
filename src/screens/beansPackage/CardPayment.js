import { useNavigation } from '@react-navigation/native';
import {
  CardField,
  usePlatformPay,
  useStripe,
} from '@stripe/stripe-react-native';
import {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, Button, Text, View} from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { buyBeansFromStripe } from '../../Services/ApisCall/StripeApis';
import { updatedData } from '../../Redux/Actions';

export default function PaymentScreen({data}) {
  console.log('data', data)
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const userData = useSelector(state => state.auth.userData);
  const [loading, setLoading] = useState();
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const {isPlatformPaySupported} = usePlatformPay();
  const [clientSecret, setClientSecret] = useState(null)
  const fetchPaymentIntentClientSecret = async () => {
    const paramsBody = {
      amount: parseInt(data?.selectedValue?.dollar) * 100,
      currency: 'usd',
    };
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paramsBody),
    };

    let response = await fetch(
      `https://sockets.golden-live.com/payment-sheet`,
      options,
    );
    const res = await response.json();
    return res;
  };

  const initializePaymentSheet = async () => {
    setLoading(true)
    const {paymentIntent, ephemeralKey, customer, publishableKey} =
      await fetchPaymentIntentClientSecret();
       setClientSecret(paymentIntent)
    const {error} = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      googlePay: {
        merchantCountryCode: 'US',
        testEnv: true, // use test environment
        currencyCode: 'usd',
      },
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    });
   await googlePay(paymentIntent);
    if (!error) {
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const googlePay = async clientSecret => {
    const amount = data?.selectedValue?.dollar;
    console.log('client secert ', clientSecret);
    setLoading(true);
    // const clientSecret = await callStripeKeys({ amount, gateway: 'googlepay' });
    const {error} = await presentPaymentSheet({
      clientSecret: clientSecret,
      forSetupIntent: false,
    });
    if (error) {
      alert(error?.localizedMessage || '', amount);
      setLoading(false)
      return;
    } else {
      const paramsBody = {beans_id: data?.selectedValue?.id}
      Alert.alert(`Payment of usd ${amount} is successful! `);
      const res = await buyBeansFromStripe({paramsBody, token: userData?.token})
      if(res?.data === 1) {
        UpdateUserData()
        navigation?.goBack()
      }
      setLoading(false)
    }
  };

  const UpdateUserData = async () => {
    dispatch(updatedData(userData));
  };

  return (
    <View style={{top: heightPercentageToDP(20), justifyContent: 'center', alignItems: 'center'}}>
      {loading ? 
        <View style={{}}>
          <ActivityIndicator />
          <Text style={{color: 'black', fontSize: 11, top: 10}}>Loading payment data...</Text>
        </View>
        :
          <Button onPress={() => googlePay(clientSecret)} title={"Pay $" + data?.selectedValue?.dollar} />
    }
    </View>
  );
}
