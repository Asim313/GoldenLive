import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {
  black,
  headings,
  primaryColor,
  secondaryColor,
  white,
} from '../../utils/Styles';
import {useNavigation} from '@react-navigation/native';
export default function Event({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.topview}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color={white}></Ionicons>
        </TouchableOpacity>
        <Text style={{...headings.h3, color: 'white'}}>
          GoldenLive Daily Star
        </Text>
      </View>
      <ScrollView style={{height: '100%', width: '100%'}}>
        <ImageBackground
          source={require('../../assets/images/event/eventbg.png')}
          resizeMode="cover"
          style={{
            height: '100%',
            width: widthPercentageToDP(100),
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Eventrule')}
            style={{alignSelf: 'center', marginTop: 350}}>
            <ImageBackground
              source={require('../../assets/images/event/eventrulebg.png')}
              style={{height: 55, width: 245}}></ImageBackground>
          </TouchableOpacity>
          <Text
            style={{
              color: white,
              fontWeight: '500',
              fontSize: 16,
              paddingHorizontal: 40,
              textAlign: 'center',
              marginVertical: 10,
            }}>
            Increase You Salary Bouns By Practicipating in Daily Star and Win
            Free Thousands of Gems
          </Text>
          <Image
            source={require('../../assets/images/event/starbonus.png')}
            style={{height: 110, width: '98%', alignSelf: 'center'}}></Image>
          <Image
            resizeMode="contain"
            source={require('../../assets/images/event/bonusbag.png')}
            style={{
              height: 140,
              width: '80%',
              alignSelf: 'center',
              marginVertical: 20,
            }}></Image>
          <View
            style={{
              backgroundColor: '#F18508',
              width: '90%',
              borderRadius: 15,
              height: 60,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: white,
                fontWeight: '500',
                fontSize: 16,
                textAlign: 'center',
              }}>
              Get 1M Gifting. Be a Superstar Are Get Hightest BounsWith Free
              Beans Bag 10K
            </Text>
          </View>
          <Image
            source={require('../../assets/images/event/bonusbroadcast.png')}
            style={{
              height: 80,
              width: '70%',
              alignSelf: 'center',
              marginVertical: 20,
            }}
            resizeMode="contain"></Image>
          <TouchableOpacity style={{alignSelf: 'center'}}>
            <ImageBackground
              source={require('../../assets/images/event/detailsbg.png')}
              style={{height: 55, width: 245}}></ImageBackground>
          </TouchableOpacity>
          <ImageBackground
            source={require('../../assets/images/event/rewardbg1.png')}
            style={{height: 600, width: '97%', alignSelf: 'center'}}
            resizeMode="contain">
            <View style={{height: 120}}></View>
            <View
              style={{
                height: 86,
                flexDirection: 'row',
                width: '92%',
                marginHorizontal: 10,
              }}>
              <Text
                style={{
                  color: white,
                  marginTop: heightPercentageToDP(11),

                  textAlign: 'center',
                  position: 'absolute',
                }}>
                5 Star
              </Text>
              <Text
                style={{
                  color: white,
                  marginTop: 55,

                  textAlign: 'center',
                }}>
                2M
              </Text>
              <Text
                style={{
                  color: white,
                  marginTop: heightPercentageToDP(11),
                  width: 78,
                  textAlign: 'center',
                  fontSize: 12,
                  position: 'absolute',
                  marginLeft: widthPercentageToDP(33),
                }}>
                25K-50k
              </Text>
              <Text
                style={{
                  color: white,
                  marginTop: 55,
                  width: 86,
                  textAlign: 'center',
                }}></Text>
              <Text
                style={{
                  color: white,
                  marginTop: 55,
                  width: 69,
                  textAlign: 'center',
                }}></Text>
            </View>
            <View
              style={{
                height: 86,
                flexDirection: 'row',
                width: '92%',
                marginHorizontal: 10,
              }}>
              <Text
                style={{
                  color: white,
                  marginTop: 55,
                  width: 71,
                  textAlign: 'center',
                }}>
                4 Star
              </Text>
              <Text
                style={{
                  color: white,
                  marginTop: 55,
                  width: 81,
                  textAlign: 'center',
                }}>
                1M
              </Text>
              <Text
                style={{
                  color: white,
                  marginTop: 55,
                  width: 78,
                  textAlign: 'center',
                  fontSize: 12,
                }}>
                12.5K-25K
              </Text>
              <Text
                style={{
                  color: white,
                  marginTop: 55,
                  width: 86,
                  textAlign: 'center',
                }}></Text>
              <Text
                style={{
                  color: white,
                  marginTop: 55,
                  width: 69,
                  textAlign: 'center',
                }}></Text>
            </View>
            <View
              style={{
                height: 86,
                flexDirection: 'row',
                width: '92%',
                marginHorizontal: 10,
              }}>
              <Text
                style={{
                  color: white,
                  marginTop: 55,
                  width: 71,
                  textAlign: 'center',
                }}>
                3 Star
              </Text>
              <Text
                style={{
                  color: white,
                  marginTop: 55,
                  width: 81,
                  textAlign: 'center',
                }}>
                200k
              </Text>
              <Text
                style={{
                  color: white,
                  marginTop: 55,
                  width: 78,
                  textAlign: 'center',
                  fontSize: 12,
                }}>
                2.5K-12.5K
              </Text>
              <Text
                style={{
                  color: white,
                  marginTop: 55,
                  width: 86,
                  textAlign: 'center',
                }}></Text>
              <Text
                style={{
                  color: white,
                  marginTop: 55,
                  width: 69,
                  textAlign: 'center',
                }}></Text>
            </View>
            <View
              style={{
                height: 86,
                flexDirection: 'row',
                width: '92%',
                marginHorizontal: 10,
              }}>
              <Text
                style={{
                  color: white,
                  marginTop: 55,
                  width: 71,
                  textAlign: 'center',
                }}>
                2 Star
              </Text>
              <Text
                style={{
                  color: white,
                  marginTop: 55,
                  width: 81,
                  textAlign: 'center',
                }}>
                50k
              </Text>
              <Text
                style={{
                  color: white,
                  marginTop: 55,
                  width: 78,
                  textAlign: 'center',
                  fontSize: 12,
                }}>
                1.25K-5K
              </Text>
              <Text
                style={{
                  color: white,
                  marginTop: 55,
                  width: 86,
                  textAlign: 'center',
                }}></Text>
              <Text
                style={{
                  color: white,
                  marginTop: 55,
                  width: 69,
                  textAlign: 'center',
                }}></Text>
            </View>
            <View
              style={{
                height: 86,
                flexDirection: 'row',
                width: '92%',
                marginHorizontal: 10,
              }}>
              <Text
                style={{
                  color: white,
                  marginTop: 55,
                  width: 71,
                  textAlign: 'center',
                }}>
                1 Star
              </Text>
              <Text
                style={{
                  color: white,
                  marginTop: 55,
                  width: 81,
                  textAlign: 'center',
                }}>
                10k
              </Text>
              <Text
                style={{
                  color: white,
                  marginTop: 55,
                  width: 78,
                  textAlign: 'center',
                  fontSize: 12,
                }}>
                0.25K-1.25K
              </Text>
              <Text
                style={{
                  color: white,
                  marginTop: 55,
                  width: 86,
                  textAlign: 'center',
                }}></Text>
              <Text
                style={{
                  color: white,
                  marginTop: 55,
                  width: 69,
                  textAlign: 'center',
                }}></Text>
            </View>
          </ImageBackground>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F92929',
  },
  topview: {
    flexDirection: 'row',
    paddingTop: 10,
    backgroundColor: '#F80D0B',
    paddingBottom: 10,
  },
});
