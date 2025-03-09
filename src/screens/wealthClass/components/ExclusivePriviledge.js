import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const ExclusivePriviledge = ({img, mainColor, exclusiveColor}) => {
  return (
    <View style={{marginHorizontal: 15}}>
      <LinearGradient
        colors={mainColor}
        style={{
          backgroundColor: '#303749',
          alignItems: 'center',
          paddingVertical: 15,
          borderRadius: 8,
        }}>
        <Image
          source={img}
          resizeMode="contain"
          style={{height: 200, width: 200}}
        />
      </LinearGradient>
      <LinearGradient
        colors={exclusiveColor}
        style={{
          alignSelf: 'center',
          width: '70%',
          height: 35,
          justifyContent: 'center',
          borderBottomRightRadius: 25,
          borderBottomLeftRadius: 25,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#FFFFFF',
          }}>
          Exclusive Priviledge
        </Text>
      </LinearGradient>
    </View>
  );
};

export default ExclusivePriviledge;

const styles = StyleSheet.create({});
