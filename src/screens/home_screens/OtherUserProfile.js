import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {updateUserData} from '../../Redux/Actions';
export default function OtherUserProfile(props) {
  const {route} = props;
  const {params} = route;
  const {
    userID,
    userName,
    liveID,
    hostName,
    hostCoins,
    hostUuid,
    hostImage,
    Gender,
    Region,
    Birthday,
    Intro,
  } = params;
  const userData = useSelector(state => state.auth.userData);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.mainview}>
      <ImageBackground
        source={require('../../assets/images/image36.png')}
        resizeMode={'stretch'}
        style={{height: '100%', width: '100%'}}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.editprofilebox}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Ionicon name="chevron-back" size={30} color={'white'} />
              </TouchableOpacity>
              <Text style={styles.editprofiletxt}>{hostName}</Text>
            </View>
            {/* <TouchableOpacity>
              <View style={styles.savebox}>
                <Text style={styles.savetxt}>Follow</Text>
              </View>
            </TouchableOpacity> */}
          </View>

          <LinearGradient
            colors={['#4568DC', '#B06AB3']}
            style={styles.imagemaincontainer}>
            <Image
              source={
                hostImage == null
                  ? require('../../assets/images/events.jpg')
                  : {uri: hostImage}
              }
              style={styles.img}
            />
          </LinearGradient>

          <TouchableOpacity>
            <View style={styles.inputmainbox}>
              <View>
                <Text style={styles.nicknametxt}>Nickname</Text>

                <View style={styles.Usernamebox}>
                  <Text style={styles.Usernametxt}>{hostName}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.inputmainbox}>
            <View>
              <Text style={styles.nicknametxt}>ID</Text>

              <View style={styles.Usernamebox}>
                <Text style={styles.Usernametxt}>{hostUuid}</Text>
                {/* <TouchableOpacity>
                  <View style={styles.copybox}>
                    <Text style={styles.copytxt}>Copy</Text>
                  </View>
                </TouchableOpacity> */}
              </View>
            </View>
          </View>

          <TouchableOpacity>
            <View style={styles.inputmainbox}>
              <View>
                <Text style={styles.nicknametxt}>Gender</Text>

                <View style={styles.Usernamebox}>
                  <Text style={styles.Usernametxt}>{Gender}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.inputmainbox}>
              <View>
                <Text style={styles.nicknametxt}>Region</Text>

                <View style={styles.Usernamebox}>
                  <Text style={styles.Usernametxt}>{Region}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.inputmainbox}>
              <View>
                <Text style={styles.nicknametxt}>Birthday</Text>

                <View style={styles.Usernamebox}>
                  <Text style={styles.Usernametxt}>{Birthday}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.inputmainbox}>
              <View>
                <Text style={styles.nicknametxt}>Introduction</Text>

                <View style={styles.Usernamebox}>
                  <Text style={styles.Usernametxt}>{Intro}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity>
              <View style={styles.progressbarmainbox}>
                <View style={styles.progressbaritemmainbox}>
                  <Text style={styles.progressbartitetxt}>Star</Text>
                  <View style={styles.progressbarallitem}>
                    <View style={styles.progressbarlevelbox}>
                      <AntDesign name="heart" color={'red'} />
                      <Text style={styles.leveltxt}>06</Text>
                    </View>
                    <View style={styles.levelupbox}>
                      <Text style={{fontSize: 11, color: 'white'}}>
                        50,000 Beans Up to Level Next
                      </Text>
                    </View>
                    <View style={styles.progressbarlevelbox}>
                      <AntDesign name="heart" color={'red'} />
                      <Text style={styles.leveltxt}>06</Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <Ionicon name="chevron-forward" size={20} color={'white'} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity> */}
          <TouchableOpacity>
            {/* <View style={styles.progressbarmainbox1}>
                <View style={styles.progressbaritemmainbox}>
                  <Text style={styles.progressbartitetxt1}>Wealth</Text>
                  <View style={styles.progressbarallitem}>
                    <View style={styles.progressbarlevelbox1}>
                      <Text style={styles.leveltxt}>Lv.3</Text>
                    </View>
                    <View style={styles.levelupbox1}>
                      <Text style={{fontSize: 11, color: 'white'}}>
                        50,000 Beans Up to Level Next
                      </Text>
                    </View>
                    <View style={styles.progressbarlevelbox1}>
                      <Text style={styles.leveltxt}>Lv.4</Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <Ionicon name="chevron-forward" size={20} color={'white'} />
                  </TouchableOpacity>
                </View>
              </View> */}
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainview: {
    backgroundColor: '#242A38',
    flex: 1,
  },
  header: {
    flexDirection: 'row',

    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editprofilebox: {
    flexDirection: 'row',
    alignItems: 'center',
    // width: widthPercentageToDP(25),
    justifyContent: 'space-between',
  },
  editprofiletxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  savebox: {
    backgroundColor: '#B06AB3',
    padding: 5,
    width: widthPercentageToDP(20),
    borderRadius: 20,
  },
  savetxt: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  imagemaincontainer: {
    backgroundColor: '#303749',
    height: 300,
    width: '100%',

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    alignSelf: 'center',
  },
  camerabox: {
    backgroundColor: 'lightgrey',
    bottom: 40,
    padding: 10,

    borderRadius: 20,
    left: 40,
  },
  imgcontainer: {
    marginTop: 20,
  },
  Usernamebox: {
    flexDirection: 'row',
    top: 4,

    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Usernametxt: {
    fontSize: 15,
    color: 'white',
  },
  nicknametxt: {
    color: '#B06AB3',
    fontSize: 11,
    top: 3,
  },
  inputmainbox: {
    padding: 12,
    borderBottomWidth: 0.4,
    width: '95%',
    alignSelf: 'center',
    borderColor: '#B06AB3',
  },
  copybox: {
    backgroundColor: '#B06AB3',
    height: 20,
    width: 50,
    alignItems: 'center',
    borderRadius: 20,
    bottom: 5,
    justifyContent: 'center',
  },
  copytxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 11,
  },
  introtxt: {
    width: widthPercentageToDP(80),
    fontSize: 12,
    color: 'white',
    marginLeft: 4,
  },
  progressbarmainbox: {
    padding: 20,
    flexDirection: 'row',

    borderBottomWidth: 0.4,
    borderColor: 'white',
  },
  progressbaritemmainbox: {
    flexDirection: 'row',

    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  progressbartitetxt: {
    fontSize: 15,
    color: 'white',
  },
  progressbarlevelbox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'orange',
    width: widthPercentageToDP(10),
    justifyContent: 'space-evenly',
    borderRadius: 15,
    height: heightPercentageToDP(3),
  },
  levelupbox: {
    backgroundColor: '#ED2D21',
    padding: 5,
    borderRadius: 20,
  },
  progressbarallitem: {
    flexDirection: 'row',
    width: widthPercentageToDP(70),
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  leveltxt: {
    fontSize: 11,
    color: 'white',
  },
  progressbarlevelbox1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    width: widthPercentageToDP(10),
    justifyContent: 'space-evenly',
    borderRadius: 15,
    height: heightPercentageToDP(3),
  },
  levelupbox1: {
    backgroundColor: 'orange',
    padding: 5,
    borderRadius: 20,
  },
  progressbartitetxt1: {
    fontSize: 12,
    color: 'white',
  },
  progressbarmainbox1: {
    padding: 20,
    flexDirection: 'row',

    borderBottomWidth: 0.4,
    borderColor: 'white',
    right: 4,
  },
});
