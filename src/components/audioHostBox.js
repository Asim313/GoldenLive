import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AnimatedLottieView from 'lottie-react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import TextSlideAnimation2 from './Animation/TextSlideAnimationCopy';
import { formatNumerWithK } from '../Services/GlobalFuntions';

const AudioHostBox = ({item, live}) => {
  return (
    <ImageBackground
      source={{uri: item?.image}}
      style={styles.itemContainer}
      imageStyle={{borderRadius: 10}}>
        <View
        style={{flex: 1, justifyContent: 'space-between', marginVertical: 5}}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            flexDirection: 'row',
            width: widthPercentageToDP(16),
            alignItems: 'center',
            borderRadius: 35,
            padding: 3,
          }}>
          <Image
            source={require('../assets/images/coin.png')}
            style={{height: 12, width: 12, marginHorizontal: 3}}
          />
          <Text style={{fontSize: 9, fontWeight: '500', color: '#FBA500'}}>
            {formatNumerWithK(item?.coins)}
          </Text>
        </View>

        <View style={{marginHorizontal: 5}}>
          <View
            style={{
              marginHorizontal: 5,
              width: 120,
              overflow: 'hidden',
            }}>
            <TextSlideAnimation2
              name={item?.nick_name ?? item?.full_name}
              fontSize={15}
              fontWeight={'500'}
              color={'white'}
            />
            </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              
              {item?.flag && (
                <Image
                  source={{uri: item?.flag}}
                  style={{
                    width: 20,
                    height: 13,
                  }}
                />
              )}

              <View style={{backgroundColor: '#FBA500', borderRadius: 40, paddingHorizontal: 5, marginHorizontal: 5}}>
                  <Text style={{fontSize: 9, color: 'white', fontWeight: 'bold'}}>Lv. {item?.sender_level} </Text>
              </View>
         

            </View>

            {
            live == true && 
            <View
            style={{
              flexDirection: 'row',
            //  right: 12,
             // width: 40,
             paddingHorizontal: 7,
              borderRadius: 12,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <AnimatedLottieView
              autoPlay
              style={{
                width: 14,
                height: 14,
              }}
              source={require('../assets/json/14467-music.json')}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 9,
                left: 2
              }}>
              {item?.viewerCount}
            </Text>
          </View> 
          }
            </View>
          </View>
       
      </View>
    </ImageBackground>
  );
};

export default AudioHostBox;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'black',
    borderRadius: 12,
    height: heightPercentageToDP(15),
    width: widthPercentageToDP(30),
  },
});
