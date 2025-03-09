import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import AllChatComponent from '../reuseable_Component/AllChatComponent';

// import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ApiCallToken} from '../../Services/Apis';
// import moment from 'moment';
import PTRView from 'react-native-pull-to-refresh';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {headings, primaryColor, white} from '../../utils/Styles';
import Header from '../reuseable_Component/Header';
import AnimatedLottieView from 'lottie-react-native';
import {useFocusEffect} from '@react-navigation/native';

const Chats = ({user, navigation}) => {
  // console.log('check user data ', user)
  const messageArray = useSelector(state => state.homeRed.unseenMessages);
  const [chaterList, setChaterList] = useState([]);
  const [chaterListLoading, setChaterListLoading] = useState(true);
  const userData = useSelector(state => state.auth.userData);
  const [friendRequest, setFriendRequest] = useState([]);

  const refresh = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        friendRequestCome();
        resolve();
      }, 2000);
    });
  };

  useFocusEffect(
    useCallback(() => {
      friendRequestCome();
    }, []),
  );

  const friendRequestCome = async () => {
    try {
      setChaterListLoading(true);
      const res = await ApiCallToken({
        params: userData.token,
        route: 'list/chat/friends',
        verb: 'GET',
      });
      // console.log('ressssssss', res)
      setChaterList(res?.data);
      setChaterListLoading(false);
    } catch (error) {
      console.log('ERROR IS list/caht friends api response', error);
    }
  };

  useEffect(() => {
    friendRequestCome();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header name={'Messages'} fontColor={'black'} />
      {chaterListLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <AnimatedLottieView
            autoPlay
            style={{
              width: 80,
              height: 80,
            }}
            source={require('../../assets/json/messagesLoading.json')}
          />
          <Text style={{color: '#959494', fontSize: 11}}>Loading Messages</Text>
        </View>
      ) : (
        <ImageBackground
          resizeMode={'stretch'}
          style={{height: '100%', width: '100%'}}>
          {chaterList?.[0] ? (
            <PTRView
              onRefresh={refresh}
              style={{flex: 1, marginBottom: '15%', marginTop: '1%'}}>
              <FlatList
                style={{
                  width: widthPercentageToDP(100),
                  paddingTop: heightPercentageToDP(1),
                  paddingBottom: heightPercentageToDP(7),
                }}
                data={chaterList}
                keyExtractor={(item, index) => item?.chatId}
                renderItem={({item, index}) => {
                  return (
                    <AllChatComponent data={item} messageArray={messageArray} />
                  );
                }}
              />
            </PTRView>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: heightPercentageToDP(100),
              }}>
              <Text style={{color: 'black', fontSize: 11}}>
                You don't have any messages yet.
              </Text>
            </View>
          )}
        </ImageBackground>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

    backgroundColor: '#FFFFFF',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: '2%',
    width: '100%',
  },
  nameImg: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  myImg: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: 'lightgrey',
  },
  myName: {
    fontWeight: 'bold',
    marginLeft: 10,
    color: white,
  },
  search: {
    width: '90%',
    height: heightPercentageToDP(5),
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: 'rgba(234, 234, 234, 0.5);',
    marginVertical: 10,
    alignSelf: 'center',
  },
  searchInput: {
    height: 39,
    marginLeft: 10,
  },
  storiesContainer: {height: 100, width: '90%'},
  headings: {
    fontWeight: 'bold',
    // right:'5%'
  },
  swipeRight: {
    backgroundColor: '#DF4B38',
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginRight: 20,
  },
  contactsBtn: {
    backgroundColor: primaryColor,
    borderRadius: 50,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: heightPercentageToDP(10),
    right: 30,
    borderWidth: 1,
    borderColor: white,
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    marginTop: 300,
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,

    // top: 0,
  },
  modalImg: {
    width: 150,
    height: 150,
    borderRadius: 80,
    backgroundColor: 'white',
    position: 'absolute',
    top: -70,
    zIndex: 1000,
    alignSelf: 'center',
  },
  dp: {
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  dpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconsList: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 80,
  },
  nameTxt: {
    fontSize: 20,
    fontWeight: '600',
  },
  name: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    marginTop: 80,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    marginVertical: 10,
    height: 50,
    borderColor: 'grey',
  },
});

export default Chats;
