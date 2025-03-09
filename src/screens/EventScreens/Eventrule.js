import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {
  black,
  headings,
  primaryColor,
  secondaryColor,
  white,
} from '../../utils/Styles';
import {useNavigation} from '@react-navigation/native';

export default function Eventrule({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.topview}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color={white}></Ionicons>
        </TouchableOpacity>
        <Text style={{...headings.h3, color: 'white'}}>
          GoldenLive Daily Star
        </Text>
      </View>
      <ScrollView style={{height: '100%', width: '100%'}}>
        <ImageBackground
          source={require('../../assets/images/event/eventbg.png')}
          resizeMode="cover"
          style={{
            height: '115%',
            width: widthPercentageToDP(100),
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <View style={{marginTop: 350, width: '90%'}}>
            <Text style={{fontSize: 16, color: 'white', marginVertical: 3}}>
              {`\u25CF`} Collect Star and become a star streamer!
            </Text>
            <Text style={{fontSize: 16, color: 'white', marginVertical: 3}}>
              {`\u25CF`} Daily Star Event is exclusively designed for our
              talented streamers on GoldenLive
            </Text>
            <Text style={{fontSize: 16, color: 'white', marginVertical: 3}}>
              {`\u25CF`} You can collect stars by getting as many gifts as you
              can during live streaming
            </Text>
            <Text style={{fontSize: 16, color: 'white', marginVertical: 3}}>
              {`\u25CF`} Finish different levels of tasks every day, you will
              win rowards according to your gift collection.
            </Text>
          </View>
          {/* <TouchableOpacity
            style={{
              alignSelf: 'flex-start',
              marginLeft: 20,
              marginVertical: 20,
            }}>
            <ImageBackground
              source={require('../../assets/images/event/rulesbg.png')}
              style={{height: 55, width: 245}}></ImageBackground>
          </TouchableOpacity> */}
          <View style={{width: '90%'}}>
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                marginVertical: 3,
                textAlign: 'justify',
              }}>
              1. Event runs from 00.00UTC (05:00 am PST/05:30 am PST) to 23:59
              UTC every day, streamers can collect stars by receiving as many
              gifts as they can during their live stream.
            </Text>
          </View>
          <Image
            source={require('../../assets/images/event/rewardbg2.png')}
            style={{height: 510, width: '100%', marginTop: 30}}
          />
        </ImageBackground>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F92929',
  },
  topview: {
    flexDirection: 'row',
    paddingTop: 10,
    backgroundColor: '#F80D0B',
    paddingBottom: 10,
  },
});
