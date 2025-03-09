import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import LeftArrow from 'react-native-vector-icons/MaterialIcons';
import GemWealth from './GemWealth';
import {useNavigation} from '@react-navigation/native';
import {heightPercentageToDP} from 'react-native-responsive-screen';

import {
  headings,
  primaryColor,
  secondaryColor,
  white,
} from '../../utils/Styles';
import BronzeWealthClass from './BronzeWealthClass';
import LinearGradient from 'react-native-linear-gradient';
import SilverWealthClass from './SilverWealthClass';
import CrystalWealthClass from './CrystalWealthClass';
import CrownWealthClass from './CrownWealthClass';
import GoldWealth from './GoldWealth';
import KingWealthClass from './KingWealthClass';
import {ApiCallToken} from '../../Services/Apis';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import Header from '../reuseable_Component/Header';

const Buttons = [
  {
    id: 1,
    name: 'Silver',
    color: ['#E4E5E6', '#8B8C8F'],
    // Type: 'Stream_Popular',
  },
  {
    id: 2,
    name: 'Bronze',
    color: ['#093418', '#0E4724', '#16733C', '#26A757'],
  },
  {
    id: 3,
    name: 'Crystal',
    color: ['#11273F', '#1C3A60', '#29568F', '#3B7CCC'],
  },
  {
    id: 4,
    name: 'Gem',
    color: ['#431311', '#611D1C', '#972E2B', '#DE4442'],
  },
  {
    id: 5,
    name: 'Gold',
    color: ['#272608', '#413F0F', '#726A1F', '#B0A62D'],
  },
  {
    id: 6,
    name: 'Crown',
    color: ['#4B330D', '#654514', '#8C6019', '#BA8330'],
  },
  {
    id: 7,
    name: 'King',
    color: ['#2A0F3A', '#37164B', '#622487', '#8C35C2'],
  },
];

const MainWealthClass = () => {
  const [selectedItem, isSelectedItem] = useState(true);
  const [cases, setCases] = useState('Silver');
  const navigation = useNavigation();
  const userData = useSelector(state => state.auth.userData);
  const [buttons, setButtons] = useState([]);
  const [silver, setSilver] = useState([]);
  const [bronze, setBronze] = useState([]);
  const [crystal, setCrystal] = useState([]);
  const [gem, setGem] = useState([]);
  const [gold, setGold] = useState([]);
  const [crown, setCrown] = useState([]);
  const [king, setKing] = useState([]);

  const GetVipButtons = async () => {
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'get-vip',
        verb: 'GET',
      });

      setButtons(res);

      const silverCategory = res.find(category => category.title === 'Silver');
      if (silverCategory) {
        setSilver(silverCategory);
        // console.log("data22", silverCategory)
      }
      const bronzeCategory = res.find(category => category.title === 'Bronze');
      if (bronzeCategory) {
        setBronze(silverCategory);
        // console.log("data0000000000", bronzeCategory)
      }

      const crystalCategory = res.find(
        category => category.title === 'Crystal',
      );
      if (crystalCategory) {
        setCrystal(crystalCategory);
        // console.log("data0000000000", bronzeCategory)
      }

      const gemCategory = res.find(category => category.title === 'Gem');
      if (gemCategory) {
        setGem(gemCategory);
        // console.log("data0000000000", bronzeCategory)
      }

      const goldCategory = res.find(category => category.title === 'Gold');
      if (goldCategory) {
        setGold(goldCategory);
        // console.log("data0000000000", bronzeCategory)
      }

      const crownCategory = res.find(category => category.title === 'Crown');
      if (crownCategory) {
        setCrown(crownCategory);
        // console.log("data0000000000", bronzeCategory)
      }

      const kingCategory = res.find(category => category.title === 'King');
      if (kingCategory) {
        setKing(kingCategory);
        // console.log("data0000000000", bronzeCategory)
      }

      // setGettingGiftsArray(res);
    } catch (e) {
      console.log('MainWealthClass error -- ', e.toString());
    }
  };

  useEffect(() => {
    GetVipButtons();
    //  alert('sdf')
  }, []);

  const renderView = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: '#303749',
          // backgroundColor:
          //   cases === item.item.name ? '#EA3126' : '#303749',
          borderRadius: 5,
          height: 35,
          marginHorizontal: 6,
          width: 90,
          borderRadius: 20,
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() => {
            // isSelectedItem(item.title);
            setCases(item.title);
            // console.log(cases)
            // navigation.navigate(item.item.navi)
            // setVisible(!visible)
            // alert('Hello')
          }}
          //onPress={() => this.props.navigation.navigate(item.item.navi)}
          style={{}}>
          <Text
            style={{
              color: selectedItem === false ? 'red' : '#AEAECE',
              ...styles.text,
            }}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1, marginBottom: '13%'}}>
      <StatusBar backgroundColor={'black'} />
      <ImageBackground
        source={require('../../assets/images/image36.png')}
        resizeMode={'stretch'}
        style={{height: '100%', width: '100%'}}>
        <Header name={'Wealth Class'}/>

        <View style={{marginTop: 9}}>
          <FlatList
            // showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            // scrollEnabled={true}
            // keyExtractor={item => item.id}
            data={buttons}
            renderItem={renderView}
          />
          {cases == 'Silver' ? <SilverWealthClass data={silver} /> : null}

          {cases == 'Bronze' ? <BronzeWealthClass data={bronze} /> : null}

          {cases == 'Crystal' ? <CrystalWealthClass data={crystal} /> : null}

          {cases == 'Gem' ? <GemWealth data={gem} /> : null}

          {cases == 'Gold' ? <GoldWealth data={gold} /> : null}

          {cases == 'Crown' ? <CrownWealthClass data={crown} /> : null}

          {cases == 'King' ? <KingWealthClass data={king} /> : null}
        </View>
      </ImageBackground>
    </View>
  );
};

export default MainWealthClass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor,
    paddingBottom: heightPercentageToDP(5),
  },
  topview: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  text: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'white',
  },
  ctext: {
    fontSize: 14,
    alignSelf: 'center',
    color: 'white',
  },
  cardview: {
    // backgroundColor:'red',
    margin: 10,
    height: '75%',
  },
  card: {
    width: '48%',
    height: 250,
    backgroundColor: '#323d54',
    margin: 4,
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  luckycard: {
    width: '48%',
    height: 150,
    backgroundColor: '#323d54',
    margin: 4,
    borderRadius: 5,
    justifyContent: 'space-between',
  },

  cardbottom: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#E93227',
    height: '15%',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  verticleLine: {
    height: '60%',
    width: 1,
    backgroundColor: '#D9D9D9',
  },
  bottomview: {
    // position:'absolute',
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
