import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useReducer, useRef, useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {white, txtgrey} from '../../utils/Styles';
import LinearGradient from 'react-native-linear-gradient';
import CrossIcon from 'react-native-vector-icons/Entypo';

import UsersLevel from '../extraData/UsersLevel';
import {useNavigation} from '@react-navigation/native';
import AnimatedProfileDp from './AnimatedProfileDP';
import {ApiCallToken} from '../../Services/Apis';
import {useSelector} from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';
import ChatTestSmallScreen from '../ChatScreens/ChatTestSmallScreen';
import RbSheetComponent from './RbSheetComponent';
import AnimatedLottieView from 'lottie-react-native';
import AllIcons, { IconList } from '../../components/AllIcons';
import EnterRoomPassword from '../../components/EnterRoomPassword';

const ProfileModalStyles = ({
  data,
  onPressCros,
  onPresReport,
  onPressMention,
  isBottomHide,
  showLiveStatus
}) => {
  const chatScreenRef = useRef(null);
  const navigation = useNavigation();
  const userData = useSelector(state => state.auth.userData);
  const [profileData, setProfileData] = useState(data);
  const passwordSheetRef = useRef(null)

  useEffect(() => {
   // console.log('2222222222222', data);
    setProfileData(data);
  }, [data]);

  const copyToClipboard = () => {
    if (profileData?.id) {
      Clipboard.setString('' + profileData?.id);
      ToastAndroid.showWithGravityAndOffset(
        'Id copied to clipboard ' + profileData?.id,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
    }
  };

  const FollowHost = async () => {
    const paramsBody = {
      id: profileData?.id,
    };
    try {
      const res = await ApiCallToken({
        params: userData.token,
        paramsBody: paramsBody,
        route: 'user/following-host',
        verb: 'POST',
      });
      console.log(profileData?.id, 'Following response =>>', res);

      alert('' + res?.[0]?.message);
    } catch (error) {
      console.log('Error in follow host, profilemodalstyle scren', error);
    }
  };

  const onJoinPress = async (item) => {
    passwordSheetRef.current.close()
    if(item?.status_live === 1) {
      turnOnMicrophoneWhenJoining = true;
      useSpeakerWhenJoining = true;
      navigation.navigate('AudiencePage', {
        channelId: item?.id?.toString(),
        userLive: true,
        completeData: item,
       });
     } else if(item?.multi_room_status === 1) {
       console.log("audio live")
       navigation.navigate('MultiCallUsers', {
         liveID:  item?.id?.toString(),
         hostName: item?.nick_name ?? item?.full_name,
         completeData: item,
       });
     } else {
       console.log("not live")
     }
   
 };

  //  console.log("data11", profileData)
  return (
   <View style={styles.mainContainer}> 

<View style={{top: heightPercentageToDP(5)}}>
        <AnimatedProfileDp
          img={profileData?.image}
          imgSize={heightPercentageToDP(8)}
          frameSize={22}
          frame={profileData?.json_image}
        />
      </View>

      <View style={styles.header}>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: widthPercentageToDP(4),
          
          
        }}>
        <TouchableOpacity onPress={onPresReport}>
          <Text style={{color: 'black', fontSize: 14}}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressCros}>
          <CrossIcon name="cross" size={30} color={'black'} />
        </TouchableOpacity>
      </View>

    

      <View
        style={{
          // flexDirection: 'row',
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        {profileData?.name ? (
          <Text
            style={{color: 'black', alignSelf: 'center'}}>
            {profileData?.name}
          </Text>
        ) : (
          <Text
            style={{
              color: 'black',
              alignSelf: 'center',
              fontSize: 18,
              fontWeight: '500',
            }}>
            {profileData?.nick_name ?? profileData?.full_name}
          </Text>
        )}
      <TouchableOpacity
          onPress={() => {
            copyToClipboard();
          }}>
          <Text style={{color: txtgrey, fontSize: heightPercentageToDP(1.5), alignSelf: 'center'}}>
            ID:{profileData?.id}
          </Text>
        </TouchableOpacity>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <UsersLevel
          data={{
            sender_level_image: profileData?.sender_level_image,
            reciever_level_image: profileData?.reciever_level_image,
            star_level_image: profileData?.star_level_image,
            badge: profileData?.badge,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          paddingVertical: 5,
        }}>
        <Text style={{color: 'black', fontSize: 13}}>
           Fans: {profileData?.count_followers ?? 0}
        </Text>
        <Text style={{color: 'black', fontSize: 16}}>
          {profileData?.Country}{' '}
        </Text>
      </View>

        </View>
      </View>


      { ((profileData?.status_live == true || profileData?.multi_room_status === 1) && showLiveStatus) && 
          <TouchableOpacity
            onPress={() => {
             profileData?.islock === 1 ? passwordSheetRef.current.open() : onJoinPress(profileData);
            }}
            style={{
              left: 5,
              position: 'absolute',
              zIndex: 1,
              top: '25%',
              alignItems: 'center',
              width: '25%',
            }}>
            
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#451E08', padding: 3, paddingHorizontal: 10, borderRadius: 16}}>

            <AnimatedLottieView
              autoPlay
              style={{
                width: 20,
                height: 20,
              }}
              source={require('../../assets/json/14467-music.json')}
              />
            <Text style={{color: 'white', fontSize: 9, fontWeight: 'bold'}}>  Join Broad</Text>
              </View>
          </TouchableOpacity>
          }



      <View style={styles.bodyStyle}>
        <View style={{ alignItems: 'center', bottom: 10}}>

        
          <Image
            source={require('../../assets/images/profile/Medalss.png')}
            style={{height: '35%', width: '70%'}}
          />
          <Image
            source={require('../../assets/images/profile/Gifts.png')}
            style={{height: '35%', width: '70%', marginVertical: 10, borderRadius: 30}}
          />
        </View>
      </View>

      <View style={styles.bottomStyle}>
      {!isBottomHide && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: widthPercentageToDP(5),
            alignItems: 'center'
          }}>
          <TouchableOpacity
            onPress={() => onPresReport()}
            style={{
              alignItems: 'center',
              width: '25%',
            }}>
            <AllIcons name={IconList.Entypo} iconName={'block'} size={20} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => FollowHost()}
            style={{
              alignItems: 'center',
              width: '25%',
            }}>
            <Image
              source={require('../../assets/images/profile/friendRq.png')}
              style={styles.bottomIconStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPressMention(profileData?.name ?? profileData?.nick_name ?? profileData?.full_name);
            }}
            style={{
              alignItems: 'center',
              width: '25%',
            }}>
            <Image
              source={require('../../assets/images/profile/UserId@.png')}
              style={styles.bottomIconStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              chatScreenRef.current.open();
            }}
            style={{
              alignItems: 'center',
              width: '25%',
            }}>
            <Image
              source={require('../../assets/images/profile/msg.png')}
              style={styles.bottomIconStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>

        </View>
        )}
      </View>

      <RbSheetComponent
        view={
          <ChatTestSmallScreen
            onBackPress={() => chatScreenRef.current.close()}
            friendData={profileData}
          />
        }
        refUse={chatScreenRef}
        close={false}
        height={heightPercentageToDP(55)}
      />

<RbSheetComponent
              view={
                <EnterRoomPassword completeData={profileData} handlePassword={onJoinPress}  />
              }
              backgroundColor={'transparent'}
              refUse={passwordSheetRef}
              close={false}
              height={heightPercentageToDP(30)}
            />
   </View>
  );
};

export default ProfileModalStyles;


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    //  top: heightPercentageToDP(2)
  },
  header: {
    height: heightPercentageToDP(25),
    top: heightPercentageToDP(2),
    // backgroundColor: 'red'
  },
  bodyStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: 10
   
  },
  bottomStyle: {
    flex: 0.4,
    //  backgroundColor: 'silver',
    justifyContent: 'flex-start'
  },
  bottomIconStyle: {height: 20, width: 20}
})