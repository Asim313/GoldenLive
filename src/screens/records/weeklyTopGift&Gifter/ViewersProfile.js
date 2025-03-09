import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';

const ViewersProfile = ({item}) => {
  // console.log('check image come or noit ',item)
  return (
    <SafeAreaView style={styles.FullView}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.gradient}>
          <Image source={{uri:item?.image}} style={styles.imgView} />
          <View style={styles.midView}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.txt1}>
              {/* {profName} */}
              {item?.nick_name}
            </Text>
            <View style={styles.bottomView}>
           
                {item?.reciever_level_image? (
                <Image
                  source={{uri : item?.reciever_level_image}}
                  style={styles.img2}
                />
              ) : (
                <Image 
                source={{uri : item?.sender_level_image}}
                 style={styles.img2}/>
              )}
            </View>
          </View>
        </View>
        <View style={styles.MainView1}>
          <Text style={styles.txt}>
            {/* {Rtxt} */}
            Send
            </Text>
          <Text style={styles.txt}>
            {/* {Num} */}
            {item?.value}
            </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewersProfile;

const styles = StyleSheet.create({
  FullView: {
    flex: 1,
  },
  gradient: {
    // alignItems: 'center',
    flexDirection: 'row',
    width: '60%',
    height: '100%',
    // borderRadius: 150 / 1,
    // flexGrow: 0,
    // backgroundColor: 'pink',
    borderBottomWidth: 1,
    borderBottomColor: '#ffff',
    padding:8
  },
  MainView1: {
    width: '50%',
    height: '100%',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ffff',
    
  },
  imgView: {
    height: 50,
    width: 50,
    borderRadius: 150 / 1,
  },
  midView: {
    left: 10,
  },
  txt1: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  bottomView: {
    flexDirection: 'row',
  },
  txt2: {
    fontSize: 12,
    color: 'black',
    margin: 3,
    bottom: 3,
    fontWeight: 'bold',
  },
  img2: {
    height: 18,
    width: 41,
  },
  txt: {color: 'black'},
});
