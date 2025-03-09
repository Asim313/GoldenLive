import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AllIcons, {IconList} from '../../../components/AllIcons';
import LinearGradient from 'react-native-linear-gradient';

const BottomMenuAudience = ({messageArray, muteAllSpeaker, isMicOn}) => {
  return (
    <View style={styles.conatiner}>
      <View style={styles.bottomStyle}>
        <TouchableOpacity style={styles.icon1box}>
          <AllIcons
            name={IconList.Feather}
            iconName={'message-circle'}
            size={22}
            color={'white'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon1box}>
          <AllIcons
            name={IconList.Feather}
            iconName={isMicOn ? 'mic' : 'mic-off'}
            size={22}
            color={'white'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon1box}>
        <AllIcons name={IconList.FontAwesome} iconName={!muteAllSpeaker ? 'volume-up' : 'volume-off'} 
            size={22}
            color={'white'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon1box}>
          <AllIcons name={IconList.Entypo} iconName={'camera'} size={22} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon1box}>
           <AllIcons
           name={IconList.MaterialIcons}
           iconName={
             messageArray?.[0] ? 'messenger' : 'messenger-outline'
           }
            size={22}
            color={'white'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon1box}>
          <AllIcons
            name={IconList.Entypo}
            iconName={'game-controller'}
            size={22}
            color={'white'}
          />
        </TouchableOpacity>
        
        <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    // Gift.current.open();
                  }}>
                  <LinearGradient
                    style={[styles.icon2box]}
                    name="gift"
                    colors={['#c471ed', '#f64f59']}>
                    <AllIcons name={IconList.FontAwesome} iconName={'gift'} color={'white'} />
                  </LinearGradient>
                </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomMenuAudience;

const styles = StyleSheet.create({
  conatiner: {
    height: heightPercentageToDP(100),
    justifyContent: 'flex-end',
    width: widthPercentageToDP(100),
  },
  bottomStyle: {
    width: widthPercentageToDP(100),
    right: 5,
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  icon1box: {
    backgroundColor: '#19162A',
    height: 35,
    width: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: widthPercentageToDP(2),
  },
  icon2box: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: 30,
    width: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
});
