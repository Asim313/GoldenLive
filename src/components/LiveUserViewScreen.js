import { StyleSheet, Text, View,TouchableOpacity,ImageBackground,Image } from 'react-native'
import React from 'react'
import AnimatedLottieView from 'lottie-react-native';
import {
  
    widthPercentageToDP,
  } from 'react-native-responsive-screen';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const LiveUserViewScreen = ({item}) => {

    // console.log('check it ',item)

    
  
  return (
    <TouchableOpacity
    onPress={() => {
      // navigation.navigate('StreamShow');
      //  alert(item.received_beans)
      onJoinPress(
        item?.nick_name ?? item?.full_name,
        item?.coins,
        item?.uuid,
        item?.image,
        item?.received_beans,
        item?.region,
        item?.no_of_followers,
        item?.reciever_level,
        item?.sender_level,
        item,
      );
    }}>
    <ImageBackground
      style={{
        height: heightPercentageToDP('22%'),
        width: widthPercentageToDP('48%'),
        marginHorizontal: 1,
        marginTop: 5,
      }}
      source={
        item?.image == null
          ? require('../assets/images/events.jpg')
          : {uri: item?.image}
      }
      imageStyle={{borderRadius: 10}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: '5%',
          marginTop: 5,

        }}>
        {item?.status_live == 1 ? (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'rgba(50, 52, 52, 0.4)',
              width: 45,
              height: 17,
              borderRadius: 30,
              justifyContent: 'space-evenly',
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
                marginHorizontal: 2,
                color: '#fff',
                fontSize: 10,
              }}>
              Live
            </Text>
          </View>
        ) : null}
      </View>

      <TouchableOpacity
        activeOpacity={1}
        // onPress={() => this.props.navigation.navigate(item.item.navi)}
        style={{
          paddingVertical: 10,
          flexDirection: 'row',
          paddingHorizontal: 5,
          position: 'absolute',
          bottom: 5,
          alignItems: 'center',
        }}>
        <Image
          source={
            item?.image == null
              ? require('../assets/images/events.jpg')
              : {uri: item?.image}
          }
          style={{
            height: 30,
            width: 30,
            borderRadius: 90,
            borderWidth: 1,
            borderColor: '#c471ed',
          }}
        />
        <View style={{flexDirection: 'column', marginHorizontal: '5%'}}>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 12,
            }}>
            {item?.nick_name ?? item?.full_name}
          </Text>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  </TouchableOpacity>
  )
}

export default LiveUserViewScreen

const styles = StyleSheet.create({})