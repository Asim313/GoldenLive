import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import Ionicon from 'react-native-vector-icons/Ionicons';
import Awesome from 'react-native-vector-icons/FontAwesome';

export default function Topupagent() {
  const {width, height} = Dimensions.get('window');
  return (
    <SafeAreaView style={styles.mainView}>
      <ScrollView>
        <ImageBackground
          source={require('../../assets/images/newyellowbg.png')}
          resizeMode={'stretch'}
          style={{
            height: '140%',
            width: '100%',
          }}></ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'red',
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E3A542',
  },
  editprofilebox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: widthPercentageToDP(28),
    justifyContent: 'space-between',
  },
  editprofiletxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    right: 10,
  },
});
