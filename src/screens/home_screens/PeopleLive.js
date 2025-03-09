import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import CrossIcon from 'react-native-vector-icons/Entypo';
import PlusIcon from 'react-native-vector-icons/AntDesign';
import MessageIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import OptionIcon from 'react-native-vector-icons/Octicons';
import SpeakerIcon from 'react-native-vector-icons/MaterialIcons';
import GameIcon from 'react-native-vector-icons/Ionicons';
import PhoneIcon from 'react-native-vector-icons/Feather';
import StarIcon from 'react-native-vector-icons/AntDesign';
import GiftIcon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
const PeopleLive = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.profilecontainer}>
        <View style={styles.profilebox}>
          <Image
            source={require('../../assets/images/party.jpg')}
            style={styles.profile}
          />
          <View style={styles.txtbox}>
            <Text style={styles.name}>Jame Olivia</Text>
            <Text style={styles.id}>ID:123456789</Text>
          </View>
          <TouchableOpacity>
            <View style={styles.flowbox}>
              <PlusIcon
                name="plus"
                size={20}
                style={styles.heartIcon}
                color={'white'}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.rightbox}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/img1.png')}
              style={styles.img}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.noTxt}>256</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <CrossIcon name="cross" size={34} style={styles.crossIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.Likebox}>
        <TouchableOpacity
        //   onPress={() => {
        //     modal2Ref.current.toggleModal();
        //   }}
        >
          <View style={styles.Kbox}>
            <Image
              source={require('../../assets/images/coin.png')}
              style={{height: 16, width: 16, marginRight: 2}}
            />
            <Text style={styles.Ktxt}>10.5k</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
        //   onPress={() => {
        //     modalRef.current.toggleModal();
        //   }}
        >
          <View style={styles.Starbox}>
            <StarIcon
              name="star"
              color={'yellow'}
              size={15}
              style={{marginRight: 2}}
            />
            {/* <Text style={styles.Startxt}>06 Stars</Text> */}
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.ImgsBox}>
        <View
          style={{
            flexDirection: 'row',
            bottom: 20,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            left: 0,
            zIndex: 1,
            width: '50%',
          }}>
          <StarIcon
            name="star"
            size={15}
            color={'white'}
            style={{backgroundColor: 'red', borderRadius: 15, padding: 6}}
          />
          <Text style={{color: 'white', paddingLeft: 2}}>1130</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            bottom: 20,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: 0,
            zIndex: 1,
            width: '50%',
          }}>
          <StarIcon
            name="star"
            size={15}
            color={'white'}
            style={{backgroundColor: 'green', borderRadius: 15, padding: 6}}
          />
          <Text style={{color: 'white', paddingLeft: 2}}>1130</Text>
        </View>
        <Image
          source={require('../../assets/images/man.jpg')}
          style={styles.ImgStyle}
        />
        <Image
          source={require('../../assets/images/man.jpg')}
          style={styles.ImgStyle1}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: widthPercentageToDP('100%'),
          bottom: 5,
        }}>
        <Text
          style={{
            borderBottomWidth: 12,
            height: '0%',
            width: widthPercentageToDP('50%'),
            borderColor: '#E92F24',
          }}></Text>
        <Text
          style={{
            borderBottomWidth: 12,
            height: '0%',
            width: widthPercentageToDP('50%'),
            borderColor: '#1AB846',
          }}></Text>
      </View>
      <View style={styles.commentcontainer}>
        <View style={styles.commentbox}>
          <Text style={styles.LvIcon}>Lv.09</Text>
          <Text style={styles.commenttxt}>arsslan gujjar: hi</Text>
        </View>
        <View style={styles.commentbox}>
          <Text style={styles.LvIcon}>Lv.09</Text>
          <Text style={styles.commenttxt}>arsslan gujjar: kya hal hy</Text>
        </View>
        <View style={styles.commentbox}>
          <Text style={styles.LvIcon}>Lv.09</Text>
          <Text style={styles.commenttxt}>
            john Smith: @Imran Khan welcome to my room
          </Text>
        </View>
      </View>
      <View style={styles.bottombox}>
        <View style={styles.lefticonsbox}>
          <TouchableOpacity style={styles.icon1box}>
            <MessageIcon
              name="message-text-outline"
              size={25}
              style={styles.icon1}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon1box}
            // onPress={() => refRBSheetOptions.current.open()}
          >
            <OptionIcon name="three-bars" size={22} style={styles.icon1} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.icon1box}>
            <SpeakerIcon name="settings-voice" size={25} style={styles.icon1} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon1box}
            // onPress={() => refRBSheet.current.open()}
          >
            <GameIcon
              name="md-game-controller-outline"
              size={25}
              style={styles.icon1}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon1box}>
            <PhoneIcon name="phone" size={25} style={styles.icon1} />
          </TouchableOpacity>
        </View>
        <View style={styles.righticonsbox}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              //   onPress={() => refRBSheetGifts.current.open()}
              style={[styles.icon2box, {backgroundColor: 'purple'}]}>
              <GiftIcon name="gift" size={25} style={styles.giftIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              //   onPress={() => refRBSheet1.current.open()}
              style={[styles.icon2box, {backgroundColor: 'red'}]}>
              <Text style={styles.PK}>PK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242A38',
  },
  profilecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  txtbox: {
    marginLeft: 3,
  },
  id: {
    color: 'white',
    fontSize: 12,
  },
  name: {
    color: 'white',
    fontSize: 12,
  },
  profilebox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 30,
    marginHorizontal: 5,
    alignItems: 'center',
    paddingRight: 5,
    paddingLeft: 2,
  },
  profile: {
    height: 35,
    width: 35,
    borderRadius: 25,
  },
  crossIcon: {
    color: 'white',
    right: 2,
  },
  flowbox: {
    marginLeft: 10,
    backgroundColor: 'red',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
  },
  rightbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noTxt: {
    marginHorizontal: 5,
    backgroundColor: 'rgba(0,0,0,0.2)',
    color: 'white',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 25,
  },
  img: {
    height: 40,
    width: 40,
    borderRadius: 25,
  },
  Likebox: {
    flexDirection: 'row',
    marginLeft: 5,
  },
  Kbox: {
    backgroundColor: 'red',
    paddingHorizontal: 5,
    borderRadius: 15,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  Ktxt: {
    color: 'white',
    fontSize: 11,
  },
  Starbox: {
    backgroundColor: 'green',
    paddingHorizontal: 5,
    borderRadius: 15,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  Startxt: {
    color: 'white',
    fontSize: 11,
  },
  ImgsBox: {
    flexDirection: 'row',
    width: widthPercentageToDP('100%'),
    paddingTop: 15,
  },
  ImgStyle: {
    width: widthPercentageToDP('50%'),
    height: heightPercentageToDP(45),
  },
  ImgStyle1: {
    width: widthPercentageToDP('50%'),
    height: heightPercentageToDP(45),
  },
  commentcontainer: {
    position: 'absolute',
    bottom: '17%',
    width: '70%',
  },
  commentbox: {
    marginVertical: 5,
    marginLeft: 10,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 25,
    alignItems: 'flex-start',
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  commenttxt: {
    color: '#FFFFFF',
    alignSelf: 'flex-start',
  },
  LvIcon: {
    color: 'white',
    backgroundColor: 'orange',
    borderRadius: 25,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    height: 17,
    justifyContent: 'center',
    fontSize: 11,
    top: 2,
  },
  bottombox: {
    position: 'absolute',
    bottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  lefticonsbox: {
    flexDirection: 'row',
    width: '70%',
  },
  icon1box: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  icon1: {
    color: '#FFFFFF',
  },
  righticonsbox: {
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'flex-end',
    right: 5,
  },
  icon2box: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  giftIcon: {
    color: 'yellow',
    marginHorizontal: 4,
  },
  PK: {
    color: 'white',
    fontWeight: '500',
  },
});
export default PeopleLive;
