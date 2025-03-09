import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useRef} from 'react';
import AudioMenuSheet from '../components/AudioMenuSheet';
import RbSheetComponent from '../screens/reuseable_Component/RbSheetComponent';
import Testing3 from './Testing3';
import LinearGradient from 'react-native-linear-gradient';
import {FlatList} from 'react-native';

const Testing2 = () => {
  const refRBSheetOptions = useRef();

  const dataComponent = [
    {id: '1', title: 'Item 1'},
    {id: '2', title: 'Item 2'},
    {id: '3', title: 'Item 3'},
    {id: '4', title: 'Item 4'},
    {id: '5', title: 'Item 1'},
    {id: '6', title: 'Item 2'},
    {id: '7', title: 'Item 3'},
    {id: '8', title: 'Item 4'},
    {id: '9', title: 'Item 1'},
    {id: '10', title: 'Item 2'},
    {id: '11', title: 'Item 3'},
    {id: '12', title: 'Item 4'},
  ];

  const renderItem = ({item}) => (
    <LinearGradient
      colors={['#971748', '#450920']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={{
        height: 100,
        borderRadius: 7,
        width: 90,
        margin: 3, // Adjust the margin as needed
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: '3%',
          marginTop: '2%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 2,
            width: 30,
            borderRadius: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value as needed
          }}>
          <Image
            source={require('../assets/images/coin.png')}
            style={{width: 7, height: 7}}
          />
          <Text style={{color: 'white', fontSize: 7}}>2.2K</Text>
        </View>

        <View
          style={{
            backgroundColor: '#F4600C',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // paddingHorizontal: 6,
            paddingHorizontal: 5,
            width: 32,
            // marginHorizontal: 10,
            borderRadius: 10,
          }}>
          <Image
            source={require('../assets/images/audioNewDesignIcons/host.png')}
            style={{width: 7, height: 7}}
          />
          <Text style={{color: 'white', fontSize: 7, marginHorizontal: 2}}>
            Host
          </Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 8,
        }}>
        <Image
          source={require('../assets/images/dp.jpg')}
          style={{width: 50, height: 50, borderRadius: 50}}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: '5%',
          marginTop: '3%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // alignItems: 'center',
            // paddingHorizontal: 6,
            width: 60,
            borderRadius: 10,
            // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value as needed
          }}>
          {/* <Image
                source={require('../assets/images/coin.png')}
                style={{width: 15, height: 15}}
              /> */}
          <Text style={{color: 'white', fontSize: 10, marginHorizontal: 2}}>
            Samaan{' '}
          </Text>
        </View>

        <View
          style={{
            // backgroundColor: '#F4600C',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // paddingHorizontal: 6,
            // width: 60,
            marginHorizontal: 5,
            borderRadius: 10,
          }}>
          <Image
            style={{width: 12, height: 12}}
            source={require('../assets/images/audioNewDesignIcons/mute.png')}
          />
        </View>
      </View>
    </LinearGradient>
  );

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={() => refRBSheetOptions.current.open()}>
        <Text>Testing2</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', marginLeft: 5, marginTop: 100}}>
        <LinearGradient
          colors={['#971748', '#450920']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{
            // justifyContent: 'center',
            // alignItems: 'center',
            height: 210,
            borderRadius: 7,
            width: 180,

            // backgroundColor: 'red',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: '5%',
              marginTop: '3%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 6,
                width: 47,
                borderRadius: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value as needed
              }}>
              <Image
                source={require('../assets/images/coin.png')}
                style={{width: 13, height: 13}}
              />
              <Text style={{color: 'white', fontSize: 9}}>2.2K</Text>
            </View>

            <View
              style={{
                backgroundColor: '#F4600C',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 6,
                width: 47,
                // marginHorizontal: 10,
                borderRadius: 10,
              }}>
              <Image
                source={require('../assets/images/audioNewDesignIcons/host.png')}
                style={{width: 10, height: 10}}
              />
              <Text style={{color: 'white', fontSize: 9}}>Host</Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: '23%',
            }}>
            <Image
              source={require('../assets/images/dp.jpg')}
              style={{width: 75, height: 75, borderRadius: 50}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: '5%',
              marginTop: '3%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // alignItems: 'center',
                // paddingHorizontal: 6,
                width: 60,
                borderRadius: 10,
                // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value as needed
              }}>
              {/* <Image
                source={require('../assets/images/coin.png')}
                style={{width: 15, height: 15}}
              /> */}
              <Text style={{color: 'white', fontSize: 11}}>Samaan </Text>
            </View>

            <View
              style={{
                // backgroundColor: '#F4600C',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // paddingHorizontal: 6,
                // width: 60,
                marginHorizontal: 5,
                borderRadius: 10,
              }}>
              <Image
                style={{width: 17, height: 17}}
                source={require('../assets/images/audioNewDesignIcons/mute.png')}
              />
            </View>
          </View>
        </LinearGradient>
        <View style={{}}>
          <FlatList
            data={dataComponent.slice(0, 4)}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2} // Display two items in a row
          />
        </View>
      </View>
      {/* <FlatList
        data={dataComponent}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={4} // Display two items in a row
      /> */}
      <View style={{backgroundColor: 'red',flexDirection:"row",marginHorizontal:"5%"}}>
        <LinearGradient
          colors={['#971748', '#450920']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{
            // justifyContent: 'center',
            // alignItems: 'center',
            height: 210,
            borderRadius: 7,
            width: 180,

            // backgroundColor: 'red',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: '5%',
              marginTop: '3%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 6,
                width: 47,
                borderRadius: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value as needed
              }}>
              <Image
                source={require('../assets/images/coin.png')}
                style={{width: 13, height: 13}}
              />
              <Text style={{color: 'white', fontSize: 9}}>2.2K</Text>
            </View>

            <View
              style={{
                backgroundColor: '#F4600C',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 6,
                width: 47,
                // marginHorizontal: 10,
                borderRadius: 10,
              }}>
              <Image
                source={require('../assets/images/audioNewDesignIcons/host.png')}
                style={{width: 10, height: 10}}
              />
              <Text style={{color: 'white', fontSize: 9}}>Host</Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: '23%',
            }}>
            <Image
              source={require('../assets/images/dp.jpg')}
              style={{width: 75, height: 75, borderRadius: 50}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: '5%',
              marginTop: '3%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // alignItems: 'center',
                // paddingHorizontal: 6,
                width: 60,
                borderRadius: 10,
                // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value as needed
              }}>
              {/* <Image
                source={require('../assets/images/coin.png')}
                style={{width: 15, height: 15}}
              /> */}
              <Text style={{color: 'white', fontSize: 11}}>Samaan </Text>
            </View>

            <View
              style={{
                // backgroundColor: '#F4600C',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // paddingHorizontal: 6,
                // width: 60,
                marginHorizontal: 5,
                borderRadius: 10,
              }}>
              <Image
                style={{width: 17, height: 17}}
                source={require('../assets/images/audioNewDesignIcons/mute.png')}
              />
            </View>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={['#971748', '#450920']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{
            // justifyContent: 'center',
            // alignItems: 'center',
            height: 210,
            borderRadius: 7,
            width: 180,

            // backgroundColor: 'red',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: '5%',
              marginTop: '3%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 6,
                width: 47,
                borderRadius: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value as needed
              }}>
              <Image
                source={require('../assets/images/coin.png')}
                style={{width: 13, height: 13}}
              />
              <Text style={{color: 'white', fontSize: 9}}>2.2K</Text>
            </View>

            <View
              style={{
                backgroundColor: '#F4600C',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 6,
                width: 47,
                // marginHorizontal: 10,
                borderRadius: 10,
              }}>
              <Image
                source={require('../assets/images/audioNewDesignIcons/host.png')}
                style={{width: 10, height: 10}}
              />
              <Text style={{color: 'white', fontSize: 9}}>Host</Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: '23%',
            }}>
            <Image
              source={require('../assets/images/dp.jpg')}
              style={{width: 75, height: 75, borderRadius: 50}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: '5%',
              marginTop: '3%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // alignItems: 'center',
                // paddingHorizontal: 6,
                width: 60,
                borderRadius: 10,
                // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value as needed
              }}>
              {/* <Image
                source={require('../assets/images/coin.png')}
                style={{width: 15, height: 15}}
              /> */}
              <Text style={{color: 'white', fontSize: 11}}>Samaan </Text>
            </View>

            <View
              style={{
                // backgroundColor: '#F4600C',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // paddingHorizontal: 6,
                // width: 60,
                marginHorizontal: 5,
                borderRadius: 10,
              }}>
              <Image
                style={{width: 17, height: 17}}
                source={require('../assets/images/audioNewDesignIcons/mute.png')}
              />
            </View>
          </View>
        </LinearGradient>
      </View>
      <View>
        <View>
          <RbSheetComponent
            view={<Testing3 />}
            refUse={refRBSheetOptions}
            close={false}
            height={370}
            backgroundColor={'white'}
          />
        </View>
      </View>
    </View>
  );
};

export default Testing2;

const styles = StyleSheet.create({});
