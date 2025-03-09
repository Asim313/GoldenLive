import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  TextInput,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  headings,
  primaryColor,
  secondaryColor,
  white,
} from '../../utils/Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import Themes from './Themes';
import {ApiCallToken} from '../../Services/Apis';
import Icon from 'react-native-vector-icons/AntDesign';
import Header from '../reuseable_Component/Header';

const dataArray = [
  {id: '1', text: 'Frame'},
  {id: '2', text: 'Entrance'},
  {id: '3', text: 'Bubbles'},
  {id: '4', text: 'Special ID'},
];
export default function Store() {
  const userData = useSelector(state => state.auth.userData);
  const [buttons, setButtons] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [getData, setGetData] = useState([]);
  const [show, setShow] = useState(true);
  const [newUIData, setNewUiData] = useState([]);

  useEffect(() => {
    getStoreList();
  }, []);

  const getStoreList = async () => {
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'store-List',
        verb: 'GET',
      });
      // console.log('Store Data ', res?.data);
      setButtons(res.data);
      setCases(res?.data?.[0]?.store_child_categorie);
      setNewUiData(res?.data);
      console.log('dataaaaaaaaaNew', res);
      setShow(false);
    } catch (error) {
      console.log('error in Store Fun', error);
    }
  };

  const purchaseTheme = async item => {
    setisLoading(true);

    try {
      const res = await ApiCallToken({
        params: userData.token,
        paramsBody: {
          beans: item.beans,
          month: 1,
          parent_store_category: item?.parent_category_id,
          child_store_category: item.id,
        },
        route: 'purchased_themes',
        verb: 'POST',
      });
      setisLoading(true);
      console.log('check data ', res);
      ToastAndroid.showWithGravityAndOffset(
        '' + res?.message,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
    } catch (error) {
      console.log('ERROR IS Store Purchase ====>>>', error);
    }
    setisLoading(false);
  };

  const [Gift, setGift] = useState('Gift to a friend');
  const refRBSheetG = useRef();
  const [selectedItem, isSelectedItem] = useState(true);
  const [cases, setCases] = useState([]);
  const [themeCases, setThemeCases] = useState('Theme');

  const cases1 = cases;

  const CheckDta = () => {
    const cases1 = cases.slice(0, 1);
    console.log('check cases ab0ut', cases1.length);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.text}</Text>
    </TouchableOpacity>
  );

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/back.png')}
        resizeMode={'stretch'}
        style={{height: '100%', width: '100%', alignItems: 'center'}}>
        <Header name={'Store'} />

        <View style={styles.container1}>
          <FlatList
            data={dataArray}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal
            contentContainerStyle={styles.flatListContainer}
          />
        </View>

        <View
          style={{
            height: '15%',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            // backgroundColor: 'pink',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 70,
              width: 70,
              // backgroundColor: 'green',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity>
              <Image
                source={require('../../assets/images/store/set.png')}
                style={{height: 60, width: 60}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 70,
              width: 70,
              // backgroundColor: 'green',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity>
              <Image
                source={require('../../assets/images/store/dor.png')}
                style={{height: 60, width: 60}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 70,
              width: 70,
              // backgroundColor: 'green',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity>
              <Image
                source={require('../../assets/images/store/msg.png')}
                style={{height: 60, width: 60}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 70,
              width: 70,
              // backgroundColor: 'green',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity>
              <Image
                source={require('../../assets/images/store/profile.png')}
                style={{height: 60, width: 60}}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            height: '75%',
            width: '100%',
            backgroundColor: '#FFFFFF',
            justifyContent: 'space-evenly',
          }}>
          <LinearGradient
            colors={['#000000C9', '#3A1DB5']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={{
              height: '25%',
              width: '100%',
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <View
              style={{
                height: '20%',
                width: '90%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // backgroundColor: 'pink',
                alignItems: 'flex-end',
              }}>
              <Text style={{fontSize: 15, color: 'white', fontWeight: '400'}}>
                Frame
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('frame', {
                    name: 'Frame',
                    frameData: newUIData?.[2]?.store_child_categorie,
                  })
                }
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'white',
                    fontWeight: '400',
                    bottom: '3%',
                  }}>
                  More
                </Text>
                <Icon name="caretright" size={10} color={'white'} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                height: '80%',
                width: '90%',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                // backgroundColor: 'pink',
              }}>
              <View
                style={{
                  height: '85%',
                  width: '30%',
                  // backgroundColor: 'red',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={{
                    height: '75%',
                    width: '90%',
                    backgroundColor: '#0000008C',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.75,
                    borderRadius: 20,
                  }}>
                  <Image
                    source={{
                      uri: newUIData?.[2]?.store_child_categorie?.[0]?.image,
                    }}
                    style={{height: 60, width: 60}}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    width: '70%',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/images/store/coin.png')}
                    style={{height: 20, width: 20}}
                  />
                  <Text
                    style={{fontSize: 12, color: 'white', fontWeight: '400'}}>
                    {newUIData?.[2]?.store_child_categorie?.[0]?.beans}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: '85%',
                  width: '30%',
                  // backgroundColor: 'red',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={{
                    height: '75%',
                    width: '90%',
                    backgroundColor: '#0000008C',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.75,
                    borderRadius: 20,
                  }}>
                  <Image
                    source={{
                      uri: newUIData?.[2]?.store_child_categorie?.[1]?.image,
                    }}
                    style={{height: 60, width: 60}}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    width: '70%',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/images/store/coin.png')}
                    style={{height: 18, width: 18}}
                  />
                  <Text
                    style={{fontSize: 12, color: 'white', fontWeight: '400'}}>
                    {newUIData?.[2]?.store_child_categorie?.[1]?.beans}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: '85%',
                  width: '30%',
                  // backgroundColor: 'red',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={{
                    height: '75%',
                    width: '90%',
                    backgroundColor: '#0000008C',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.75,
                    borderRadius: 20,
                  }}>
                  <Image
                    source={{
                      uri: newUIData?.[2]?.store_child_categorie?.[2]?.image,
                    }}
                    style={{height: 60, width: 60}}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    width: '70%',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/images/store/coin.png')}
                    style={{height: 18, width: 18}}
                  />
                  <Text
                    style={{fontSize: 12, color: 'white', fontWeight: '400'}}>
                    {newUIData?.[2]?.store_child_categorie?.[2]?.beans}
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>

          <View
            style={{
              height: '30%',
              width: '100%',
              borderRadius: 20,
              alignItems: 'center',
              // backgroundColor: 'pink',
            }}>
            <View
              style={{
                height: '20%',
                width: '90%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // backgroundColor: 'pink',
                alignItems: 'flex-end',
                bottom: '2%',
              }}>
              <Text style={{fontSize: 15, color: 'black', fontWeight: '400'}}>
                Entrance
              </Text>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() =>
                  navigation.navigate('frame', {
                    name: 'Entrance',
                    frameData: newUIData?.[3]?.store_child_categorie,
                  })
                }>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'black',
                    fontWeight: '400',
                    bottom: '3%',
                  }}>
                  More
                </Text>
                <Icon name="caretright" size={10} color={'black'} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                height: '80%',
                width: '90%',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                // backgroundColor: 'pink',
              }}>
              <View
                style={{
                  height: '100%',
                  width: '45%',
                  backgroundColor: '#B4B4B4',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: 10,
                }}>
                <TouchableOpacity
                  style={{
                    height: '80%',
                    width: '90%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.75,
                    borderRadius: 20,
                  }}>
                  <Image
                    source={{uri: newUIData?.[3]?.store_child_categorie?.[0]?.image}}
                    // uri: newUIData?.[4]?.store_child_categorie?.[1]?.image,
                    style={{height: 150, width: 90}}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    height: '20%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: '100%',
                    alignItems: 'center',
                    backgroundColor: '#5933FA',
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}>
                  <Image
                    source={require('../../assets/images/store/coin.png')}
                    style={{height: 18, width: 18}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'white',
                      fontWeight: '400',
                      left: '5%',
                    }}>
                    {/* 70000 */}
                    {newUIData?.[3]?.store_child_categorie?.[1]?.beans}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  height: '100%',
                  width: '45%',
                  backgroundColor: '#B4B4B4',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: 10,
                }}>
                <TouchableOpacity
                  style={{
                    height: '80%',
                    width: '90%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.75,
                    borderRadius: 20,
                  }}>
                  <Image
                    source={{uri: newUIData?.[3]?.store_child_categorie?.[1]?.image}}
                    // uri: newUIData?.[4]?.store_child_categorie?.[1]?.image,
                    style={{height: 150, width: 90}}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    height: '20%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: '100%',
                    alignItems: 'center',
                    backgroundColor: '#5933FA',
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}>
                  <Image
                    source={require('../../assets/images/store/coin.png')}
                    style={{height: 18, width: 18}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'white',
                      fontWeight: '400',
                      left: '5%',
                    }}>
                    {/* 70000 */}
                    {newUIData?.[3]?.store_child_categorie?.[1]?.beans}

                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              height: '30%',
              width: '100%',
              borderRadius: 20,
              alignItems: 'center',
              // backgroundColor:'pink'
            }}>
            <View
              style={{
                height: '20%',
                width: '90%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // backgroundColor: 'pink',
                alignItems: 'flex-end',
              }}>
              <Text style={{fontSize: 15, color: 'black', fontWeight: '400'}}>
                Theme
              </Text>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() =>
                  navigation.navigate('frame', {
                    name: 'Theme',
                    frameData: newUIData?.[4]?.store_child_categorie,
                  })
                }>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'black',
                    fontWeight: '400',
                    bottom: '3%',
                  }}>
                  More
                </Text>
                <Icon name="caretright" size={10} color={'black'} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                height: '80%',
                width: '90%',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                // backgroundColor: 'pink',
              }}>
              <View
                style={{
                  height: '85%',
                  width: '30%',
                  backgroundColor: '#B4B4B4',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: 10,
                }}>
                <TouchableOpacity
                  style={{
                    height: '80%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.75,
                    borderRadius: 20,
                  }}>
                  <Image
                    source={{
                      uri: newUIData?.[4]?.store_child_categorie?.[0]?.image,
                    }}
                    style={{height: 80, width: 75}}
                  />
                  {/* source=
                  {{
                    uri: newUIData?.[2]?.store_child_categorie?.[2]?.image,
                  }} */}
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: '100%',
                    alignItems: 'center',
                    height: '20%',
                    backgroundColor: '#5933FA',
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}>
                  <Image
                    source={require('../../assets/images/store/coin.png')}
                    style={{height: 20, width: 20}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'white',
                      fontWeight: '400',
                      left: '10%',
                    }}>
                    70000
                    {/* {newUIData?.[2]?.store_child_categorie?.[0]?.beans} */}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: '85%',
                  width: '30%',
                  backgroundColor: '#B4B4B4',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: 10,
                }}>
                <TouchableOpacity
                  style={{
                    height: '80%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.75,
                    borderRadius: 20,
                  }}>
                  <Image
                    source={{
                      uri: newUIData?.[4]?.store_child_categorie?.[1]?.image,
                    }}
                    style={{height: 80, width: 75}}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: '100%',
                    alignItems: 'center',
                    height: '20%',
                    backgroundColor: '#5933FA',
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}>
                  <Image
                    source={require('../../assets/images/store/coin.png')}
                    style={{height: 20, width: 20}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'white',
                      fontWeight: '400',
                      left: '10%',
                    }}>
                    70000
                    {/* {newUIData?.[2]?.store_child_categorie?.[0]?.beans} */}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: '85%',
                  width: '30%',
                  backgroundColor: '#B4B4B4',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: 10,
                }}>
                <TouchableOpacity
                  style={{
                    height: '80%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.75,
                    borderRadius: 20,
                  }}>
                  <Image
                    source={{
                      uri: newUIData?.[4]?.store_child_categorie?.[2]?.image,
                    }}
                    style={{height: 80, width: 75}}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: '100%',
                    alignItems: 'center',
                    height: '20%',
                    backgroundColor: '#5933FA',
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}>
                  <Image
                    source={require('../../assets/images/store/coin.png')}
                    style={{height: 20, width: 20}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'white',
                      fontWeight: '400',
                      left: '10%',
                    }}>
                    70000
                    {/* {newUIData?.[2]?.store_child_categorie?.[0]?.beans} */}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor,
  },
  topview: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
  text: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'white',
  },
  ctext: {
    fontSize: 14,
    alignSelf: 'center',
    color: 'white',
  },

  card: {
    width: '48%',
    height: 250,
    backgroundColor: '#323d54',
    margin: 4,
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  luckycard: {
    width: widthPercentageToDP(45),
    height: heightPercentageToDP(20),
    justifyContent: 'space-around',
    borderColor: 'red',
    margin: 2,
  },
  framescard: {
    width: widthPercentageToDP(44),
    height: heightPercentageToDP(25),
    backgroundColor: '#323d54',
    marginLeft: '2%',
    marginBottom: '2%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardbottom: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#E93227',
    height: '15%',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  verticleLine: {
    height: '60%',
    width: 1,
    backgroundColor: '#D9D9D9',
  },
  bottomview: {
    paddingVertical: '3%',
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  monthbtn: {
    color: 'white',
    color: 'white',
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#31384A',
    marginHorizontal: 12,
    marginVertical: 10,
    borderWidth: 1,
    alignSelf: 'center',
    borderColor: 'white',
  },
  container1: {
    height: '5%',
    width: '90%',
    backgroundColor: '#5A3F2F61',
    borderRadius: 150 / 1,
  },
  flatListContainer: {
    justifyContent: 'space-evenly',
    flex: 1,
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    // backgroundColor: 'pink',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});

{
  /* <View style={{marginTop: '2%'}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            keyExtractor={item => item.id}
            data={buttons}
            renderItem={(item, index) => (
              <View>
                <TouchableOpacity
                  activeOpacity={0.3}
                  onPress={() => {
                    setCases(item?.item?.store_child_categorie);
                    setThemeCases(item?.item?.title);
                    setShow(false);
                  }}
                  style={{
                    backgroundColor: '#303749',
                    backgroundColor:
                      cases === item.item.title ? '#EA3126' : '#303749',
                    borderRadius: 5,
                    height: 35,
                    marginHorizontal: 6,
                    width: 90,
                    borderRadius: 20,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: selectedItem === false ? '#fff' : '#AEAECE',
                      ...styles.text,
                    }}>
                    {item.item.title}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <View
          style={
            cases1.length === 1
              ? {
                  flex: 1,
                  marginTop: 10,
                  marginHorizontal: 10,
                  justifyContent: 'center',
                }
              : {
                  flex: 1,
                  marginTop: 10,
                  marginHorizontal: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }
          }>
          {show ? (
            <ActivityIndicator />
          ) : cases === null ? (
            <ActivityIndicator />
          ) : cases.length === 0 ? (
            <Text style={{color: 'white'}}>No data</Text>
          ) : themeCases == 'Themes' ? (
            <Themes themeData={cases} thme={thme} />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={cases1}
              numColumns={2}
              renderItem={RenderView}
            />
          )}
        </View> */
}
