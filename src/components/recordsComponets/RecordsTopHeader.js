import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import globalStyles from '../../utils/styles/global-styles';
import {useSelector} from 'react-redux';
import { formatNumerWithK, truncateAfterTenCharacters } from '../../Services/GlobalFuntions';

const RecordsTopHeader = ({selectedItem, topUsersData, top1, top2, top3}) => {
  return (
    <View style={globalStyles.mainContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'flex-end',
          flex: 1.6,
        }}>
            <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('../../assets/images/records/frames.png')} style={styles.smallFrameStyle} />
                <Image source={{uri: topUsersData?.[1]?.image}} style={[styles.userImageStyle, {position: 'absolute', top: 28}]} />
                <Text style={styles.topUsersNameStyle}>{truncateAfterTenCharacters(topUsersData?.[1]?.name)}</Text>
                <View style={{backgroundColor: selectedItem?.topCoinsBgColor, ...styles.coinsMainStyle}}>
                    <Image style={{height: 18, width: 18, right: 3}} source={require('../../assets/images/records/coin.png')} />
                    <Text style={styles.coinsStyle}>{formatNumerWithK(topUsersData?.[1]?.total_beans)}</Text>
                </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', bottom: 20}}>
                <Image source={require('../../assets/images/records/top1Frame.png')} style={styles.top1stFrameStyle} />
                <Image source={{uri: topUsersData?.[0]?.image}} style={[styles.top1stImageStyle, {position: 'absolute', top: 30}]} />
                <Text style={styles.topUsersNameStyle}>{truncateAfterTenCharacters(topUsersData?.[0]?.name)}</Text>
                <View style={{backgroundColor: selectedItem?.topCoinsBgColor, ...styles.coinsMainStyle}}>
                    <Image style={{height: 18, width: 18, right: 3}} source={require('../../assets/images/records/coin.png')} />
                    <Text style={styles.coinsStyle}>{formatNumerWithK(topUsersData?.[0]?.total_beans)}</Text>
                </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('../../assets/images/records/frames.png')} style={styles.smallFrameStyle} />
                <Image source={{uri: topUsersData?.[2]?.image}} style={[styles.userImageStyle, {position: 'absolute', top: 28}]} />
                <Text style={styles.topUsersNameStyle}>{truncateAfterTenCharacters(topUsersData?.[2]?.name)}</Text>
                <View style={{backgroundColor: selectedItem?.topCoinsBgColor, ...styles.coinsMainStyle}}>
                    <Image style={{height: 18, width: 18, right: 3}} source={require('../../assets/images/records/coin.png')} />
                    <Text style={styles.coinsStyle}>{formatNumerWithK(topUsersData?.[2]?.total_beans)}</Text>
                </View>
            </View>

        </View>

      <View style={styles.topBoxStyle}>
        <Image style={{height: 85, width: 125}} source={top2} />
        <Image style={{height: 112, width: 133}} source={top1} />
        <Image style={{height: 85, width: 125}} source={top3} />
      </View>
    </View>
  );
};

export default RecordsTopHeader;

const styles = StyleSheet.create({
  topBoxStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    top: 15,
    overflow: 'hidden',
  },
  top2ImageStyle: {height: 70, width: 70, borderRadius: 50},
  userImageStyle: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  smallFrameStyle: {height: 100, width: 74},
  top1stFrameStyle: {
    height: 120,
    width: 91,
  },
  top1stImageStyle: {
    height: 88,
    width: 88,
    borderRadius: 50,
  },
  topUsersNameStyle: {
    color: 'white',
    fontSize: 11,
    top: 5,
  },
  coinsStyle: {
    fontSize: 9,
    color: 'white',
    fontWeight: '500'
  },
  coinsMainStyle: {
    flexDirection: 'row',
    top: 15,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
