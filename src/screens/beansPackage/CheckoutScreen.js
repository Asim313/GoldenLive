import {StripeProvider} from '@stripe/stripe-react-native';
import React from 'react';
import {Text, View} from 'react-native';
import {STRIPE_LIVE_PUBLISH_KEY, STRIPE_TEST_PUBLISH_KEY} from '../../Services/Constants';
import PaymentScreen from './CardPayment';

const CheckOutScreen = props => {
  return (
    <View>
      <StripeProvider publishableKey={STRIPE_LIVE_PUBLISH_KEY}>
        <PaymentScreen data={props?.route?.params} />
      </StripeProvider>
    </View>
  );
};

export default CheckOutScreen;
