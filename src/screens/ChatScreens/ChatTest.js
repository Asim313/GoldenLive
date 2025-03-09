import React, { useState, useEffect, useRef, version } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, Image, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { getPathFromState, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ApiCallToken } from '../../Services/Apis';
import { removeArrayItem } from '../../Redux/Actions';
import { FlatList } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { deleteChatNotification } from '../../Services/ApisCall';

const ChatTest = () => {
    const dispatch = useDispatch();
    const chatListData = route?.params?.data
    const listRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const userData = useSelector(state => state.auth.userData);
    const route = useRoute().params;
    const { data } = route
    const [inputText, setInputText] = useState('');
    const navigation = useNavigation();
    const [givenDataFromApi,setGivenDataFromApi] = useState()
    const [chat_id, setChatId] = useState(null)
    const [prevData, setPrevDate] = useState(true)
    const datsss = useRef(true)
    useEffect(() => {
         searchID() 
         console.log("id", data)
         dispatch(removeArrayItem(data?.id))
    }, []);
    useEffect(() => {
        if(chat_id) {
            firestore().doc(`messages/${chat_id}`).onSnapshot(fetchMessages);
        }
       return () => {
            firestore().doc(`messages/${chat_id}`).onSnapshot(fetchMessages);
       };
   }, [chat_id]);

    const searchID = async () => {
        try {
          const res = await ApiCallToken({
            params: userData?.token,
            paramsBody: {
              sender_id: data?.id?.toString(),
              recever_id: userData?.user?.id?.toString()
            },
            route: 'search/chat',
            verb: 'POST',
          });
          setGivenDataFromApi(res);
          const checkData = res?.data?.[0];
          if(res?.data?.[0]?.chat_id) {
             console.log("hhhhhhhhhhh", data?.chatId, checkData?.id )
            setChatId(checkData?.id)
            const paramsBody = { chat_id : checkData?.id}
            const res = await deleteChatNotification({paramsBody: paramsBody, token: userData?.token})
            console.log("delte noti", res)
          }
          else {
            console.log('id not searched', res?.data?.[0]?.chat_id)
            friendRequestCome()
          }
        
        }catch (error) {
          console.log('ERROR IS Store Purchase ====>>>', error);
        }
      }

    const friendRequestCome = async () => {
        const idcheck = userData?.user?.id.toString() + data?.id.toString();
        try {
          const res = await ApiCallToken({
            params: userData.token,
            paramsBody: {
              friend_id: data?.id,
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
        } catch (error) {
          console.log('ERROR IS Store Purchase ====>>>', error);
        }
      }
      
  
   const  checkDtaa = ()=>{
   // console.log("check about feriend request come or not ",chat_id)
   } 

    const fetchMessages = async () => {
         console.log("chatttttttttttttiddddddddd", chat_id)
        try {
            const documentSnapshot = await firestore().doc(`messages/${chat_id}`).get();
            const data = documentSnapshot.data();
            if (data && chat_id) {
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
            const documentSnapshot = await documentRef.get();
            const data = documentSnapshot.data();

            const messages = data ? data.messages : [];
            const newMessage = {
                id: userData?.user?.id,
                text: inputText,
                sender: sender,
                msgDate: currentDate.toString()
            };
            sendNotificationToUser()
            const updatedMessages = [...messages, newMessage];
            await documentRef.set({ messages: updatedMessages });
            setInputText('');}
            else {
                console.log("chatid", chat_id)
            }
        } catch (error) {
            console.error(error);
        }
    };

    const sendNotificationToUser = async (sender) => {
        try {
            const currentDate = new Date();
            console.log("message notification", data?.id)
            const res = await ApiCallToken({
                params: userData.token,
                paramsBody: {
                  time: currentDate,
                  message: inputText,
                  id: data?.id,
                },
                route: `chat/notifications`,
                verb: 'POST',
              });
            //  // setBlocked(blocked);
               console.log("message notificationss", res, data?.id)
              
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
            
          //  console.log('herreeeeeee', index, datsss)
            if(formattedDate2 === "Invalid Date" && datsss.current === true) {
                datsss.current = false
                return false
            }
            
            
            // if (formattedDate1 < formattedDate2) {
                if(formattedDate1 !== formattedDate2) {
                    return formattedDate1
                }
                else {
                //    console.log('equal', formattedDate1, formattedDate2)
                   // return formattedDate1
                }
            } else {
                
            }
        // } else {
        //     //  console.log('data is undefiend')
        // }
    }

    const compareDateWithCurrentDate = (givenDate) => {
        const currentDate = new Date();

        // Extract the date parts from both dates
        const givenDateStr = givenDate ?? '';
        const currentDateStr = currentDate.toDateString();

        // Compare the two date strings
        if (givenDateStr === currentDateStr) {
        console.log("The given date is the same as the current date.")
        return true
        } else {
        console.log("The given date is not the same as the current date.");
        return false
        }
    }



    return (
        <SafeAreaView style={styles.container}>
                <View style={styles.container2}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} >
                        <Icon name="chevron-left" size={18} color="black" />
                    </TouchableOpacity>
                    <View style={styles.profile}>
                        <View style={{ width: 55, justifyContent: "center", alignItems: "center" }}>
                            <Image source={{
                                uri: data?.image
                            }} style={styles.profileImage} />
                        </View>
                        <View style={styles.senderInfo}>
                            <Text style={styles.senderName}>{data?.nick_name ?? data?.full_name}</Text>
                            <TouchableOpacity 
                                //onPress={()=>getId()}
                            >
                            {/* <Text style={styles.senderStatus}>Online</Text> */}
                            </TouchableOpacity>
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

                                {showDateOrNot && prevData && 
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
                            placeholderTextColor={'grey'}
                            placeholder="Enter your message"
                            style={styles.inputField}
                        />
                        <TouchableOpacity style={{ width: 45, backgroundColor: "#ea4542", height: 45, justifyContent: "center", alignItems: "center", marginRight: 3, borderRadius: 30 }} onPress={() => handleSend('me')}>
                            <Icon name="send" size={22} color="white" style={{}} />
                        </TouchableOpacity>
                    </View>
                </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'white',

    },
    container2: {
        flexDirection: 'row',
        width: "100%",
        alignItems: 'center',

        height: 70,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
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
        maxWidth: '90%',
        fontFamily: "Poppins", 
        fontWeight: "500",
        minWidth: widthPercentageToDP(20),
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
        fontSize: 16,
        color: "black"
    },
    senderStatus: {
        color: 'grey',
    },
    callIcons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
       // backgroundColor: 'red',
        width: "35%",
        height: "100%",

    },
   
});


export default ChatTest
