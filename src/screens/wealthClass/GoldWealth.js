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

const GoldWealth = ({data}) => {
  return (
    <ScrollView style={{height: '86%'}}>
      <ExclusivePriviledge
        img={require('../../assets/images/wealthClass/goldBadge.png')}
        mainColor={['#272608', '#413F0F', '#726A1F', '#B0A62D']}
        exclusiveColor={['#272608', '#413F0F', '#726A1F', '#B0A62D']}
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
        namePlateImage={require('../../assets/images/wealthClass/goldNamePlate.png')}
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

export default GoldWealth;

const styles = StyleSheet.create({});
