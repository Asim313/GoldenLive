import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
const RecordsToShow = ({selectedItem, filterRecord}) => {
  const [selectedCategory, setSelectedCategory] = useState({id: 1, title: 'Today'});

  useEffect(() => {
    console.log('selecte item main bg coor', selectedItem?.selectedDaysMainBgColor)
    setSelectedCategory({id: 1, title: 'Today'})
  }, [selectedItem])


  const list = [
    {id: 1, title: 'Today'},
    {id: 2, title: '7 Days'},
    {id: 3, title: '30 Days'},
  ];

  const handleFitlerRecord = (data) => {
    filterRecord(data)
    setSelectedCategory(data)
  }
  return (
    <View
      style={[styles.mainContainerBox, {backgroundColor: selectedItem?.selectedDaysMainBgColor, borderColor: selectedItem?.unselectedDaysTxtColor}]}>
      <FlatList
       data={list}
       contentContainerStyle={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5}}
       renderItem={({item, index}) => {
        return(
            <TouchableOpacity style={{backgroundColor: selectedCategory?.id === item?.id ? selectedItem?.selectedDaysBgColor : 'transparent', ...styles.txtConatiner }} onPress={() => handleFitlerRecord(item)}>
                <Text style={[selectedCategory?.id === item?.id ? {...styles.selectedFontStyle, color: selectedItem?.selectedDaysTxtColor}: { fontSize: 13, color: selectedItem?.unselectedDaysTxtColor}]}>
                    {item?.title}
                </Text>
            </TouchableOpacity>
        )
       }}
      />
    </View>
  );
};

export default RecordsToShow;

const styles = StyleSheet.create({
  mainContainerBox: {
    marginHorizontal: 30,
    borderRadius: 30,
    paddingVertical: 5,
    borderWidth: 0.5,
  },
  selectedFontStyle: {
    fontWeight: '500',
    fontSize: 13,
  },
  simpleFontStyle: {
    fontSize: 13,
    // color: '#D38FFC'
  },
  txtConatiner: {
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
