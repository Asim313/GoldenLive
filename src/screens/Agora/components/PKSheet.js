import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AllIcons, {IconList} from '../../../components/AllIcons';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {formatNumerWithK} from '../../../Services/GlobalFuntions';

const PKSheet = ({onPressRandomPk, onPressCross}) => {
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);
  const socket = useSelector(state => state?.homeRed?.socketConnection);

  const Hello = () => {
    console.log('Hellooooooooooo');
  };

  const handleRandomPkButton = async () => {
   await socket.emit({channel: '1122', user_id: userUpdatedData?.id});
   console.log('done');
  }

  const ComponentSheet = props => (
    <TouchableOpacity onPress={props.onPress} style={{width: '48%'}}>
      <LinearGradient
        colors={[
          props.valueOne ? props.valueOne : '#365FB6',
          props.valueTwo ? props.valueTwo : '#062058',
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          paddingBottom: 25,
          width: '100%',
          height: '90%',
          borderRadius: 15,
          overflow: 'hidden',
        }}>
        <Text style={styles.smallViewTitle}>{props.title}</Text>
        <Text style={styles.battleStyle}>{props.battle}</Text>
        <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
          <Image
            style={{
              height: heightPercentageToDP(9),
              width: widthPercentageToDP(31),
              //  top: heightPercentageToDP(3.5),
            }}
            source={props.imageBattle}
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1, justifyContent: 'space-evenly', margin: 20}}>


      <View style={{flex: 1.3}}>
        <LinearGradient
          colors={['#9E07D3', '#FF0064']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 15,
          }}>
          <View
            style={{
              width: '100%',
              height: '50%',
              marginHorizontal: 10,
              justifyContent: 'space-evenly',
            }}>
            <View style={{bottom: 10}}>
              <Text style={styles.pkRandomTitleStyle}>PK Random Match</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{height: 16, width: 16}}
                  source={require('../../../assets/images/earning1.png')}
                />
                <Text style={{color: 'white', fontSize: 11, left: 5}}>
                  {formatNumerWithK(userUpdatedData?.beans)}
                </Text>
              </View>
            </View>

            <View
              style={{
                justifyContent: 'center',
                position: 'absolute',
                width: '100%',
                alignItems: 'flex-end',
              }}>
              <Image
                style={{height: 90, width: 120}}
                source={require('../../../assets/images/PKFile/randomPk.png')}
              />
            </View>
          </View>

          <View style={{width: '95%', height: '60%', marginHorizontal: 10}}>
            <View
              style={{
                backgroundColor: 'rgba(209, 78, 255, 0.5)',
                height: '75%',
                borderRadius: 12,
                justifyContent: 'space-evenly',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <View
                  style={[
                    styles.randomPkStyleBottom,
                    {flexDirection: 'row', justifyContent: 'center'},
                  ]}>
                  <Image
                    source={{uri: userUpdatedData?.image}}
                    style={{height: 35, width: 35, borderRadius: 100, right: 4}}
                  />
                  <View style={styles.randomPkStyleBottom}>
                    <Text style={[styles.randomBoxText, {color: '#FFF385'}]}>
                      No. 32
                    </Text>
                    <Text style={styles.randomBoxText}>Rank</Text>
                  </View>
                </View>
                <View style={styles.randomPkStyleBottom}>
                  <Text style={[styles.randomBoxText, {color: '#FFF385'}]}>
                    1 pts
                  </Text>
                  <Text style={styles.randomBoxText}>Rank</Text>
                </View>
                <View style={styles.randomPkStyleBottom}>
                  <Text style={[styles.randomBoxText, {color: '#FFF385'}]}>
                    --
                  </Text>
                  <Text style={styles.randomBoxText}>Rank</Text>
                </View>
              </View>

              <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => onPressRandomPk()}>
                <Image
                  source={require('../../../assets/images/PKFile/randomPkBtn.png')}
                  style={{height: 23, width: 120}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.outSideTwoSmallView}>
        <ComponentSheet
          title="Invite To PK"
          // battle="Win the Battle"
          imageBattle={require('../../../assets/images/PKFile/inviteToPk.png')}
          width={175}
          valueOne="#AC07E5"
          valueTwo="#E086FF"
          heightPic={heightPercentageToDP(10)}
          widthPic={widthPercentageToDP(31)}
          // BottomPic={15}
          onPress={() => Hello()}
        />
        <ComponentSheet
          title="Team PK"
          // battle="3v3"
          imageBattle={require('../../../assets/images/PKFile/teamPk.png')}
          width={175}
          valueOne="#FF1D75"
          valueTwo="#FF70A8"
          heightPic={heightPercentageToDP(8)}
          widthPic={widthPercentageToDP(27)}
          onPress={() => Hello()}
        />
      </View>
    </View>
  );
};
export default PKSheet;
const styles = StyleSheet.create({
  icon: {
    color: 'white',
    paddingHorizontal: 5,
  },
  smallViewTitle: {
    fontSize: 18,
    marginLeft: 10,
    marginTop: 12,
    // fontWeight: '900',
    color: 'white',
    fontFamily: 'BalooBhaijaan2-Bold',
  },
  battleStyle: {
    fontSize: 14,
    marginLeft: 5,
    marginTop: 5,
    fontWeight: '600',
    color: 'white',
  },
  outSideTwoSmallView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 15,
    width: '100%',
  },
  UpperIconsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  pkRandomTitleStyle: {
    color: 'white',
    fontFamily: 'BalooBhaijaan2-Bold',
    fontSize: 24,
    // fontWeight: 'bold',
  },
  randomPkStyleBottom: {
    height: 40,
    width: '33%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  randomBoxText: {fontSize: 11, color: 'white'},
});
