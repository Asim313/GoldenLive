import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {ApiCallToken} from '../Services/Apis';

const StoreRBSheetCom = ({data}) => {
  const userData = useSelector(state => state.auth.userData);
  const refRBSheetG = useRef();
  const [Gift, setGift] = useState('Gift to a friend');
  const [isLoading, setisLoading] = useState(false);
  const [getData, setGetData] = useState([]);

  const purchaseTheme = async item => {
    setisLoading(true);
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
      setisLoading(true);
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
    setisLoading(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          paddingHorizontal: 15,
          paddingVertical: 2,
          backgroundColor: '#FF6B00',
          borderRadius: 5,
        }}
        onPress={() => {
          setGetData(data);
          refRBSheetG.current.open();
        }}>
        <Text>Buy</Text>
      </TouchableOpacity>
      <RBSheet
        ref={refRBSheetG}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
            height: 0,
          },
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: '#31384A',
            height: '35%',
          },
        }}>
        <View style={{flex: 1, backgroundColor: '#31384A'}}>
          {Gift == 'Gift to a friend' ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 0.2,
                borderColor: 'white',
              }}>
              <View style={{flexDirection: 'row', bottom: 5}}>
                <Text style={{color: 'white', fontSize: 12, left: 5}}>
                  Account ID:
                </Text>
                {Gift == 'Gift to a friend'}
                <Text style={{color: 'white', fontSize: 12, left: 5}}>
                  {data?.id}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  setGift('Sure');
                }}
                style={{
                  backgroundColor: '#E93227',
                  right: 5,
                  padding: 5,
                  borderRadius: 20,
                  bottom: '2%',
                }}>
                <Text style={{fontSize: 11, color: 'white'}}>{Gift}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 0.2,
                borderColor: 'white',
              }}>
              <View style={{flexDirection: 'row', bottom: 5}}>
                <Text style={{color: 'white', fontSize: 12, left: 5}}>
                  Account ID:
                </Text>
                <TextInput
                  placeholder="Enter Id"
                  keyboardType={'numeric'}
                  placeholderTextColor="#b3b3b3"
                  style={{
                    borderWidth: 0.5,
                    padding: 0,
                    marginLeft: 15,
                    width: '50%',
                    bottom: 2,
                    height: 22,
                    paddingLeft: 5,
                    borderColor: '#E93227',
                    color: 'white',
                  }}
                />
              </View>

              <TouchableOpacity
                onPress={() => {
                  setGift('Gift to a friend');
                  alert('Gift Successfully send');
                }}
                style={{
                  backgroundColor: '#E93227',
                  right: 5,
                  padding: 4,
                  borderRadius: 20,
                  bottom: '2%',
                  width: '15%',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 11, color: 'white'}}>{Gift}</Text>
              </TouchableOpacity>
            </View>
          )}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <Text style={{color: 'white', marginTop: 8, marginLeft: 7}}>
              Confirmation
            </Text>
            <AntDesign
              name="questioncircleo"
              color={'white'}
              style={{marginLeft: 7}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',

              width: '100%',
              flexWrap: 'wrap',
            }}></View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              margin: '2%',
            }}>
            <Text
              style={{
                color: 'white',
                padding: 6,
                textAlign: 'center',
                fontSize: 15,
                fontWeight: '500',
              }}>
              You can obtain this item (valid for 30 day) by participating in
              the Sweet Love activity.
            </Text>
          </View>

          <View style={{flexDirection: 'row', marginLeft: 15, marginTop: 5}}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Price: </Text>
            <Text style={{color: '#E93227', fontWeight: 'bold'}}>
              {data?.beans} beans
            </Text>
          </View>
          {}

          <TouchableOpacity
            style={{
              backgroundColor: '#E93227',
              padding: 10,
              marginHorizontal: 70,
              borderRadius: 20,
              alignItems: 'center',
              marginTop: 20,
            }}
            onPress={() => purchaseTheme(getData)}
            disabled={isLoading}>
            {isLoading ? (
                <ActivityIndicator size="small" color="white" />
                ) : (
                    <Text style={{color: 'white'}}>Active</Text>
                    )}
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
};

export default StoreRBSheetCom;

const styles = StyleSheet.create({});
