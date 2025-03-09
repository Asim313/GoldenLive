import React, {memo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {useSelector} from 'react-redux';

import {heightPercentageToDP} from 'react-native-responsive-screen';

import NoUserSeat2 from '../Agora/multiChannel/multiSeatsLogic/NoUserSeat2';
import {formatNumerWithK} from '../../Services/GlobalFuntions';
import TextSlideAnimation2 from '../../components/Animation/TextSlideAnimationCopy';
import AllIcons from '../../components/AllIcons';
import AgoraView from '../Agora/components/AgoraView';
import NoUserSeatForStream from './NoUserSeatForStream';

const TwoSeatLogicForStream = memo(
  ({cohostData, callAllow, takeSeat, handleLongPress}) => {
    // console.log('c', cohostData);
    const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);
    return (
      <View style={{marginLeft:15,marginTop:7}}>
        <View
          style={styles.LinearGradientSize}>
          {!cohostData?.value || cohostData?.isLocked ? (
            <NoUserSeatForStream
              item={cohostData}
              callAllow={callAllow}
              takeSeat={takeSeat}
              handleLongPress={handleLongPress}
            />
          ) : (
            <>
              <View
                style={{
                  zIndex: 0,
                }}>
                <View style={styles.headerStyle}>
                  <View style={styles.coinsStyle}>
                    <Image
                      source={require('../../assets/images/coin.png')}
                      style={{width: 13, height: 13}}
                    />
                    <Text style={{color: 'white', fontSize: 7}}>
                      {formatNumerWithK(cohostData?.giftsReceived ?? 0)}
                    </Text>
                  </View>

                  {cohostData?.isHost === 'true' && (
                    <View style={styles.hostTag}>
                      <Image
                        source={require('../../assets/images/audioNewDesignIcons/host.png')}
                        style={{width: 7, height: 7}}
                      />
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 7,
                          marginHorizontal: 2,
                        }}>
                        Host
                      </Text>
                    </View>
                  )}
                </View>

                {cohostData?.isCamersOn === 1 ? (
                  <View style={styles.agoraStyle}>
                    <AgoraView
                      id={
                        cohostData?.cohostID === userUpdatedData?.id
                          ? 0
                          : cohostData?.cohostID
                      }
                    />
                  </View>
                ) : (
                  <View style={{alignItems: 'center', top: '70%'}}>
                    <Image
                      source={{uri: cohostData?.image}}
                      style={{height: 50, width: 50, borderRadius: 40}}
                    />
                  </View>
                )}
              </View>

              <View style={styles.bottomStyle}>
                <View
                  style={{
                    marginHorizontal: 5,
                    width: 60,
                    overflow: 'hidden',
                    left: 5,
                  }}>
                  <TextSlideAnimation2
                    name={cohostData?.name}
                    fontSize={heightPercentageToDP(1.5)}
                    fontWeight={'bold'}
                    color={'white'}
                  />
                </View>

                <View style={{right: 5}}>
                  <AllIcons
                    name={IconList.MaterialCommunityIcons}
                    size={15}
                    color={'white'}
                    iconName={
                      cohostData?.isMicOn === 'true'
                        ? 'microphone'
                        : 'microphone-off'
                    }
                  />
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    );
  },
);

export default TwoSeatLogicForStream;

const styles = StyleSheet.create({
  LinearGradientSize: {
    height: 206,
    borderRadius: 7,
    width: 160,
    backgroundColor: 'rgba(58, 7, 44, 0.5)'
    // justifyContent: 'space-between',
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    marginTop: '3%',
    zIndex: 1,
  },
  coinsStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    width: 47,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  hostTag: {
    backgroundColor: '#F4600C',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    width: 47,
    borderRadius: 10,
  },
  agoraStyle: {
    overflow: 'hidden',
    width: 150,
    height: 190,
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: 10,
  },
  bottomStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 10,
    // bottom: 5,
  },
});
