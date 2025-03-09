import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AnimatedProfileDp from '../../../reuseable_Component/AnimatedProfileDP';
// AnimatedProfileDp // Assuming you have this component
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AgoraView from '../../components/AgoraView';
import {useSelector} from 'react-redux';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { formatNumerWithK } from '../../../../Services/GlobalFuntions';
import AnimatedLottieView from 'lottie-react-native';

const SeatUser = ({item, onPress}) => {
  const speakerData = useSelector(state => state.hostRed.volumeIndicator);
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);
  return (
    <TouchableOpacity
      style={{ }}
         onPress={() => onPress(item)}
    >
      <View
        style={{
          height: 90,
          borderRadius: 7,
          width: 80,
          backgroundColor: 'rgba(58, 7, 44, 0.5)',
        }}>
        <View style={{zIndex: 0}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: '3%',
              marginTop: '2%',
              zIndex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 2,
                width: 30,
                borderRadius: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}>
              <Image
                source={require('../../../../assets/images//coin.png')}
                style={{width: 7, height: 7}}
              />
              <Text style={{color: 'white', fontSize: 7}}>{formatNumerWithK(item?.giftsReceived ?? 0)}</Text>
            </View>
            {item?.isHost === 'true' &&
            <View
              style={{
                backgroundColor: '#F4600C',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 5,
                borderRadius: 30,
                width: 34,
              }}>
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
            {item?.isAdmin?.toString() === 'true' && item?.isHost !== 'true' &&
            <View
              style={{
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 2,
                borderRadius: 30,
               
              }}>
             
              <Text
                style={{
                  color: 'white',
                  fontSize: 7,
                }}>
                Admin
              </Text>
            </View>
          }
          </View>

          {item?.isCamersOn === 1 ? 
          <View
            style={{
              width: 80,
              height: 90,
              borderRadius: 10,
              overflow: 'hidden',
              position: 'absolute',
            }}>
           
            <AgoraView
              id={item?.cohostID === userUpdatedData?.id ? 0 : item?.cohostID}
            />
            {/* </View> */}
          </View>
          : 
          <View style={{ justifyContent: 'center', alignItems: 'center', position: 'relative', top: 30}}>
                              <AnimatedProfileDp
                    img={item?.image}
                    imgSize={30}
                    frameSize={9}
                    frame={item?.json_image}
                    />
              {/* <Image source={{ uri: item?.image}} style={{height: 30, width: 30, borderRadius: 40}} /> */}
              {item?.cohostID === speakerData?.id && speakerData?.volume > 0 && (
              <View style={{position: 'absolute'}}>
                  <AnimatedLottieView
                    autoPlay
                    style={{
                      width: 60,
                      height: 60,
                      top: 0,
                    }}
                    source={require('../../../../assets/json/audio-waves.json')}
                  />
                </View>
              )}
          </View>
          }
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: '5%',
              marginTop: '80%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',

                width: 60,
                borderRadius: 10,
              }}>
              {item?.name && (
                <Text
                  style={{
                    color: 'white',
                    fontSize: 8,
                    marginHorizontal: 2,
                  }}>
                  {item?.name?.substring(0, 7)}{' '}
                  {item?.name?.length > 7 && '...'}
                </Text>
              )}
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 5,
                borderRadius: 10,
              }}>
              {item?.isMicOn !== 'true' && (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5,
                    right: 3,
                  }}>
                  <Icon
                    name="microphone-off"
                    size={17}
                    color="white"
                    style={[
                      styles.checkIcon,
                      {
                        shadowColor: 'black',
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                      },
                    ]}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SeatUser;
const styles = StyleSheet.create({
  checkIcon: {
    position: 'absolute',
  },
});
