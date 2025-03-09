import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import StoreRBSheetCom from '../../components/StoreRBSheetCom';
import Header from '../reuseable_Component/Header';

const Frames = ({route}) => {
  const {frameData,name} = route.params;


  const renderListItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View
        style={{
          height: '70%',
          width: '100%',
          // backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{
            uri: item?.image,
          }}
          style={styles.image1}
        />
      </View>
      <View
        style={{
          height: '30%',
          width: '95%',
          // backgroundColor: 'green',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            width: '50%',
            flexDirection: 'row',
            // backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Image
            source={require('../../assets/images/store/coin.png')}
            style={styles.image2}
          />
          <Text style={styles.itemText}>{item?.beans}</Text>
        </View>
        <StoreRBSheetCom data={item} />
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/back.png')}
      style={{flex: 1, alignItems: 'center'}}>
      <View style={{height: '7%', width: '100%'}}>
        <Header name={name}/>
      </View>
      <View
        style={{
          height: '93%',
          width: '100%',
          backgroundColor: '#4E1801',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <FlatList
          data={frameData}
          renderItem={renderListItem}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </View>
    </ImageBackground>
  );
};
export default Frames;

const styles = StyleSheet.create({
  itemContainer: {
    height: 150,
    width: '42%',
    flexDirection: 'column',
    backgroundColor: '#0000008C',
    borderRadius: 8,
    margin: '3%',
    overflow: 'hidden',
    left: '3%',
  },
  image1: {
    width: 90,
    height: 90,
  },
  image2: {
    width: 20,
    height: 20,
  },
  itemText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
});
