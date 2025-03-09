import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Image,
    ImageBackground,
    ActivityIndicator,
  } from 'react-native';
  import React, {useState, useEffect} from 'react';
  import {heightPercentageToDP} from 'react-native-responsive-screen';
  import { useSelector} from 'react-redux';
import { removeUserAdmin, roomAdminsList } from '../Services/ApisCall';
import { ApiCallToken } from '../Services/Apis';
import database from '@react-native-firebase/database';

  const RoomLists = ({isManagerList, channelName}) => {
    const userData = useSelector(state => state.auth.userData);
    const [isLoading, setIsLoading] = useState(null)
    const [userList, setUserList] = useState([]);
  
    console.log('data of api', userList);
    // console.log("data of Unblock", Unblock)
  
    useEffect(() => {
        {isManagerList ? handleAdminList() : showUserList()}
    }, [isManagerList])
  
    const showUserList = async () => {
        try {
            setIsLoading(true)
          const res = await ApiCallToken({
            params: userData.token,
            route: `list-block-user`,
            verb: 'GET',
          });
    
          setUserList(res?.data);
          console.log('list of block users', res);
          setIsLoading(false)
        } catch (error) {
          console.log('BlockList, Function is showUserList', error);
        }
      };

    const handleAdminList = async () => {
      try {
        setIsLoading(true)
        const res = await roomAdminsList({token: userData?.token})
            setUserList(res?.data ?? []);
        console.log('list of block users', res);
        setIsLoading(false)
      } catch (error) {
      }
    };
  
    const unblockUser = async id => {
      console.log('id', id);
      const paramsBody = {
        id: id,
      };
      try {
        const res = await ApiCallToken({
          params: userData.token,
          paramsBody: paramsBody,
          route: `un-block-user`,
          verb: 'POST',
        });
  
        console.log('unblock user', res);
      } catch (error) {
        console.log('BlockList, Function is unblock user', error);
      }
    };

    const handleRemoveAd = async (id) => {
      setIsLoading(true)
        const res = await removeUserAdmin({token: userData?.token, adminId: id, channelName: channelName})
        console.log('ressssssss', userData?.token, id, channelName)
        if(res?.code === 200){
          await database()
          .ref(`/cohostMultiRoom/${channelName}/${id}`)
          .update({
            isAdmin: false,
          });
        }
        handleAdminList()
        setIsLoading(false)
    }
  
    const ItemStyle = props => (
      <View style={{borderRadius: 10}}>
        <TouchableOpacity
          activeOpacity={0.7}
          
          style={{}}>
          <View
            style={{
              marginVertical: 8,
            }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={{uri: props.item.image}}
                    style={{...styles.dp_image}}
                  />
  
                  <View style={{flexDirection: 'column', marginTop: 7}}>
                    <Text
                      style={{
                        color: 'black', fontSize: 11, marginHorizontal: 5
                      }}>
                      {props.item?.nick_name}
                    </Text>
                    <View style={{...styles.id_view}}>
                      <Text style={{color: 'black', fontSize: 11, marginHorizontal: 5}}>{props.item.id}</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    {isManagerList ? handleRemoveAd(props?.item?.user_id) : unblockUser(props?.item?.user_id)};
                  }}>
                  {/* <Text style={styles.UnblockTxt}>Unblock</Text> */}
                  <Text style={styles.UnblockTxt}>{isManagerList ? 'Remove manager' : 'Unblock user'}</Text>
                </TouchableOpacity>
              </View>
          </View>
        </TouchableOpacity>
      </View>
    );
    return (
      <View style={styles.container}>
        {isLoading ? 
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator />
                <Text>Loading data...</Text>
            </View>
        :
        <>
        {userList?.[0] ? 
          <View style={{flex: 1, marginHorizontal: 10}}>
            <FlatList data={userList} renderItem={ItemStyle} />
          </View>
        :
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'black', fontSize: 11}}>No data</Text>
        </View>  
        }
        </>
        }
     
      </View>
    );
  };
  export default RoomLists;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    settingbox: {
      flexDirection: 'row',
      paddingVertical: heightPercentageToDP('2%'),
      alignItems: 'center',
    },
    settingtxt: {
      fontSize: 19,
      color: 'white',
      fontWeight: '500',
    },
    icon: {
      color: 'white',
      paddingHorizontal: 5,
    },
    profileViewerbox: {
      flexDirection: 'row',
      paddingVertical: '2%',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      paddingHorizontal: '2.5%',
      borderBottomWidth: 0.2,
      borderColor: '#B06AB3',
    },
    LvTxt: {
      color: 'white',
      marginLeft: 5,
      backgroundColor: 'dodgerblue',
      paddingHorizontal: 7,
      borderRadius: 10,
      fontSize: 10,
    },
    CrownView: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginLeft: 10,
      backgroundColor: 'red',
      alignItems: 'center',
      borderRadius: 10,
      paddingHorizontal: 7,
    },
    //   UnblockView: {
    //     marginRight: '5%',
    //   },
    UnblockTxt: {
      borderWidth: 1,
      paddingHorizontal: '2.5%',
      color: '#B06AB3',
      borderRadius: 25,
      borderColor: '#B06AB3',
      fontSize: 12,
    },
    imgStyle: {
      height: 50,
      width: 50,
      borderRadius: 27.5,
    },
    dp_image: {
        height: 50,
        width: 50,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'silver'
    }
  });
  