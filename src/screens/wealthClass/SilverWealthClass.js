import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useRef, useState, useCallback} from 'react';
import LeftArrow from 'react-native-vector-icons/MaterialIcons';
import {ScrollView} from 'react-native-gesture-handler';
import ExclusivePriviledge from './components/ExclusivePriviledge';
import ClassPriviledge from './components/ClassPriviledge';
import WealthCertification from './components/WealthCertification';
import RBSheet from 'react-native-raw-bottom-sheet';
import Mount from './components/Mount';
import ChatBubble from './components/ChatBubble';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {ApiCallToken} from '../../Services/Apis/index';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Month = [
  {
    id: 1,
    name: '1 month',
  },
  {
    id: 2,
    name: '3 month',
  },
  {
    id: 3,
    name: '6 month',
  },
  {
    id: 4,
    name: '12 month',
  },
  {
    id: 5,
    name: 'Recurring Subscription',
  },
];

const SilverWealthClass = ({data}) => {
  const [selectPkBtn, setselectPkBtn] = useState(0);
  const refRBSheet = useRef();
  const [Gift, setGift] = useState('Gift to a friend');
  const [vipDuration, setVipDuration] = useState();
  const userData = useSelector(state => state.auth.userData);
  const [show, setShow] = useState(true);
  const [monthBeans, setMonthBeans] = useState();
  const [vipID, setVipID] = useState();


  const ApplyForVip = async () => {
    try {
      const paramsBody = {
        id: 1,
        month: 1,
        beans: monthBeans,
      };

      const res = await ApiCallToken({
        params: userData.token,
        paramsBody: paramsBody,
        route: 'search',
        verb: 'POST',
      });
    } catch (e) {
      console.log('user vip updating error ', e.toString());
    }
  };

  const GetVipDuration = async () => {
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'get-vip',
        verb: 'GET',
      });
      setVipDuration(res[0]?.vip_duration);
      setShow(false);
      // setGettingGiftsArray(res);
    } catch (e) {
      console.log('saga login error -- ', e.toString());
    }
  };

  useFocusEffect(
    useCallback(() => {
      GetVipDuration();
    }, []),
  );
  return (
    <ScrollView style={{height: '86%'}}>
      <ExclusivePriviledge
        img={require('../../assets/images/wealthClass/silver.png')}
        mainColor={['#303749', '#303749']}
        exclusiveColor={['#646567', '#C7CACD']}
      />
      <ClassPriviledge
       data={data}
      />
      <WealthCertification
        profileImg={require('../../assets/images/wealthClass/profile.jpg')}
        userName={'James'}
        namePlateImage={require('../../assets/images/wealthClass/nameplate.png')}
        badgeImg={require('../../assets/images/wealthClass/badge.png')}
        posts="100"
        followers="400"
        followings="200"
      />

      {show ? (
        <ActivityIndicator />
      ) : (
        <View>
          <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            style={{
              backgroundColor: 'red',
              padding: 15,
              marginHorizontal: 20,
              borderRadius: 10,
              marginTop: 20,
            }}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 18}}>
              Buy Now
            </Text>
          </TouchableOpacity>

          <View>
            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={false}
              customStyles={{
                wrapper: {
                  backgroundColor: 'transparent',
                },
                draggableIcon: {
                  backgroundColor: '#000',
                  height: 0,
                },
                container: {
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  backgroundColor: '#31384A',
                },
              }}>
              <View style={{flex: 1, backgroundColor: '#31384A'}}>
                {Gift == 'Gift to a friend' ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottomWidth: 0.2,
                      borderColor: 'white',
                    }}>
                    <View style={{flexDirection: 'row', bottom: 5}}>
                      <Text style={{color: 'white', fontSize: 12, left: 5}}>
                        Account ID:
                      </Text>
                      {Gift == 'Gift to a friend'}
                      <Text style={{color: 'white', fontSize: 12, left: 5}}>
                        12345678990
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        setGift('Sure');
                      }}
                      style={{
                        backgroundColor: 'orange',
                        right: 5,
                        padding: 4,
                        borderRadius: 20,
                        bottom: 5,
                      }}>
                      <Text style={{fontSize: 11}}>{Gift}</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottomWidth: 0.2,
                      borderColor: 'white',
                    }}>
                    <View style={{flexDirection: 'row', bottom: 5}}>
                      <Text style={{color: 'white', fontSize: 12, left: 5}}>
                        Account ID:
                      </Text>

                      <TextInput
                        placeholder="Enter Id"
                        keyboardType={'numeric'}
                        placeholderTextColor="orange"
                        style={{
                          borderWidth: 0.3,
                          padding: 0,
                          marginLeft: 15,
                          width: '50%',
                          bottom: 2,
                          height: 22,
                          paddingLeft: 5,
                          borderColor: 'orange',
                          color: 'white',
                        }}
                      />
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        setGift('Gift to a friend');
                        alert('Gift Successfully send');
                      }}
                      style={{
                        backgroundColor: 'orange',
                        right: 5,
                        padding: 4,
                        borderRadius: 20,
                        bottom: 5,
                        width: '15%',
                        alignItems: 'center',
                      }}>
                      <Text style={{fontSize: 11}}>{Gift}</Text>
                    </TouchableOpacity>
                  </View>
                )}

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 5,
                  }}>
                  <Text style={{color: 'white'}}>Lease Period</Text>
                  <AntDesign
                    name="questioncircleo"
                    color={'white'}
                    style={{marginLeft: 6}}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',

                    width: '100%',
                    flexWrap: 'wrap',
                  }}>
                  {vipDuration.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        setselectPkBtn(index);
                        setMonthBeans(item.beans);
                        setVipID(item.id);
                      }}>
                      <Text
                        style={[
                          styles.monthbtn,
                          selectPkBtn == index && {
                            borderColor: 'orange',
                            color: 'orange',
                          },
                        ]}>
                        {/* {item.name} */}
                        {item.month}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View
                  style={{flexDirection: 'row', marginLeft: 15, marginTop: 5}}>
                  <Text style={{color: 'white'}}>price:</Text>
                  <Text style={{color: 'orange'}}>{monthBeans}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => ApplyForVip()}
                  style={{
                    backgroundColor: 'orange',
                    padding: 10,
                    marginHorizontal: 70,
                    borderRadius: 20,
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <Text style={{color: 'white'}}>Active</Text>
                </TouchableOpacity>
              </View>
            </RBSheet>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default SilverWealthClass;

const styles = StyleSheet.create({
  monthbtn: {
    color: 'white',
    color: 'white',
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#31384A',
    marginHorizontal: 12,
    marginTop: '8%',
    borderWidth: 1,
    alignSelf: 'center',
    borderColor: 'white',
  },
});
