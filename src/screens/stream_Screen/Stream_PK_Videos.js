import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
//--------------styles------------
import {headings, shadow, Colors} from '../../utils/Styles';
import HomeModal from '../reuseable_Component/HomeModal';

const modalRef = React.createRef();

const battle = [
  {
    id: '1',
    image: require('../../assets/images/events.jpg'),
    image2: require('../../assets/images/banner.png'),
    id_No1: '01',
    id_No2: '02',
    name: 'GoldenLive',
    name2: 'GoldenLive',
    text: 'New York, USA',
    text4: 'New York, USA',
    text2: 'Lv.09',
    text3: '06',
  },
  {
    id: '2',
    image: require('../../assets/images/events.jpg'),
    image2: require('../../assets/images/banner.png'),
    id_No1: '01',
    id_No2: '02',
    name: 'GoldenLive',
    name2: 'GoldenLive',
    text: 'New York, USA',
    text4: 'New York, USA',
    text2: 'Lv.09',
    text3: '06',
  },
  {
    id: '3',
    image: require('../../assets/images/events.jpg'),
    image2: require('../../assets/images/banner.png'),
    id_No1: '01',
    id_No2: '02',
    name: 'GoldenLive',
    name2: 'GoldenLive',
    text: 'New York, USA',
    text4: 'New York, USA',
    text2: 'Lv.09',
    text3: '06',
  },
  {
    id: '4',
    image: require('../../assets/images/events.jpg'),
    image2: require('../../assets/images/banner.png'),
    id_No1: '01',
    id_No2: '02',
    name: 'GoldenLive',
    name2: 'GoldenLive',
    text: 'New York, USA',
    text4: 'New York, USA',
    text2: 'Lv.09',
    text3: '06',
  },
  {
    id: '5',
    image: require('../../assets/images/events.jpg'),
    image2: require('../../assets/images/banner.png'),
    id_No1: '01',
    id_No2: '02',
    name: 'GoldenLive',
    name2: 'GoldenLive',
    text: 'New York, USA',
    text4: 'New York, USA',
    text2: 'Lv.09',
    text3: '06',
  },
  {
    id: '6',
    image: require('../../assets/images/events.jpg'),
    image2: require('../../assets/images/banner.png'),
    id_No1: '01',
    id_No2: '02',
    name: 'GoldenLive',
    name2: 'GoldenLive',
    text: 'New York, USA',
    text4: 'New York, USA',
    text2: 'Lv.09',
    text3: '06',
  },
  {
    id: '7',
    image: require('../../assets/images/events.jpg'),
    image2: require('../../assets/images/banner.png'),
    id_No1: '01',
    id_No2: '02',
    name: 'GoldenLive',
    name2: 'GoldenLive',
    text: 'New York, USA',
    text4: 'New York, USA',
    text2: 'Lv.09',
    text3: '06',
  },
  {
    id: '8',
    image: require('../../assets/images/events.jpg'),
    image2: require('../../assets/images/banner.png'),
    id_No1: '01',
    id_No2: '02',
    name: 'GoldenLive',
    name2: 'GoldenLive',
    text: 'New York, USA',
    text4: 'New York, USA',
    text2: 'Lv.09',
    text3: '06',
  },
];
const Stream_PK_Videos = () => {
  return (
    <View style={{marginBottom: '15%', flex: 1}}>
      {/* ////////////////////FlatList */}

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        data={battle}
        keyExtractor={item => item.id}
        renderItem={(item, index) => (
          <TouchableOpacity
            onPress={() => {
              modalRef.current.toggleModal();
            }}
            activeOpacity={0.7}
            // onPress={() => navigation.navigate(item.item.navi)}
          >
            <LinearGradient
              colors={['#4568DC', '#B06AB3']}
              style={{
                // ...shadowViewColor,
                backgroundColor: 'red',
                ...shadow.whiteShadow,
                width: 330,
                height: 150,
                borderRadius: 10,
                marginTop: '3%',
                alignSelf: 'center',
              }}>
              <View style={{...styles.flex, marginTop: '5%'}}>
                {/* //////////////////person 1 */}
                <View style={{flexDirection: 'column'}}>
                  <Image
                    source={item.item.image}
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 90,
                      borderWidth: 1,
                      borderColor: 'white',
                      marginLeft: 35,
                      marginTop: '5%',
                    }}
                  />
                  <Image
                    source={item.item.image2}
                    style={{
                      // height: 50, width: 50,
                      position: 'absolute',
                      marginTop: 25,
                      right: 2,
                    }}
                  />
                  <Text
                    style={{
                      ...headings.h5b,
                      color: '#fff',
                      fontWeight: '900',
                      position: 'absolute',
                      marginLeft: '45%',
                      marginTop: 40,
                    }}>
                    {item.item.id_No1}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'column',
                      marginLeft: 10,
                    }}>
                    <Text
                      style={{
                        ...headings.h3b,
                        marginTop: 10,
                        fontSize: 15,
                        color: '#fff',
                        textAlign: 'center',
                      }}>
                      {item.item.name}
                    </Text>
                    <Text
                      style={{
                        ...headings.h9b,
                        fontSize: 10,
                        color: '#242A38',
                        textAlign: 'center',
                        color: 'white',
                      }}>
                      {item.item.text}
                    </Text>
                  </View>
                  {/* /////////////////// */}
                  <View
                    style={{
                      ...styles.flex,
                      marginHorizontal: '2%',
                      marginTop: '10%',
                      left: 10,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#3E95E5',
                        height: 20,
                        width: 50,
                        fontSize: 10,
                        borderRadius: 5,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          top: 2,
                        }}>
                        {item.item.text2}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#F74239',
                        height: 20,
                        width: 50,
                        fontSize: 10,
                        borderRadius: 5,
                      }}>
                      <View
                        style={{
                          ...styles.flex,
                          marginHorizontal: '14%',
                          marginTop: 3,
                        }}>
                        <Image
                          source={require('../../assets/images/crown.png')}
                          style={{
                            height: 15,
                            width: 15,
                          }}
                        />
                        <Text>{item.item.text3}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                {/* ///////////////// 'VS' Button */}
                <View
                  style={{
                    backgroundColor: '#F74239',
                    height: 40,
                    width: 40,
                    borderRadius: 60,
                    marginTop: '18%',
                    left: 6,
                  }}>
                  <Text
                    style={{
                      justifyContent: 'center',
                      marginTop: 13,
                      alignSelf: 'center',
                      color: '#fff',
                    }}>
                    VS
                  </Text>
                </View>

                {/* ///////////////Person 2 */}
                <View style={{flexDirection: 'column'}}>
                  <Image
                    source={item.item.image}
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 90,
                      borderWidth: 1,
                      borderColor: 'white',
                      marginLeft: 35,
                      marginTop: '5%',
                    }}
                  />
                  <Image
                    source={item.item.image2}
                    style={{
                      // height: 50, width: 50,
                      position: 'absolute',
                      marginTop: 25,
                      right: 2,
                    }}
                  />
                  <Text
                    style={{
                      ...headings.h5b,
                      color: '#fff',
                      fontWeight: '900',
                      position: 'absolute',
                      marginLeft: '45%',
                      marginTop: 40,
                    }}>
                    {item.item.id_No2}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'column',
                      marginLeft: 10,
                    }}>
                    <Text
                      style={{
                        ...headings.h3b,
                        marginTop: 10,
                        fontSize: 15,
                        color: '#fff',
                        textAlign: 'center',
                      }}>
                      {item.item.name2}
                    </Text>
                    <Text
                      style={{
                        ...headings.h9b,
                        fontSize: 10,
                        color: '#242A38',
                        textAlign: 'center',
                        color: 'white',
                      }}>
                      {item.item.text4}
                    </Text>
                  </View>
                  {/* /////////////////// */}
                  <View
                    style={{
                      ...styles.flex,
                      marginHorizontal: '2%',
                      marginTop: '10%',
                      left: 10,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#3E95E5',
                        height: 20,
                        width: 50,
                        fontSize: 10,
                        borderRadius: 5,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          top: 2,
                        }}>
                        {item.item.text2}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#F74239',
                        height: 20,
                        width: 50,
                        fontSize: 10,
                        borderRadius: 5,
                      }}>
                      <View
                        style={{
                          ...styles.flex,
                          marginHorizontal: '14%',
                          marginTop: 3,
                        }}>
                        <Image
                          source={require('../../assets/images/crown.png')}
                          style={{
                            height: 15,
                            width: 15,
                          }}
                        />
                        <Text>{item.item.text3}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />

      {/* /////////////// */}

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
    </View>
  );
};
const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    bottom: '3%',
  },
});
export default Stream_PK_Videos;
