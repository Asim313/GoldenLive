import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useRef, useCallback } from 'react';
import LeftArrow from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
import ExclusivePriviledge from './components/ExclusivePriviledge';
import ClassPriviledge from './components/ClassPriviledge';
import RBSheet from 'react-native-raw-bottom-sheet';
import WealthCertification from './components/WealthCertification';
import Mount from './components/Mount';
import ChatBubble from './components/ChatBubble';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFocusEffect } from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import BuyNowBotton from './BuyNowBotton';

const Month = [
  {
    id: 1,
    name: '1 month',
  },
  {
    id: 2,
    name: '3 month',
  },
  {
    id: 3,
    name: '6 month',
  },
  {
    id: 4,
    name: '12 month',
  },
  {
    id: 5,
    name: 'Recurring Subscription',
  },
];
const BronzeWealthClass = ({ data }) => {
  const [selectPkBtn, setselectPkBtn] = useState(0);
  const [show, setShow] = useState(true);
  const refRBSheet = useRef();



  const ApplyForVip = async () => {
    try {
      const paramsBody = {
        id: 1,
        month: 1,
        beans: monthBeans,
      };

      const res = await ApiCallToken({
        params: userData.token,
        paramsBody: paramsBody,
        route: 'search',
        verb: 'POST',
      });

      console.log('Response for UPDATING DATA == >>', res);
    } catch (e) {
      console.log('user vip updating error ', e.toString());
    }
  };

  const GetVipDuration = async () => {
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'get-vip',
        verb: 'GET',
      });

      // console.log('here is the respone for VIP Duration', res[0].vip_duration);
      setVipDuration(res[0]?.vip_duration);
      setShow(false);
      // setGettingGiftsArray(res);
    } catch (e) {
      console.log('saga login error -- ', e.toString());
    }
  };

  useFocusEffect(
    useCallback(() => {
      GetVipDuration();
    }, []),
  );

  console.log('================', data)
  return (
    <ScrollView style={{ height: '86%' }}>
      <ExclusivePriviledge
        img={require('../../assets/images/wealthClass/bronzeBadge.png')}
        mainColor={['#093418', '#0E4724', '#16733C', '#26A757']}
        exclusiveColor={['#093418', '#0E4724', '#16733C', '#26A757']}
      />
      <ClassPriviledge
        data={data}
      />
      <WealthCertification
        profileImg={require('../../assets/images/wealthClass/profile.jpg')}
        userName={'John'}
        namePlateImage={require('../../assets/images/wealthClass/bronzeNamePlate.png')}
        badgeImg={require('../../assets/images/wealthClass/bronzeBadge.png')}
        posts="200"
        followers="100"
        followings="100"
      />
  
      <BuyNowBotton/>



    </ScrollView>
  );
};

export default BronzeWealthClass;

const styles = StyleSheet.create({
  monthbtn: {
    color: 'white',
    color: 'white',
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#31384A',
    marginHorizontal: 12,
    marginVertical: 10,
    borderWidth: 1,
    alignSelf: 'center',
    borderColor: 'white',
  },
});
