import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CategoryBotton = () => {
  return (
    <>
      <View style={styles.topText}>
        <Text style={{color: 'white'}}>Select Your Talent Category:</Text>
      </View>
    </>
  );
};

export default CategoryBotton;

const styles = StyleSheet.create({
  topText: {
    backgroundColor: 'red',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});
