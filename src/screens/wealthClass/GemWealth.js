import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import LeftArrow from 'react-native-vector-icons/MaterialIcons';
import {ScrollView} from 'react-native-gesture-handler';
import ExclusivePriviledge from './components/ExclusivePriviledge';
import ClassPriviledge from './components/ClassPriviledge';
import WealthCertification from './components/WealthCertification';
import Mount from './components/Mount';
import ChatBubble from './components/ChatBubble';
import BuyNowBotton from './BuyNowBotton';

const GemWealth = ({data}) => {
  return (
    <ScrollView style={{height: '86%'}}>
      <ExclusivePriviledge
        img={require('../../assets/images/wealthClass/gemBadge.png')}
        mainColor={['#431311', '#611D1C', '#972E2B', '#DE4442']}
        exclusiveColor={['#431311', '#611D1C', '#972E2B', '#DE4442']}
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
        profileFrame={require('../../assets/images/wealthClass/gemFrame.png')}
        userName="Michal"
        namePlateImage={require('../../assets/images/wealthClass/gemNamePlate.png')}
        badgeImg={require('../../assets/images/wealthClass/gemBadge.png')}
        posts="100"
        followers="300"
        followings="200"
        beans="100"
        coins="300"
      />
      <BuyNowBotton/>
    </ScrollView>
  );
};

export default GemWealth;

const styles = StyleSheet.create({});
