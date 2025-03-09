import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import LeftArrow from 'react-native-vector-icons/MaterialIcons';
import Card from 'react-native-vector-icons/FontAwesome5';
import RoundArrow from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import DropDownArrow from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {ApiCallToken} from '../../Services/Apis';
import HomeModal from '../reuseable_Component/HomeModal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {UserProfileContext} from '../../context/userProfile';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {
  WaveIndicator,
} from 'react-native-indicators';

const modal2Ref = React.createRef();
const WithdrawMethod = ({route}) => {
  const navigation = useNavigation();
  const userData = useSelector(state => state.auth.userData);
  const {userInfo} = useContext(UserProfileContext);
  const [selectPkBtn, setselectPkBtn] = useState(userInfo.region);
  const [selectPkBtnA, setselectPkBtnA] = useState(userInfo.region);
  const [Regions, setRegions] = useState([]);
  const [show, setshow] = useState(false);

  useEffect(() => {
    GetPaymentDetails();
  }, []);
  const {amount, fromBeansScreen} = route.params;

  const PayMentMethod = () => (
    <>
      {Regions.map((item, index) => (
        <>
          {item.name == selectPkBtn && (
            <>
              {item.withdraw_method.map((item, index) => (
                <View
                  style={{
                    marginTop: 20,
                    borderBottomColor: '#303749',
                    borderBottomWidth: 1,
                    height: 60,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: 15,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      {/* <View>
        <Image
          source={require('../../assets/images/easypaisa.png')}
          resizeMode="cover"
          style={{ height: 15, width: 100 }}
        />
      </View> */}
                      <View style={{marginLeft: 10}}>
                        <Text
                          style={{
                            fontSize: 15,
                            color: 'black',
                            fontWeight: 'bold',
                          }}>
                          {item.method_name}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5,
                          }}>
                          <View
                            style={{
                              backgroundColor: '#41495D',
                              justifyContent: 'center',
                              paddingHorizontal: 7,
                              paddingVertical: 3,
                              borderRadius: 10,
                            }}>
                            <Text
                              style={{
                                fontSize: 7,
                                color: '#FFFFFF',
                                fontWeight: 'bold',
                              }}>
                              {item.fee == null ? '0%' : item.fee}
                            </Text>
                          </View>
                          <View
                            style={{
                              backgroundColor: '#41495D',
                              justifyContent: 'center',
                              paddingHorizontal: 7,
                              paddingVertical: 3,
                              borderRadius: 10,
                              marginLeft: 2,
                            }}>
                            <Text
                              style={{
                                fontSize: 7,
                                color: '#FFFFFF',
                                fontWeight: 'bold',
                              }}>
                              Arrival:{' '}
                              {item.arrival == null ? 'Pending' : item.arrival}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          NavigationFunctionCall(item.method_name)
                        }>
                        <LinearGradient
                          colors={['#4568DC', '#B06AB3']}
                          style={{
                            backgroundColor: '#c471ed',
                            borderRadius: 15,
                            paddingHorizontal: 15,
                            paddingVertical: 5,
                          }}>
                          <Text
                            style={{
                              color: '#FFFFFF',
                              fontSize: 10,
                              fontWeight: 'bold',
                            }}>
                            Bind
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </>
          )}
        </>
      ))}
    </>
  );

  const GetPaymentDetails = async () => {
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'payment_methods',
        verb: 'GET',
      });
      setshow(true);
      // console.log('PAYMENT DETAILS ==>', res);
      setRegions(res);
    } catch (e) {
      console.log('saga login error -- ', e.toString());
    }
  };
  const NavigationFunctionCall = item => {
    if (item == 'jazzCash') {
      navigation.navigate('WithdrawBind', {
        country: selectPkBtn,
        account_name: item,
        amountUser: amount,
        fromLucky: route?.params?.fromLucky,
        fromBeansScreen: fromBeansScreen
      });
    } else if (item == 'easyPaisa') {
      navigation.navigate('WithdrawBind', {
        country: selectPkBtn,
        account_name: item,
        amountUser: amount,
        fromLucky: route?.params?.fromLucky,
        fromBeansScreen: fromBeansScreen

      });
    } else {
      navigation.navigate('WithdrawBind2', {
        country: selectPkBtn,
        account_name: item,
        amountUser: amount,
        fromLucky: route?.params?.fromLucky,
        fromBeansScreen: fromBeansScreen

      });
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#242A38'}}>
      <ImageBackground
        source={require('../../assets/images/image36.png')}
        resizeMode={'stretch'}
        style={{height: '100%', width: '100%'}}>
        <View
          style={{
            height: 50,
            justifyContent: 'center',
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginHorizontal: 15,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <LeftArrow
                  name="arrow-back-ios"
                  size={20}
                  style={{color: 'white', alignSelf: 'center'}}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                }}>
                Withdraw Method
              </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  modal2Ref.current.toggleModal();
                }}
                style={{
                  backgroundColor: '#c471ed',
                  borderRadius: 15,
                  paddingHorizontal: 10,
                  paddingVertical: 3,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>
                    {selectPkBtn}
                  </Text>
                  <DropDownArrow
                    name="arrow-drop-down"
                    size={20}
                    style={{color: 'white', alignSelf: 'center'}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {show ? (
          <ScrollView>{PayMentMethod()}</ScrollView>
        ) : (
          <View style={{flex: 1, alignSelf: 'flex-end'}}>
            <WaveIndicator color="#B06AB3" size={1100} />
          </View>
        )}

        <View
          style={{marginHorizontal: 15, flexDirection: 'row', marginTop: 15}}>
          <Text style={{color: '#c471ed'}}>
            My Most Preferred Way to Receive Payment
          </Text>
          <RoundArrow
            name="chevron-forward-circle-outline"
            size={20}
            style={{color: '#c471ed', alignSelf: 'center', marginLeft: 5}}
          />
        </View>
      </ImageBackground>
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
              {Regions.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    setselectPkBtn(item.name);
                    setselectPkBtnA(item.name);
                    modal2Ref.current.toggleModal();
                  }}>
                  <Text
                    style={[
                      styles.RegionList,
                      selectPkBtnA == item.name && {
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
    </View>
  );
};

export default WithdrawMethod;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#41495E',

    borderRadius: 20,
    // padding: 35,
    paddingVertical: 30,
    paddingHorizontal: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
