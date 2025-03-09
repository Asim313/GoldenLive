import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const data = [
  {
    key: '1',
    title: '2Mic(s)',
    image: require('../assets/images/bottomMenuAudio/MicMode/2Mic.png'),
  },
  {
    key: '2',
    title: '5Mic(s)',
    image: require('../assets/images/bottomMenuAudio/MicMode/5Mic.png'),
  },
  {
    key: '3',
    title: '8Mic(s)',
    image: require('../assets/images/bottomMenuAudio/MicMode/8Mic.png'),
  },
  {
    key: '4',
    title: '9Mic(s)',
    image: require('../assets/images/bottomMenuAudio/MicMode/9Mic.png'),
  },
  {
    key: '5',
    title: '12Mic(s)',
    image: require('../assets/images/bottomMenuAudio/MicMode/12Mic.png'),
  },
  {
    key: '6',
    title: '16Mic(s)',
    image: require('../assets/images/bottomMenuAudio/MicMode/16Mic.png'),
  },
];

const Testing3 = () => {
  const renderItem = ({item}) => (
    <View
      style={{
        flex: 1,
        marginTop: '5%',
        marginLeft: '1%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={item.image}
        style={{width: '80%', height: 100, borderRadius: 7}}
      />
      <View style={{marginTop: '5%'}}>
        <Text style={{color: 'black'}}>{item.title}</Text>
      </View>
    </View>
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

      <View>
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

export default Testing3;

const styles = StyleSheet.create({});

// </LinearGradient>
