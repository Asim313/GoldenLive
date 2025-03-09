import React, {memo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AllIcons, {IconList} from './AllIcons';
import { Switch } from './switchTest';
import RbSheetComponent from '../screens/reuseable_Component/RbSheetComponent';
import RoomLists from './RoomManagerAndBlackListRecords';
import { useDispatch, useSelector } from 'react-redux';
import { channelSettings, unlockRoom } from '../Services/ApisCall';
import ImagePicker from 'react-native-image-crop-picker';
import { ApiCallFormData } from '../Services/Apis';
import database from '@react-native-firebase/database';
import { updatedData } from '../Redux/Actions';

const RoomSettings = memo(({channelName}) => {

  const userData = useSelector(state => state.auth.userData);
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);
  const [roomTitle, setRoomTitle] = useState(userUpdatedData?.audio_title ?? null)
  const [password, setPassword] = useState(userUpdatedData?.room_password ?? null)
  const userListRef = useRef()
  const [isManagerList, setIsManagerList] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const dispatch = useDispatch()

  const data = [
    {id: 1, name: 'Theme',},
    {id: 3, name: 'Room Effect', type: 'switch'},
    {id: 4, name: 'Gift Record', type: 'switch'},
    {id: 2, name: 'Open The Chat Zone', type: 'switch'},
    {id: 5, name: 'Room Manager'},
    {id: 6, name: 'Room Blacklist'},
    {id: 7, name: 'Room Tips'},
  ];

  const SwitchCode = () => {
  return  (
  <View>
   
    </View>)
  }

  const [img, setimg] = useState(userUpdatedData?.image);
  const [imgType, setImgType] = useState('');
  const ChooseFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('PATH IS =>>>>>', image.path, image?.mime);
      setImgType(image.mime);
      setimg(image.path);
      if(image?.path) {
        UpdateUserProfile()
      }
    });
  };


  const UpdateUserProfile = async () => {
    setIsLoading(true)
    try {
      let formData = new FormData();
      formData.append('custom_theme', {
        uri:  img,
        name: 'profile.jpg',
        fileName: 'profile',
        type: imgType,
      });
    

       console.log("Form Image",img)

      const res = await ApiCallFormData({
        params: userData.token,
        paramsBody: formData,
        route: 'custom-theme',
        verb: 'POST',
      });

      console.log("ressssssssssss", res)
      if (res?.code === 200) {
        addJoinCallToFirebase(res?.data)
        alert('Theme uploaded successfully')
        console.log("ressssssssssss", res)
      } else {
        alert(res?.custom_theme?.[0] ?? 'Try again or later' + '')
      }
      setIsLoading(false)
    } catch (e) {
      console.log('Error is -- ', e.toString());
    }
  };

  const addJoinCallToFirebase = (themeImage) => {
    database()
      .ref(`/multiRoom/${channelName}`)
      .update({
        theme: themeImage,
      })
  };

  const handleSaveBtn = async () => {
      try {
        setIsLoading(true)
        if(roomTitle) {
          if(password) {
            const res = await channelSettings({token: userData?.token, title: roomTitle.toString(), password: password})
            console.log("logaaaaaaaaaaaaaa", res)
          } else {
            const res = await unlockRoom({token: userData?.token})
            console.log("unlock", res)
          }
        } else {
          alert("Enter room title")
        }
        dispatch(updatedData(userData));
         setIsLoading(false)
      } catch (error) {
        console.log('HostERROR IS user/host-updated-data ====>>>', error);
      }
  }

  return (
    <View style={styles.mainContainer}>
         {isLoading ?  
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator />
          </View>
         : 
         
         <>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20, marginHorizontal: 10}}>
            
        <AllIcons
                    name={IconList.AntDesign}
                    iconName={'left'}
                    size={18}
                    color={'black'}
                  />
            <Text style={styles.settingtxt}>Room Settings</Text>
            <TouchableOpacity onPress={handleSaveBtn}>
               <Text style={{fontSize: 16, color: '#FFA800', fontWeight: '500'}}>Save</Text>
            </TouchableOpacity>
        </View>
      <View style={{height: heightPercentageToDP(60)}}>
        <View style={styles.txtInputContainer}>
          <Text style={[styles.fontStyle, {flex: 0.5}]}>Room Name</Text>
          <TextInput
            style={styles.inputTxtStyle}
            placeholderTextColor={'silver'}
            onChangeText={setRoomTitle}
            placeholder="Enter room name"
            value={roomTitle?.toString()}
          />
        </View>

        <View style={styles.txtInputContainer}>
          <Text style={[styles.fontStyle, {flex: 0.5}]}>Password</Text>
          <TextInput
            style={styles.inputTxtStyle}
            placeholderTextColor={'silver'}
            onChangeText={setPassword}
            placeholder="Enter room password"
            value={password?.toString()}
          />
        </View>

        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          contentContainerStyle={{flex: 1, alignItems: 'center', marginHorizontal: 10}}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={styles.renderViewStyle}
                onPress={() => {
                  if (item?.name === 'Room Blacklist') {
                      setIsManagerList(false)
                      userListRef.current.open()
                    } else if (item?.name === 'Room Manager') {
                      setIsManagerList(true)
                    userListRef.current.open()
                  } else if (item?.name === 'Theme') {
                    ChooseFromGallery()
                  } else if (item?.name === 'Send gift') {
                  } else if (item?.name === 'Cancel') {
                  } else if (
                    item?.name === 'Mute mic' ||
                    item?.name === 'Unmute mic'
                  ) {
                  } else if (item?.name === 'Remove from admin') {
                  }
                }}>
                <Text style={styles.fontStyle}>{item?.name}</Text>
                {item?.type === 'switch' ? 
                <SwitchCode />
                :
                <View style={styles.back_icon}>
                  <AllIcons
                    name={IconList.AntDesign}
                    iconName={'right'}
                    size={12}
                    color={'white'}
                  />
                </View>
                }
              </TouchableOpacity>
            );
          }}
        />
      </View>
      
      </>
}
      <RbSheetComponent
              view={
                <RoomLists isManagerList={isManagerList} channelName={channelName} />
              }
              backgroundColor={'transparent'}
              refUse={userListRef}
              close={false}
              height={heightPercentageToDP(100)}
            />
    </View>
  );
});

export default RoomSettings;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white',
  },
  fontStyle: {
    color: 'black',
    fontSize: 15,
  },
  renderViewStyle: {
    marginHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBD9D9',
    width: widthPercentageToDP(95),
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  
  },
  txtInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBD9D9',
    width: widthPercentageToDP(100),
  },
  inputTxtStyle: {fontSize: 14, color: 'grey', flex: 1},
  back_icon: {
    backgroundColor: '#FFA800',
    borderRadius: 50,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: 16,
  },
  settingtxt: {
    fontSize: 19,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
});
