import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import LeftArrow from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Trophy from 'react-native-vector-icons/Entypo';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const tasks = [
  {
    image: require('../../assets/images/records/aeroplane.jpg'),
    name: 'Aeroplane Combo',
    X: '5060',
  },
  {
    image: require('../../assets/images/records/kiss.png'),
    name: 'Rocket Combo',
    X: '550',
  },
  {
    image: require('../../assets/images/records/lavish.png'),
    name: 'Unlimited Combo',
    X: '01',
  },
  {
    image: require('../../assets/images/records/aeroplane.jpg'),
    name: 'Aeroplane Combo',
    X: '5060',
  },
  {
    image: require('../../assets/images/records/kiss.png'),
    name: 'Rocket Combo',
    X: '550',
  },
  {
    image: require('../../assets/images/records/lavish.png'),
    name: 'Unlimited Combo',
    X: '01',
  },
];

const renderView = ({item}) => {
  return (
    <ImageBackground
      source={require('../../assets/images/profile/back.png')}
      style={styles.itemContainer}
      imageStyle={{borderRadius: 10}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{width: '20%'}}>
          <Image source={item.image} style={{width: 70, height: 72}} />
        </View>
        <View style={styles.detailBox}>
          <View style={styles.box1}>
            <Image
              source={require('../../assets/images/profile/crown2.png')}
              style={styles.Img2}
            />
            <Text style={styles.txt}>{item?.name}</Text>
          </View>
          <TouchableOpacity style={styles.chatbox}>
            <Image
              source={require('../../assets/images/profile/crown2.png')}
              style={styles.Img3}
            />
            <Text style={{color: 'white', fontSize: 13}}>Chat</Text>
          </TouchableOpacity>
          <View style={styles.otherdetail}>
            <Text style={styles.txt}>Top Master is Great</Text>
          </View>
        </View>
        <View style={{left: 10}}>
          <View
            style={{
              height: '50%',
              justifyContent: 'center',
              alignItems: 'center',
            }}></View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '50%',
            }}>
            <Text style={styles.txt}> 1223</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const ComboView = ({navigation}) => {
  const [sevenDays, setSevenDays] = useState(true);
  const [thirtyDays, setThirtyDaily] = useState(false);
  const [total, setTotal] = useState(false);

  const sevenBtn = () => {
    setSevenDays(true);
    setThirtyDaily(false);
    setTotal(false);
  };

  const thirtyBtn = () => {
    setSevenDays(false);
    setThirtyDaily(true);
    setTotal(false);
  };

  const totalBtn = () => {
    setSevenDays(false);
    setThirtyDaily(false);
    setTotal(true);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#242A38'}}>
      <ImageBackground
        source={require('../../assets/images/records/recordbg.png')}
        style={{
          height: 350,
          width: '100%',
          borderBottomLeftRadius: 80,
          borderBottomRightRadius: 80,
        }}>
        <View style={{height: 50, justifyContent: 'center'}}>
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
                Weekly Star
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#F5AA23',
            flexDirection: 'row',
            alignSelf: 'center',
            borderRadius: 20,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => sevenBtn()}
            style={{
              backgroundColor: sevenDays ? '#FFFFFF' : '#F5AA23',
              borderRadius: 20,
              paddingVertical: 8,
              width: '20%',
              alignSelf: 'center',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 9,
                  color: sevenDays ? '#F5AA23' : '#FFFFFF',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                7 Days
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => thirtyBtn()}
            style={{
              backgroundColor: thirtyDays ? '#FFFFFF' : '#F5AA23',
              borderRadius: 20,
              paddingVertical: 8,
              width: '20%',
              alignSelf: 'center',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 9,
                  color: thirtyDays ? '#F5AA23' : '#FFFFFF',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                30 Days
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => totalBtn()}
            style={{
              backgroundColor: total ? '#FFFFFF' : '#F5AA23',
              borderRadius: 20,
              paddingVertical: 8,
              width: '20%',
              alignSelf: 'center',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 9,
                  color: total ? '#F5AA23' : '#FFFFFF',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Total
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            height: '60%',
            // backgroundColor:'red',
          }}>
          {/* ///////..................Rank2................... */}
          <View style={{justifyContent: 'center'}}>
            <ImageBackground
              source={require('../../assets/images/records/frame2.png')}
              style={{...styles.frame}}>
              <Image
                source={require('../../assets/images/records/girl2.jpg')}
                style={{...styles.imge}}
              />
            </ImageBackground>
            <View style={{alignSelf: 'center'}}>
              <ImageBackground
                source={require('../../assets/images/records/whitebg.png')}
                style={{height: 20, width: 40}}>
                <Text style={{...styles.text1}}>Jasvir</Text>
              </ImageBackground>
              <Text style={{...styles.id}}>ID:12338</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{...styles.text2}}>aniqa</Text>
              </View>
            </View>
          </View>
          {/* ///////..................Rank1................... */}
          <View style={{justifyContent: 'center'}}>
            <ImageBackground
              source={require('../../assets/images/records/frame1.png')}
              style={{height: 70, width: 70, bottom: 30}}>
              <Image
                source={require('../../assets/images/records/girl2.jpg')}
                style={{...styles.imge, height: 60, width: 60}}
              />
            </ImageBackground>
            <View style={{alignSelf: 'center', bottom: 20}}>
              <ImageBackground
                source={require('../../assets/images/records/whitebg.png')}
                style={{height: 20, width: 40}}>
                <Text style={{...styles.text1}}>Jasvir</Text>
              </ImageBackground>

              <Text style={{...styles.id}}>ID:12338</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{...styles.text2}}>aniqa</Text>
              </View>
            </View>
          </View>
          {/* ///////..................Rank3................... */}
          <View style={{justifyContent: 'center'}}>
            <ImageBackground
              source={require('../../assets/images/records/frame3.png')}
              style={{...styles.frame}}>
              <Image
                source={require('../../assets/images/records/girl2.jpg')}
                style={{...styles.imge}}
              />
            </ImageBackground>
            <View style={{alignSelf: 'center'}}>
              <ImageBackground
                source={require('../../assets/images/records/whitebg.png')}
                style={{height: 20, width: 40}}>
                <Text style={{...styles.text1}}>Jasvir</Text>
              </ImageBackground>

              <Text style={{...styles.id}}>ID:12338</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{...styles.text2}}>aniqa</Text>
              </View>
            </View>
          </View>
          {/* /////////////////////////////////////// */}
        </View>
      </ImageBackground>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          height: '52%',
        }}>
        <FlatList data={tasks} renderItem={renderView} showsVerticalScrollIndicator={false} />
      </View>
    </View>
  );
};

export default ComboView;

const styles = StyleSheet.create({
  FLBackground: {
    // ackgroundGradient: "vertical",
    height: 28,
    top: 3,
    // width: 60,
    borderRadius: 30,
  },
  screentogglebg: {
    borderRadius: 70,
    backgroundColor: 'rgba(12, 12, 12, 0.17)',
    marginHorizontal: '10%',
    alignItems: 'center',
    marginTop: 20,
    height: 34,
  },
  itemContainer: {
    backgroundColor: 'black',
    borderRadius: 12,
    height: heightPercentageToDP(10),
    width: widthPercentageToDP(90),
    // width:'90%',
    // marginHorizontal: 1,
    // marginTop: 5,
    margin: 4,
  },
  setgradient: {
    borderRadius: 10,
    margin: 5,
    flexDirection: 'row',
  },
  detailBox: {
    left: '20%',
    width: '60%',
  },

  chatbox: {
    backgroundColor: '#ff5e03',
    borderRadius: 50,
    flexDirection: 'row',
    width: 60,
    height: '25%',
    justifyContent: 'space-evenly',
  },

  box1: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '39%',
  },
  Img1: {
    width: 81,
    height: 96,
    borderRadius: 10,
    borderColor: 'red',
  },
  Img2: {
    width: 17,
    height: 11,
  },
  Img3: {
    width: 10,
    height: 9,
    top: 5,
  },
  Img4: {
    width: 14,
    height: 10,
    top: 5,
  },
  otherdetail: {
    width: '69%',
    top: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txt: {
    color: 'white',
    fontSize: 14,
  },
  toggletext: {
    fontSize: 12,
    top: 6,
    alignSelf: 'center',
    marginHorizontal: 80,
  },
  gradiantbg: {
    height: 30,
    width: 72,
    borderRadius: 30,
  },
  frame: {
    height: 50,
    width: 50,
  },
  imge: {
    height: 55,
    width: 55,
    borderRadius: 100,
    alignSelf: 'center',
    top: 9,
  },
  text1: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'Poppins_Regular',
    fontWeight: '400',
  },
  id: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Poppins_Regular',
    fontWeight: '400',
  },
  coin: {
    height: 10,
    width: 10,
    top: 2,
  },
  text2: {
    fontSize: 10,
    color: '#fff',
    fontFamily: 'Poppins_Regular',
    marginHorizontal: 2,
  },
});
