import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import TopHostLine from './TopHostLine';
import CrossSideTopLine from './CrossSideTopLine';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import { useSelector } from 'react-redux';
import { formatNumerWithK } from '../../../../Services/GlobalFuntions';
const TopLineFinalComponet = React.memo(({
  onPressCross,
  onpresS,
  data2,
  userUpdateDataNickName,
  onPress2,
  isStopwatchStart,
  resetStopwatch,
  updatedCoins,
  data,
  hostData,
  hostId,
  hostImage,
  starLevelImage,
  onPressStarLevel,
  isFollowing,
  onPressFollow,
  fromAudiencePage,
  completeHostData,
  frameData,
  onPressHostImage
}) => {

  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);
  const hostUpdatedBeans = useSelector(state => state.hostRed.hostBeans);
  //  console.log("hostiddddddddd!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", hostUpdatedBeans)
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',

        justifyContent: 'space-evenly',
      }}>
      <View style={styles.profilecontainer}>
        <View style={styles.profilebox}>
          <TopHostLine
            onPressHostImage={() => onPressHostImage()}
            completeHostData={completeHostData}
            fromAudiencePage={fromAudiencePage}
            onPressFollow={() => onPressFollow()}
            isFollowing={isFollowing}
            hostData={hostData}
            frameProfileUpdate={frameData}
            userUpdateDataNickName={userUpdateDataNickName}
            hostId={hostId}
            hostImage={hostImage}
          />
        </View>
      </View>
      <View style={{}}>
        <ImageBackground style={styles.container}>
          <View style={styles.header}>
            <CrossSideTopLine
              onPressCross={() => onPressCross()}
              onpresS={onpresS}
              data={data}
              data2={data2}
            />
          </View>
        </ImageBackground>
      </View>
      <View style={styles.Likebox}>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

          <TouchableOpacity onPress={() => {
            console.log("herwerjsdfkljkls")
            onPress2()
          }}>
            <View style={[styles.Kbox, { marginBottom: 5 }]}>
              <Image
                source={require('../../../../assets/images/coin.png')}
                style={{ height: 16, width: 16, marginRight: 2 }}
              />
              <Text style={styles.Ktxt}>
                {formatNumerWithK(hostUpdatedBeans ?? 0)}
              </Text>
            </View>
          </TouchableOpacity>

          {starLevelImage &&
            <TouchableOpacity
              onPress={() => {
                onPressStarLevel()
              }}>
              <View style={[{ marginBottom: 5, backgroundColor: 'transparent' }]}>
                <Image
                  source={{ uri: starLevelImage }}
                  style={{
                    height: 15,
                    width: 60,
                  }}
                />
                {/* <Text style={styles.Ktxt}>06 Stars</Text> */}
              </View>
            </TouchableOpacity>
          }
        </View>

        {isStopwatchStart &&
          <View style={[styles.Starbox, { width: 80 }]}>
            <Stopwatch
              laps
              start={isStopwatchStart}
              reset={resetStopwatch}
              //msecs
              // getMsecs={(time) => handleGetTime(time)}
              options={options}
            />
          </View>
        }


      </View>
    </View>
  );
});

export default TopLineFinalComponet;

const styles = StyleSheet.create({
  profilecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  Kbox: {
    backgroundColor: 'red',
    paddingHorizontal: 5,
    borderRadius: 15,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilebox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(175, 22, 142, 0.5)',
    borderRadius: 30,

    alignItems: 'center',
    paddingRight: 5,
    paddingLeft: 2,
    width: 135,
  },
  container: {
    flex: 1,
  },

  Likebox: {
    position: 'absolute',
    //flexDirection: 'row',
    top: 55,
    marginLeft: 5,
  },
  Ktxt: {
    color: 'white',
    fontSize: 11,
  },
  Starbox: {
    marginLeft: 5,
    backgroundColor: 'green',
    //paddingHorizontal: 5,
    borderRadius: 15,
    // marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
const options = {
  container: {
    color: 'white',
    marginLeft: 15,
    fontWeight: '400',
    // alignSelf: 'center',
  },
  text: {
    fontSize: 11,
    color: '#FFF',
  },
};
