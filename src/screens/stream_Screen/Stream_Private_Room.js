// import React from 'react';
// import {
//   Text,
//   FlatList,
//   TouchableOpacity,
//   View,
//   Image,
//   ImageBackground,
//   StatusBar,
// } from 'react-native';
// //-------------vector icons------
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// //--------------Styles--------------
// import {headings} from '../../utils/Styles';

// const room = [
//   {
//     id: '1',
//     image: require('../../assets/images/events.jpg'),
//     image2: require('../../assets/images/img2.png'),
//     name: 'James Olivia',
//     text: 'LIVE-On the Radio',
//     text2: '100K Following',
//   },
//   {
//     id: '2',
//     image: require('../../assets/images/events.jpg'),
//     image2: require('../../assets/images/img2.png'),
//     name: 'James Olivia',
//     text: 'LIVE-On the Radio',
//     text2: '100K Following',
//   },
//   {
//     id: '3',
//     image: require('../../assets/images/events.jpg'),
//     image2: require('../../assets/images/img2.png'),
//     name: 'James Olivia',
//     text: 'LIVE-On the Radio',
//     text2: '100K Following',
//   },
//   {
//     id: '4',
//     image: require('../../assets/images/events.jpg'),
//     image2: require('../../assets/images/img2.png'),
//     name: 'James Olivia',
//     text: 'LIVE-On the Radio',
//     text2: '100K Following',
//   },
//   {
//     id: '5',
//     image: require('../../assets/images/events.jpg'),
//     image2: require('../../assets/images/img2.png'),
//     name: 'James Olivia',
//     text: 'LIVE-On the Radio',
//     text2: '100K Following',
//   },
//   {
//     id: '6',
//     image: require('../../assets/images/events.jpg'),
//     image2: require('../../assets/images/img2.png'),
//     name: 'James Olivia',
//     text: 'LIVE-On the Radio',
//     text2: '100K Following',
//   },
//   {
//     id: '7',
//     image: require('../../assets/images/events.jpg'),
//     image2: require('../../assets/images/img2.png'),
//     name: 'James Olivia',
//     text: 'LIVE-On the Radio',
//     text2: '100K Following',
//   },
//   {
//     id: '8',
//     image: require('../../assets/images/events.jpg'),
//     image2: require('../../assets/images/img2.png'),
//     name: 'James Olivia',
//     text: 'LIVE-On the Radio',
//     text2: '100K Following',
//   },
// ];
// const Stream_Private_Room = () => {
//   return (
//     <View style={{flex: 1, backgroundColor: '#242A38', marginBottom: '16%'}}>
//       <StatusBar backgroundColor="#242A38" />

//       {/* ///////////////// heading */}
//       <Text
//         style={{
//           ...headings.h2b,
//           color: '#fff',
//           left: 17,
//         }}>
//         Private Room
//       </Text>
//       {/* ////////////////////FlatList */}
//       <FlatList
//         showsVerticalScrollIndicator={false}
//         numColumns={2}
//         horizontal={false}
//         data={room}
//         keyExtractor={item => item.id}
//         renderItem={(item, index) => (
//           <View style={{alignItems: 'center', flex: 1}}>
//             <TouchableOpacity
//               activeOpacity={0.7}
//               // onPress={() => this.props.navigation.navigate(item.item.navi)}
//               style={{
//                 marginTop: '2%',

//                 marginHorizontal: 3,
//               }}>
//               <ImageBackground
//                 source={item.item.image}
//                 style={{
//                   height: 170,
//                   width: 170,
//                 }}
//                 imageStyle={{borderRadius: 6}}>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                     marginHorizontal: 8,
//                     marginTop: 10,
//                   }}>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       backgroundColor: 'rgba(50, 52, 52, 0.4)',
//                       width: 45,
//                       height: 17,
//                       borderRadius: 30,
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                     }}>
//                     <Fontisto name="soundcloud" color="#fff" size={10} />
//                     <Text
//                       style={{
//                         marginHorizontal: 2,
//                         color: '#fff',
//                         fontSize: 10,
//                       }}>
//                       Live
//                     </Text>
//                   </View>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       backgroundColor: '#E92F24',
//                       width: 45,
//                       height: 17,
//                       borderRadius: 30,
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                     }}>
//                     <FontAwesome name="video-camera" color="#fff" size={10} />
//                     <Text
//                       style={{
//                         marginHorizontal: 2,
//                         color: '#fff',
//                         fontSize: 10,
//                       }}>
//                       Live
//                     </Text>
//                   </View>
//                 </View>
//                 <Text
//                   style={{
//                     marginTop: 120,
//                     marginLeft: '5%',
//                     color: '#fff',

//                     width: 120,
//                   }}>
//                   LIVE-On the Radio
//                 </Text>
//               </ImageBackground>
//               <TouchableOpacity
//                 activeOpacity={0.7}
//                 // onPress={() => this.props.navigation.navigate(item.item.navi)}
//                 style={{
//                   paddingVertical: 10,
//                   flexDirection: 'row',
//                   paddingHorizontal: 3,
//                 }}>
//                 <Image
//                   source={item.item.image2}
//                   style={{
//                     height: 30,
//                     width: 30,
//                     borderRadius: 90,
//                     borderWidth: 1,
//                     borderColor: 'red',
//                   }}
//                 />
//                 <View style={{flexDirection: 'column', marginHorizontal: '5%'}}>
//                   <Text style={{color: '#fff', fontSize: 12}}>
//                     {item.item.name}
//                   </Text>
//                   <Text style={{color: 'grey', fontSize: 12}}>
//                     {item.item.text2}
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             </TouchableOpacity>
//           </View>
//         )}
//       />

//       {/* /////////////// */}
//     </View>
//   );
// };

// export default Stream_Private_Room;

import React from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
} from 'react-native';
//-----------Styles---------
import {headings} from '../../utils/Styles';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {ScrollView} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import HomeModal from '../reuseable_Component/HomeModal';

const modalRef = React.createRef();

const Party = [
  {
    id: '1',
    image: require('../../assets/images/Home_posters/soon.jpeg'),
    image2: require('../../assets/images/img2.png'),
    name: 'GoldenLive',
    text: 'Party Room',
    text2: '10:30 | Freedom Trail',
  },
  {
    id: '2',
    image: require('../../assets/images/events.jpg'),
    image2: require('../../assets/images/img2.png'),
    name: 'GoldenLive',
    text: 'Party Room',
    text2: '10:30 | Freedom Trail',
  },
  {
    id: '3',
    image: require('../../assets/images/events.jpg'),
    image2: require('../../assets/images/events.jpg'),
    name: 'GoldenLive',
    text: 'Party Room',
    text2: '10:30 | Freedom Trail',
  },
  {
    id: '4',
    image: require('../../assets/images/Home_posters/soon.jpeg'),
    image2: require('../../assets/images/img2.png'),
    name: 'GoldenLive',
    text: 'Party Room',
    text2: '10:30 | Freedom Trail',
  },
];
const Data2 = [
  {
    img: require('../../assets/images/banner2.jpg'),
  },
  {
    img: require('../../assets/images/banner2.jpg'),
  },
  {
    img: require('../../assets/images/banner2.jpg'),
  },
];
const Stream_Private_Room = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#242A38',
        marginBottom: '17%',
        marginTop: '1%',
      }}>
      <StatusBar backgroundColor="#242A38" />
      {/* //////////////////////////Heading */}
      <ScrollView>
        {/*//////////////////////// FlatList */}
        <View style={{alignItems: 'center'}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            horizontal={false}
            data={Party}
            keyExtractor={item => item.id}
            renderItem={(item, index) => (
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    modalRef.current.toggleModal();
                  }}
                  activeOpacity={0.7}
                  // onPress={() => this.props.navigation.navigate(item.item.navi)}
                  style={{
                    marginTop: '1%',

                    marginHorizontal: 1,
                  }}>
                  <ImageBackground
                    source={item.item.image}
                    style={{
                      height: 170,
                      width: 178,
                      marginTop: 2,
                    }}
                    imageStyle={{borderRadius: 6}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor: 'rgba(50, 52, 52, 0.4)',
                        width: 45,
                        height: 17,
                        borderRadius: 30,
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        alignSelf: 'flex-end',
                        marginTop: '2%',
                      }}>
                      <Entypo name="lock" color="#fff" size={10} />
                      <Text
                        style={{
                          marginHorizontal: 5,
                          color: '#fff',
                          fontSize: 10,
                        }}>
                        Lock
                      </Text>
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.7}
                      // onPress={() => this.props.navigation.navigate(item.item.navi)}
                      style={{
                        paddingVertical: 10,
                        flexDirection: 'row',
                        paddingHorizontal: 5,
                        marginTop: '55%',
                      }}>
                      <View style={{marginHorizontal: '5%', top: 5}}>
                        <Text
                          style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: 15,
                          }}>
                          {item.item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <View style={{marginTop: '1%'}}>
          <SwiperFlatList
            autoplay
            autoplayDelay={2}
            index={2}
            autoplayLoop
            showPagination={false}
            data={Data2}
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
        {/* /////////////////// */}
        <View style={{alignItems: 'center'}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            horizontal={false}
            data={Party}
            keyExtractor={item => item.id}
            renderItem={(item, index) => (
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    modalRef.current.toggleModal();
                  }}
                  activeOpacity={0.7}
                  // onPress={() => this.props.navigation.navigate(item.item.navi)}
                  style={{
                    marginTop: '1%',
                    flexDirection: 'column',
                    marginHorizontal: 1,
                    justifyContent: 'center',
                  }}>
                  <ImageBackground
                    source={item.item.image}
                    style={{
                      height: 170,
                      width: 178,
                      marginTop: 2,
                    }}
                    imageStyle={{borderRadius: 6}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor: 'rgba(50, 52, 52, 0.4)',
                        width: 45,
                        height: 17,
                        borderRadius: 30,
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        alignSelf: 'flex-end',
                        marginTop: '2%',
                      }}>
                      <Entypo name="lock" color="#fff" size={10} />
                      <Text
                        style={{
                          marginHorizontal: 5,
                          color: '#fff',
                          fontSize: 10,
                        }}>
                        Lock
                      </Text>
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.7}
                      // onPress={() => this.props.navigation.navigate(item.item.navi)}
                      style={{
                        paddingVertical: 10,
                        flexDirection: 'row',
                        paddingHorizontal: 5,
                        marginTop: '55%',
                      }}>
                      <View style={{marginHorizontal: '5%', top: 5}}>
                        <Text
                          style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: 15,
                          }}>
                          {item.item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
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
    </View>
  );
};

export default Stream_Private_Room;
const styles = StyleSheet.create({
  swiperimg: {
    height: 80,
    width: 350,
    marginHorizontal: 6,
    borderRadius: 10,
  },
});
