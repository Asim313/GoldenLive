import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, { useEffect, useState } from 'react';
import SpeakerIcon from 'react-native-vector-icons/MaterialIcons';
import StickerIcon from 'react-native-vector-icons/Entypo';
import FlipCameraIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';

const Call = ({onPressAPllyBtn, flipCamera, camera, handleCamera, isMicOn, handleMicButton, inCall}) => {
  
  const [menuVisible, setMenuVisible] = useState(false);

  const myIcon = (
    <FlipCameraIcon
      name="camera-flip-outline"
      size={25}
      style={styles.IconStyle}
    />
  );



  return (
    <View style={{ flex: 1, justifyContent:'center', alignItems:'center'}}>
      <View style={styles.callBox}>
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.btnBox} onPress={() => onPressAPllyBtn(inCall)}>
            <Text style={styles.btnTxt}>{!inCall ? 'End Call' : 'Apply'}</Text>
          </TouchableOpacity>
        </View>

        {menuVisible && (
            <View style={{ position: 'absolute',  left: "15%", top: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)', borderRadius: 4, padding: 8 }}>
              <TouchableOpacity onPress={handleCamera} style={styles.row}>
              <MaterialIcons
                      name= {camera ? "camera-outline" : "camera-off-outline"}
                      size={22}
                      style={styles.IconStyle}
                    />
              <Text style={{color: 'white'}}>Turn Off Camera</Text>
             
              </TouchableOpacity>
              <TouchableOpacity onPress={flipCamera} style={styles.row}>
                    <FlipCameraIcon
                      name="camera-flip-outline"
                      size={22}
                      style={styles.IconStyle}
                    />
              <Text style={{color: 'white'}}>Flip Camera</Text>
              </TouchableOpacity>
            </View>
          )}
       
        <View style={styles.IconView}>

          <View style={{}}>
      
          <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} style={styles.IconStyleBox}>
            {/* <OptionsMenu
              customButton={myIcon}
              destructiveIndex={1}
              options={[`Turn Off Camera`, 'Flip Camera']}
              //   actions={[Nav, Logout]}
            /> */}
            <FlipCameraIcon
              name="camera-flip-outline"
              size={25}
              style={styles.IconStyle}
            />
          </TouchableOpacity>
      
          </View>

          <TouchableOpacity onPress={handleMicButton} style={styles.IconStyleBox}>
          <Feather name= {isMicOn ? "mic" : "mic-off"} size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.IconStyleBox}>
            <StickerIcon
              name="emoji-happy"
              size={22}
              style={styles.IconStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Call;

const styles = StyleSheet.create({
  row : {
    flexDirection: 'row',
     alignItems: 'center',
     marginBottom: 12
  },
  mainImg: {
    height: heightPercentageToDP('100%'),
    width: widthPercentageToDP('100%'),
  },
  callBox: {
    position: 'relative',
  },
  btnView: {
    width: widthPercentageToDP('100%'),
  },
  btnBox: {
    backgroundColor: 'red',
    width: widthPercentageToDP('75%'),
    alignSelf: 'center',
    borderRadius: 25,
  },
  btnTxt: {
    color: 'white',
    textAlign: 'center',
    paddingVertical: 12,
    fontWeight: '500',
  },
  IconView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: heightPercentageToDP('2%'),
    marginHorizontal: widthPercentageToDP('1%'),
  },
  IconStyleBox: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  IconStyle: {
    color: 'white',
    
  },
  callImgBox: {
    alignItems: 'flex-end',
    marginRight: 15,
    bottom: heightPercentageToDP('7%'),
  },
  callImg: {
    height: heightPercentageToDP('15%'),
    width: widthPercentageToDP('28%'),
    marginVertical: heightPercentageToDP('0.6%'),
    borderRadius: 5,
  },
});
