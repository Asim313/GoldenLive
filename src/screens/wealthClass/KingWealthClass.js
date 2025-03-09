import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import LeftArrow from 'react-native-vector-icons/MaterialIcons';
import {ScrollView} from 'react-native-gesture-handler';
import ExclusivePriviledge from './components/ExclusivePriviledge';
import ClassPriviledge from './components/ClassPriviledge';
import WealthCertification from './components/WealthCertification';
import Mount from './components/Mount';
import ChatBubble from './components/ChatBubble';
import InheritWealthPoint from './components/InheritWealthPoint';
import BuyNowBotton from './BuyNowBotton';

const KingWealthClass = ({data}) => {
  return (
    <ScrollView style={{height: '86%'}}>
      <ExclusivePriviledge
        img={require('../../assets/images/wealthClass/kingBadge.png')}
        mainColor={['#2A0F3A', '#37164B', '#622487', '#8C35C2']}
        exclusiveColor={['#2A0F3A', '#37164B', '#622487', '#8C35C2']}
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
        profileFrame={require('../../assets/images/wealthClass/kingFrame.png')}
        userName="Michal"
        namePlateImage={require('../../assets/images/wealthClass/kingNamePlate.png')}
        badgeImg={require('../../assets/images/wealthClass/kingBadge.png')}
        posts="100"
        followers="300"
        followings="200"
        beans="100"
        coins="300"
      />
      <InheritWealthPoint />
      <BuyNowBotton/>
    </ScrollView>
  );
};

export default KingWealthClass;

const styles = StyleSheet.create({});
