import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import globalStyles from '../../utils/styles/global-styles';
import {useSelector} from 'react-redux';
import UsersLevel from '../extraData/UsersLevel';
import {
  DisabledButton,
  GradientButtonMain,
} from '../../components/GradientButtonMain';
import VideoCallBtn from '../../components/VideoCallBtn';

const ProfileViewerMainScreen = () => {
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);
  console.log('user', userUpdatedData);
  return (
    <View style={[globalStyles.mainContainer, {backgroundColor: 'white'}]}>
      <ImageBackground
        style={globalStyles.mainContainer}
        source={{uri: userUpdatedData?.image}}>
            <View style={{flex: 1, height: '100%', padding: 20, bottom: 10, justifyContent: 'flex-end', alignItems: 'flex-end'}}>  
                <GradientButtonMain txt={'Livestream'} json={require('../../assets/json/user_live_animation.json')} />
            </View>
        </ImageBackground>

      <View style={styles.bottomConatiner}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 0.2,
          }}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.nameFontStyle}>
                {userUpdatedData?.nick_name ?? userUpdatedData?.full_name}
              </Text>
              <UsersLevel
                data={{
                  flag: userUpdatedData?.flag,
                  sender_level_image: userUpdatedData?.sender_level_image,
                }}
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', top: 10}}>
              <Text style={{fontSize: 13, color: 'black', fontWeight: '500'}}>
                {'ID:' + userUpdatedData?.id}
              </Text>
              <Image
                source={require('../../assets/images/profileViewer/copy.png')}
                style={{height: 16, width: 16, left: 5}}
              />
            </View>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <GradientButtonMain
              txt={'Follow'}
              icon={require('../../assets/images/profileViewer/follow.png')}
            />
            {/* <DisabledButton txt={'Followed'} icon={require('../../assets/images/profileViewer/tickImg.png')}  /> */}
          </View>
        </View>
        <View
          style={[
            globalStyles.flexRowAndCenter,
            {
              justifyContent: 'space-between',
              flex: 0.2,
              width: '50%',
              alignItems: 'flex-end',
            },
          ]}>
          <Text style={styles.countFollowStyle}>
            Following
            <Text style={[{color: 'black', fontWeight: '500'}]}> 16</Text>
          </Text>
          <Text style={styles.countFollowStyle}>
            Following
            <Text style={[{color: 'black', fontWeight: '500'}]}> 49</Text>
          </Text>
        </View>

        <View
          style={{
            flex: 0.2,
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
          }}>
          <Text
            style={[
              styles.countFollowStyle,
              {color: 'black', fontWeight: 'bold', fontSize: 14},
            ]}>
            Introduction{' '}
          </Text>
          <View
            style={{
              backgroundColor: '#EDEDED',
              padding: 5,
              paddingHorizontal: 10,
              borderRadius: 40,
              top: 10,
              width: '100%',
            }}>
            <Text style={[styles.countFollowStyle, {color: '#555555'}]}>
              {userUpdatedData?.introduction}{' '}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 0.3,
            top: 10,
          }}>
          <TouchableOpacity
            style={styles.sendMsgBtnStyle}>
            <Image
              source={require('../../assets/images/profileViewer/msgImg.png')}
              style={{width: 22, height: 22, right: 5}}
            />
            <Text style={{fontSize: 13, color: '#9A9898', fontWeight: '500'}}>
              Send Message
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{height: '50%', width: '45%'}}>
            <VideoCallBtn />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileViewerMainScreen;

const styles = StyleSheet.create({
  bottomConatiner: {
    flex: 0.7,
    backgroundColor: 'white',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    bottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 25,
    justifyContent: 'space-evenly', 
  },
  nameFontStyle: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
  countFollowStyle: {
    fontSize: 13,
    color: '#555555',
  },
  sendMsgBtnStyle: {
    elevation: 0.5,
  backgroundColor: 'white',
  height: '50%',
  width: '45%',
  borderRadius: 50,
  borderColor: '#EDEDED',
  borderWidth: 1,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
}
});
