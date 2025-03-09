import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import Heart from 'react-native-vector-icons/AntDesign';

const ChatBubble = () => {
  const dimensions = Dimensions.get('window');
  return (
    <View style={{marginHorizontal: 15, marginTop: 20}}>
      <View>
        <View style={{alignSelf: 'center', justifyContent: 'flex-end', top: 8}}>
          <Image
            source={require('../../../assets/images/wealthClass/crown.png')}
            resizeMode="contain"
            style={{height: 40, width: 40}}
          />
        </View>
        <View
          style={{
            backgroundColor: '#303749',
            paddingVertical: 15,
            borderRadius: 8,
            flexDirection: 'row',
            justifyContent: 'center',
            borderTopColor: '#FE9E00',
            borderTopWidth: 5,
          }}>
          <View
            style={{
              backgroundColor: '#FE9E00',
              width: '50%',
              height: 30,
              justifyContent: 'center',
              borderBottomRightRadius: 25,
              borderBottomLeftRadius: 25,
              position: 'absolute',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#FFFFFF',
              }}>
              Chat Bubble
            </Text>
          </View>
          <View>
            <View style={{marginTop: 30}}>
              <View>
                <Image
                  source={require('../../../assets/images/wealthClass/banner.png')}
                  resizeMode="contain"
                  style={{
                    height: dimensions.height * 0.12,
                    width: dimensions.width * 0.9,
                  }}
                />
              </View>
              <View
                style={{
                  height: dimensions.height * 0.12,
                  width: dimensions.width * 0.9,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                }}>
                <View
                  style={{
                    height: dimensions.height * 0.09,
                    width: dimensions.width * 0.83,
                    backgroundColor: '#242A38aa',
                    borderRadius: 10,
                  }}>
                  <View
                    style={{
                      marginTop: 6,
                      flexDirection: 'row',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                    }}>
                    {/* <View style={{ marginHorizontal: 12, width: '25%', paddingVertical: 2, borderRadius: 15, borderWidth: 2, borderColor: '#FE9505', flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ backgroundColor: '#FE8F08', width: 22, height: 22, borderRadius: 100, justifyContent: 'center', alignItems: 'center', marginLeft: 5 }}>
                                                <Heart name="heart" size={15} style={{ color: 'red' }} />
                                            </View>
                                            <Text style={{ fontSize: 10, color: '#FFFFFF', fontWeight: 'bold', marginLeft: 2 }}>John...</Text>
                                        </View> */}
                    <View
                      style={{
                        height: dimensions.height * 0.075,
                        width: dimensions.width * 0.8,
                      }}>
                      <Text
                        style={{
                          color: '#AEAECE',
                          fontSize: 12,
                          justifyContent: 'center',
                          alignContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View style={{}}>
                          <View
                            style={{
                              width: '25%',
                              paddingVertical: 2,
                              borderRadius: 15,
                              borderWidth: 2,
                              borderColor: '#FE9505',
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                backgroundColor: '#FE8F08',
                                width: 18,
                                height: 18,
                                borderRadius: 100,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 5,
                              }}>
                              <Heart
                                name="heart"
                                size={12}
                                style={{color: 'red'}}
                              />
                            </View>
                            <Text
                              style={{
                                fontSize: 10,
                                color: '#FFFFFF',
                                fontWeight: 'bold',
                                marginLeft: 1,
                              }}>
                              John...
                            </Text>
                          </View>
                        </View>
                        Dilraba: Lorem ipsum dolor sit amet, ipsum consectetur
                        dolor sit amet, consectetur
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({});
