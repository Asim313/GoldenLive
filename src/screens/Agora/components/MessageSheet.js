import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {ApiCallToken} from '../../../Services/Apis';
import AllChatComponent from '../../reuseable_Component/AllChatComponent';
import CrossIcon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RbSheetComponent from '../../reuseable_Component/RbSheetComponent';
import ChatTestSmallScreen from '../../ChatScreens/ChatTestSmallScreen';
import AnimatedLottieView from 'lottie-react-native';

const MessageSheet = ({onCrossPress}) => {

        const chatScreenRef = useRef(null)
        const userData = useSelector(state => state.auth.userData);
        const [chaterList, setChaterList] = useState([]);
        const [friendData, setFriendData] = useState()
        const [chaterListLoading, setChaterListLoading] = useState(true);

        const friendRequestCome = async () => {
          try {
            setChaterListLoading(true)
            const res = await ApiCallToken({
              params: userData.token,
              route: 'list/chat/friends',
              verb: 'GET',
            });
            setChaterList(res?.data);
            setChaterListLoading(false)
          } catch (error) {
            console.log('ERROR IS list/caht friends api response', error);
          }
        }
      
        useEffect(() => {
          friendRequestCome()
        }, [])
      
        const handleSelectChat = (item) => {
            console.log("handle select Chat",item)
            setFriendData(item)
            chatScreenRef.current.open()
        }
      
     

  useEffect(() => {
    friendRequestCome();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          paddingTop: heightPercentageToDP(2),
          justifyContent: 'center',
          paddingHorizontal: widthPercentageToDP(2),
        }}>
       
        <Text style={{color: '#959494', fontSize: 17, fontWeight: 'bold'}}>inbox</Text>
      </View>

      {chaterListLoading ? 
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
         <AnimatedLottieView
                        autoPlay
                        style={{
                          width: 80,
                          height: 80,
                        }}
                        source={require('../../../assets/json/messagesLoading.json')}
                      />
        <Text style={{color:'#959494', fontSize: 11}}>Loading Messages</Text>
      </View>
       : 
      <View style={{flex: 1}}>
        <FlatList
          style={{
            width: widthPercentageToDP(100),
            paddingTop: heightPercentageToDP(1),
          }}
          data={chaterList}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => {
            return (
              <AllChatComponent
                data={item}
                onSelectChat={handleSelectChat}
                smallScreen={true}
              />
            );
          }}
        />
      </View>
      }

      <RbSheetComponent
        view={
          <ChatTestSmallScreen
            onBackPress={() => chatScreenRef.current.close()}
            friendData={friendData}
          />
        }
        refUse={chatScreenRef}
        close={false}
        height={'50%'}
      />
    </View>
  );
};

export default MessageSheet;
