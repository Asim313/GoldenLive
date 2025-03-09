import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import AllIcons, {IconList} from '../../components/AllIcons';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import UserOnSeat from './userOnSeat';
import StickerAnimatedBox from '../../components/Animation/stickerMoveAnimation';
import RNFetchBlob from 'rn-fetch-blob';
import {fetchFromJson} from '../../Services/RnFetchBlob/rnFetchBlobJson';
import { useSelector } from 'react-redux';
const SeatsLogic = memo(
  ({
    cohostData,
    handleLongPress,
    handlePress,
    callAllow,
    takeSeat,
    handleAnimationEnd,
  }) => {
    const [selectedItems, setSelectedItems] = useState([]);

    const [sticker, setSticker] = useState(null);
    const [receiverPosition, setReceiverPosition] = useState(null)
    const [senderPosition, setSenderPosition] = useState(null)

    const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);

    useEffect(() => {
        // console.log("speakerrrrrrrrrrrrrrrr",  cohostData)
      let data = cohostData?.filter(item => item?.sticker);
      // let senderPose = cohostData?.filter(item => item?.cohostID === userUpdatedData?.id);
      // console.log("kkkkkkkkkkkkkkkkkkkkkk", cohostData?.filter(item => item?.cohostID === userUpdatedData?.id))
      // setSenderPosition({})
      if (data?.[0]?.sticker) {

        console.log("setk>>>>>>>>>!!!!!!!!!!!!!!!!!!!!!!!!", data?.[0]?.senderPositionY, data?.[0]?.senderPositionX )
        setSenderPosition({x: data?.[0]?.senderPositionX, y: data?.[0]?.senderPositionY})
        setReceiverPosition({x: data?.[0]?.receiverSeatX, y: data?.[0]?.receiverSeatY})
        check(data?.[0]?.sticker);
      } else {
        setSenderPosition(null)
        setSenderPosition(null)
        setSticker(null);
      }
    }, [cohostData]);

    const check = async jasonGift => {
      let file = await fetchFromJson(jasonGift);
      setSticker(file);
    };

    const renderItem = ({item, index}) => {
      const isSelected = selectedItems.includes(index);
      // console.log("item", item?.json_image)
      if (!item?.value || item?.isLocked) {
        return (
          <View style={styles.itemContainer}>
            <TouchableOpacity
              style={{}}
              onPress={() => callAllow === true && takeSeat(item?.id)}
              onLongPress={() => handleLongPress(item?.id, item?.isLocked)}>
              <View style={styles.itemContainer}>
                <View style={styles.iconContainer}>
                  {item?.isLocked ? (
                    <AllIcons
                      name={IconList.MaterialCommunityIcons}
                      iconName={'lock-outline'}
                      size={20}
                      color="#FFF"
                      style={styles.lockIcon}
                    />
                  ) : callAllow === true ? (
                    <AllIcons
                      name={IconList.MaterialCommunityIcons}
                      iconName="plus"
                      size={20}
                      color="#FFF"
                    />
                  ) : (
                    <AllIcons
                      name={IconList.MaterialCommunityIcons}
                      iconName="seat"
                      size={20}
                      color="#FFF"
                    />
                  )}
                </View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 9,
                    fontWeight: 'bold',
                    top: 5,
                  }}>
                  {item.id}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      } else {
        return (
          <UserOnSeat
            item={item}
            handlePress={handlePress}
            isSelected={isSelected}
            handleAnimationEnd={handleAnimationEnd}
          />
        );
      }
    };

    return (
      <View>
        {(sticker) && (
          <View style={{position: 'absolute', zIndex: 5}}>
            <StickerAnimatedBox
              position={{x: parseInt(senderPosition?.x )|| 0, y: parseInt(senderPosition?.y) || 0}}
              // toValue={{ x: item?.receiverSeatX || 0, y: item?.receiverSeatY || 0 }}
              toValue={{x: parseInt(receiverPosition?.x) || 0, y: parseInt(receiverPosition?.y) || 0}}
              sticker={sticker}
            />
          </View>
        )}
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <FlatList
            data={[...cohostData]?.splice(0, 2)}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
          />
          <FlatList
            data={[...cohostData]?.splice(2, 8)}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={4}
          />
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  itemContainer: {
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
    width: widthPercentageToDP(23),
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(48, 55, 73, 0.4)',
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
    width: 40,
    height: 40,
  },
});

export default SeatsLogic;
