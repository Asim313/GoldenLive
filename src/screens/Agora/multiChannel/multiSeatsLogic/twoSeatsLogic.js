import React, {memo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AgoraView from '../../components/AgoraView';
import AllIcons, {IconList} from '../../../../components/AllIcons';
import {useSelector} from 'react-redux';
import TextSlideAnimation2 from '../../../../components/Animation/TextSlideAnimationCopy';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {formatNumerWithK} from '../../../../Services/GlobalFuntions';
import NoUserSeat2 from './NoUserSeat2';
import NoUserSeat2XL from './NoUserSeat2XL';
import AnimatedLottieView from 'lottie-react-native';
import AnimatedProfileDp from '../../../reuseable_Component/AnimatedProfileDP';

const TwoSeatsLogic = memo(
  ({cohostData, callAllow, takeSeat, handleLongPress, onPress}) => {
    // console.log('c', cohostData);
    const speakerData = useSelector(state => state.hostRed.volumeIndicator);
    const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);
    return (
      <TouchableOpacity style={styles.mainContainer} onPress={() => onPress()}>
        <View
          style={styles.LinearGradientSize}>
          {!cohostData?.value || cohostData?.isLocked ? (
            <NoUserSeat2XL
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
                      source={require('../../../../assets/images//coin.png')}
                      style={{width: 13, height: 13}}
                    />
                    <Text style={{color: 'white', fontSize: 7}}>
                      {formatNumerWithK(cohostData?.giftsReceived ?? 0)}
                    </Text>
                  </View>

                  {cohostData?.isHost === 'true' &&
                  <View style={styles.hostTag}>
                    <Image
                      source={require('../../../../assets/images/audioNewDesignIcons/host.png')}
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
                   }
                </View>

                {cohostData?.isCamersOn === 1 ? 
                <View style={styles.agoraStyle}>
                  <AgoraView
                    id={
                      cohostData?.cohostID === userUpdatedData?.id
                        ? 0
                        : cohostData?.cohostID
                    }
                  />
                </View>
                : 
                <View style={{alignItems: 'center',  justifyContent: 'center', position: 'relative', top: 80}}>
                  <AnimatedProfileDp
                    img={cohostData?.image}
                    imgSize={50}
                    frameSize={17}
                    frame={cohostData?.json_image}
                  />
                    {/* <Image source={{ uri: cohostData?.image}} style={{height: 50, width: 50, borderRadius: 40}} /> */}
                    {cohostData?.cohostID === speakerData?.id && speakerData?.volume > 0 && (
                <View style={{position: 'absolute', zIndex: 4}}>
                  <AnimatedLottieView
                    autoPlay
                    style={{
                      width: 80,
                      height: 80,
                      top: 0,
                    }}
                    source={require('../../../../assets/json/audio-waves.json')}
                  />
                </View>
           )}
                </View>
                }
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
      </TouchableOpacity>
    );
  },
);

export default TwoSeatsLogic;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center', 
    alignItems: 'center', 
    flex: 1,
  },
  LinearGradientSize: {
    height: 190,
    borderRadius: 7,
    width: 150,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(58, 7, 44, 0.5)'
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
    bottom: 5,
  },
});
