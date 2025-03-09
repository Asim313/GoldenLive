import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  StatusBar,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const events = [
  {
    id: '1',
    image: require('../../assets/images/events.jpg'),
    image2: require('../../assets/images/img2.png'),
    name: 'James Olivia',
    text: 'LIVE-On the Radio',
    text2: '10:30 | Freedom Trail',
  },
  {
    id: '2',
    image: require('../../assets/images/events.jpg'),
    image2: require('../../assets/images/img2.png'),
    name: 'James Olivia',
    text: 'LIVE-On the Radio',
    text2: '10:30 | Freedom Trail',
  },
  {
    id: '3',
    image: require('../../assets/images/events.jpg'),
    image2: require('../../assets/images/img2.png'),
    name: 'James Olivia',
    text: 'LIVE-On the Radio',
    text2: '10:30 | Freedom Trail',
  },
  {
    id: '4',
    image: require('../../assets/images/events.jpg'),
    image2: require('../../assets/images/img2.png'),
    name: 'James Olivia',
    text: 'LIVE-On the Radio',
    text2: '10:30 | Freedom Trail',
  },
  {
    id: '5',
    image: require('../../assets/images/events.jpg'),
    image2: require('../../assets/images/img2.png'),
    name: 'James Olivia',
    text: 'LIVE-On the Radio',
    text2: '10:30 | Freedom Trail',
  },
  {
    id: '6',
    image: require('../../assets/images/events.jpg'),
    image2: require('../../assets/images/img2.png'),
    name: 'James Olivia',
    text: 'LIVE-On the Radio',
    text2: '10:30 | Freedom Trail',
  },
  {
    id: '7',
    image: require('../../assets/images/events.jpg'),
    image2: require('../../assets/images/img2.png'),
    name: 'James Olivia',
    text: 'LIVE-On the Radio',
    text2: '10:30 | Freedom Trail',
  },
  {
    id: '8',
    image: require('../../assets/images/storedp.png'),
    image2: require('../../assets/images/img2.png'),
    name: 'James Olivia',
    text: 'LIVE-On the Radio',
    text2: '10:30 | Freedom Trail',
  },
];
const Stream_Events = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#242A38'}}>
      <StatusBar backgroundColor="#242A38" />
      <Text
        style={{
          color: '#ffff',
          fontSize: 25,
          fontWeight: 'bold',
          margin: 15,
        }}>
        BanoReels
      </Text>
      {/* FlatList */}
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        horizontal={false}
        data={events}
        keyExtractor={item => item.id}
        renderItem={(item, index) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => console.log('Here')}
            style={{
              marginTop: '1%',
              flexDirection: 'column',
              paddingHorizontal: 6,
              marginHorizontal: 6,
              justifyContent: 'center',
            }}>
            <ImageBackground
              source={item.item.image}
              style={{
                height: 170,
                width: '105%',
                marginTop: 10,
              }}
              imageStyle={{borderRadius: 6}}>
              <TouchableOpacity
                activeOpacity={0.7}
                // onPress={() => this.props.navigation.navigate(item.item.navi)}
                style={{
                  paddingVertical: 10,
                  flexDirection: 'row',
                  paddingHorizontal: 5,
                  marginTop: '80%',
                }}>
                <Image
                  source={item.item.image2}
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 90,
                    borderWidth: 1,
                    borderColor: 'red',
                  }}
                />
                <View style={{marginHorizontal: '5%', top: 5}}>
                  <Text
                    style={{color: '#fff', fontWeight: 'bold', fontSize: 15}}>
                    {item.item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            </ImageBackground>
            <View
              style={{
                flexDirection: 'column',
                marginHorizontal: '5%',
                marginTop: 10,
              }}>
              <Text style={{color: '#fff', fontSize: 15}}>
                {item.item.text}
              </Text>
              <Text style={{color: '#4A5469', fontSize: 12}}>
                {item.item.text2}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Stream_Events;
