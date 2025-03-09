import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {headings, primaryColor, white} from '../../utils/Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import AnimatedLottieView from 'lottie-react-native';
import {ApiCallToken, ApiUpdateUserData} from '../../Services/Apis';

import {activeStoreData} from '../../Redux/Actions';
import Header from '../reuseable_Component/Header';
import { heightPercentageToDP } from 'react-native-responsive-screen';

export default function MyBagMain() {
  const userData = useSelector(state => state.auth.userData);

  const dispatch = useDispatch();
  const [bagData, setBagData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeId, setIsActiveId] = useState(true);
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    getMyBagStoreData();
    // postCountries()
  }, [activeId]);

  const UpdateUserData = async () => {
    try {
      const res = await ApiUpdateUserData({
        params: userData.token,
        paramsBody: userData.user.id,
        route: 'user/updated-data',
        verb: 'POST',
      });

      // console.log('updaetd data', res?.active_store)
      dispatch(activeStoreData(res?.active_store));
    } catch (e) {
      console.log('error updateUserData func, home screen ', e.toString());
    }
  };

  const getMyBagStoreData = async () => {
    try {
      setIsLoading(true)
      const res = await ApiCallToken({
        params: userData.token,
        route: 'my-bag-store',
        verb: 'GET',
      });
       // console.log('here is the respone for my bag', res);
      setBagData(res?.data);
      setIsLoading(false)
    } catch (e) {
      console.log('saga my-bag-store error -- ', e.toString());
    }
  };

  const makeStatusActive = async (id, parentId) => {
    console.log('id, parentId', id, parentId);
    const paramsBody = {
      child_id: id,
      parent_id: parentId,
    };

    try {
      const res = await ApiCallToken({
        params: userData.token,
        paramsBody: paramsBody,
        route: 'my-bag-store-status',
        verb: 'POST',
      });
      setPostData(res);
      setIsActiveId(id);
      UpdateUserData()
      console.log('Response my-bag-store-status ', res);
    } catch (error) {
      console.log('Error in makeStatusActive, mybagmain screen', error);
    }
  };

  const RenderView = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: '#303749',
          width: '40%',
          alignItems: 'center',
          borderRadius: 10,
          marginLeft: '5%',
          marginVertical: '3%',
        }}>
        <View
          style={{
            backgroundColor: '#303749',
            height: '35%',
            borderBottomLeftRadius: 100,
            borderBottomRightRadius: 100,
            position: 'absolute',
            zIndex: 2,
            width: '100%',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}></View>

        {item?.parent_title === 'Theme' || item?.parent_title === 'Badge' ? (
          <View>
            <Image
              source={{uri: item?.json_image}}
              resizeMode="contain"
              style={{
                height: 110,
                width: 110,
                zIndex: 2,
                marginTop: 10,
                marginBottom: 10,
              }}
            />
          </View>
        ) : (
          <AnimatedLottieView
            autoPlay
            style={{
              height: 110,
              width: 110,
              zIndex: 2,
              marginTop: 10,
              marginBottom: 10,
            }}
            source={{uri: item?.json_image}}
            onLoad={() => {
              console.log('loading');
            }}
          />
        )}

        <TouchableOpacity onPress={() => console.log('item', item)}>
          <Text style={{color: '#FFFFFF', fontSize: 16, fontWeight: 'bold'}}>
            {item?.child_title}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => makeStatusActive(item?.child_id, item?.parent_id)}>
          <Text style={{color: 'white', fontSize: 14, fontWeight: '600'}}>
            {item?.status}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      
      <ImageBackground
        source={require('../../assets/images/image36.png')}
        resizeMode={'stretch'}
        style={{height: '100%', width: '100%'}}>
        <Header name={'My Bag'} fontColor={'black'} />

        {isLoading ? 
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator />
          </View>
        :
        <ScrollView>
          
         {bagData?.[0] ?  
         <View style={styles.cardview}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={bagData}
              numColumns={2}
              renderItem={RenderView}
              style={{marginBottom: 30}}
            />
           
          </View>
          : 
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: heightPercentageToDP(100)}}>
             <Text style={{color: 'black'}}>You bag is empty. Please buy items from store.</Text>
          </View>
          }
     

        </ScrollView>
      }
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor,
  },
  topview: {
    flexDirection: 'row',
    paddingTop: 10,
    backgroundColor: '#303749',
    paddingBottom: 10,
  },
  text: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'white',
  },
  cardview: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
});
