import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const ClassPriviledge = ({ data }) => {
  return (
    <View style={{ marginHorizontal: 15 }}>
      <View>
        <View style={{ alignSelf: 'center', justifyContent: 'flex-end', top: 8 }}>
          <Image
            source={require('../../../assets/images/wealthClass/crown.png')}
            resizeMode="contain"
            style={{ height: 40, width: 40 }}
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
              flexDirection: 'row',
              marginTop: 50,
              justifyContent: 'space-around',
              width: '100%',
            }}>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={{ uri: `${data?.name_plate}` }}
                resizeMode="contain"
                style={{ height: 85, width: 85 }}
              />
              <Text style={{ fontSize: 13, color: '#FFFFFF' }}>Nameplate</Text>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Image
                source={{uri: `${data?.badge}`}}
                resizeMode="contain"
                style={{ height: 85, width: 85 }}
              />
              <Text style={{ fontSize: 13, color: '#FFFFFF' }}>Badge</Text>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Image
              source={{uri:`${data?.avator_frame}`}}  
              
              resizeMode="contain"
              style={{ height: 85, width: 85 }}
              />
              <Text style={{ fontSize: 13, color: '#FFFFFF' }}>Avator Frame</Text>
            </View>
          </View>

          <LinearGradient
            colors={['#FE9E00', '#FE7816']}
            style={{
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
              Class Priviledge
            </Text>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

export default ClassPriviledge;

const styles = StyleSheet.create({});
