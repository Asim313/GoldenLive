import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState, memo} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import SeatUser from './SeatUser';
import NoUserSeat2 from './NoUserSeat2';
import TwoSeatsLogic from './twoSeatsLogic';

const MultiSeatsLogic = memo(
  ({
    cohostData,
    handleLongPress,
    handlePress,
    callAllow,
    takeSeat,
    activeSpkeaker,
    selectSeats,
  }) => {

    // const [cohostData, setCohostData] = useState([])
    // useEffect(() => {
    //   let check = cohostData1?.[0] ? cohostData1?.sort((a, b) => {
    //     // Convert seatId to numbers if they are strings
    //     const seatIdA = typeof a.seatId === 'string' ? parseInt(a.seatId) : a.seatId;
    //     const seatIdB = typeof b.seatId === 'string' ? parseInt(b.seatId) : b.seatId;
      
    //     return seatIdA - seatIdB;
    //   }) : []
    //   setCohostData(check)
    //   //  console.log("cohost data", check?.filter((item) => item?.cohostID === 100013144))
    // }, [cohostData1])

    const renderItem = ({item, index}) => {
      return (
        <View style={{ padding: 3}}>
          {!item?.value || item?.isLocked ? (
            <NoUserSeat2
              item={item}
              callAllow={callAllow}
              takeSeat={takeSeat}
              handleLongPress={handleLongPress}
              onPress={() => handlePress(item)}
            />
          ) : (
            <SeatUser item={item} onPress={() => handlePress(item)} />
          )}
        </View>
      );
    };


    return (
      <View
        style={{
          height: heightPercentageToDP(100),
          width: widthPercentageToDP(100),
          top: heightPercentageToDP(4),
        
        }}>
        {selectSeats == 5 ? (
          <View
            style={{
              flexDirection: 'row',
              // marginLeft: 5,
              // marginTop: 10,
              height: heightPercentageToDP(30),
            }}>
            <View style={{flex: 1}}>
              <TwoSeatsLogic
                cohostData={cohostData?.[0]}
                callAllow={callAllow}
                handleLongPress={handleLongPress}
                takeSeat={takeSeat}
                onPress={() => handlePress(cohostData?.[0])}
              />
            </View>

            <View style={{flex: 1}}>
              <FlatList
                data={[...cohostData]?.splice(1, 4)}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                contentContainerStyle={{
                  justifyContent: 'center',
                  flex: 1,
                  padding: 2,
                }}
              />
            </View>
          </View>
        ) : null}
        {selectSeats == 2 ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: widthPercentageToDP(100),
            }}>
            <TwoSeatsLogic
              cohostData={cohostData?.[0]}
              callAllow={callAllow}
              handleLongPress={handleLongPress}
              takeSeat={takeSeat}
              onPress={() => handlePress(cohostData?.[0])}
            />
            <TwoSeatsLogic
              cohostData={cohostData?.[1]}
              callAllow={callAllow}
              handleLongPress={handleLongPress}
              takeSeat={takeSeat}
              onPress={() => handlePress(cohostData?.[1])}
            />
          </View>
        ) : null}
        {selectSeats == 8 ? (
          <FlatList
            data={[...cohostData]?.splice(0, 8)}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={4}
            contentContainerStyle={{
              justifyContent: 'center',
              padding: 2,
              alignItems: 'center',
            }}
          />
        ) : null}
        {selectSeats == 9 ? (
          <View
            style={{
              width: widthPercentageToDP(100),
              height: heightPercentageToDP(53),
              justifyContent: 'center',
              alignItems: 'center',
              
            }}>
            <View style={{flexDirection: 'row', height: 200}}>

              <View style={{flex: 1}}>
                <TwoSeatsLogic
                  cohostData={cohostData?.[0]}
                  callAllow={callAllow}
                  handleLongPress={handleLongPress}
                  takeSeat={takeSeat}
                  onPress={() => handlePress(cohostData?.[0])}
                />
              </View>

              <View style={{flex: 1, right: 5}}>
                <FlatList
                  data={[...cohostData]?.slice(1, 5)}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={2}
                  contentContainerStyle={{
                    alignItems: 'center',
                  }}
                />
              </View>

            </View>

<View style={{flex: 1, top: 10,}}>
            <FlatList
              data={[...cohostData]?.slice(5, 9)}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={4}
              contentContainerStyle={{
           
              }}
              />
              </View>
          </View>
        ) : null}
        {selectSeats == 12 ? (
          <FlatList
            data={[...cohostData]?.slice(0, 12)}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={4}
            contentContainerStyle={{flex: 1, alignItems: 'center'}}
          />
        ) : null}
        {selectSeats == 16 ? (
          <FlatList
            data={[...cohostData]?.slice(0, 16)}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={4}
            contentContainerStyle={{flex: 1, alignItems: 'center'}}
          />
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  itemContainer: {

  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#303749',
  },
  checkIcon: {
    position: 'absolute',
  },
  selectedIconContainer: {
    // backgroundColor: 'red',
  },
  lockIcon: {
    position: 'absolute',
  },
  imageContainer: {
    borderRadius: 35,
    overflow: 'hidden',
  },
  selectedImageContainer: {
    borderWidth: 2,
    borderColor: '#007aff',
  },
  image: {
    width: 60,
    height: 60,
  },
});

export default MultiSeatsLogic;
