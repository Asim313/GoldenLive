import React, {memo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {RtcSurfaceView} from 'react-native-agora';
import {useSelector} from 'react-redux';
import {truncateAfterTenCharacters} from '../../../Services/GlobalFuntions';
import {BlurView} from '@react-native-community/blur';
import AnimatedLottieView from 'lottie-react-native';

const CohostStyle = memo(({item, onPressCohost}) => {
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);
  const speakerData = useSelector(state => state.hostRed.volumeIndicator)

  // console.log("speakers dat", speakerData, item)
  //  console.log('item', item);
  return (
    <TouchableOpacity onPress={() => onPressCohost && onPressCohost(item?.id)}>
      {item?.id && (
        <View style={styles.border}>
          {parseInt(item?.cameraOn) === 0 ? (
            <View>
              <ImageBackground
                source={{uri: item?.image}}
                style={styles.cohostStyle}>
                  <View style={styles.absolute} />
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                  }}>
                    {(item?.id === speakerData?.id && speakerData?.volume > 0 ) &&
                  <View style={{position: 'absolute'}}>
                    <AnimatedLottieView
                      autoPlay
                      style={{
                        width: 60,
                        height: 60,
                      }}
                      source={require('../../../assets/json/audio-waves.json')}
                    />
                  </View>
}
                  <Image
                    source={{uri: item?.image}}
                    style={{height: 35, width: 35, borderRadius: 45}}
                  />
                </View>

                {/* Your other content goes here */}
              </ImageBackground>
            </View>
          ) : (
            <React.Fragment
              key={parseInt(item?.id == userUpdatedData?.id ? 0 : item?.id)}>
              <RtcSurfaceView
                canvas={{
                  uid: parseInt(item?.id == userUpdatedData?.id ? 0 : item?.id),
                }}
                style={styles.cohostStyle}
              />
            </React.Fragment>
          )}

          <View style={{position: 'absolute', left: 5}}>
            <View style={{width: 116, top: 84, height: 15}}>
              <Text style={{fontSize: 11, color: 'white'}}>
                {truncateAfterTenCharacters(item?.name)}
              </Text>
            </View>
            <View
              style={{
                width: 116,
                top: 70,
                height: 15,
                position: 'absolute',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Image
                source={require('../../../assets/images/coin.png')}
                style={{height: 12, width: 12, right: 2}}
              />
              <Text style={{fontWeight: 'bold', fontSize: 11, color: 'white'}}>
                {item?.giftsReceived ?? 0}
              </Text>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
});

export default CohostStyle;

const styles = StyleSheet.create({
  cohostStyle: {
    width: 92,
    height: 102,
  },
  border: {
    width: 94,
    height: 104,
    overflow: 'hidden',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'white',
  },
  absolute: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
