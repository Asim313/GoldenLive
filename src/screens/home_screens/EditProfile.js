import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HomeModal from '../reuseable_Component/HomeModal';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import React, {useContext, useEffect, useState} from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import {useCallback} from 'react';
import {setLoginData, updateUserData, updatedData} from '../../Redux/Actions';
import {RegionList} from 'react-native-country-picker-modal';
import {UserProfileContext} from '../../context/userProfile';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import moment from 'moment/moment';
import {put} from 'redux-saga/effects';
import {
  ApiCallFormData,
  ApiCallToken,
} from '../../Services/Apis';

const modalRef = React.createRef();
const modal2Ref = React.createRef();
const modal3Ref = React.createRef();
const modal5Ref = React.createRef();

const Camera = [
  {
    id: 1,
    name: 'Choose From Gallery',
    icon: 'images',
  },
  {
    id: 1,
    name: 'Take a Photo',
    icon: 'camera',
  },
];
const GenderArray = [
  {
    id: 1,
    name: 'Male',
  },
  {
    id: 1,
    name: 'Female',
  },
  {
    id: 1,
    name: 'Other',
  },

  {
    id: 1,
    name: 'Prefer Not to Say',
  },
];

export default function EditProfile() {
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);

  const {userInfo, setUserData} = useContext(UserProfileContext);

  // console.log('userInfo', userUpdatedData);
  // console.log(userInfo);
  const [selectPkBtn, setselectPkBtn] = useState(userUpdatedData?.region);
  const [selectPkBtnA, setselectPkBtnA] = useState(0);
  const [selectPkBtnC, setselectPkBtnC] = useState(0);
  const [selectPkBtn1, setselectPkBtn1] = useState(0);
  const [genderA, setgenderA] = useState(userUpdatedData?.gender);
  const [showdate, setshowdate] = useState(userUpdatedData?.birthday);
  const [NewDate, setNewDate] = useState('');
  const [img, setimg] = useState(userUpdatedData?.image);
  const userData = useSelector(state => state.auth.userData);
  const [nickName, setNickName] = useState(userUpdatedData?.nick_name);
  const [FullName, setFullName] = useState(userUpdatedData?.full_name);
  const [Gender, setGender] = useState(userUpdatedData?.gender);
  const [region, setRegion] = useState('');
  const [birth, setBirth] = useState('');
  const [intro, setIntro] = useState(userUpdatedData?.introduction?.toString());
  const [imgType, setImgType] = useState('');
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);

  const [getCountry, setGetCountry] = useState([]);
  const [getId, setGetId] = useState(null);
  // console.log("Thisjis", getId)

  function changeKeepAwake(shouldBeAwake) {
    if (shouldBeAwake) {
      KeepAwake.activate();
    } else {
      KeepAwake.deactivate();
    }
  }

  useEffect(() => {
    countries();
  }, []);

  // console.log('Data for editing from redux', userData.user.uuid);

  const UpdateUserProfile = async () => {
    console.log(
      'Image Path sending to DataBase',
      img == null ? userUpdatedData?.image : img,
      ' ',
      getId,
    );
    try {
      setUserData(userUpdatedData);
      setShow(false);
      let formData = new FormData();
      formData.append('image', {
        uri: img == null ? userUpdatedData?.image : img,
        name: 'profile.jpg',
        fileName: 'profile',
        type: 'profile/jpg',
      });
      formData.append(
        'full_name',
        FullName == null ? userUpdatedData?.full_name : FullName,
      );
      formData.append(
        'nick_name',
        nickName == null ? userUpdatedData?.nick_name : nickName,
      );
      formData.append(
        'gender',
        Gender == null ? userUpdatedData?.gender : Gender,
      );
      formData.append(
        'region',
        selectPkBtn == null ? userUpdatedData?.region : selectPkBtn,
      );
      formData.append(
        'birthday',
        showdate == '' ? userUpdatedData?.birthday : showdate,
      );
      formData.append(
        'introduction',
        intro == '' ? userUpdatedData?.introduction : intro,
      );
      formData.append(
        'country_id',
        getId == null ? userUpdatedData?.country_id : getId,
      );

       console.log("Form Image",getId)

      const res = await ApiCallFormData({
        params: userData.token,
        paramsBody: formData,
        route: 'user/update',
        verb: 'POST',
      });

      console.log("yessssssss", res)
      if (res?.code === 200) {
        //  updateUserData(res?.data)
        UpdateUserData();
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          textBody: 'Now you profile is up-to-date',
        });
      } else {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          textBody: 'Not Updated Error ' + res?.message ? res?.message : '',
        });
      }

      // loadin gon save button
      setShow(true);
    } catch (e) {
      console.log('Error is -- ', e.toString());
    }
  };

  const UpdateUserData = async () => {
    dispatch(updatedData(userData));
  };

  const countries = async () => {
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'countries',
        verb: 'GET',
      });
      //console.log('getting countries from api ',res)
      setGetCountry(res);
    } catch (error) {
      console.log('Editprofile, countries func', error);
    }
  };

  const check = () => {
    if (nickName == null || nickName == '') {
      ToastAndroid.showWithGravityAndOffset(
        'Nickname is required',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
    } else if (img == '' || img == null) {
      ToastAndroid.showWithGravityAndOffset(
        'Please Update your Image',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
    } else if (Gender == null) {
      ToastAndroid.showWithGravityAndOffset(
        'Please select your Gender',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
    } else if (selectPkBtn == null) {
      ToastAndroid.showWithGravityAndOffset(
        'Please select your Region',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
    } else if (showdate == null) {
      ToastAndroid.showWithGravityAndOffset(
        'Please select your Birthday',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
    } else if (intro == '') {
      ToastAndroid.showWithGravityAndOffset(
        'Please write your introduction',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
    } else {
      UpdateUserProfile();
    }
  };

  useFocusEffect(
    useCallback(() => {
      // console.log('data is', userUpdatedData);
    }, []),
  );

  const ChooseFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('PATH IS =>>>>>', image?.mime);
      setImgType(image.mime);
      setimg(image.path);
    });
  };

  const ChooseFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      useFrontCamera: true,
    }).then(image => {
      console.log(image);
      setImgType(image.mime);
      setimg(image.path);
    });
  };

  const navigation = useNavigation();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.log('A date has been picked: ', date.toString());
    setshowdate(date.toString());
    // {birthDate ? moment(birthDate).format('MMMM DD, YYYY') : '-'}
    // setshowdate(moment(date.toString()).format('DD-MM-YYYY'));
    hideDatePicker();
  };

  const copyToClipboard = () => {
    if (userUpdatedData?.id) {
      Clipboard.setString('' + userUpdatedData?.id);
      ToastAndroid.showWithGravityAndOffset(
        'Id copied to clipboard ' + userUpdatedData?.id,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
    }
  };

  return (
    <AlertNotificationRoot>
      <SafeAreaView style={styles.mainview}>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <ImageBackground
          source={require('../../assets/images/image36.png')}
          resizeMode={'stretch'}
          style={{height: '100%', width: '100%'}}>
          <ScrollView>
            <StatusBar backgroundColor="#242A38" />

            <View style={styles.header}>
              <View style={styles.editprofilebox}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Ionicon name="chevron-back" size={30} color={'black'} />
                </TouchableOpacity>
                <Text style={styles.editprofiletxt}>Edit Profile</Text>
              </View>
              {show ? (
                <TouchableOpacity onPress={check} style={styles.savebox}>
                    <Text style={styles.savetxt}>Save</Text>
                </TouchableOpacity>
              ) : (
                <ActivityIndicator />
              )}
            </View>

            <View 
              style={styles.imagemaincontainer}>

                <Image source={{uri: img}} style={[styles.img]} />
             
              <TouchableOpacity
                onPress={() => {
                  modal5Ref.current.toggleModal();
                }}
                style={styles.camerabox}>
                <FontAwesome name="camera" size={13} color={'white'} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputmainbox}>
              <View>
                <Text style={styles.nicknametxt}>Nickname</Text>

                <View style={styles.Usernamebox}>
                  <TextInput
                    style={styles.Usernametxt}
                    placeholder={nickName}
                    placeholderTextColor={'#FFFFFF'}
                    value={nickName}
                    onChangeText={txt => setNickName(txt)}
                    maxLength={15}
                  />
                  
                </View>
              </View>
            </View>

            <View style={styles.inputmainbox}>
              <View>
                <Text style={styles.nicknametxt}>ID</Text>

                  <TouchableOpacity
                    style={[styles.Usernamebox]}
                    onPress={() => copyToClipboard()}>
                   
                   <TextInput
                    style={styles.Usernametxt}
                    value={userUpdatedData?.id.toString()}
                    editable={false}
                   
                  />

                  </TouchableOpacity>
                </View>

            </View>

            <TouchableOpacity
              onPress={() => {
                modal3Ref.current.toggleModal();
              }}>
              <View style={styles.inputmainbox}>
                <View>
                  <Text style={styles.nicknametxt}>Gender</Text>

                  <View style={styles.Usernamebox}>
                  <TextInput
                    style={styles.Usernametxt}
                    placeholder={Gender}
                    placeholderTextColor={'#8C8888'}
                    value={Gender}
                    editable={false}
                  />
                    
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                modal2Ref.current.toggleModal();
              }}>
              <View style={styles.inputmainbox}>
                <View>
                  <Text style={styles.nicknametxt}>Region</Text>
                  <View style={styles.Usernamebox}>
                   
                  <TextInput
                    style={styles.Usernametxt}
                    placeholder={selectPkBtn}
                    placeholderTextColor={'#8C8888'}
                    value={selectPkBtn}
                    editable={false}
                  />
                    
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showDatePicker()}>
              <View style={styles.inputmainbox}>
                <View>
                  <Text style={styles.nicknametxt}>Birthday</Text>
                  <View style={styles.Usernamebox}>
                    
                    <TextInput
                    style={styles.Usernametxt}
                    placeholder={'Enter Birthday'}
                    placeholderTextColor={'#8C8888'}
                    value={showdate
                      ? moment(showdate).format('MMMM DD, YYYY')
                      : '-'}
                    editable={false}
                  />
                    
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.inputmainbox}>
                <View>
                  <Text style={styles.nicknametxt}>Introduction</Text>
                  <View style={styles.Usernamebox}>
                    <TextInput
                      style={styles.Usernametxt}
                      // placeholder="Intro"
                      placeholder={intro}
                      placeholderTextColor={'#FFFFFF'}
                      value={intro}
                      type={'text'}
                      onChangeText={txt => setIntro(txt)}
                    />
                
                    
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MyLevel')
                // navigation.navigate('TalentLevelExplaination')
                }}>
              <View style={styles.progressbarmainbox}>
                <View style={styles.progressbaritemmainbox}>
                  <Text style={[styles.nicknametxt, {top: 0}] }>User-Level</Text>
                  <Image
                    source={{uri: userUpdatedData?.sender_level_image}}
                    style={{
                      height: 18,
                      width: 42,
                    }}
                  />
                    <View style={styles.levelupbox}>
                      <Text style={{fontSize: 9, color: 'white', paddingHorizontal: 7, fontWeight: '500'}}>
                        50,000 Beans Up to Level Next
                      </Text>
                    </View>
                    <Image
                    source={{uri: userUpdatedData?.sender_level_image}}
                    style={{
                      height: 18,
                      width: 42,
                    }}
                  />
                 
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UserLevels')
                // navigation.navigate('WealthLevelExplaination')
                }}>
              <View style={styles.progressbarmainbox1}>
              <View style={styles.progressbaritemmainbox}>
                  <Text style={[styles.nicknametxt, {top: 0}]}>Host-Level</Text>
                  <Image
                    source={{uri: userUpdatedData?.reciever_level_image}}
                    style={{
                      height: 18,
                      width: 42,
                    }}
                  />
                    <View style={[styles.levelupbox, {backgroundColor: '#A9D108'}]}>
                      <Text style={{fontSize: 9, color: 'black', paddingHorizontal: 7}}>
                        50,000 Beans Up to Level Next
                      </Text>
                    </View>
                    <Image
                    source={{uri: userUpdatedData?.reciever_level_image}}
                    style={{
                      height: 18,
                      width: 42,
                    }}
                  />
                 
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </ImageBackground>

        <HomeModal
          view={
            <Calendar
              onDayPress={day => {
                setBirth(day.timestamp);

                modalRef.current.toggleModal();
              }}
            />
          }
          ref={modalRef}
        />

        <HomeModal
          view={
            <View
              style={{
                backgroundColor: 'white',
                height: 400,
                width: 300,
                alignSelf: 'center',
                paddingLeft: 5,
                paddingRight: 5,
                borderRadius: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 10,
                }}>
                <Text style={{fontSize: 17}}>Please Select</Text>
                <AntDesign name="caretdown" size={16} />
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                {getCountry.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setselectPkBtn(item.name);
                      setselectPkBtnA(index);
                      setGetId(item.id);

                      modal2Ref.current.toggleModal();
                    }}>
                    <Text
                      style={[
                        styles.RegionList,
                        selectPkBtnA == index && {
                          borderColor: '#B06AB3',
                          color: '#B06AB3',
                        },
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          }
          ref={modal2Ref}
        />
        <HomeModal
          view={
            <View
              style={{
                backgroundColor: 'white',
                height: 250,
                width: 300,
                alignSelf: 'center',
                paddingLeft: 5,
                paddingRight: 5,
                borderRadius: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 10,
                }}>
                <Text style={{fontSize: 17}}>Please Select</Text>
                <AntDesign name="caretdown" size={16} />
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                {GenderArray.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setGender(item.name);
                      setgenderA(index);

                      modal3Ref.current.toggleModal();
                    }}>
                    <Text
                      style={[
                        styles.RegionList,
                        genderA == index && {
                          borderColor: '#B06AB3',
                          color: '#B06AB3',
                        },
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          }
          ref={modal3Ref}
        />

        <HomeModal
          view={
            <View
              style={{
                backgroundColor: 'white',
                height: 150,
                width: 250,
                alignSelf: 'center',
                paddingLeft: 5,
                paddingRight: 5,
                borderRadius: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 10,
                }}>
                <Text style={{fontSize: 17}}>Please Select</Text>
                <AntDesign name="caretdown" size={16} />
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                {Camera.map((item, index) => (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: '1%',
                    }}
                    onPress={() => {
                      setselectPkBtn1(item.name);
                      setselectPkBtnC(index);
                      if (index == 0) {
                        ChooseFromGallery();
                        modal5Ref.current.toggleModal();
                      } else if (index === 1) {
                        ChooseFromCamera();
                        modal5Ref.current.toggleModal();
                      }
                    }}>
                    <Entypo
                      name={item.icon}
                      size={22}
                      color={'black'}
                      style={
                        selectPkBtnC == index && {
                          color: '#B06AB3',
                        }
                      }
                    />
                    <Text
                      style={[
                        styles.RegionList,
                        selectPkBtnC == index && {
                          borderColor: '#B06AB3',
                          color: '#B06AB3',
                        },
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          }
          ref={modal5Ref}
        />
      </SafeAreaView>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  mainview: {
    backgroundColor: '#242A38',
    flex: 1,
    paddingBottom: heightPercentageToDP(5),
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#B06AB3',
  },
  editprofilebox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: widthPercentageToDP(34),
    justifyContent: 'space-between',
  },
  editprofiletxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  savebox: {
    backgroundColor: '#FFA800',
    padding: 5,
    width: widthPercentageToDP(20),
    borderRadius: 20,
  },
  savetxt: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  imagemaincontainer: {
    // backgroundColor : 'red',
    height: heightPercentageToDP(18),
    top: heightPercentageToDP(2),
    borderBottomRightRadius: 500,
    borderTopRightRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camerabox: {
    backgroundColor: '#FF6E1C',
    bottom: 40,
    padding: 10,

    borderRadius: 20,
    left: 40,
  },
  imgcontainer: {
    marginTop: 20,
  },
  Usernamebox: {
    flexDirection: 'row',
    top: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Usernametxt: {
    fontSize: 12,
    color: '#8C8888',
    backgroundColor: '#EAEAEA',
    padding: 4,
    width: '100%',
    borderRadius: 3,
    borderWidth: 0.8,
    borderColor: '#CAC5C5',
    marginTop: '2%',
    paddingLeft: 7,
  },
  nicknametxt: {
    // marginLeft: 5,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 13,
    top: 3,
  },
  inputmainbox: {
    // backgroundColor: 'black',
   
    padding: 12,
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
    borderColor: 'black',
  },
  copybox: {
    backgroundColor: '#B06AB3',
    height: 20,
    width: 50,
    alignItems: 'center',
    borderRadius: 20,
    bottom: 5,
    justifyContent: 'center',
    margin: 5,
    top: 3,
  },
  copytxt: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 11,
  },
  introtxt: {
    width: widthPercentageToDP(80),
    fontSize: 12,
    color: 'black',
    marginLeft: 4,
  },
  progressbarmainbox: {
    padding: 20,
    flexDirection: 'row',

    borderBottomWidth: 0.4,
    borderColor: 'black',
  },
  progressbarmainbox1: {
    padding: 20,
    flexDirection: 'row',
    borderColor: 'black',

  },
  progressbaritemmainbox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-evenly',
  },

  progressbarlevelbox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'orange',
    width: widthPercentageToDP(10),
    justifyContent: 'space-evenly',
    borderRadius: 15,
    height: heightPercentageToDP(3),
  },
  levelupbox: {
    backgroundColor: '#FFA800',
    padding: 5,
    borderRadius: 20,
  },



  progressbartitetxt1: {
    fontSize: 12,
    color: 'black',
  },

  idbox: {
    fontSize: 12,
    color: 'black',
    marginLeft: 4,

    width: '85%',
    borderRadius: 3,

    borderWidth: 0.4,
    borderColor: '#B06AB3',
    padding: 7,
    marginTop: '2%',
  },
  RegionList: {
    marginVertical: 8,
    fontSize: 17,
    borderBottomWidth: 0.3,
    color: 'black',
    paddingLeft: 10,
    marginLeft: '5%',
    width: '75%',
  },
});
