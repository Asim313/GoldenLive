// NoUserSeat.js
import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AllIcons, {IconList} from '../../components/AllIcons';

const NoUserSeatForStream = ({
  item,
  callAllow,
  takeSeat,
  handleLongPress,
  data,
}) => {
 
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => callAllow === true && takeSeat(item?.id)}
      onLongPress={() => handleLongPress(item?.id, item?.isLocked)}>
      <View
        style={{
          height: 100,
          borderRadius: 7,
          width: 90,
          margin: 3,
          backgroundColor: 'rgba(58, 7, 44, 0.5)'
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: '3%',
            marginTop: '2%',
          }}>
          {item?.isLocked ? (
            <AllIcons
              name={IconList.MaterialCommunityIcons}
              iconName={'lock-outline'}
              size={15}
              color="#FFF"
              style={styles.isLocked}
            />
          ) : callAllow === true ? (
            <AllIcons
              name={IconList.MaterialCommunityIcons}
              iconName="plus"
              size={15}
              color="#FFF"
            />
          ) : (
            <AllIcons
              name={IconList.MaterialCommunityIcons}
              iconName="seat"
              size={15}
              color="#FFF"
            />
          )}
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}>
          <Image
            source={require('../../assets/images/person.png')}
            style={{width: 30, height: 30, borderRadius: 50}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NoUserSeatForStream;
const styles = StyleSheet.create({
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#303749',
  },

  imageContainer: {
    borderRadius: 35,
    overflow: 'hidden',
  },
});
