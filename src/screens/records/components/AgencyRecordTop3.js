import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {memo} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { formatNumerWithK, truncateAfterTenCharacters, truncateAfterThreeCharacters } from '../../../Services/GlobalFuntions';

const AgencyRecordTop3 = memo(({topUsersData, bgImage, topImage }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity style={{}} onPress={() => {
      navigation.navigate('AgencyID', {
        agency_code: topUsersData?.agency_code
      })
    }}>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ImageBackground
          source={bgImage}
          resizeMode="contain"
          style={{
            height: topImage ? 100 :  80,
            width: topImage ? 100 :  80,
            justifyContent: 'center',
            alignItems: 'center',
            bottom: 5,
          }}>
          <Image
            source={{uri: topUsersData?.agency_image}}
            style={{
              top: 0,
              height: 57,
              width: 55,
              overflow: 'hidden',
              borderRadius: 150 / 1,
            }}
          />
        </ImageBackground>

<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text
          numberOfLines={1}
          style={{color: '#ffffff', fontSize: 11, fontWeight: 'bold'}}>
          <Text>{truncateAfterTenCharacters(topUsersData?.agency_name)}</Text>
        </Text>

        <Image
            style={{
              left: 5,
              height: 13,
              width: 20,
            }}
            source={{uri: topUsersData?.flag}}
          />
  </View>

        <View
          style={{
            marginVertical: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: 18,
              width: 12,
            }}
            source={require('../../../assets/images/agencyrecords/fire.png')}
          />
          <Text style={{fontSize: 13, color: 'white', left: 5}}>
            {formatNumerWithK(topUsersData?.coins) ?? 0}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default AgencyRecordTop3;
