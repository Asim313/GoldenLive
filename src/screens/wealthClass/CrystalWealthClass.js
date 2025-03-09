import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { useState,useCallback ,useRef} from 'react';
import LeftArrow from 'react-native-vector-icons/MaterialIcons';
import {ScrollView} from 'react-native-gesture-handler';
import ExclusivePriviledge from './components/ExclusivePriviledge';
import ClassPriviledge from './components/ClassPriviledge';
import WealthCertification from './components/WealthCertification';
import RBSheet from 'react-native-raw-bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Mount from './components/Mount';
import ChatBubble from './components/ChatBubble';
import { useFocusEffect } from '@react-navigation/native';
import BuyNowBotton from './BuyNowBotton';

const CrystalWealthClass = ({data}) => {
  const [show, setShow] = useState(true);
  const refRBSheet = useRef();
  const [selectPkBtn, setselectPkBtn] = useState(0);

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

  return (
    <ScrollView style={{height: '86%'}}>
      <ExclusivePriviledge
        img={require('../../assets/images/wealthClass/crystalBadge.png')}
        mainColor={['#11273F', '#1C3A60', '#29568F', '#3B7CCC']}
        exclusiveColor={['#11273F', '#1C3A60', '#29568F', '#3B7CCC']}
      />

      <Mount
        anime={require('../../assets/images/wealthClass/areoplane.json')}
      />
      <ClassPriviledge
        data={data}
      />

      <ChatBubble />
      <WealthCertification
        headerBackColor={['#FE9E00', '#FE7816']}
        profileImg={require('../../assets/images/wealthClass/profile.jpg')}
        userName="Michal"
        namePlateImage={require('../../assets/images/wealthClass/crystalNamePlate.png')}
        badgeImg={require('../../assets/images/wealthClass/crystalBadge.png')}
        posts="100"
        followers="300"
        followings="200"
        beans="200"
        coins="400"
      />
      <BuyNowBotton/>
    </ScrollView>
  );
};

export default CrystalWealthClass;

const styles = StyleSheet.create({
 
});
