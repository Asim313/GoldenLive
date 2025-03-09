import {StyleSheet, Text, View, Image, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import Share from 'react-native-share';
import { shareToWhatsApp } from '../reuseable_Component/SocialShare';


// const handleButtonPress = () => {
//   Linking.openURL('whatsapp://send?text=https://play.google.com/store/apps/details?id=com.bano.live');
// };

const sendInvitation = async () => {
  shareToWhatsApp()
};

const SocialLinks = () => {
  return (
    <View style={{backgroundColor: '#303749', flex: 1}}>
      <View style={{marginTop: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <View>
            <TouchableOpacity 
            onPress={() => sendInvitation()}
            >
              <View
                style={{
                  padding: 12,
                  borderRadius: 100,
                }}>
                <Image
                  source={require('../../assets/images/myInvites/whatsApp.png')}
                  resizeMode="contain"
                  style={{height: 30, width: 30}}
                />
              </View>
            
            <Text
              style={{
                color: '#FFFFFF',
                marginTop: 5,
                textAlign: 'center',
                fontSize: 11,
              }}>
              Whatsapp
            </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity>
              <View
                style={{
                  padding: 12,
                  borderRadius: 100,
                }}>
                <Image
                  source={require('../../assets/images/myInvites/blFriends.png')}
                  resizeMode="contain"
                  style={{height: 30, width: 30}}
                />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                color: '#FFFFFF',
                marginTop: 5,
                textAlign: 'center',
                fontSize: 11,
              }}>
              GL Friends
            </Text>
          </View>
          <View>
            <TouchableOpacity>
              <View
                style={{
                  padding: 12,
                  borderRadius: 100,
                }}>
                <Image
                  source={require('../../assets/images/myInvites/blSquad.png')}
                  resizeMode="contain"
                  style={{height: 30, width: 30}}
                />
              </View>
            </TouchableOpacity>

            <Text
              style={{
                color: '#FFFFFF',
                marginTop: 5,
                textAlign: 'center',
                fontSize: 11,
              }}>
              GL Squad
            </Text>
          </View>
          <View>
            <TouchableOpacity>
              <View
                style={{
                  padding: 12,
                  borderRadius: 100,
                }}>
                <Image
                  source={require('../../assets/images/myInvites/instagram.png')}
                  resizeMode="contain"
                  style={{height: 30, width: 30}}
                />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                color: '#FFFFFF',
                marginTop: 5,
                textAlign: 'center',
                fontSize: 11,
              }}>
              Instagram
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 15,
          }}>
          <View>
            <TouchableOpacity>
              <View
                style={{
                  padding: 12,
                  borderRadius: 100,
                }}>
                <Image
                  source={require('../../assets/images/myInvites/facebook.png')}
                  resizeMode="contain"
                  style={{height: 30, width: 30}}
                />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                color: '#FFFFFF',
                marginTop: 5,
                textAlign: 'center',
                fontSize: 11,
              }}>
              Facebook
            </Text>
          </View>

          <View>
            <TouchableOpacity>
              <View
                style={{
                  padding: 12,
                  borderRadius: 100,
                }}>
                <Image
                  source={require('../../assets/images/myInvites/messenger.png')}
                  resizeMode="contain"
                  style={{height: 30, width: 30}}
                />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                color: '#FFFFFF',
                marginTop: 5,
                textAlign: 'center',
                fontSize: 11,
              }}>
              Messenger
            </Text>
          </View>
          <View>
            <TouchableOpacity>
              <View
                style={{
                  padding: 12,
                  borderRadius: 100,
                }}>
                <Image
                  source={require('../../assets/images/myInvites/copyLink.png')}
                  resizeMode="contain"
                  style={{height: 30, width: 30}}
                />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                color: '#FFFFFF',
                marginTop: 5,
                textAlign: 'center',
                fontSize: 11,
              }}>
              Copy Link
            </Text>
          </View>
          <View>
            <TouchableOpacity>
              <View
                style={{
                  padding: 12,
                  borderRadius: 100,
                }}>
                <Image
                  source={require('../../assets/images/myInvites/more.png')}
                  resizeMode="contain"
                  style={{height: 30, width: 30}}
                />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                color: '#FFFFFF',
                marginTop: 5,
                textAlign: 'center',
                fontSize: 11,
              }}>
              More
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SocialLinks;

const styles = StyleSheet.create({});
