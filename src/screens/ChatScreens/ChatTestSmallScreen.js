import React, { useState, useEffect, useRef, memo } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, Image, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ApiCallToken } from '../../Services/Apis';
import { removeArrayItem } from '../../Redux/Actions';
import { FlatList } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const ChatTestSmallScreen = memo(({friendData, onBackPress}) => {
    const dispatch = useDispatch();
    const listRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const userData = useSelector(state => state.auth.userData);
    const route = useRoute().params;
   // console.log("routes1122", friendData)
  //  const { data,id,image,name } = route
    const [inputText, setInputText] = useState('');
    const navigation = useNavigation();
    const [givenDataFromApi,setGivenDataFromApi] = useState()
    const [chat_id, setChatId] = useState(null)
    const datsss = useRef(true)

    useEffect(() => {
         searchID() 
         dispatch(removeArrayItem(friendData?.id))
    }, []);
    useEffect(() => {
        console.log("chatid", chat_id)
        const unsubscribe = firestore().doc(`messages/${chat_id}`).onSnapshot(fetchMessages);
       return () => {
           unsubscribe();
       };
   }, [chat_id]);

    const searchID = async () => {
        try {
           console.log("search id",friendData?.id,userData?.user?.id)
          const res = await ApiCallToken({
            params: userData?.token,
            paramsBody: {
              sender_id: friendData?.id.toString(),
              recever_id: userData?.user?.id?.toString()
            },
            route: 'search/chat',
            verb: 'POST',
          });
          setGivenDataFromApi(res);
          if(res?.data?.[0]?.chat_id) {
            setChatId(res?.data?.[0]?.id)
            console.log("check data search/caht api ", res, res?.data?.[0]?.chat_id)
          }
          else {
            friendRequestCome()
          }
        
        }catch (error) {
          console.log('ERROR in Store searchID/chat_id search ====>>>', error);
        }
      }

    const friendRequestCome = async () => {
        const idcheck = userData?.user?.id.toString() + friendData?.id.toString();
        try {
           console.log("adding new chat to database ", idcheck)
          const res = await ApiCallToken({
            params: userData.token,
            paramsBody: {
              friend_id: friendData?.id,
              chat_id: idcheck
            },
            route: 'send/chat/request',
            verb: 'POST',
          });
          searchID()
          if(res?.data?.[0]?.id){
              setGivenDataFromApi(res);
              setChatId(res?.data?.[0]?.id)
          }
          console.log("send/chat/request ", res)
        } catch (error) {
          console.log('ERROR IS Store Purchase ====>>>', error);
        }
      }
      
  
   const  checkDtaa = ()=>{
   // console.log("check about feriend request come or not ",chat_id)
   } 

    const fetchMessages = async () => {
        try {
            const documentSnapshot = await firestore().doc(`messages/${chat_id}`).get();
            const data = documentSnapshot.data();
            if (data) {
                console.log("llllllllllllllllllllll")
                setMessages(data.messages);
            }
        } catch (error) {
            console.error(error);
        }
    };

   

    const handleSend = async (sender) => {
        try {
          if(chat_id)
          {  
            const currentDate = new Date();
            const documentRef = firestore().doc(`messages/${chat_id}`);
            console.log("meessage send", chat_id)
            const documentSnapshot = await documentRef.get();
            const data = documentSnapshot.data();

            const messages = data ? data.messages : [];
            const newMessage = {
                id: userData?.user?.id,
                text: inputText,
                sender: sender,
                msgDate: currentDate.toString()
            };
            const updatedMessages = [...messages, newMessage];
            await documentRef.set({ messages: updatedMessages });
            sendNotificationToUser()
            setInputText('');}
            else {
                console.log("null", chat_id)
            }
        } catch (error) {
            console.error(error);
        }
    };

    const sendNotificationToUser = async (sender) => {
        try {
            const currentDate = new Date();
            console.log("message notification", friendData?.id, sender)
            const res = await ApiCallToken({
                params: userData.token,
                paramsBody: {
                  time: currentDate,
                  message: inputText,
                  id: friendData?.id,
                },
                route: `chat/notifications`,
                verb: 'POST',
              });
            //  // setBlocked(blocked);
               console.log("message notificationss", res, friendData?.id)
              
        } catch (error) {
            console.error(error);
        }
    };

    const handleEndReached = () => {
        // console.log('working')
        listRef.current.scrollToEnd({ animated: true, duration: 200 });
    };

    const getTimeFromDate = (dateTime) => {
        if(dateTime) {

            const inputDate = new Date(dateTime); // Parse the input date
            const hours = inputDate.getHours();
            const minutes = inputDate.getMinutes();
            const amOrPm = hours >= 12 ? 'PM' : 'AM';
            
            // Convert to 12-hour time format
            const formattedHours = hours % 12 || 12;
            
            const formattedTime = `${formattedHours}:${String(minutes).padStart(2, '0')} ${amOrPm}`;
            // console.log(formattedTime);
            return formattedTime
        } else {
            // console.log('no date time')
        }
    }   

    const checkMsgDates = (index, msg) => {
        // console.log('==============>>>>>>>>>>', datsss.current, messages?.[index]?.msgDate, messages?.[index + 1]?.msgDate)
        if(messages?.[index]?.msgDate) {
            const date1 = new Date(messages?.[index]?.msgDate ?? '');
            const date2 = new Date(messages?.[index + 1]?.msgDate ?? '');
    
            // Extract the date part as a string in the format "Day Mon DD YYYY"
            const formattedDate1 = date1.toDateString() ?? null;
            const formattedDate2 = date2 ? date2.toDateString() : null;

            if(index === 0) {
                return formattedDate1
            }
            
            // console.log('herreeeeeee', index, datsss)
            if(formattedDate2 === "Invalid Date" && datsss.current === true) {
                datsss.current = false
                return false
            }
            
            
            // if (formattedDate1 < formattedDate2) {
                if(formattedDate1 !== formattedDate2) {
                    return formattedDate1
                }
                else {
                    // console.log('equal', formattedDate1, formattedDate2)
                   // return formattedDate1
                }
            } else {
                
            }
        // } else {
        //     //  console.log('data is undefiend')
        // }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                 style={styles.image}
                 resizeMode="cover"
                 source={require('../../assets/images/chatImages/chatBackground.png')}>
                <View style={styles.container2}>
                    <TouchableOpacity style={styles.backButton} onPress={onBackPress} >
                    <Icon name="chevron-left" size={16} color="black" />
                    </TouchableOpacity>
                    <View style={styles.profile}>
                        <View style={{ width: 55, justifyContent: "center", alignItems: "center" }}>
                            <Image source={{
                                uri: friendData?.image
                            }} style={styles.profileImage} />
                        </View>
                        <View style={styles.senderInfo}>
                            <Text style={styles.senderName}>{friendData?.nick_name ?? friendData?.full_name}</Text>
                        </View>
                    </View>
               

                </View>
                {chat_id ? 
                 <ImageBackground
                 style={{flex: 1}}
                 resizeMode="cover"
                 source={require('../../assets/images/chatImages/chatBackground.png')}>
                         <FlatList
                         ref={listRef}
                         showsVerticalScrollIndicator={false}
                         data={messages}
                         renderItem={({ item, index }) => {
                            const time = getTimeFromDate(item?.msgDate ?? null)
                          const showDateOrNot =  checkMsgDates(index, item?.text)
                           return (
                            <View>

                                {showDateOrNot && 
                                <View style={{width: widthPercentageToDP(100), justifyContent: 'center', alignItems: 'center', marginVertical: 5}}>
                           <Text style={[{color: 'black', fontSize: 11 }]}>{showDateOrNot}</Text>
                                </View>
                           }

                                          <View
                            key={index}
                            style={[
                                styles.messageBubble,
                                item?.id == userData?.user?.id
                                    ? styles.messageBubbleRight
                                    : styles.messageBubbleLeft,
                                ]}
                            >
                          
                            <Text style={[styles.messageFontStyle, {color:item?.id == userData?.user?.id ? 'white' : 'black' }]}>{item?.text}</Text>
                           { 
                            time &&  
                            
                            <Text 
                                style={[{color:item?.id == userData?.user?.id ? 'white' : 'black', fontSize: 10, textAlign: 'right' }]}>
                                    {time ?? ''}
                             </Text>
    
                           }
                        </View>
                    </View>
                           )
                         }}
                         keyExtractor={(item, index) => index}
                         onContentSizeChange={() => handleEndReached()} // Add this callback
                       />
            </ImageBackground>  
                :
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size={25} />
                </View>
                }
                <View style={styles.inputContainer}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: 'center',
                        borderColor: 'gray',
                        borderWidth: 1,
                        borderRadius: 25,
                    }}>
                        <TextInput
                            value={inputText}
                            onChangeText={setInputText}
                            placeholder="Enter your message"
                            placeholderTextColor="grey" 
                            style={styles.inputField}
                        />
                        <TouchableOpacity style={{ width: 45, backgroundColor: "#ea4542", height: 45, justifyContent: "center", alignItems: "center", marginRight: 3, borderRadius: 30 }} onPress={() => handleSend('me')}>
                            <Icon name="send" size={22} color="white" style={{}} />
                        </TouchableOpacity>
                    </View>
                </View>
                </ImageBackground>
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    container2: {
        flexDirection: 'row',
        width: "100%",
        alignItems: 'center',
        height: 70,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff',
        elevation: 3,
    },

    iconContainer: {
        marginLeft: 10,
    },

    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        backgroundColor: 'white'

    },
    profileIconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    messagesContainer: {
        paddingBottom: 10,
        flexGrow: 1,
        paddingBottom: 10,
        // backgroundColor: "#5c6678",
        width: "100%"
    },
    messageBubble: {
        padding: 10,
        borderRadius: 20,
        maxWidth: '80%',
        marginVertical: 5,
    },
    messageBubbleLeft: {
        alignSelf: 'flex-start',
        backgroundColor: '#ECECEC',
        marginLeft: "5%",

    },
    messageBubbleRight: {
        alignSelf: 'flex-end',
        backgroundColor: '#6966FD',
        marginRight: "5%"
    },
    messageFontStyle: { 
        fontSize: 13, 
        fontFamily: "Poppins", 
        fontWeight: "500" 
    },


    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#f2f2f2',
        padding: 5,

        width: "100%",

        paddingBottom: 10
    },
    inputField: {
        flex: 1,
        height: 50,
        color: 'black',
        paddingHorizontal: 10,
    },
    sendIcon: {
        marginRight: 10,
    },

    sendButton: {
        borderRadius: 20,
        marginLeft: 5,
    },
    backButton: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: "10%",
        // backgroundColor:"pink",
        height: "100%"
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',

        width: "60%",

        height: "100%"

    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 30,

    },
    senderInfo: {
        justifyContent: 'center',
        marginLeft: "3%"
    },
    senderName: {
        fontWeight: 'bold',
        fontSize: 14,
        color: "black"
    },
    senderStatus: {
        color: 'grey',
    },
    callIcons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',

        width: "35%",
        height: "100%",

    },
    videoIcon: {
        marginLeft: 14,
    },

});


export default ChatTestSmallScreen
