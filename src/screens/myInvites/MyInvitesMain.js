import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import React, {useState, useRef} from 'react';
import LeftArrow from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import SocialLinks from './SocialLinks';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {shareToWhatsApp} from '../reuseable_Component/SocialShare';
import {useSelector} from 'react-redux';
import Header from '../reuseable_Component/Header';

const tasks = [1, 2, 3, 4, 5, 6, 7, 8];

const MyInvites = ({navigation}) => {
  const refRBSheet = useRef();
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);

  return (
    <View style={{flex: 1, backgroundColor: '#242A38'}}>
      <ImageBackground
        source={require('../../assets/images/image36.png')}
        resizeMode={'stretch'}
        style={{height: '100%', width: '100%'}}>
        <Header name={'My Invite'} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 15,
            marginHorizontal: 20,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity
              style={{
                backgroundColor: '#FF6E1C',
                width: '45%',
                alignItems: 'center',
                paddingVertical: 8,
                borderRadius: 25,
              }}>
              <Text style={{fontSize: 16, color: 'white', fontWeight: 'bold'}}>
                Invite a Friend
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                width: '45%',
                alignItems: 'center',
                paddingVertical: 8,
                borderRadius: 25,
              }}>
              <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
                My Invites
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{alignSelf: 'center', marginTop: 20}}>
          <Text style={{color: 'black', fontSize: 16}}>
            My Collectioned Bouns: 10 Beans
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginHorizontal: 20,
            marginTop: 20,
            height: '50%',
            justifyContent: 'center',
          }}>
          <View style={{}}>
            <Image
              source={require('../../assets/images/myBag/vip.png')}
              resizeMode="contain"
              style={{height: 120, width: 120}}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 10,
              }}>
              03 Days VIP
            </Text>
          </View>
        </View>

        <LinearGradient
          colors={['#E92F24', '#EB362B', '#F24D44']}
          style={{
            marginTop: 25,
            alignSelf: 'center',
            paddingVertical: 8,
            borderRadius: 5,
            backgroundColor: '#E92F24',
            width: '60%',
          }}>
          <TouchableOpacity
            // onPress={() => refRBSheet.current.open()}
            onPress={() =>
              shareToWhatsApp(
                userUpdatedData?.nick_name ?? userUpdatedData?.full_name,
              )
            }
            style={{alignItems: 'center'}}>
            <Text style={{fontSize: 16, color: 'white', fontWeight: 'bold'}}>
              INVITE
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          // height={350}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#000',
              height: 0,
            },
            container: {
              backgroundColor: '#303749',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              height: heightPercentageToDP(30),
            },
          }}>
          <SocialLinks />
        </RBSheet>
      </ImageBackground>
    </View>
  );
};

export default MyInvites;

const styles = StyleSheet.create({});
