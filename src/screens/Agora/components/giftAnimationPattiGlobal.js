import AnimatedLottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import { truncateAfterThreeCharacters } from '../../../Services/GlobalFuntions';
import { fetchFromJson } from '../../../Services/RnFetchBlob/rnFetchBlobJson';

const GiftAnimationPattiGlobal = ({value, removeItem}) => {
//  console.log("???????????????????????????????", value)
  const [jasonGift, setJasonGift] = useState(null)
 const check = async () => {
  let jasonGift = 'https://www.golden-live.com/images/gifs/giftjson/dragn.json';
  let file = await fetchFromJson(jasonGift);
  setJasonGift(file);
};

useEffect(() => {
  check()
}, [value])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    
      }}>
    {(value && jasonGift) && 
      <>
    <AnimatedLottieView
        autoPlay
        onAnimationFinish={() => {
          removeItem()
      }}
        loop={false}
        style={{
          left: 15,
          height: 200,
        }}
        source={jasonGift}
      />

      <View style={{position: 'absolute', flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={{uri: value?.senderImage}} style={{height: 30, width: 30, borderRadius: 35, right: 65, top: 22}} />
 
        <View>

        <Text style={{fontSize: 11, color: 'white', top: 22, right: 20, width: 150}}>{value?.senderName}</Text>
        <Text style={{fontSize: 11, color: 'white', top: 28, right: 50, width: 120}}>send gift to {truncateAfterThreeCharacters(value?.receiverName)}</Text>
        </View>
      </View>
      </>
}
    </View>
  );
};

export default GiftAnimationPattiGlobal;
