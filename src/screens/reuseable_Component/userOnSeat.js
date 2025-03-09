import AnimatedLottieView from 'lottie-react-native';
import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import AnimatedProfileDp from './AnimatedProfileDP';
import TextSlideAnimation2 from '../../components/Animation/TextSlideAnimationCopy';
import {formatNumerWithK} from '../../Services/GlobalFuntions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import AgoraView from '../Agora/components/AgoraView';

const UserOnSeat = memo(
  ({item, handlePress, isSelected, handleAnimationEnd}) => {
    const speakerData = useSelector(state => state.hostRed.volumeIndicator);
    const stickerData = useSelector(state => state.hostRed.stickerData);

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center'}}
          onPress={() => handlePress(item)}>
          {item?.cohostID === speakerData?.id && speakerData?.volume > 0 && (
            <View style={{position: 'absolute', bottom: 0, zIndex: 4}}>
              <AnimatedLottieView
                autoPlay
                style={{
                  width: 80,
                  height: 80,
                }}
                source={require('../../assets/json/audio-waves.json')}
              />
            </View>
          )}

          <View
            style={[
              styles.iconContainer,
              isSelected && styles.selectedIconContainer,
              isSelected && {
                shadowColor: 'black',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.2,
                shadowRadius: 2,
              },
            ]}>
            <View>
              <AnimatedProfileDp
                img={item?.image}
                imgSize={45}
                frameSize={15}
                frame={item?.json_image}
              />
            </View>

            {item?.isMicOn !== 'true' && (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(52, 52, 52, 0.6)',
                  height: 55,
                  width: 55,
                  borderRadius: 200,
                  position: 'absolute',
                }}>
                <Icon
                  name="microphone-off"
                  size={25}
                  color="black"
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
          {item?.name && (
            <View style={{overflow: 'hidden', width: 60, top: 0, left: 15}}>
              <TextSlideAnimation2 name={item?.name} fontSize={11} />
            </View>
          )}
        </TouchableOpacity>

        <View
          style={{
            padding: 3,
            paddingHorizontal: 5,
            backgroundColor: 'red',
            borderRadius: 12,
            position: 'absolute',
            bottom: 35,
            right: 20,
          }}>
          <Text style={{color: 'white', fontSize: 7, fontWeight: 'bold'}}>
            {formatNumerWithK(item?.giftsReceived) ?? 0}
          </Text>
        </View>
      </View>
    );
  },
);

export default UserOnSeat;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
    width: widthPercentageToDP(23),
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(48, 55, 73, 0.4)',
  },
  checkIcon: {
    position: 'absolute',
  },
  selectedIconContainer: {
    // backgroundColor: 'red',
  },
  lockIcon: {
    position: 'absolute',
  },
  imageContainer: {
    borderRadius: 35,
    overflow: 'hidden',
  },
  selectedImageContainer: {
    borderWidth: 2,
    borderColor: '#007aff',
  },
  image: {
    width: 40,
    height: 40,
  },
});
