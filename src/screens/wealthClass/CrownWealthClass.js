import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import LeftArrow from 'react-native-vector-icons/MaterialIcons';
import {ScrollView} from 'react-native-gesture-handler';
import ExclusivePriviledge from './components/ExclusivePriviledge';
import ClassPriviledge from './components/ClassPriviledge';
import WealthCertification from './components/WealthCertification';
import Mount from './components/Mount';
import ChatBubble from './components/ChatBubble';
import InheritHealthPoints from './components/InheritWealthPoint';
import BuyNowBotton from './BuyNowBotton';

const CrownWealthClass = ({data}) => {
  return (
    <ScrollView style={{height: '86%'}}>
      <ExclusivePriviledge
        img={require('../../assets/images/wealthClass/crownBadge.png')}
        mainColor={['#4B330D', '#654514', '#8C6019', '#BA8330']}
        exclusiveColor={['#4B330D', '#654514', '#8C6019', '#BA8330']}
      />

      <Mount
        anime={require('../../assets/images/wealthClass/areoplane.json')}
      />
      <ClassPriviledge
        headerBackColor={['#FE9E00', '#FE7816']}
           data={data}
      />

      <ChatBubble />
      <WealthCertification
        headerBackColor={['#FE9E00', '#FE7816']}
        profileImg={require('../../assets/images/wealthClass/profile.jpg')}
        profileFrame={require('../../assets/images/wealthClass/crownFrame.png')}
        userName="Michal"
        namePlateImage={require('../../assets/images/wealthClass/crownNamePlate.png')}
        badgeImg={require('../../assets/images/wealthClass/goldBadge.png')}
        posts="100"
        followers="300"
        followings="200"
        beans="100"
        coins="300"
      />
      <InheritHealthPoints />
      <BuyNowBotton/>
    </ScrollView>
  );
};

export default CrownWealthClass;

const styles = StyleSheet.create({});
