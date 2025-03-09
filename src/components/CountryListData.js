import React, {memo, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { selectCountryToSearch } from '../Redux/Actions';

const CountryListData = memo(({onPressCountry, countryListData, selectedCountry}) => {
const dispatch = useDispatch()
  const renderItem = ({item, index}) => {
   // console.log("item", item)
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.itemContainer,
            selectedCountry === item?.id && styles.selectedItemIdList,
          ]}
          onPress={() => {
            dispatch(selectCountryToSearch(item?.id))
            onPressCountry()
            //onPressCountry(item?.id)
          }}>
            <View>
          <Image source={{uri: item?.flag}} style={styles.img}></Image>
            </View>
            <View>
           

            </View>
          <Text
            style={[
              styles.itemText,
              selectedCountry === item?.id && styles.selectedItemText,
            ]}>
            {item?.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold', left: 15, marginVertical: 10}}>Countries and regions</Text>
      <FlatList
      numColumns={2}
      contentContainerStyle={{paddingBottom: heightPercentageToDP(10)}}
        data={countryListData}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
});

export default CountryListData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    // borderBottomWidth: 0.3,
    borderBottomColor: 'grey',
    flexDirection: 'row',
  },
  img: {
    marginBottom: 2,
    width: 50,
    height: 23,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'black',
    left: 5,
  },
  selectedItemText: {
    fontWeight: 'bold',
    color: 'black',
  },
  selectedItemIdList :{
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
    //backgroundColor: '#FFFFFF',
  },
  itemContainer: {
    backgroundColor: '#F0F0F2',
    width: 140,
   // opacity: 0.7,
    
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
   // justifyContent: 'center',
    alignItems: 'center',
  },
});
