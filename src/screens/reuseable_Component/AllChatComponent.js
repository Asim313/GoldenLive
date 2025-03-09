import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { headings } from '../../utils/Styles';
import PersonImgInChat from './PersonImgInChat';

const AllChatComponent = ({ data, onSelectChat, smallScreen, messageArray }) => {
  const dispatch = useDispatch();
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  const navigation = useNavigation();
  const dateRegex = /^\d{4}-\d{2}-\d{2}/;
  const [hasUnseenMessage, setHasUnseenMessages] = useState(messageArray?.filter((item) => parseInt(item?.id) === parseInt(data?.id)));
  const [dataTime, setDateTime] = useState('')

  useEffect(() => {
    if(data?.time) {
      const match = data?.time?.match(dateRegex);
     if (match) {
      const extractedDate = new Date(match[0]);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Set the time to midnight for comparison
    
      if (extractedDate.toDateString() === currentDate.toDateString()) {
        setDateTime('Today')
      } else {
        currentDate.setDate(currentDate.getDate() - 1); // Subtract 1 day for comparison with yesterday
    
        if (extractedDate.toDateString() === currentDate.toDateString()) {
          setDateTime('Yesterday')
        } else {
          setDateTime(match?.[0])
        }
      }
    } else {
      setDateTime(match?.[0])
    }

    }

  }, [data?.time])

  let messageToShow = '';
  if (hasUnseenMessage) {
    messageToShow = messageArray.find(
      message => message.id === data.id,
    )?.message;
  }

  useEffect(() => {
    // console.log('unsenn messages', hasUnseenMessage)
    setHasUnseenMessages(messageArray?.filter((item) => parseInt(item?.id) === parseInt(data?.id)))
    
  }, [messageArray])

  return (
    <View style={{
      height: 60,
      width: '100%',
      // borderRadius: 50,
      // margin: '3%',
      overflow: 'hidden',
      flexDirection: 'row',
      // backgroundColor: 'rgba(175, 22, 142, 0.05)',
     // marginBottom: 2
    }}>
      <AnimatedTouchable
        style={styles.itemContainer}
        onPress={() => smallScreen ? onSelectChat(data) : navigation.navigate("ChatTest", {data})}
      >
        <View style={styles.itemMsg}>
          <PersonImgInChat
            // onPressDp={props.onPressDp}
            ims
            image={{
              uri: data.image,
            }}
          />
          <View style={styles.nameMsg}>
            <Text
              numberOfLines={1}
              style={
                data.id < 0 ? styles.unReadNameTxt : styles.nameTxt
              }>
              {data?.nick_name ?? data?.full_name}
            </Text>
            {/* {hasUnseenMessage?.[0] && ( */}
              <View>
                <Text
                  style={
                    data.id < 0
                      ? { fontWeight: 'bold', color: 'black', fontSize: 11 }
                      : { fontWeight: 'normal', color: 'black', fontSize: 11 }
                  }>
                  {hasUnseenMessage?.[0]?.message ?? data?.message}</Text>
              </View>
            {/* )} */}
          
          </View>
        </View>
        <View style={styles.timCounter}>
          {/* <Text style={styles.timTxt}>time</Text> */}
          {/* {props.unreadCounter > 0 && ( */}
          {/* {hasUnseenMessage?.[0] && ( */}
            <View style={styles.counter}>
            {   (data?.count > 0 && data?.count !== null) &&
            <View style={{ backgroundColor: 'red', borderRadius: 50, padding: 2,}}>
                <Text style={{color: 'white', fontSize: 7, marginHorizontal: 3}}>{data?.count ?? ''}</Text>
              </View>}
              <Text style={styles.counterTxt}>{dataTime ?? ''}</Text>
            </View>
          {/* )} */}
          {/* )} */}
        </View>
      </AnimatedTouchable>
    </View>
  );
};

const styles = StyleSheet.create({
  swipeRight: {
    backgroundColor: '#DF4B38',
    // width: 50,
    // justifyContent: 'center',
    // alignItems: 'center',
    height: '90%',
    marginRight: 40,
  },
  swipeLeft: {
    backgroundColor: '#DF4B38',
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    marginLeft: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    height: heightPercentageToDP(8.5),
    width: '100%',
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: widthPercentageToDP(1),
  },
  itemMsg: {
    flexDirection: 'row',
    alignItems: 'center',
   
    right:'7%',
    // justifyContent: 'space-between',
    width: '65%',
  },
  nameMsg: { marginBottom: '15%',left:'5%', },
  nameTxt: {
    fontWeight: 'bold',
    color: 'black',
    fontSize:14,
    width: '100%',
    // backgroundColor: 'blue',
  },
  unReadNameTxt: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 14,
    width: '42%',
  },
  timCounter: {
    height: '80%',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  timTxt: { color: 'black', fontWeight: 'bold' },
  counter: {
  //  backgroundColor: '#c471ed',
    borderRadius: 50,
   marginBottom: 10,
    // height: 15,
    // width: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterTxt: { color: '#575555', fontWeight: 'bold', fontSize: 10, fontFamily: 'Poppins', marginHorizontal: 5, },
});

export default AllChatComponent;
