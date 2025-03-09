import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Image,
  TextInput,
  ImageBackground,
  ToastAndroid,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
} from 'react-native';

import React, {useState} from 'react';
//----------Vector Icons----------//
import AntDesign from 'react-native-vector-icons/AntDesign';

import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import Fontisto from 'react-native-vector-icons/Fontisto';
import ImagePicker from 'react-native-image-crop-picker';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
//---------------Reuseable Input-------------
import Input from '../../components/Input';
//---------------Reuseable Button-------------
import PrimaryButton from '../../components/PrimaryButton';
//---------------country Pickerr-------------
import CountryPicker from 'react-native-country-picker-modal';
//---------------Image Pickerr-------------
// import ImagePicker from 'react-native-image-crop-picker';
//---------------Radio Button -------------
import {RadioButton} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import HomeModal from '../reuseable_Component/HomeModal';
import { ApiCallFormData } from '../../Services/Apis';
import Header from '../reuseable_Component/Header';

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

const modal2Ref = React.createRef();

const Apply_Form = () => {
  const [selectPkBtn, setselectPkBtn] = useState('Punjab');
  const [selectPkBtnA, setselectPkBtnA] = useState(0);
  const [countryCode, setCountryCode] = useState('PK');
  const [callingCode, setcallingCode] = useState('91');
  const [withCountryNameButton, setWithCountryNameButton] = useState('false');
  const [country, setCountry] = useState('Pakistan');
  const [imagePath, setImagePath] = useState('');
  const [radio, setRadio] = useState('');
  const modal1Ref = React.createRef();
  const modal2Ref = React.createRef();
  const modal3Ref = React.createRef();
  const [checked, setChecked] = React.useState('');

  const [checked2, setChecked2] = React.useState('');
  const [checked8, setChecked8] = React.useState('');
  const [RName, setRName] = useState('');
  const [Mnumber, setMnumber] = useState('');
  const [Address, setAddress] = useState('');
  const [Email, setEmail] = useState('');
  const [ID, setID] = useState('');
  const userData = useSelector(state => state.auth.userData);
  const [ImgForFront, setImgForFront] = useState('');
  const [ImgForFrontCamera, setImgForFrontCamera] = useState('');
  const [ImgForBack, setImgForBack] = useState('');
  const [ImgForBackCamera, setImgForBackCamera] = useState('');
  const [img3, setimg3] = useState('');
  const [ImgForSelfie, setImgForSelfie] = useState('');
  const [ImgForSelfie2, setImgForSelfie2] = useState('');
  const route = useRoute();
  const code = route.params.refferenceCode;
  console.log('Code getrting', code);
  const [show, setShow] = useState(false);

  // console.log('Code getrting', userData.user.email);

  const SubmitForm = async () => {
    try {
      setShow(true);
      let formData = new FormData();
      formData.append('real_name', RName);
      formData.append('number', Mnumber);
      formData.append('addresses', Address);
      formData.append('email', userData.user.email);
      formData.append('id_number', ID);
      formData.append('id_front', {
        uri: ImgForFront,
        name: 'idFront.jpg',
        fileName: 'idFront',
        type: 'idFront/jpg',
      });
      formData.append('id_back', {
        uri: ImgForBack,
        name: 'idBack.jpg',
        fileName: 'idBack',
        type: 'idBack/jpg',
      });
      formData.append('selfi_image', {
        uri: ImgForSelfie,
        name: 'selfie.jpg',
        fileName: 'selfie',
        type: 'selfie/jpg',
      });
      formData.append('payment_type', '0');
      formData.append('reference_code', code);
      formData.append('country_id', 1);

      const res = await ApiCallFormData({
        params: userData.token,
        paramsBody: formData,
        route: 'user/user-tobe-host',
        verb: 'POST',
      });

      console.log('API RESPONSEEEE FOR APPLY FORM', res);

      setShow(false);
          ToastAndroid.showWithGravityAndOffset(
            res?.message,
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
            0,
            0,
          );
      
      if(res?.code === 200)
      {
        navigation.navigate('Profile');
      }
          
    } catch (e) {
      console.log('error -- ', e.toString());
    }
  };

  // const ChooseFromGallery = () => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   }).then(image => {
  //     console.log(image);
  //     setImgForFront(image.path);
  //   });
  // };
  const ChooseFromGallery01 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      try {
        console.log('FRONT IMAGE FROM GALLERY ==>>', image);
        setImgForFront(image.path);
      } catch (error) {
        console.log('ERROR IS ', error);
      }
    });
  };

  const ChooseFromCamera01 = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      useFrontCamera: false,
    }).then(image => {
      console.log('FRONT IMAGE FROM CAMERA ==>>', image);
      setImgForFront(image.path);
    });
  };
  const ChooseFromGallery02 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImgForBack(image.path);
    });
  };

  const ChooseFromCamera02 = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      useFrontCamera: false,
    }).then(image => {
      console.log(image);
      setImgForBack(image.path);
    });
  };

  // const ChooseFromCamera = () => {
  //   ImagePicker.openCamera({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //     useFrontCamera: true,
  //   }).then(image => {
  //     console.log(image);
  //     image.path;
  //   });
  // };
  const selectCountry = country => {};

  const ChooseFromCamera1 = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      useFrontCamera: true,
    }).then(image => {
      console.log(image);

      setImgForSelfie(image.path);
    });
  };
  const ChooseFromGallery1 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImgForSelfie(image.path);
    });
  };

  const check = () => {
    if (RName == '') {
      ToastAndroid.showWithGravityAndOffset(
        'Name is required',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
    } else if (Mnumber == '') {
      ToastAndroid.showWithGravityAndOffset(
        'Mobile Number is required',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
    } else if (ID == '') {
      ToastAndroid.showWithGravityAndOffset(
        'ID is required',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
    } else if (Address == '') {
      ToastAndroid.showWithGravityAndOffset(
        'Address is required',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
    } else if (ImgForBack == '' && ImgForBackCamera == '') {
      ToastAndroid.showWithGravityAndOffset(
        'National ID Back Image Required',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
    } else if (ImgForFront == '' && ImgForFrontCamera == '') {
      ToastAndroid.showWithGravityAndOffset(
        'National ID Front Image Required',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
    } else if (ImgForSelfie == '' && ImgForSelfie2 == '') {
      ToastAndroid.showWithGravityAndOffset(
        'Self-Taken Image is required',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
    } else {
      SubmitForm();
    }
  };

  const createThreeButtonAlert = () =>
    Alert.alert(' ', '    Get image from Gallery and Camera', [
      {
        text: 'Gallery',
        // onPress: () => getImageFromGallery(),
      },
      {
        text: 'Camera',
        // onPress: () => getCamera(),
        style: 'cancel',
      },
      {text: 'Cancel', onPress: () => console.log('ok Pressed')},
    ]);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{...styles.container}}>
      <ImageBackground
        source={require('../../assets/images/image36.png')}
        resizeMode={'stretch'}
        style={{height: '100%', width: '100%'}}>
        <ScrollView
        // contentContainerStyle={{ flex: 1, height: hp("200%") }}
        >
          {/* Header */}

        <Header name={'Apply To Be An Offical Talent'} />
          {/* Reuseable TextInput */}
          {/* Real Name */}
          <TextInput
            onChangeText={val => setRName(val.trim())}
            placeholder="Enter Your Real Name*"
            placeholderTextColor={'grey'}
            title={'Enter Your Address(Optional)'}
            // value={this.setState.phone_number}
            // onChange={(txt) => this.setState({ phone_number: txt })}
            style={{
              marginTop: '4%',
              borderWidth: 0.4,
              width: '100%',
              height: '5%',
              borderColor: 'black',
              color: 'black',
              borderRadius: 8,
              paddingLeft: 10,
            }}
          />
          {/* Mobile Number */}
          <TextInput
            onChangeText={val => setMnumber(val.trim())}
            keyboardType={'numeric'}
            placeholder="Enter Your Mobile Number*"
            placeholderTextColor={'grey'}
            title={'Enter Your Address(Optional)'}
            // value={this.setState.phone_number}
            // onChange={(txt) => this.setState({ phone_number: txt })}
            style={{
              marginTop: '4%',
              borderWidth: 0.4,
              width: '100%',
              height: '5%',
              borderColor: 'black',
              color: 'black',
              borderRadius: 8,
              paddingLeft: 10,
            }}
          />
        

          {/* Address*/}
          <TextInput
            onChangeText={val => setAddress(val.trim())}
            placeholder="Enter Your Address*"
            placeholderTextColor={'grey'}
            // value={this.setState.phone_number}
            // onChange={(txt) => this.setState({ phone_number: txt })}
            style={{
              marginTop: '4%',
              borderWidth: 0.4,
              width: '100%',
              height: '5%',
              borderColor: 'black',
              color: 'black',
              borderRadius: 8,
              paddingLeft: 10,
            }}
          />

          {/* Email Address */}
          <TextInput
            editable={false}
            // placeholder="Enter Your Email"
            placeholderTextColor={'grey'}
            title={'Enter Your Address(Optional)'}
            value={userData.user.email}
            // onChange={(txt) => this.setState({ phone_number: txt })}
            style={{
              marginTop: '4%',
              borderWidth: 0.4,
              width: '100%',
              height: '5%',
              borderColor: 'black',
              color: 'black',
              borderRadius: 8,
              paddingLeft: 10,
            }}
          />

          {/* ID Number */}
          <TextInput
            onChangeText={val => setID(val.trim())}
            keyboardType={'numeric'}
            placeholder="Enter Your National ID Number*"
            placeholderTextColor={'grey'}
            title={'Enter Your Address(Optional)'}
            // value={this.setState.phone_number}
            // onChange={(txt) => this.setState({ phone_number: txt })}
            style={{
              marginTop: '4%',
              borderWidth: 0.4,
              width: '100%',
              height: '5%',
              borderColor: 'black',
              color: 'black',
              borderRadius: 8,
              paddingLeft: 10,
            }}
          />

          <Text style={{...styles.redtxt}}>
            Application wil be rejected if you upload Invalid ID#
          </Text>

          <Text style={{...styles.qut}}>National ID Image Simple*</Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {ImgForFront == '' && ImgForFrontCamera == '' ? (
              <LinearGradient
                colors={['#3494E6', '#EC6EAD']}
                style={{...styles.view}}>
                <View style={{...styles.view2}}>
                  <TouchableOpacity
                    onPress={() => {
                      modal1Ref.current.toggleModal();
                    }}
                    activeOpacity={0.1}>
                    <Entypo name="camera" size={24} style={{...styles.icon}} />
                  </TouchableOpacity>
                </View>

                <Text style={{...styles.upload}}>Upload Photo</Text>
                <Text style={{...styles.txt}}>(Front)</Text>
              </LinearGradient>
            ) : (
              <View style={{...styles.view}}>
                <TouchableOpacity
                  onPress={() => {
                    setImgForFrontCamera('');
                    setImgForFront('');
                  }}
                  style={{position: 'absolute', zIndex: 2, margin: 5}}>
                  <Entypo name="cross" size={24} />
                </TouchableOpacity>

                {ImgForFrontCamera != '' ? (
                  <Image
                    source={{uri: ImgForFrontCamera}}
                    style={{width: '100%', height: '100%', borderRadius: 5}}
                  />
                ) : (
                  <Image
                    source={{uri: ImgForFront}}
                    style={{width: '100%', height: '100%', borderRadius: 5}}
                  />
                )}
              </View>
            )}

            {ImgForBack == '' && ImgForBackCamera == '' ? (
              <LinearGradient
                colors={['#3494E6', '#EC6EAD']}
                style={{...styles.view}}>
                <View style={{...styles.view2}}>
                  <TouchableOpacity
                    onPress={() => {
                      modal2Ref.current.toggleModal();
                    }}
                    activeOpacity={0.1}>
                    <Entypo name="camera" size={24} style={{...styles.icon}} />
                  </TouchableOpacity>
                </View>

                <Text style={{...styles.upload}}>Upload Photo</Text>
                <Text style={{...styles.txt}}>(Back)</Text>
              </LinearGradient>
            ) : (
              <View style={{...styles.view}}>
                <TouchableOpacity
                  onPress={() => {
                    setImgForBackCamera('');
                    setImgForBack('');
                  }}
                  style={{position: 'absolute', zIndex: 2, margin: 5}}>
                  <Entypo name="cross" size={24} />
                </TouchableOpacity>

                {ImgForBackCamera != '' ? (
                  <Image
                    source={{uri: ImgForBackCamera}}
                    style={{width: '100%', height: '100%', borderRadius: 5}}
                  />
                ) : (
                  <Image
                    source={{uri: ImgForBack}}
                    style={{width: '100%', height: '100%', borderRadius: 5}}
                  />
                )}
              </View>
            )}
          </View>

     

          <Text style={{...styles.qut1}}>Upload Self-Taken Photo</Text>
          {/* Upload Self Photo*/}

          {ImgForSelfie == '' && ImgForSelfie2 == '' ? (
            <LinearGradient
              colors={['#4568DC', '#B06AB3']}
              style={{...styles.view3}}>
              <View style={{marginTop: 20}}>
                <View style={{...styles.view2}}>
                  <TouchableOpacity
                    activeOpacity={0.1}
                    onPress={() => {
                      modal3Ref.current.toggleModal();
                    }}>
                    <Entypo name="camera" size={24} style={{...styles.icon}} />
                  </TouchableOpacity>
                </View>
                <Text style={{...styles.txt}}>Upload Photo</Text>
              </View>
            </LinearGradient>
          ) : (
            <View style={{...styles.view3}}>
              <TouchableOpacity
                onPress={() => {
                  setImgForSelfie('');
                  setImgForSelfie2('');
                }}
                style={{position: 'absolute', zIndex: 2, margin: 5}}>
                <Entypo name="cross" size={24} />
              </TouchableOpacity>

              {ImgForSelfie != '' ? (
                <Image
                  source={{uri: ImgForSelfie}}
                  style={{width: '100%', height: '100%', borderRadius: 5}}
                />
              ) : (
                <Image
                  source={{uri: ImgForSelfie2}}
                  style={{width: '100%', height: '100%', borderRadius: 5}}
                />
              )}
            </View>
          )}
    
          {/* Text Input*/}
          {show ? (
            <ActivityIndicator />
          ) : (
            <TouchableOpacity
              style={{
                height: '4%',
                alignSelf: 'center',
                justifyContent: 'center',
                borderRadius: 5,

                width: '90%',
                marginTop: 5,
                alignSelf: 'center',
              }}
              onPress={check}
              // onPress={()=> SubmitForm()}
            >
              <LinearGradient
                colors={['#4568DC', '#B06AB3']}
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  Apply
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </ScrollView>
      </ImageBackground>

      <HomeModal
        view={
          <View
            style={{
              backgroundColor: 'black',
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
                  onPress={() => {
                    setselectPkBtn(item.name);
                    setselectPkBtnA(index);

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
              backgroundColor: 'black',
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
                    setselectPkBtn(item.name);
                    setselectPkBtnA(index);
                    if (index == 0) {
                      ChooseFromGallery02();
                      modal2Ref.current.toggleModal();
                    } else if (index === 1) {
                      ChooseFromCamera02();
                      modal2Ref.current.toggleModal();
                    }
                  }}>
                  <Entypo
                    name={item.icon}
                    size={22}
                    color={'black'}
                    style={
                      selectPkBtnA == index && {
                        color: '#B06AB3',
                      }
                    }
                  />
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
              backgroundColor: 'black',
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
                    setselectPkBtn(item.name);
                    setselectPkBtnA(index);
                    if (index == 0) {
                      ChooseFromGallery01();
                      modal1Ref.current.toggleModal();
                    } else if (index === 1) {
                      ChooseFromCamera01();
                      modal1Ref.current.toggleModal();
                    }
                  }}>
                  <Entypo
                    name={item.icon}
                    size={22}
                    color={'black'}
                    style={
                      selectPkBtnA == index && {
                        color: '#B06AB3',
                      }
                    }
                  />
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
        ref={modal1Ref}
      />

      <HomeModal
        view={
          <View
            style={{
              backgroundColor: 'black',
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
                    setselectPkBtn(item.name);
                    setselectPkBtnA(index);
                    if (index == 0) {
                      ChooseFromGallery1();
                      modal3Ref.current.toggleModal();
                    } else if (index === 1) {
                      ChooseFromCamera1();
                      modal3Ref.current.toggleModal();
                    }
                  }}>
                  <Entypo
                    name={item.icon}
                    size={22}
                    color={'black'}
                    style={
                      selectPkBtnA == index && {
                        color: '#B06AB3',
                      }
                    }
                  />
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
        ref={modal3Ref}
      />
    </SafeAreaView>
  );
};

export default Apply_Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#303749',
    height: 46,
  },
  headertxt: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 10,
    alignSelf: 'center',
  },
  picker_view: {
    height: hp(6),
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#303749',
    borderColor: '#535C73',
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    // marginBottom: '3%',
    width: '90%',
  },
  country: {
    color: '#ffff',
    marginHorizontal: '2%',
    top: 2,
    fontSize: 16,
  },
  redtxt: {
    color: '#FC466B',
    fontSize: 13,
    fontWeight: '500',
    left: 28,
    top: 5,
  },
  qut: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
    top: 24,
    left: 10,
  },
  view: {
    height: 130,
    // position: "absolute",
    width: '48%',
    backgroundColor: '#f54e7e',
    marginHorizontal: 2,
    borderRadius: 5,
    marginTop: 30,
  },
  view2: {
    height: 40,
    position: 'absolute',
    width: 40,
    backgroundColor: '#575F76',
    borderRadius: 30,
    marginTop: 36,
    alignSelf: 'center',
  },
  icon: {
    marginTop: 8,
    color: '#C6C6C6',
    alignSelf: 'center',
  },
  upload: {
    color: '#C6C6C6',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    top: 80,
  },
  txt: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    top: 80,
  },
  view3: {
    height: 180,
    width: '98%',
    backgroundColor: '#303749',
    borderRadius: 5,
    marginTop: 30,
    alignSelf: 'center',
  },
  qut1: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
    left: 10,
    top: 26,
  },
  qut3: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
    left: 12,
    top: 5,
  },
  radio: {
    flexDirection: 'row',
    // marginLeft: "22%",
    marginTop: '4%',
    alignItems: 'center',
  },
  radiotxt: {
    marginLeft: 5,
    color: 'black',

    fontSize: 12,
  },
  qut2: {
    color: '#FC466B',
    fontSize: 12,
    fontWeight: '500',
    left: 20,
    top: 10,
  },
  radio1: {
    flexDirection: 'row',
    // marginLeft: "22%",
    marginTop: '4%',
  },
  CountryButton: {
    color: 'black',
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
