import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  BackHandler,
} from 'react-native';
import React from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Awesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {StatusBar} from 'native-base';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function Topup({navigation}) {
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);

  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    // navigation.navigate('Topup')
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.mainView}>
      <StatusBar backgroundColor={'black'} />
      <ImageBackground
        source={require('../../assets/images/image36.png')}
        resizeMode={'stretch'}
        style={{height: '100%', width: '100%'}}>
        <ScrollView>
          <LinearGradient
            colors={['#4568DC', '#B06AB3']}
            style={{borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}>
            <View
              style={{
                height: heightPercentageToDP(30),
              }}>
              <View style={styles.header}>
                <View style={styles.editprofilebox}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Ionicon name="chevron-back" size={30} color={'white'} />
                  </TouchableOpacity>
                  <Text style={styles.editprofiletxt}>Topup</Text>
                </View>
              </View>
              <View
                style={{
                  height: '60%',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    marginTop: heightPercentageToDP(2),
                  }}>
                  <Image
                    source={require('../../assets/images/beanA.png')}
                    style={{height: 50, width: 50}}
                  />
                </View>

                <View
                  style={{
                    alignItems: 'center',
                    marginTop: heightPercentageToDP(2),
                  }}>
                  <Text style={{fontSize: 18, color: 'white'}}>
                    Available Beans : {userUpdatedData?.beans}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',

                padding: 14,

                borderColor: 'white',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: '#134E5E', left: 8, fontWeight: 'bold'}}>
                  Account ID :
                </Text>
                <Text style={{color: 'white', left: 18}}>{userUpdatedData?.id}</Text>
              </View>
              <TouchableOpacity>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: 'white'}}>Gift to a friend</Text>
                  <Ionicon name="chevron-forward" size={20} color={'white'} />
                </View>
              </TouchableOpacity>
            </View>
          </LinearGradient>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',

                padding: 20,
                borderBottomWidth: 0.3,
                borderColor: 'white',
              }}>
              <View
                style={{
                  flexDirection: 'row',

                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: widthPercentageToDP(42),
                }}>
                <Image
                  source={require('../../assets/images/easypaisa.png')}
                  style={{height: 15, width: 70, top: 2}}
                />
                <Text style={{color: '#7893CA', fontWeight: 'bold'}}>
                  Easypaisa
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Ionicon name="chevron-forward" size={20} color={'white'} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',

                padding: 20,
                borderBottomWidth: 0.3,
                borderColor: 'white',
              }}>
              <View
                style={{
                  flexDirection: 'row',

                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: widthPercentageToDP(37),
                }}>
                <Image
                  source={require('../../assets/images/paypal.png')}
                  style={{height: 15, width: 70, top: 2}}
                />
                <Text style={{color: '#7893CA', fontWeight: 'bold'}}>
                  Paypal
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Ionicon name="chevron-forward" size={20} color={'white'} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',

                padding: 20,
                borderBottomWidth: 0.3,
                borderColor: 'white',
              }}>
              <View
                style={{
                  flexDirection: 'row',

                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: widthPercentageToDP(38),
                }}>
                <Image
                  source={require('../../assets/images/googletopup.png')}
                  style={{height: 24, width: 70, top: 2}}
                />
                <Text style={{color: '#7893CA', fontWeight: 'bold'}}>
                  Google
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Ionicon name="chevron-forward" size={20} color={'white'} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('TopupAgent')}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 20,
                borderBottomWidth: 0.3,
                borderColor: 'white',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: widthPercentageToDP(48),
                }}>
                {/* <Image
              source={require('../../assets/images/easypaisa.png')}
              style={{height: 15, width: 70, top: 2}}
            /> */}
                <Text
                  style={{
                    color: 'white',
                    fontSize: 17,
                    left: 5,
                  }}>
                  Topup
                </Text>
                <Text style={{color: '#7893CA', fontWeight: 'bold'}}>
                  Topup Agent
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Ionicon name="chevron-forward" size={20} color={'white'} />
              </View>
            </View>
          </TouchableOpacity>
          <View>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                fontWeight: '400',
                margin: 15,
              }}>
              Note:
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, color: 'white'}}>
              To solve the issue please go to
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                  left: 4,
                  color: 'red',
                  borderBottomWidth: 2,
                  borderColor: 'red',
                }}>
                feedback
              </Text>
            </TouchableOpacity>
            <Text style={{fontSize: 16, left: 7, color: 'white'}}>page</Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editprofilebox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: widthPercentageToDP(28),
    justifyContent: 'space-between',
  },
  editprofiletxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    right: 10,
  },
  savebox: {
    backgroundColor: 'red',
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
});
