import { StyleSheet, Text, View ,TouchableOpacity,Image} from 'react-native'
import React from 'react'
import AllIcons from '../../../components/AllIcons';
import { shareToWhatsApp } from '../../reuseable_Component/SocialShare';
import { useSelector } from 'react-redux';

const ThreeBarSheet = ({flipCamera, onPressChat, onPressSticker, fromAudio, onPressPlayMusic, handleRoomClick}) => {
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);

  return (
    <View style={{alignSelf: 'center', marginHorizontal: 10}}>
                <Text
                  style={{
                    borderColor: 'white',
                    marginHorizontal: 20,
                  }}></Text>
                <View style={styles.rbIconbox}>
                  <View style={styles.gameIconView}>
                    <TouchableOpacity
                     // onPress={() => onPressSticker()}
                      style={[styles.gameIconbox]}>
                     
                     <Image
                        source={require('../../../assets/images/StreamingMenuIcons/stickers.png')}
                        style={{height: 50, width: 50, resizeMode: 'contain'}}
                      />
                    </TouchableOpacity>
                    <Text style={styles.gametxt}>Steakers</Text>
                  </View>
                  <View style={styles.gameIconView}>
                    <TouchableOpacity
                      onPress={() => {
                         onPressPlayMusic() && onPressPlayMusic()
                      }}
                      style={[styles.gameIconbox]}>
                      <Image
                        source={require('../../../assets/images/StreamingMenuIcons/music.png')}
                        style={{height: 50, width: 50, resizeMode: 'contain'}}
                      />
                    </TouchableOpacity>
                    <Text style={styles.gametxt}>Music</Text>
                  </View>
                  <View style={styles.gameIconView}>
                    <TouchableOpacity
                      style={[
                        styles.gameIconbox,
                        {backgroundColor: '#FFBB2D'},
                      ]}>
                      <Image
                        source={require('../../../assets/images/StreamingMenuIcons/beans.png')}
                        style={{height: 50, width: 50, resizeMode: 'contain'}}
                      />
                    </TouchableOpacity>
                    <Text style={styles.gametxt}>Beans</Text>
                  </View>
                  <View style={styles.gameIconView}>
                    <TouchableOpacity
                      onPress={handleRoomClick}
                      style={[
                        styles.gameIconbox,
                      ]}>
                     <Image
                        source={require('../../../assets/images/StreamingMenuIcons/roomEffects.png')}
                        style={{height: 50, width: 50, resizeMode: 'contain'}}
                      />
                    </TouchableOpacity>
                    <Text style={styles.gametxt}>Room Settings</Text>
                  </View>

                  {!fromAudio && 
                  <View style={styles.gameIconView}>
                    <TouchableOpacity
                      onPress={() => flipCamera()}
                      style={[
                        styles.gameIconbox
                        ]}>
                      <Image
                        source={require('../../../assets/images/StreamingMenuIcons/flipCamera.png')}
                        style={{height: 50, width: 50, resizeMode: 'contain'}}
                      />
                    </TouchableOpacity>
                    <Text style={styles.gametxt}>Flip Camera</Text>
                  </View>
                  }
                  
                  <View style={styles.gameIconView}>
                    <TouchableOpacity
                      style={[
                        styles.gameIconbox
                      ]}>
                      <Image
                        source={require('../../../assets/images/StreamingMenuIcons/mirror.png')}
                        style={{height: 50, width: 50, resizeMode: 'contain'}}
                      />
                    </TouchableOpacity>
                    <Text style={styles.gametxt}>Mirror On</Text>
                  </View>
                  <View style={styles.gameIconView}>
                    <TouchableOpacity
                      onPress={() => onPressChat()}
                      style={[
                        styles.gameIconbox
                      ]}>
                    <Image
                        source={require('../../../assets/images/StreamingMenuIcons/chat.png')}
                        style={{height: 50, width: 50, resizeMode: 'contain'}}
                      />
                     </TouchableOpacity>
                    <Text style={styles.gametxt}>Chat</Text>
                  </View>
                  <View style={styles.gameIconView}>
                    <TouchableOpacity
                      onPress={() =>
                        shareToWhatsApp(
                          userUpdatedData?.nick_name ??
                            userUpdatedData?.full_name,
                          userUpdatedData?.id,
                        )
                      }
                      style={[
                        styles.gameIconbox
                      ]}>
                      <Image
                        source={require('../../../assets/images/StreamingMenuIcons/share.png')}
                        style={{height: 50, width: 50, resizeMode: 'contain'}}
                      />
                    </TouchableOpacity>
                    <Text style={styles.gametxt}>Share</Text>
                  </View>
                </View>
            
              </View>
  )
}

export default ThreeBarSheet

const styles = StyleSheet.create({
    rbIconbox: {
        marginTop: 25,
        flexDirection: 'row',
        flexWrap: 'wrap',
      },

    gameIconView: {
      marginVertical: 5,
      alignItems: 'center',
      width: '25%',
    } ,
    gametxt: {
        color: '#FFFFFF',
        width: 90,
        textAlign: 'center',
        fontSize: 12,
        marginVertical: 5,
      },
      gameIconbox: {
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
       // backgroundColor: 'green',
      },
})
