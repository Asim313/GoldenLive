import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import RightOutlined from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AnimatedProfileDp from '../reuseable_Component/AnimatedProfileDP';
import {Colors, headings, white} from '../../utils/Styles';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Clipboard from '@react-native-clipboard/clipboard';
import {updatedData} from '../../Redux/Actions';
import PTRView from 'react-native-pull-to-refresh';
import {formatNumerWithK} from '../../Services/GlobalFuntions';
import UsersLevel from '../extraData/UsersLevel';
import {ScrollView} from 'react-native-gesture-handler';
import MultiCallBox from '../Agora/multiChannel/multiSeatsLogic/multiCallBox';
import RbSheetComponent from '../reuseable_Component/RbSheetComponent';
import RoomSettings from '../../components/RoomSettings';   
import { useFocusEffect } from '@react-navigation/native';
import RewardWinningAnimation from '../../components/Animation/RewardWinningAnimation';
// import { addEventListener } from "@react-native-community/netinfo";
import RNScreenshotPrevent, { addListener } from 'react-native-screenshot-prevent';
import ProfileViewerSheet from '../../components/ProfileViewerSheet';
const copyToClipboard = id => {
  if (id) {
    Clipboard.setString('' + id);
    ToastAndroid.showWithGravityAndOffset(
      'Id copied to clipboard ' + id,
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
      0,
      0,
    );
  }
};

const Profile = ({navigation}) => {

  const roomSettingsRef = useRef()
  const profileViewRef = useRef()
  const dispatch = useDispatch();
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);
  const userData = useSelector(state => state.auth.userData);
  // console.log('jdfasklfjdks', userData);
  // RNScreenshotPrevent.enabled(true);

  const data = [
    {
      id: '1',
      title: 'Invite Friends',
      image: require('../../assets/images/profile/Vector.png'),
    },
    {
      id: '2',
      title: 'Levels',
      image: require('../../assets/images/profile/Levels.png'),
    },
    {
      id: '3',
      title: userUpdatedData?.user_type_id == 3 ? 'My Earnings' : 'My Agency',
      image: require('../../assets/images/profile/hom.png'),
    },
    {
      id: '4',
      title: 'Medals',
      image: require('../../assets/images/profile/medalsnew.png'),
    },
    {
      id: '5',
      title: 'Settings ',
      image: require('../../assets/images/profile/setting_2.png'),
    },
    {
      id: '6',
      title: 'Agency Record',
      image: require('../../assets/images/profile/AgencyRecord.png'),
    },
    {
      id: '7',
      title: 'Edit Profile',
      image: require('../../assets/images/profile/EditProfile.png'),
    },
    {
      id: '8',
      title: 'Help Center',
      image: require('../../assets/images/profile/HelpCenter.png'),
    },
    {
      id: '9',
      title: 'Top Up',
      image: require('../../assets/images/profile/topup.png'),
    },
    // {
    //   id: '10',
    //   title: 'Wallet',
    //   image: require('../../assets/images/profile/wallet.png'),
    // },
  ];

  const active_store = useSelector(state => state.homeRed.activeStoreData);
  const frameData = active_store?.filter(
    item => item?.parent_title === 'Frames',
  );

  const badge = active_store?.filter(item => item?.parent_title === 'Badge');

  // console.log('badkkkkkkkkkkkkkkk', frameData)
  useFocusEffect(
    useCallback(() => {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      UpdateUserData()
    }, []),
  );


  const UpdateUserData = async () => {
    dispatch(updatedData(userData));
  };

  const refresh = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        UpdateUserData();
        resolve();
      }, 2000);
    });
  };

  return (
    <PTRView onRefresh={refresh} style={{}}>
      {/* <RewardWinningAnimation /> */}
      <ScrollView style={{paddingBottom: heightPercentageToDP(6)}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'white',
            height: heightPercentageToDP(100),
          }}>
          <View
            style={{
              height: heightPercentageToDP(18),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EditProfile');
              }}>
              {userUpdatedData?.id && (
                <View style={[styles.img, {top: heightPercentageToDP(4)}]}>
                  <AnimatedProfileDp
                    img={userUpdatedData?.image}
                    imgSize={60}
                    frameSize={20}
                    frame={frameData?.[0]?.json_image}
                  />
                </View>
              )}
            </TouchableOpacity>

            <View
              style={{
                top: heightPercentageToDP(10),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.idDetails}>
                  {userUpdatedData?.nick_name ?? userUpdatedData?.full_name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                  }}>
                  <Text style={styles.idDetailed}>ID:{userData?.user?.id}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      copyToClipboard(userUpdatedData?.id);
                    }}
                    style={{
                      width: '10%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bottom: '2%',
                      left: 0,
                    }}>
                    <Image
                      source={require('../../assets/images/profile/Vector1.png')}
                      style={styles.setIcon}
                    />
                  </TouchableOpacity>
                </View>

                <View>
                  <UsersLevel
                    data={{
                      sender_level_image: userUpdatedData?.sender_level_image,
                      reciever_level_image:
                        userUpdatedData?.reciever_level_image,
                      star_level_image: userUpdatedData?.star_level_image,
                      badge: userUpdatedData?.badge,
                    }}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={{top: heightPercentageToDP(6)}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: widthPercentageToDP(100),
                alignItems: 'center',
                elevation: 3.5,
                padding: 15,
                marginVertical: 10,
                backgroundColor: 'white',
              }}>
              <View style={styles.itemContainer}>
                <Text style={styles.value}>0</Text>
                <Text style={styles.item}>Friends</Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Follow')
                }}
                style={styles.itemContainer}>
                <Text style={styles.value}>
                  {userUpdatedData?.no_of_followings ?? 0}
                </Text>
                <Text style={styles.item}>Following</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('Followers')}
                style={styles.itemContainer}>
                <Text style={styles.value}>
                  {userUpdatedData?.no_of_followers ?? 0}
                </Text>
                <Text style={styles.item}>Followers</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                backgroundColor: 'white',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexDirection: 'row',
                elevation: 3.5,
                padding: 15,
                marginVertical: 10,
              }}>
              <TouchableOpacity onPress={() => navigation.navigate('LuckyTopUp')}  style={styles.directionToRow}>
              <Image
                  source={require('../../assets/images/profile/luckyTopUp.png')}
                  style={{height: 30, width: 30}}
                />
                <Text style={{fontWeight: '500', left: 5, color: 'black', width: 30, fontSize: 9}}>
                  Lucky Topup
                </Text>
              </TouchableOpacity>
              <View style={styles.directionToRow}>
                <Image
                  source={require('../../assets/images/profile/beans.png')}
                  style={{height: 30, width: 30}}
                />
                <Text style={{fontWeight: '500', left: 5, color: 'black'}}>
                  {formatNumerWithK(userUpdatedData?.beans)}
                </Text>
              </View>
              <View style={styles.directionToRow}>
                <Image
                  source={require('../../assets/images/profile/coins.png')}
                  style={{height: 30, width: 30}}
                />
                <Text style={{fontWeight: '500', left: 5, color: 'black'}}>
                  {formatNumerWithK(userUpdatedData?.coins)}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.setgradient,
                {
                  height: heightPercentageToDP(13),
                  width: widthPercentageToDP(100),
                  elevation: 3.5,
                  padding: 15,
                  marginVertical: 10,
                  backgroundColor: 'white',
                },
              ]}>
              <TouchableOpacity
                onPress={() => navigation.navigate('MainWealthClass')}
                style={styles.Imgdes}>
                <Image
                  source={require('../../assets/images/profile/rounded.png')}
                  style={styles.Imgdetails}
                />
                <Text style={styles.txtdes}>VIP</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.Imgdes}
                onPress={() => navigation.navigate('Store')}>
                <Image
                  source={require('../../assets/images/profile/myhome.png')}
                  style={[styles.Imgdetails, {width: 35}]}
                />
                <Text style={styles.txtdes}>Shop</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('MyBagMain')}
                style={styles.Imgdes}>
                <Image
                  source={require('../../assets/images/profile/mybag1.png')}
                  style={[styles.Imgdetails, {width: 25}]}
                />
                <Text style={styles.txtdes}>My Bag</Text>
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.Mainbox1,
                {
                  elevation: 3.5,
                  // padding: 15,
                  // marginVertical: 10,
                  backgroundColor: 'white',
                },
              ]}>
              <FlatList
                numColumns={3}
                data={data}
                renderItem={({item, index, separators}) => (
                  <TouchableOpacity
                    style={{
                      padding: 12,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: widthPercentageToDP(25),
                    }}
                    onPress={() => {
                      if (index == 9) {
                        navigation.navigate('BeansPackage');
                      } else if (index == 1) {
                        // profileViewRef.current.open()
                        // navigation.navigate('MyLevel');
                        navigation.navigate('ProfileViewerMainScreen');
                      } else if (index == 3) {
                        navigation.navigate('MyBadgeMain');
                      } else if (index == 4) {
                        navigation.navigate('Settings');
                      } else if (index == 0) {
                        navigation.navigate('MyInvites');
                      } else if (index == 2) {
                        if (userUpdatedData?.user_type_id !== 3) {
                          navigation.navigate('Earnings');
                        } else {
                          navigation.navigate('AgencyID');
                        }
                        // navigation.navigate('Apply_Form', {refferenceCode: 12910});
                      } else if (index == 6) {
                        navigation.navigate('EditProfile');
                      } else if (index == 5) {
                        navigation.navigate('AgencyRecords');
                      } else if (index == 7) {
                        navigation.navigate('Help');
                      } else if (index == 8) {
                        // navigation.navigate('BeansPackage');
                        navigation.navigate('MainBeansBuyScreen');
                        
                      }
                    }}>
                    <Image
                      source={item?.image}
                      style={{
                        height: index === 3 || index === 1 ? 35 : 30,
                        width: index === 0 || index === 1  ? 44 : 30,
                        bottom: 5,
                      }}
                    />
                    <Text style={styles.flattitle}>{item?.title}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={{justifyContent: 'space-evenly'}}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <RbSheetComponent
              view={
                <RoomSettings />
              }
              backgroundColor={'transparent'}
              refUse={roomSettingsRef}
              close={false}
              height={heightPercentageToDP(100)}
            />

      <RbSheetComponent
              view={
                <ProfileViewerSheet />
              }
              backgroundColor={'transparent'}
              refUse={profileViewRef}
              close={false}
              height={heightPercentageToDP(43)}
            />
    </PTRView>
  );
};
export default Profile;
const styles = StyleSheet.create({
  itemboxcontainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 5,
    marginTop: widthPercentageToDP(1.5), ////
    width: widthPercentageToDP(40),
  },
  ImageBackground1: {
    width: '100%',
    height: '10%',
  },
  txtcontainer: {
    width: '45%',
    marginLeft: widthPercentageToDP(2),
  },
  frame: {
    height: 100,
    width: 100,
    bottom: 30,
  },
  container: {
    flexDirection: 'row',
    width: '90%',
  },
  girl: {
    height: '62%',
    width: '62%',
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: '14%',
  },
  counttxt: {
    fontSize: 15,
    color: 'white',
  },
  rowContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-evenly',
    // alignItems: 'center',
    width: '100%',
    height: '7%',
  },

  item: {
    fontSize: 12,
    padding: 0,
    paddingTop: 10,
    color: 'black',
  },
  idcontainer: {
    justifyContent: 'space-between',
    width: '90%',
    height: '10%',
    flexDirection: 'row',
  },

  Mainid: {
    width: '90%',
    height: '90%',
    justifyContent: 'space-evenly',
  },
  idDetails: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  idDetailed: {
    color: 'black',
    // fontWeight: 'normal',
    fontSize: 11,
  },
  setIcon: {
    height: 18,
    width: 15,
    top: 5,
  },

  value: {
    fontSize: 12,
    color: 'black',
  },
  itemContainer: {
    alignItems: 'center',
  },
  setgradient: {
    borderRadius: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  directionToRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Imgdetails: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Imgdes: {
    alignItems: 'center',
    height: '90%',
    width: '24%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtdes: {
    marginTop: 5,
    color: 'black',
    fontSize: 13,
    justifyContent: 'space-between',
  },
  Mainbox1: {
    justifyContent: 'space-around',
    alignItems: 'center',
    width: widthPercentageToDP(100),
    marginVertical: 10,
    borderRadius: 10,
  },

  flattitle: {
    color: 'black',
    fontSize: 10,
    alignSelf: 'center',
  },
  
});
