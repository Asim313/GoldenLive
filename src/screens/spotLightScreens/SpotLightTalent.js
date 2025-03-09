import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import AllIcons from '../../components/AllIcons';
import {useSelector} from 'react-redux';
import {ApiCallToken} from '../../Services/Apis';
const Data = [
  {
    Icon: (
      <AllIcons name={'Ionicons'} iconName={'mic'} size={20} color="white" />
    ),
    name: 'VickeyJee',
    ID: 1234567,
    Sing: 'Singer',
    time: '6:00:00 PM PST',
  },
  {
    Icon: (
      <AllIcons name={'Ionicons'} iconName={'mic'} size={20} color="white" />
    ),
    name: 'VickeyJee',
    ID: 1234567,
    Sing: 'Singer',
    time: '6:00:00 PM PST',
  },
  {
    Icon: (
      <AllIcons name={'Ionicons'} iconName={'mic'} size={20} color="white" />
    ),
    name: 'VickeyJee',
    ID: 1234567,
    Sing: 'Singer',
    time: '6:00:00 PM PST',
  },
  {
    Icon: (
      <AllIcons name={'Ionicons'} iconName={'mic'} size={20} color="white" />
    ),
    name: 'VickeyJee',
    ID: 1234567,
    Sing: 'Singer',
    time: '6:00:00 PM PST',
  },
  {
    Icon: (
      <AllIcons name={'Ionicons'} iconName={'mic'} size={20} color="white" />
    ),
    name: 'VickeyJee',
    ID: 1234567,
    Sing: 'Singer',
    time: '6:00:00 PM PST',
  },
  {
    Icon: (
      <AllIcons name={'Ionicons'} iconName={'mic'} size={20} color="white" />
    ),
    name: 'VickeyJee',
    ID: 1234567,
    Sing: 'Singer',
    time: '6:00:00 PM PST',
  },
  {
    Icon: (
      <AllIcons name={'Ionicons'} iconName={'mic'} size={20} color="white" />
    ),
    name: 'VickeyJee',
    ID: 1234567,
    Sing: 'Singer',
    time: '6:00:00 PM PST',
  },
  {
    Icon: (
      <AllIcons name={'Ionicons'} iconName={'mic'} size={20} color="white" />
    ),
    name: 'VickeyJee',
    ID: 1234567,
    Sing: 'Singer',
    time: '6:00:00 PM PST',
  },
  {
    Icon: (
      <AllIcons name={'Ionicons'} iconName={'mic'} size={20} color="white" />
    ),
    name: 'VickeyJee',
    ID: 1234567,
    Sing: 'Singer',
    time: '6:00:00 PM PST',
  },
];

const SpotLightTalent = () => {
  const userData = useSelector(state => state.auth.userData);
  const [categoryTitle, setCategoryTitle] = useState([]);

  const GetApiData = async () => {
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'spot/light/performance/time',
        verb: 'GET',
      });
      console.log('categoryTitle iiiiiiiiiiiiiiin', res.spotlight);
      //   const keys = Object.keys(res);
      setCategoryTitle(res.spotlight);

      // console.log('Data fetch from button component ',luckyDraw)
    } catch (e) {
      console.log('saga login error -- ', e.toString());
    }
  };

  useEffect(() => {
    GetApiData();
  }, []);
  const renderItem = ({item}) => {
    return (
      <View style={styles.renderView}>
        <View style={styles.renderIcon}>
          <Icon>{item.Icon}</Icon>
        </View>

        <View style={styles.renderIDView}>
          <View style={styles.renderTextView}>
            <Text style={styles.renderName}>{item.category_name}</Text>
            <Text style={{color: 'black'}}>ID: {item.host_id}</Text>
          </View>

          <View style={styles.renderTextView}>
            <Text style={styles.renderSing}>{item.nick_name}</Text>
            <Text style={styles.renderTime}>{item.settime}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.headerView}>
        <AllIcons
          name={'Ionicons'}
          iconName={'chevron-back-outline'}
          size={25}
          color="black"
        />
        <Text style={styles.headerText}>Uplaod Verification Materials</Text>
      </View>

      <ImageBackground
        source={require('../../assets/images/SpotLightImages/spotlighbg.png')}
        style={{height: '100%', width: '100%'}}>
        <View style={styles.LinearGradientView}>
          <LinearGradient
            colors={['#FFE266', '#FFBB2D']}
            style={styles.linearGradient}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.time}>21-OCTOBER</Text>
            </View>

            <FlatList
              data={categoryTitle}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}></FlatList>
          </LinearGradient>
        </View>
      </ImageBackground>
    </View>  
  );
};

export default SpotLightTalent;

const styles = StyleSheet.create({
  renderView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  renderIcon: {
    backgroundColor: 'red',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  renderIDView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  renderName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    fontStyle: 'italic',
  },
  renderTextView: {
    paddingLeft: 10,
  },
  renderSing: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
    textAlign: 'center',
  },
  renderTime: {
    color: 'black',
    fontSize: 12,
    top: 5,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#E3A542',
  },
  headerText: {
    fontSize: 20,
    color: 'black',
    paddingLeft: 5,
    fontWeight: '600',
  },
  LinearGradientView: {
    padding: 20,
    marginTop: 250,
    marginBottom: 100,
  },
  linearGradient: {
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'red',
    padding: 10,
    // marginBottom: 20
  },
  time: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 20,
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingRight: 20,
  },
});
