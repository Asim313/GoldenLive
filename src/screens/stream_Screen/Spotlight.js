import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Carouse from '../reuseable_Component/Carouse';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import LinearGradient from 'react-native-linear-gradient';
import HomeModal from '../reuseable_Component/HomeModal';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const modalRef = React.createRef();

const Data1 = [
  
];

const Data = [
  {
    img: require('../../assets/images/bgspot.png'),
  },
  {
    img: require('../../assets/images/bgspot.png'),
  },
  {
    img: require('../../assets/images/bgspot.png'),
  },
];

export default function Spotlight() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.mainView}>
      <ScrollView>
        <View>
          <SwiperFlatList
            autoplay
            autoplayDelay={2}
            index={2}
            autoplayLoop
            showPagination
            data={Data}
            renderItem={({item}) => (
              <View style={styles.child}>
                <Image
                  source={item.img}
                  resizeMode="cover"
                  style={styles.swiperimg}
                />
              </View>
            )}
          />
        </View>

        <ImageBackground
          source={require('../../assets/images/rectangle.png')}
          imageStyle={{borderRadius: 5}}
          style={styles.rectangle}>
          <View style={styles.rectangleitemsmainView}>
            <Text style={styles.nextshowtxt}>Next Show</Text>
            <View style={{flexDirection: 'row', left: 30}}>
              <Image
                source={require('../../assets/images/dp.jpg')}
                style={styles.ringimg1}
              />
              <Image
                source={require('../../assets/images/dp.jpg')}
                style={styles.ringimg2}
              />
              <Image
                source={require('../../assets/images/dp.jpg')}
                style={styles.ringimg3}
              />
            </View>
          </View>
          <View style={styles.timermainbox}>
            <Image
              source={require('../../assets/images/spotwatch.png')}
              style={{height: 15, width: 10}}
              resizeMode={'cover'}
            />
            <Text style={{color: 'white'}}>00 : 26 : 00</Text>
          </View>
        </ImageBackground>
        <View>
          <View>
            <Text style={styles.editorpicktxt}>Editor's pick</Text>
          </View>

          <FlatList
            data={Data1}
            horizontal={true}
            contentContainerStyle={{alignItems: 'center', marginTop: '2%'}}
            renderItem={({item, index, separators}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('StreamShow');
                }}>
                <ImageBackground
                  style={styles.flat1imgbg}
                  source={item.image}
                  imageStyle={{borderRadius: 5}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: '5%',
                      marginTop: 5,
                    }}>
                    <View style={styles.flat1iconmainview}>
                      <Fontisto name="soundcloud" color="#fff" size={10} />
                      <Text
                        style={{
                          marginHorizontal: 2,
                          color: '#fff',
                          fontSize: 10,
                        }}>
                        28
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('StreamShow');
                    }}
                    activeOpacity={0.7}
                    // onPress={() => this.props.navigation.navigate(item.item.navi)}
                    style={{
                      paddingVertical: 10,
                      flexDirection: 'row',
                      paddingHorizontal: 5,
                      marginTop: 90,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{flexDirection: 'column', marginHorizontal: '5%'}}>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: 15,
                        }}>
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: '600',
              marginTop: 5,
              marginLeft: 16,
            }}>
            Spotlight Talent
          </Text>
          <Image
            source={require('../../assets/images/joinspot.png')}
            resizeMode={'cover'}
            style={{height: 23, width: 100, top: 7, right: 7}}
          />
        </View>
        <View style={{marginTop: '1%'}}>
          <FlatList
            data={Data1}
            numColumns={2}
            contentContainerStyle={{alignItems: 'center'}}
            horizontal={false}
            renderItem={({item, index, separators}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('StreamShow');
                }}>
                <ImageBackground
                  style={{
                    height: 150,
                    width: 170,
                    marginHorizontal: 3,
                    marginTop: 5,
                  }}
                  source={item.image}
                  imageStyle={{borderRadius: 5}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: '5%',
                      marginTop: 5,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor: 'rgba(50, 52, 52, 0.4)',
                        width: 45,
                        height: 17,
                        borderRadius: 30,
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                      }}>
                      <Fontisto name="soundcloud" color="#fff" size={10} />
                      <Text
                        style={{
                          marginHorizontal: 2,
                          color: '#fff',
                          fontSize: 10,
                        }}>
                        200
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor: '#c471ed',
                        width: 45,
                        height: 17,
                        borderRadius: 30,
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                      }}>
                      <FontAwesome name="video-camera" color="#fff" size={10} />
                      <Text
                        style={{
                          marginHorizontal: 2,
                          color: '#fff',
                          fontSize: 10,
                        }}>
                        Live
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    // onPress={() => this.props.navigation.navigate(item.item.navi)}
                    style={{
                      paddingVertical: 10,
                      flexDirection: 'row',
                      paddingHorizontal: 5,
                      marginTop: 85,
                      alignItems: 'center',
                    }}>
                    <Image
                      source={item.image2}
                      style={{
                        height: 30,
                        width: 30,
                        borderRadius: 90,
                        borderWidth: 1,
                        borderColor: 'red',
                      }}
                    />
                    <View
                      style={{flexDirection: 'column', marginHorizontal: '5%'}}>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: 12,
                        }}>
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
      <View>
        <HomeModal
          view={
            <TouchableOpacity
              onPress={() => {
                modalRef.current.toggleModal();
              }}>
              <ImageBackground
                source={require('../../assets/images/comingsoon.jpeg')}
                resizeMode={'center'}
                style={{height: '100%', width: '100%'}}></ImageBackground>
            </TouchableOpacity>
          }
          ref={modalRef}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rectangle: {
    height: heightPercentageToDP(7),

    justifyContent: 'center',
    width: widthPercentageToDP(92),
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: '5%',
  },
  child: {alignItems: 'center'},
  mainView: {
    flex: 1,
    marginBottom: '17%',
    marginTop: '3%',
  },
  swiperimg: {
    height: 160,
    width: 350,
    marginHorizontal: 6,
    borderRadius: 10,
  },
  rectangleitemsmainView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '72%',
  },
  nextshowtxt: {
    color: 'white',
    fontWeight: 'bold',
    width: 50,
    left: 20,
  },
  ringimg1: {
    height: 25,
    width: 25,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: '#fff',
    left: 5,
  },
  ringimg2: {
    height: 25,
    width: 25,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: '#fff',
    right: 5,
  },
  ringimg3: {
    height: 25,
    width: 25,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: '#fff',
    right: 10,
  },
  timermainbox: {
    backgroundColor: '#c471ed',
    alignItems: 'center',
    flexDirection: 'row',
    height: 30,
    width: 100,
    justifyContent: 'space-evenly',
    borderRadius: 20,
    top: 10,
    right: 6,
  },
  editorpicktxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 5,
    marginLeft: 16,
  },
  flat1imgbg: {
    height: 150,
    width: 170,
    marginHorizontal: 3,
    marginTop: 5,
  },
  flat1iconmainview: {
    flexDirection: 'row',
    backgroundColor: 'rgba(50, 52, 52, 0.4)',
    width: 45,
    height: 17,
    borderRadius: 30,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
