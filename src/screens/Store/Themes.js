import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  TextInput,
  ToastAndroid
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { ActivityIndicator, Divider } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  headings,
  primaryColor,
  secondaryColor,
  white,
} from '../../utils/Styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import getCountries from '../Store/Store'

// const Month = [
//   {
//     id: 1,
//     name: '1 month',
//   },
//   {
//     id: 2,
//     name: '3 month',
//   },
//   {
//     id: 3,
//     name: '6 month',
//   },
//   {
//     id: 4,
//     name: '12 month',
//   },
//   {
//     id: 5,
//     name: 'Recurring Subscription',
//   },
// ];

export default function Themes(props) {

  const userData = useSelector(state => state.auth.userData);

  const [themesChildData, setThemesChildData] = useState(props.themeData.store_child_categorie)

  const [getThemeChildId, setGetThemeChildId] = useState();
  const [getData, setGetData] = useState();
  const [parentid, setParentId] = useState()

  console.log("This is Parent Id", parentid)

  const [isLoading, setIsLoading] = useState(false);

  const purchaseTheme = async (item) => {

    console.log("item", item, parentid)

    setIsLoading(true);

    await fetch('https://www.golden-live.com/api/purchased_themes', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
      body: JSON.stringify({
        beans: item.beans,
        month: 1,
        parent_id: parentid,
        child_store_category: item.child_category_id,
        store_sub_child_categorie: item.id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log("This json Data", json)

        ToastAndroid.showWithGravityAndOffset(
          json.message,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          0,
          0,
        );
        setIsLoading(false);
      });
  };


  const [cases, setCases] = useState('New Themes');
  const [selectedItem, isSelectedItem] = useState(true);
  const [selectPkBtn, setselectPkBtn] = useState(0);
  const [Gift, setGift] = useState('Gift to a friend');
  const refRBSheet = useRef();

  function RenderView(props) {
    return (
      <View style={styles.card}>
        <ImageBackground
          source={{ uri: props.item.image }}
          style={{ width: '100%', height: '100%' }}
          imageStyle={{ borderRadius: 8 }}
          resizeMode="cover">
          <Text style={styles.titletext}>{props.item.title}</Text>
          <Text style={styles.pricetext}>{props.item.beans}</Text>
          <TouchableOpacity style={styles.button} onPress={() => {
            setGetData(props.item);

            refRBSheet.current.open()
          }}>
            <Text style={styles.buttontext}>Purchase</Text>
          </TouchableOpacity>
        </ImageBackground>
        <RBSheet
          ref={refRBSheet}
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
              height: "35%"
            },
          }}>
          <View style={{ flex: 1, backgroundColor: '#31384A' }}>
            {Gift == 'Gift to a friend' ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottomWidth: 0.2,
                  borderColor: 'white',
                }}>
                <View style={{ flexDirection: 'row', bottom: 5 }}>
                  <Text style={{ color: 'white', fontSize: 12, left: 5 }}>
                    Account ID:
                  </Text>
                  {Gift == 'Gift to a friend'}
                  <Text style={{ color: 'white', fontSize: 12, left: 5 }}>
                    12345678990
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setGift('Sure');
                  }}
                  style={{
                    backgroundColor: '#E93227',
                    right: 5,
                    padding: 4,
                    borderRadius: 20,
                    bottom: '2%',
                  }}>
                  <Text style={{ fontSize: 11, color: 'white', }}>{Gift}</Text>
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
                <View style={{ flexDirection: 'row', bottom: 5 }}>
                  <Text style={{ color: 'white', fontSize: 12, left: 5 }}>
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
                  <Text style={{ fontSize: 11, color: 'white', }}>{Gift}</Text>
                </TouchableOpacity>
              </View>
            )}

            <View
              style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
              <Text style={{ color: 'white' }}>Confirmation</Text>
              <AntDesign
                name="questioncircleo"
                color={'white'}
                style={{ marginLeft: 6 }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                flexWrap: 'wrap',
              }}>
              {/* {Month.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    setselectPkBtn(index);
                  }}>
                  <Text
                    style={[
                      styles.monthbtn,
                      selectPkBtn == index && {
                        borderColor: '#E93227',
                        color: '#E93227',
                      },
                    ]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))} */}
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', margin: "2%" }}>
              <Text style={{ color: 'white', padding: 6, textAlign: 'center', fontSize: 15, fontWeight: "500" }}>You can obtain this item (valid for 30 day) by participating in the Sweet Love activity.</Text>
            </View>

            <View style={{ flexDirection: 'row', marginLeft: 15 }}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Price: </Text>
              <Text style={{ color: '#E93227', fontWeight: 'bold' }}>10000k beans</Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#E93227',
                padding: 10,
                marginHorizontal: 70,
                borderRadius: 20,
                alignItems: 'center',
                marginTop: 20,
              }}
              onPress={() =>
                purchaseTheme(getData)
              }
              disabled={isLoading}
            >
              {isLoading ? <ActivityIndicator size="small" color="white" /> :
                <Text style={{ color: 'white' }}>Active</Text>}
            </TouchableOpacity>
          </View>
        </RBSheet>
      </View>
    );
  };

  return (
    <View style={{ height: '100%' }}>
      <Divider bold="2" style={{ backgroundColor: '#303749' }} />
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        keyExtractor={item => item.id}
        data={themesChildData}
        renderItem={(item, index) => (
          <View>
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={() => {
                setCases(item.item.store_sub_child_categorie)
                setParentId(item?.item?.parent_category_id)
                setGetThemeChildId(item.item.id)
              }}
              style={{
                height: 35,
                marginHorizontal: 10,

                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: cases === item.item.title ? secondaryColor : '#9293B0',
                  fontSize: 16,
                  alignSelf: 'center',
                }}>
                {item.item.title}
              </Text>
              <Divider
                bold="3"
                style={{
                  backgroundColor:
                    cases === item.item.name ? secondaryColor : null,
                  marginTop: 5,
                  marginHorizontal: 8,
                }}
              />
            </TouchableOpacity>
          </View>
        )}
      />
      {/* {cases === 'New Themes' && ( */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={cases}
        numColumns={2}
        renderItem={RenderView}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: heightPercentageToDP(28),
    margin: 3,
  },
  text: {
    fontSize: 16,
    alignSelf: 'center',
  },
  titletext: {
    fontSize: 16,
    color: secondaryColor,
    marginTop: widthPercentageToDP(35),
    marginHorizontal: widthPercentageToDP(3),
  },
  pricetext: {
    fontSize: 14,
    fontWeight: '600',
    color: secondaryColor,
    marginHorizontal: widthPercentageToDP(3),
  },
  buttontext: {
    fontSize: 12,
    color: secondaryColor,
    alignSelf: 'center',
  },
  button: {
    width: 70,
    height: 22,
    backgroundColor: '#F14A40',
    borderRadius: 15,
    marginHorizontal: widthPercentageToDP(3),
    marginTop: widthPercentageToDP(1),
    justifyContent: 'center',
  },
  monthbtn: {
    color: 'white',
    color: 'white',
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#31384A',
    marginHorizontal: 12,
    marginVertical: 10,
    borderWidth: 1,
    alignSelf: 'center',
    borderColor: 'white',
  },
});
