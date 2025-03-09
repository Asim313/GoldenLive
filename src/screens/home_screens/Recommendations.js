import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import React, {useEffect, useCallback, useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-virtualized-view';

export default function Recommendations({navigation}) {
  const [show, setShow] = useState(false);
  const [Follow, setFollow] = useState('Following');
  const userData = useSelector(state => state.auth.userData);
  const [data, setData] = useState([]);
  // const Confirm = async () => {
  //   var myHeaders = new Headers();
  //   myHeaders.append('Authorization', `Bearer ${userData.token}`);
  //   myHeaders.append(
  //     'Cookie',
  //     'laravel_session=TgQhzYVBiTu4Q31p2Xe5oNFribAIhNzrVD4xCVRb',
  //   );

  //   var requestOptions = {
  //     method: 'GET',
  //     headers: myHeaders,
  //     redirect: 'follow',
  //   };

  //   fetch(
  //     'https://www.golden-live.com/api/user/recommendation-host',
  //     requestOptions,
  //   )
  //     .then(response => response.text())

  //     .then(result => {
  //       setData(result), console.log('the result of api si', result);
  //     })
  //     .catch(error => console.log('error', error));
  // };

  const GetRecommendations = async () => {
    try {
      await fetch('https://www.golden-live.com/api/user/recommendation-host', {
        method: 'GET',
        headers: {
          // 'Content-type': 'application/json',
          Authorization: `Bearer ${userData.token}`,
        },
      })
        .then(res => res.json())
        .then(json => {
          // console.log('API RESPONSE', json.data);
          setData(json.data);
        });
      setShow(true);
    } catch (e) {
      console.log('Error-- ', e.toString());
    }
  };

  const UnFollowUser = async userId => {
    try {
      console.log('Id of user DDDDD', userId);
      await fetch('https://www.golden-live.com/api/user/unfollow-host', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify({id: userId}),
      })
        .then(res => res.json())
        .then(json => {
          console.log('UnFollowing response =>>', json[0].message);
        });
    } catch (e) {
      console.log('saga login error -- ', e.toString());
      console.log('Id of user', userId);
    }
  };

  const FollowUser = async userId => {
    try {
      await fetch('https://www.golden-live.com/api/user/following-host', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify({id: userId}),
      })
        .then(res => res.json())
        .then(json => {
          console.log('Following response =>>', json[0].message);
        });
      // if (Follow == 'follow') {
      //   setFollow('unfollow');
      // } else {
      //   setFollow('follow');
      // }
    } catch (e) {
      console.log('saga login error -- ', e.toString());
      console.log('Id of user', userId);
    }
  };
  // const Data = [
  //   {
  //     img: require('../../assets/images/img1.png'),
  //     img2: require('../../assets/images/img2.png'),
  //     Username: 'Umar Akmal',
  //     address: 'New York,USA',
  //     Lv: 'Lv.09',
  //     Lv1: 'Follow',
  //   },
  //   {
  //     img: require('../../assets/images/img1.png'),
  //     img2: require('../../assets/images/img2.png'),
  //     Username: 'Babar Azam',
  //     address: 'New York,USA',
  //     Lv: 'Lv.09',
  //     Lv1: 'Follow',
  //   },
  //   {
  //     img: require('../../assets/images/img1.png'),
  //     img2: require('../../assets/images/img2.png'),
  //     Username: 'Shahid Afridi',
  //     address: 'New York,USA',
  //     Lv: 'Lv.09',
  //     Lv1: 'Follow',
  //   },
  //   {
  //     img: require('../../assets/images/img1.png'),
  //     img2: require('../../assets/images/img2.png'),
  //     Username: 'Sarfaraz Ahmed',
  //     address: 'New York,USA',
  //     Lv: 'Lv.09',
  //     Lv1: 'Follow',
  //   },
  //   {
  //     img: require('../../assets/images/img1.png'),
  //     img2: require('../../assets/images/img2.png'),
  //     Username: 'Abdul Basit',
  //     address: 'New York,USA',
  //     Lv: 'Lv.09',
  //     Lv1: 'Follow',
  //   },
  //   {
  //     img: require('../../assets/images/img1.png'),
  //     img2: require('../../assets/images/img2.png'),
  //     Username: 'Rizwan Bd',
  //     address: 'New York,USA',
  //     Lv: 'Lv.09',
  //     Lv1: 'Follow',
  //   },
  //   {
  //     img: require('../../assets/images/img1.png'),
  //     img2: require('../../assets/images/img2.png'),
  //     Username: 'Shahroz khan',
  //     address: 'New York,USA',
  //     Lv: 'Lv.09',
  //     Lv1: 'Follow',
  //   },
  //   {
  //     img: require('../../assets/images/img1.png'),
  //     img2: require('../../assets/images/img2.png'),
  //     Username: 'kamran Akmal',
  //     address: 'New York,USA',
  //     Lv: 'Lv.09',
  //     Lv1: 'Follow',
  //   },
  //   {
  //     img: require('../../assets/images/img1.png'),
  //     img2: require('../../assets/images/img2.png'),
  //     Username: 'Aqif Khan',
  //     address: 'New York,USA',
  //     Lv: 'Lv.09',
  //     Lv1: 'Follow',
  //   },
  //   {
  //     img: require('../../assets/images/img1.png'),
  //     img2: require('../../assets/images/img2.png'),
  //     Username: 'Romero Riaz',
  //     address: 'New York,USA',
  //     Lv: 'Lv.09',
  //     Lv1: 'Follow',
  //   },
  //   // {
  //   //   img: require('../../assets/images/img1.png'),
  //   //   img2: require('../../assets/images/img2.png'),
  //   //   Username: 'Haris Rauf',
  //   //   address: 'New York,USA',
  //   //   Lv: 'Lv.09',
  //   //   Lv1: '06',
  //   // },
  //   // {
  //   //   img: require('../../assets/images/img1.png'),
  //   //   img2: require('../../assets/images/img2.png'),
  //   //   Username: 'Ducky Bhai',
  //   //   address: 'New York,USA',
  //   //   Lv: 'Lv.09',
  //   //   Lv1: '06',
  //   // },
  // ];
  useEffect(() => {
    GetRecommendations();
  }, []);
  // useEffect(
  //   useCallback(() => {
  //     // alert('hello favrt');
  //     Confirm();
  //   }, []),
  // );
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/images/image36.png')}
        resizeMode={'stretch'}
        style={styles.mainbgimg}>
        <LinearGradient
          colors={['#292E49', '#1565C0']}
          style={styles.headerView}>
          <Text style={styles.Recommendationstxt}>Recommendations</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.replace('BottomNavigation');
            }}
            style={styles.skipView}>
            <Text style={styles.skiptxt}>SKIP</Text>
          </TouchableOpacity>
        </LinearGradient>
        <ScrollView>
          <View>
            <View style={styles.line} />
            <Text style={styles.populartxt}>Popular Now</Text>
          </View>
          {show ? (
            <View style={styles.flatlistView}>
              <FlatList
                renderItem={({item, index, separators}) => (
                  <View style={styles.flatlistitemMaincontainer}>
                    {/* {console.log('first', item?.image)} */}
                    <Image
                      source={require('../../assets/images/coverpic.jpg')}
                      style={styles.imgbg}
                    />
                    <View style={{bottom: 10}}>
                      <Image
                        source={{uri: item.image}}
                        style={styles.imgprofile}
                      />
                      <View style={{bottom: 10}}>
                        <Text style={styles.Usernametxt}>
                          {' '}
                          {item?.nick_name || item?.full_name}
                        </Text>
                        <Text style={styles.addresstxt}>{item.address}</Text>
                      </View>
                      <View style={styles.LevelsMainView}>
                        <View style={styles.Lvcontainer}>
                          <Text style={styles.Lvtxt}>ID:{item.id}</Text>
                        </View>

                        {/* {Follow == 'Follow' ? (
                          <TouchableOpacity
                            onPress={() => {
                              FollowUser(item.id);
                            }}>
                            <View style={styles.Lv1container}>
                              <Text style={styles.Lv1txt}>{Follow}</Text>
                            </View>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              UnFollowUser(item.id);

                              setFollow('Follow');
                            }}>
                            <View style={styles.Lv1container}>
                              <Text style={styles.Lv1txt}>{Follow}</Text>
                            </View>
                          </TouchableOpacity>
                        )} */}

                        <View>
                          <View style={styles.Lv1container}>
                            <Text style={styles.Lv1txt}>Following</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                numColumns={3}
                data={data}
                contentContainerStyle={{
                  marginTop: 25,
                }}
              />
            </View>
          ) : (
            <View style={{flex: 1}}>
              <WaveIndicator color="#1565C0" size={1200} />
            </View>
          )}
        </ScrollView>

        <TouchableOpacity
          style={styles.Nextcontainer}
          onPress={() => {
            navigation.replace('BottomNavigation');
            FollowUser();
          }}>
          <Text style={styles.Nexttxt}> Confirm </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainbgimg: {
    height: '100%',
    width: '100%',
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  Recommendationstxt: {
    fontSize: 20,
    fontweight: 'bold',
    color: '#ffff',
  },
  skipView: {
    backgroundColor: 'white',
    height: 25,
    width: 45,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skiptxt: {
    textAlign: 'center',
    color: 'black',
    fontSize: 13,
  },
  line: {
    top: 15,
    borderColor: 'white',
    borderWidth: 1,
  },
  populartxt: {
    color: 'white',
    fontSize: 18,
    marginTop: heightPercentageToDP(5),
    left: 12,
    textDecorationLine: 'underline',
  },
  flatlistView: {
    flex: 1,
    alignSelf: 'center',
  },
  flatlistitemMaincontainer: {
    height: 140,
    width: widthPercentageToDP(28),

    backgroundColor: 'black',
    marginTop: 13,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  imgbg: {
    width: '100%',
    height: '40%',
    borderRadius: 5,
  },
  imgprofile: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 25,
    bottom: 10,
    height: 30,
    width: 30,
    alignSelf: 'center',
  },
  Usernametxt: {
    fontSize: 12,
    color: '#ffff',
    textAlign: 'center',
    marginTop: heightPercentageToDP(1),
  },
  addresstxt: {
    fontSize: 10,
    color: '#77779B',
    textAlign: 'center',
  },
  LevelsMainView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  Lvcontainer: {
    height: 15,
    width: 35,
    backgroundColor: '#27B0FF',
    fontColor: 'white',
    borderRadius: 2,
  },
  Lvtxt: {
    textAlign: 'center',
    fontSize: 10,
    color: 'black',
  },
  Lv1container: {
    height: 15,
    width: 47,
    backgroundColor: 'red',
    fontcolor: 'white',
    borderRadius: 2,
    alignItems: 'center',
  },
  Lv1txt: {
    textAlign: 'center',
    fontSize: 10,
    color: 'white',
  },
  Nextcontainer: {
    backgroundColor: '#1565C0',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderRadius: 5,
    bottom: 0,
    position: 'absolute',
    width: '90%',
    alignSelf: 'center',
  },
  Nexttxt: {
    color: 'white',
    fontSize: 20,
  },
});
