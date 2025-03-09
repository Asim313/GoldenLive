import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Platform, View} from 'react-native';
// import {
//   initConnection,
//   endConnection,
//   flushFailedPurchasesCachedAsPendingAndroid,
// } from 'react-native-iap';
import Paywall from './InApp/Paywall';
import Header from '../reuseable_Component/Header';

const InAppPurchase = ({route}) => {
  // const [isLoading, setIsLoading] = useState(null);
  // useEffect(() => {
  //   setIsLoading(true);
  //   const init = async () => {
  //     try {
  //       console.log('awailfjdklasjf fdjlks');
  //       await initConnection().then(result => {
  //         console.log('connection succcess', result);
  //         setIsLoading(false);
  //       });
  //       if (Platform.OS === 'android') {
  //         flushFailedPurchasesCachedAsPendingAndroid();
  //       }
  //     } catch (error) {
  //       console.error('Error occurred during initilization', error.message);
  //     }
  //   };
  //   init();
  //   return () => {
  //     endConnection();
  //   };
  // }, []);

  return (
    <View style={{}}>
      {/* <Header name={'Google Pay'} />
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : (
        <Paywall packages={route?.params?.packages} />
      )} */}
    </View>
  );
};

export default InAppPurchase;
