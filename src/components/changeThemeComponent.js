import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {ApiCallToken} from '../Services/Apis';
import {useDispatch, useSelector} from 'react-redux';
import {primaryColor} from '../utils/Styles';
import {updatedData, updatedDataUser} from '../Redux/Actions';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native';
import {FlatList} from 'react-native';
import database from '@react-native-firebase/database';
import { formatNumerWithK } from '../Services/GlobalFuntions';

const ChangeTheme = ({channelName}) => {
  const userData = useSelector(state => state.auth.userData);
  const [bagData, setBagData] = useState([]);
  const [activeId, setIsActiveId] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(true);
  const [storedata, setStoreData] = useState(false);
  const [data, setData] = useState([]);
  const [storeThemeData, setstoreThemeData] = useState([]);

  useEffect(() => {
    getMyBagStoreData();
    getStoreList();
    // postCountries()
  }, [activeId]);

  const changeThemeHandler = themeImage => {
    // for audio node is channelsaudio
    database()
      .ref(`/multiRoom/${channelName}`)
      .update({
        theme: themeImage,
      })
      .then(() => {
      
      });
  };

  const getMyBagStoreData = async () => {
    try {
      setIsLoading(true);
      const res = await ApiCallToken({
        params: userData?.token,
        route: 'my-bag-store',
        verb: 'GET',
      });
      //   console.log('here is the respone for my bag', res);
      //   console.log(
      //     'here 222222222222222222222222',
      //     res?.data?.filter(item => item?.parent_title === 'Theme'),
      //   );
      let themes = res?.data?.[0]
        ? res?.data?.filter(item => item?.parent_title === 'Theme')
        : [];
      if (themes?.[0]) {
        setBagData(themes);
      }

      setIsLoading(false);
    } catch (e) {
      console.log('saga my-bag-store error -- ', e.toString());
    }
  };

  const getStoreList = async () => {
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'store-List',
        verb: 'GET',
      });
      // console.log('Store Data ', res?.data?.[4]?.store_child_categorie);
      setstoreThemeData(res?.data?.[4]?.store_child_categorie);
    } catch (error) {
      console.log('error in Store Fun', error);
    }
  };

  const makeStatusActive = async (id, parentId, themeImage) => {
    console.log('id, parentId', id, parentId);
    setIsLoading(true);
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
      if (res?.code === 200) {
        setIsActiveId(id);
        dispatch(updatedData(userData));
        changeThemeHandler(themeImage);
      }
      setIsLoading(false);
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
          height: 150,
          alignItems: 'center',
          borderRadius: 10,
          marginLeft: '5%',
          marginVertical: '3%',
        }}>
        <ImageBackground
          resizeMode="cover"
          borderRadius={12}
          source={{uri: item?.json_image}}
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'flex-end',
            borderRadius: 10,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              width: '100%',
              borderBottomRightRadius: 12,
              borderBottomLeftRadius: 12,
            }}>
            <Text style={{color: '#FFFFFF', fontSize: 12, fontWeight: 'bold'}}>
              {item?.child_title}
            </Text>
            <LinearGradient
              colors={['#EB3328', '#EC3A2F', '#F7564D']}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 3,
                borderRadius: 15,
                marginVertical: 10,
              }}>
              <TouchableOpacity
                onPress={() =>
                  makeStatusActive(
                    item?.child_id,
                    item?.parent_id,
                    item?.json_image,
                  )
                }>
                <Text
                  style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>
                  {item?.status}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ImageBackground>
      </View>
    );
  };



  const purchaseTheme = async item => {
    setIsLoading(true);
    try {
      const res = await ApiCallToken({
        params: userData.token,
        paramsBody: {
          beans: item.beans,
          month: 1,
          parent_store_category: item?.parent_category_id,
          child_store_category: item?.id,
        },
        route: 'purchased_themes',
        verb: 'POST',
      });
      setIsLoading(true);
      console.log('check data ', res);
      
      ToastAndroid.showWithGravityAndOffset(
        '' + res?.message,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
    } catch (error) {
      console.log('ERROR IS Store Purchase ====>>>', error);
    }
    setIsLoading(false);
  };

  const UpdateUserData = async () => {
    dispatch(updatedDataUser(userData));
  };

  const RenderView1 = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: '#303749',
          width: '40%',
          height: 150,
          alignItems: 'center',
          borderRadius: 10,
          marginLeft: '5%',
          marginVertical: '3%',
        }}>
        <ImageBackground
          resizeMode="cover"
          borderRadius={12}
          source={{uri: item?.json_image}}
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'flex-end',
            borderRadius: 10,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              width: '100%',
              borderBottomRightRadius: 12,
              borderBottomLeftRadius: 12,
            }}>
            <Text style={{color: '#FFFFFF', fontSize: 12, fontWeight: 'bold'}}>
              {item?.child_title}
            </Text>
            <Text
                  style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>
                  {formatNumerWithK(item?.beans)}
                </Text>
            <LinearGradient
              colors={['#EB3328', '#EC3A2F', '#F7564D']}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 3,
                borderRadius: 15,
                marginVertical: 10,
              }}>
              <TouchableOpacity
                onPress={() =>
                  purchaseTheme(item)
                }>

                <Text
                  style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>
                  Purchase
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ImageBackground>
      </View>
    );
  };

  const themeBtn = () => {
    setTheme(true);

    setStoreData(false);
    //  setBagData(storeThemeData);
    // console.log('chwch thw botton od theme ', theme);
  };

  const storeBtn = () => {
    setTheme(false);
    console.log('chwch thw botton od store ', storedata);
    setStoreData(true);
    // setBagData(storeThemeData);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
          <Text style={{fontSize: 11, color: 'black', marginVertical: 5}}>
            Loading...
          </Text>
        </View>
      ) : (
        <View>
          <View
            style={{
              backgroundColor: '#709700',
              flexDirection: 'row',
              alignSelf: 'center',
              borderRadius: 20,
              alignItems: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => themeBtn()}
              style={{
                backgroundColor: theme ? '#399200' : '#709700',
                borderRadius: 20,
                paddingVertical: 5,
                width: '18%',
                alignSelf: 'center',
              }}>
              <View>
                <Text
                  style={{
                    color: theme ? '#FFFFFF' : '#241F1F',
                    textAlign: 'center',
                    fontWeight: 'normal',
                    fontSize: 12,
                  }}>
                  My Bag
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => storeBtn()}
              style={{
                backgroundColor: storedata ? '#399200' : '#709700',
                borderRadius: 20,
                paddingVertical: 5,
                width: '18%',
                alignSelf: 'center',
              }}>
              <View>
                <Text
                  style={{
                    color: storedata ? '#FFFFFF' : '#241F1F',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 12,
                  }}>
                  Store
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        <ScrollView>
          <View style={styles.cardview}>
            {theme ? 
            <FlatList
              showsVerticalScrollIndicator={false}
              data={bagData}
              numColumns={2}
              renderItem={RenderView}
              style={{marginBottom: 30}}
              keyExtractor={(id, index) => index}
            />
              :
              <FlatList
              showsVerticalScrollIndicator={false}
              data={storeThemeData}
              numColumns={2}
              renderItem={RenderView1}
              style={{marginBottom: 30}}
              keyExtractor={(id, index) => index}
            />
            }
          </View>
        </ScrollView>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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

export default ChangeTheme;
