import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const data = [
  {
    key: '1',
    seats: 2,
    title: '2Mic(s)',
    image: require('../../../../assets/images/bottomMenuAudio/MicMode/2Mic.png'),
  },
  {
    key: '2',
    seats: 5,
    title: '5Mic(s)',
    image: require('../../../../assets/images/bottomMenuAudio/MicMode/5Mic.png'),
  },
  {
    key: '3',
    seats: 8,
    title: '8Mic(s)',
    image: require('../../../../assets/images/bottomMenuAudio/MicMode/8Mic.png'),
  },
  {
    key: '4',
    seats: 9,
    title: '9Mic(s)',
    image: require('../../../../assets/images/bottomMenuAudio/MicMode/9Mic.png'),
  },
  {
    key: '5',
    seats: 12,
    title: '12Mic(s)',
    image: require('../../../../assets/images/bottomMenuAudio/MicMode/12Mic.png'),
  },
  {
    key: '6',
    seats: 16,
    title: '16Mic(s)',
    image: require('../../../../assets/images/bottomMenuAudio/MicMode/16Mic.png'),
  },
];

const MicOptions = ({selectedSeats}) => {
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => selectedSeats(item?.seats)}
      style={{
        // flex: 1,
        marginTop: '5%',
        marginLeft: '1%',
        height: 140,
        width: widthPercentageToDP(33),
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <Image
        source={item.image}
        style={{borderRadius: 7, height: 110, width: 100}}
      />
      <View style={{marginTop: '5%'}}>
        <Text style={{color: 'black'}}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['#A93E01', '#FF7B31', '#A93E01']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '18%',
          backgroundColor: 'red',
        }}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
          Mic Mode
        </Text>
      </LinearGradient>

      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.key}
          numColumns={3}
        />
      </View>
    </View>
  );
};

export default MicOptions;

const styles = StyleSheet.create({});

// </LinearGradient>
