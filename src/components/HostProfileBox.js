import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import { formatNumerWithK } from '../Services/GlobalFuntions';
import TextSlideAnimation2 from './Animation/TextSlideAnimationCopy';
import UsersLevel from '../screens/extraData/UsersLevel';
import AllIcons from './AllIcons';

const HostProfileBox = ({item, live}) => {
  // const userData = useSelector(state => state.auth.userData);
    // console.log('helllo',item?.pk_status)

  return (
    <ImageBackground
    source={{uri: item?.image}}
    style={{  height: heightPercentageToDP('22%'),
    width: widthPercentageToDP('48%'), 
    marginHorizontal: 1,
    //  flexDirection:'row',
    marginTop: 5,}}
    imageStyle={{borderRadius: 10}}>
    <View
        style={{flex: 1, justifyContent: 'space-between', marginVertical: 5}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5}}>

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

           {item?.pk_status === 1 && <Image source={require('../assets/images/PKFile/pkWithTimer.png')} style={{height: 25, width: 25}} />}
           {item?.islock === 1 && <AllIcons name={'Fontisto'} iconName={'locked'} color={'black'} size={14} />}
            </View>

        <View style={{marginHorizontal: 5}}>
          <View
            style={{
              marginHorizontal: 5,
              width: 120,
              overflow: 'hidden',
            }}>
            <TextSlideAnimation2
              name={item?.audio_title ?? item?.nick_name ?? item?.full_name}
              fontSize={15}
              fontWeight={'500'}
              color={'white'}
            />
            </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              
            <View>
                <UsersLevel data={{
                  flag: item?.flag,
                  sender_level_image: item?.sender_level_image,
                  reciever_level_image: item?.reciever_level_image,

                  }} />
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

export default HostProfileBox;
