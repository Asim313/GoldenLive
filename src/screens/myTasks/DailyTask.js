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
import LeftArrow from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import InamGhar from './InamGhar';
import {useNavigation} from '@react-navigation/native';

const tasks = [
  {image: require('../../assets/images/myTasks/star1.png'), points: 100},
  {image: require('../../assets/images/myTasks/star1.png'), points: 200},
  {image: require('../../assets/images/myTasks/star1.png'), points: 300},
  {image: require('../../assets/images/myTasks/star3.png'), points: 400},
  {image: require('../../assets/images/myTasks/star3.png'), points: 500},
  {image: require('../../assets/images/myTasks/star5.png'), points: 600},
  {image: require('../../assets/images/myTasks/star5.png'), points: 700},
  {image: require('../../assets/images/myTasks/star8.png'), points: 800},
];
const navigation = useNavigation;
const DailyTasks = () => {
  const renderView = ({item, index}) => {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: '#242841',
            width: 75,
            height: 100,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 5,
            marginTop: 15,
          }}>
          <View style={{width: '20%', position: 'absolute', top: 0, left: 0}}>
            <Image
              source={require('../../assets/images/myTasks/badge.png')}
              resizeMode="contain"
              style={{height: 32, width: 32}}
            />
            <Text style={{position: 'absolute', padding: 4, color: '#FFFFFF'}}>
              {index + 1}
            </Text>
          </View>
          <Image
            source={item.image}
            resizeMode="contain"
            style={{height: 50, width: 50}}
          />
          <LinearGradient
            colors={
              index == 0
                ? ['#EB3328', '#EC3A2F', '#F7564D']
                : ['#303749', '#303749']
            }
            style={{
              width: '100%',
              position: 'absolute',
              bottom: 0,
              height: 20,
              justifyContent: 'center',
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 16,
                lineHeight: 20,
              }}>
              {item.points}
            </Text>
          </LinearGradient>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={{marginHorizontal: 10}}>
        <FlatList
          data={tasks}
          renderItem={renderView}
          numColumns={4}
          key={'_'}
          keyExtractor={item => '_' + item.id}
        />
      </View>

      <View style={{marginTop: 25, alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#E92F24',
            width: '30%',
            alignItems: 'center',
            paddingVertical: 6,
            borderRadius: 15,
          }}>
          <Text style={{fontSize: 16, color: 'white', fontWeight: 'bold'}}>
            CLAIM
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 20,
          fontWeight: 'bold',
          marginLeft: 15,
        }}>
        Task
      </Text>

      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#303749',
          marginVertical: 15,
        }}
      />

      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 15,
          }}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '75%'}}>
            <View
              style={{
                backgroundColor: '#303749',
                width: '30%',
                height: 70,
                paddingVertical: 8,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Image
                source={require('../../assets/images/myTasks/star1.png')}
                resizeMode="contain"
                style={{height: 35, width: 35}}
              />
              <Text style={{color: '#FFFFFF'}}>+50</Text>
            </View>
            <View style={{}}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginLeft: 10,
                  width: '100%',
                }}>
                Follow 1x Talent
              </Text>
            </View>
          </View>
          <View style={{justifyContent: 'center', width: '25%'}}>
            <LinearGradient
              colors={['#EB3328', '#EC3A2F', '#F7564D']}
              style={{
                paddingHorizontal: 15,
                paddingVertical: 5,
                borderRadius: 15,
              }}>
              <TouchableOpacity style={{alignItems: 'center'}}>
                <Text
                  style={{color: '#FFFFFF', fontSize: 13, fontWeight: 'bold'}}>
                  CLAIM!
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>

        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: '#303749',
            marginVertical: 15,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 15,
          }}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '75%'}}>
            <View
              style={{
                backgroundColor: '#303749',
                width: '30%',
                height: 70,
                paddingVertical: 8,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Image
                source={require('../../assets/images/myTasks/luckyDraw.png')}
                resizeMode="contain"
                style={{height: 35, width: 35}}
              />
            </View>
            <View style={{}}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginLeft: 10,
                  width: '100%',
                }}>
                Lucky Draw
              </Text>
            </View>
          </View>
          <View style={{justifyContent: 'center', width: '25%'}}>
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 5,
                borderRadius: 15,
                backgroundColor: '#242A38',
                borderColor: '#E92F24',
                borderWidth: 1,
              }}>
              <TouchableOpacity style={{alignItems: 'center'}}>
                <Text
                  style={{color: '#E92F24', fontSize: 13, fontWeight: 'bold'}}>
                  TO DO
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: '#303749',
            marginVertical: 15,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 15,
          }}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '75%'}}>
            <View
              style={{
                backgroundColor: '#303749',
                width: '30%',
                height: 70,
                paddingVertical: 8,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Image
                source={require('../../assets/images/myTasks/star1.png')}
                resizeMode="contain"
                style={{height: 35, width: 35}}
              />
              <Text style={{color: '#FFFFFF'}}>+50</Text>
            </View>
            <View style={{}}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginLeft: 10,
                  width: '100%',
                }}>
                Send Message 1x
              </Text>
            </View>
          </View>
          <View style={{justifyContent: 'center', width: '25%'}}>
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 5,
                borderRadius: 15,
                backgroundColor: '#242A38',
                borderColor: '#E92F24',
                borderWidth: 1,
              }}>
              <TouchableOpacity style={{alignItems: 'center'}}>
                <Text
                  style={{color: '#E92F24', fontSize: 13, fontWeight: 'bold'}}>
                  TO DO
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: '#303749',
            marginVertical: 15,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 15,
          }}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '75%'}}>
            <View
              style={{
                backgroundColor: '#303749',
                width: '30%',
                height: 70,
                paddingVertical: 8,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Image
                source={require('../../assets/images/myTasks/star1.png')}
                resizeMode="contain"
                style={{height: 35, width: 35}}
              />
              <Text style={{color: '#FFFFFF'}}>+50</Text>
            </View>
            <View style={{}}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginLeft: 10,
                  width: '100%',
                }}>
                Send 1x Gift
              </Text>
            </View>
          </View>
          <View style={{justifyContent: 'center', width: '25%'}}>
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 5,
                borderRadius: 15,
                backgroundColor: '#242A38',
                borderColor: '#E92F24',
                borderWidth: 1,
              }}>
              <TouchableOpacity style={{alignItems: 'center'}}>
                <Text
                  style={{color: '#E92F24', fontSize: 13, fontWeight: 'bold'}}>
                  TO DO
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: '#303749',
            marginVertical: 15,
          }}
        />
      </ScrollView>

      <View style={{marginTop: 20}}>
        <View
          style={{
            marginHorizontal: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/wealthClass/profile.jpg')}
              resizeMode="contain"
              style={{
                height: 50,
                width: 50,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: '#303749',
              }}
            />
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 18,
                fontWeight: 'bold',
                marginLeft: 5,
              }}>
              Aqif Khan
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                color: '#FFFFFF',
                marginRight: 10,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              150
            </Text>
            <TouchableOpacity>
              <Image
                source={require('../../assets/images/myTasks/star1.png')}
                resizeMode="contain"
                style={{height: 35, width: 35}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DailyTasks;

const styles = StyleSheet.create({});
