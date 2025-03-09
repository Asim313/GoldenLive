import React from 'react';
import {Image, Text} from 'react-native';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {formatNumerWithK} from '../../../../Services/GlobalFuntions';
import TextSlideAnimation2 from '../../../../components/Animation/TextSlideAnimationCopy';
import AllIcons, { IconList } from '../../../../components/AllIcons';

const MultiCallBox = ({img}) => {
  return (
    <LinearGradient
      colors={['#971748', '#450920']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={{
        flex: 1,
        borderRadius: 7,
      }}>

      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{uri: img}}
          style={{width: '30%', height: '30%', borderRadius: 45}}
        />
      </View>

      <View style={{flex: 1, justifyContent: 'space-between', paddingVertical: 3}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 5,
          }}>
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              flexDirection: 'row',
              width: widthPercentageToDP(12),
              alignItems: 'center',
              borderRadius: 35,
              padding: 3,
            }}>
            <Image
              source={require('../../../../assets/images/coin.png')}
              style={{height: 10, width: 10, marginHorizontal: 3}}
            />
            <Text style={{fontSize: 7, fontWeight: '500', color: '#FBA500'}}>
              {formatNumerWithK(2000)}
            </Text>
          </View>

          {true && (
            <View
              style={{
                backgroundColor: '#F4600C',
                paddingHorizontal: 3,
                borderRadius: 12,
              }}>
              <Text style={{fontSize: 9, fontWeight: '500', color: 'white'}}>
                Host
              </Text>
            </View>
          )}
        </View>

<View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 5,
          }}>

        <View
          style={{
              marginHorizontal: 5,
              width: 60,
            //   backgroundColor: 'red',
              overflow: 'hidden',
            }}>
          <TextSlideAnimation2
            name={'hello l....'}
            fontSize={11}
            fontWeight={'500'}
            color={'white'}
            />
        </View>

        <AllIcons name={IconList.FontAwesome} iconName={'microphone'} size={13} color={'#F4900C'} />
            
            
    </View>
      </View>
    </LinearGradient>
  );
};

export default MultiCallBox;
