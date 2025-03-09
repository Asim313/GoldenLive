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
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import LeftArrow from 'react-native-vector-icons/MaterialIcons';
import Card from 'react-native-vector-icons/FontAwesome5';
import RoundArrow from 'react-native-vector-icons/Ionicons';
import Close from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const dummyData = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Details = () => {
  const navigation = useNavigation();
  const renderView = ({item}) => {
    console.log(item);
    return (
      <View
        style={{
          marginHorizontal: 15,
          padding: 8,
          backgroundColor: 'transparent',
          marginTop: 15,
          borderRadius: 15,
        }}>
        <Text style={{fontWeight: 'bold', color: '#FFFFFF'}}>2022-10-09</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 8,
          }}>
          <Text style={{color: '#FFFFFF'}}>to be confirmed:</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/beanA.png')}
              resizeMode="cover"
              style={{height: 15, width: 15}}
            />
            <Text style={{color: 'white', fontWeight: 'bold', marginLeft: 5}}>
              0
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#3A4257',
            height: 1,
            width: '100%',
            marginTop: 5,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 5,
          }}>
          <Text style={{color: '#FFFFFF'}}>Confirmed:</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/beanA.png')}
              resizeMode="cover"
              style={{height: 15, width: 15}}
            />
            <Text style={{color: 'white', fontWeight: 'bold', marginLeft: 5}}>
              0
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#242A38', marginBottom: '12%'}}>
      <ScrollView>
        <ImageBackground
          source={require('../../assets/images/image36.png')}
          resizeMode={'stretch'}
          style={{height: '100%', width: '100%'}}>
          <LinearGradient
            colors={['#4568DC', '#B06AB3']}
            style={{
              height: 50,
              justifyContent: 'center',
            }}>
            <View
              style={{
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
                    fontSize: 20,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  Details
                </Text>
              </View>
            </View>
          </LinearGradient>
          <LinearGradient
            colors={['#8A2387', '#E94057', '#F27121']}
            style={{
              marginHorizontal: 15,
              marginTop: 15,
              backgroundColor: '#41495D',
              padding: 8,
              borderRadius: 15,
            }}>
            <Text style={{fontSize: 12, color: '#FFFFFF', lineHeight: 24}}>
              Beans to be confirmed: The system will check the security of the
              source of points to be confirmed. It is expected that hosts can
              withdraw the beans after 3 days.
            </Text>
          </LinearGradient>
          <FlatList data={dummyData} renderItem={renderView} />
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({});
