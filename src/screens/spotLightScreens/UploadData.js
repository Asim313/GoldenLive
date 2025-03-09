import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AllIcons from '../../components/AllIcons';
// import AllIcons from '../AllIcons';
// AllIcons
import {useSelector} from 'react-redux';
import ImageCropPicker from 'react-native-image-crop-picker';
import CategoryBotton from './categoryBotton/CategoryBotton';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import { ApiCallFormData } from '../../Services/Apis';

const UploadData = () => {
  // const [localImage,setLocalImage] = useState('../../assets/images/badgee1.png')

  const [text, setText] = useState();
  const [text2, setText2] = useState();

  // console.log('This is Media Url', mediaUri)
  // console.log('This is Media Url', localImage);
  // console.log('This is Media Url', video)

  const handleTextChange = inputText => {
    if (inputText.length <= 100) {
      setText(inputText);
    }
  };
  const handleTextChange2 = inputText => {
    if (inputText.length <= 100) {
      setText2(inputText);
    }
  };
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);
  const [img, setimg] = useState(null);
  const [video, setVideo] = useState(null);
  const [imgType, setImgType] = useState('');
  const [videoType, setVideoType] = useState('');
  const [uploadingData, setUploadingData]  = useState(false);
  const userData = useSelector(state => state.auth.userData);

  const ChooseFromGallery = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('PATH IS =>>>>>', image?.mime);
      setImgType(image.mime);
      setimg(image.path);
    });
  };

  const ChooseVideoFromGallery = () => {
    ImageCropPicker.openPicker({
      mediaType: 'video',
    }).then(video => {
      console.log('videooooooooo1111111', video);
      setVideoType(video.mime);
      setVideo(video.path);
    });
  };

  const UpdateUserProfile = async () => {
    // console.log(
    //   'Image Path sending to DataBase',
    //   img == null ? userUpdatedData?.image : img,
    // );
    try {
      if(!img || !video) {
        Alert.alert("Please select image and video.")
      } else {
      setUploadingData(true)
      let formData = new FormData();
      formData.append('spot_light_image', {
        uri: img == null ? userUpdatedData?.image : img,
        name: 'profile.jpg',
        fileName: 'profile',
        type: imgType,
      });
      formData.append('video', {
        uri: video,
        name: 'video.mp4',
        fileName: 'video',
        type: 'video/mp4',
      });
      formData.append('full_name', userUpdatedData?.full_name);
      formData.append('category_name', 2);
      formData.append('introduction', text);
      formData.append('contact_info', text2);

     
      const res = await ApiCallFormData({
        params: userData.token,
        paramsBody: formData,
        route: 'spot/light/data',
        verb: 'POST',
      });

      setUploadingData(false)
       console.log("yessssssss", res)
       Alert.alert('' + res?.message)
      }
    } catch (e) {
      console.log('Error in spotlight send  -- ', e.toString());
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.headerView}>
        <AllIcons
          name={'Ionicons'}
          iconName="chevron-back-outline"
          size={25}
          color="black"></AllIcons>
        <Text style={styles.headerText}>Uplaod Verification Materials</Text>
      </View>
      <ImageBackground
        source={require('../../assets/images/SpotLightImages/background.png')}
        style={{flex: 1}}>
        <ScrollView>
          <View style={styles.topText}>
            <AllIcons
              name={'Ionicons'}
              iconName="medical-outline"
              color="red"
              size={8}></AllIcons>
            <Text style={{paddingLeft: 10}}>
              Talent Category:{' '}
              <Text style={{fontWeight: 'bold', color: 'black'}}>
                Selected Skilled
              </Text>
            </Text>
          </View>

          <View style={styles.videoView}>
            <AllIcons
              name={'Ionicons'}
              iconName="medical-outline"
              color="red"
              size={8}></AllIcons>
            <Text style={styles.videoText}>Star Video</Text>
          </View>

          <View style={{paddingLeft: 20}}>
            <TouchableOpacity onPress={() => ChooseVideoFromGallery()}>
              <LinearGradient
                colors={['#FFE266', '#FFBB2D']}
                style={styles.linearGradient}>
                {video ? (
                    <View>
                      {/* <Text>hello</Text> */}
                      <Image source={{ uri: video }} style={styles.linearGradient} />
                    </View>
              ) : 
                <AllIcons
                  name={'Ionicons'}
                  iconName="add-outline"
                  size={60}
                  color="#C78B0B"></AllIcons>
              }
              </LinearGradient>
            </TouchableOpacity>
            <Text style={{paddingRight: 30, color: 'black'}}>
              Uplaod a short video clip showiing off your unique style no longer
              than 3 minutes and/or 100M size
            </Text>
          </View>

          <View style={styles.videoView}>
            <AllIcons
              name={'Ionicons'}
              iconName="medical-outline"
              color="red"
              size={8}></AllIcons>
            <Text style={styles.videoText}>Introduction:</Text>
          </View>

          <View style={{paddingLeft: 20}}>
            <LinearGradient
              colors={['#FFE266', '#FFBB2D']}
              style={styles.linearText}>
              <TextInput
              placeholder='Please provide a brief introduction about yourself'
                value={text}
                onChangeText={handleTextChange}
                maxLength={100}
                multiline></TextInput>
              <View
                style={{
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  flex: 1,
                  padding: 10,
                }}></View>
            </LinearGradient>
          </View>

          <View style={{paddingLeft: 20, top: 20, paddingBottom: 20}}>
            <TouchableOpacity onPress={() => ChooseFromGallery()}>
              <LinearGradient
                colors={['#FFE266', '#FFBB2D']}
                style={styles.linearGradient}>
                  {img ? (
                    <View>
                      {/* <Text>hello</Text> */}
                      <Image source={{ uri: img }} style={styles.linearGradient} />
                    </View>
              ) : 
                <AllIcons
                  name={'Ionicons'}
                  iconName="add-outline"
                  size={60}
                  color="#C78B0B"></AllIcons>
              }
              </LinearGradient>
            </TouchableOpacity>
            <Text style={{paddingRight: 30, color: 'black'}}>
              Tell us about yourself and the star we are helping to be born.
            </Text>
          </View>

          <View style={styles.videoView}>
            <AllIcons
              name={'Ionicons'}
              iconName={'medical-outline'}
              color="red"
              size={8}></AllIcons>
            <Text style={{paddingLeft: 10, fontWeight: 'bold', color: 'black'}}>
              Contact Info:
            </Text>
          </View>

          <View style={{paddingLeft: 20, paddingBottom: 20}}>
            <LinearGradient
              colors={['#FFE266', '#FFBB2D']}
              style={styles.bottomLinear}>
              <TextInput
                placeholder="Let us know how we  can  get in touch with you"
                multiline
                onChangeText={handleTextChange2}
                numberOfLines={null}></TextInput>
            </LinearGradient>
          </View>

          {uploadingData ? 
          <View style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
            <ActivityIndicator size="small" color={'red'}/>
            <Text style={{color: 'black', fontWeight: 'bold'}}>Uploading Data...</Text>
          </View>
         :
          <TouchableOpacity
            style={{padding: 20}}
            onPress={() => {
              UpdateUserProfile();
            }}>
            <CategoryBotton />
          </TouchableOpacity>
        }
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default UploadData;

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#E3A542',
  },
  headerText: {
    fontSize: 20,
    color: 'black',
    paddingLeft: 5,
    fontWeight: '600',
  },
  topText: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    padding: 10,
  },
  videoView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    padding: 10,
  },
  videoText: {
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 10,
  },
  linearGradient: {
    width: 280,
    height: 140,
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearText: {
    width: 315,
    height: 140,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'grey',
    paddingLeft: 10,
  },
  bottomLinear: {
    width: 315,
    height: 140,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'grey',
    paddingLeft: 10,
  },
});
