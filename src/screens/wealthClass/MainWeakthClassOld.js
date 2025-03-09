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
  import { ApiCallToken } from '../../Services/Apis';
  import { useSelector } from 'react-redux';
  import { useEffect } from 'react';
  
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
    const [buttons, setButtons] = useState('Silver');
  
    
  
    const GetVipButtons = async () => {
      try {
        const res = await ApiCallToken({
          params: userData.token,
          route: 'get-vip',
          verb: 'GET',
        });
          setButtons(res)
        // setGettingGiftsArray(res);
      } catch (e) {
        console.log('saga login error -- ', e.toString());
      }
    };
  
  useEffect(() => {
     GetVipButtons();
    //  alert('sdf')
  }, [])
  
  
  
    return (
      <View style={{flex: 1, marginBottom: '13%'}}>
        <StatusBar backgroundColor={'black'} />
        <ImageBackground
          source={require('../../assets/images/image36.png')}
          resizeMode={'stretch'}
          style={{height: '100%', width: '100%'}}>
          <LinearGradient
            colors={['#4568DC', '#B06AB3']}
            style={{
              height: 50,
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 15,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <LeftArrow
                    name="arrow-back-ios"
                    size={20}
                    style={{color: 'white', alignSelf: 'center'}}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  Wealth Class
                </Text>
              </View>
            </View>
          </LinearGradient>
  
          <View style={{marginTop: 9}}>
            <FlatList
              // showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              // scrollEnabled={true}
              keyExtractor={item => item.id}
              data={Buttons}
              renderItem={(item, index) => (
                console.log(item.item.color),
                (
                  <LinearGradient
                    colors={item.item.color}
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
                        // isSelectedItem(item.item.name);
                        setCases(item.item.name);
                        // console.log(cases)
                        // navigation.navigate(item.item.navi)
                        // setVisible(!visible)
                      }}
                      //onPress={() => this.props.navigation.navigate(item.item.navi)}
                      style={{}}>
                      <Text
                        style={{
                          color: selectedItem === false ? '#fff' : '#AEAECE',
                          ...styles.text,
                        }}>
                        {item.item.name}
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                )
              )}
            />
            {cases == 'Silver' ? <SilverWealthClass /> : null}
  
            {cases == 'Bronze' ? <BronzeWealthClass /> : null}
  
            {cases == 'Crystal' ? <CrystalWealthClass /> : null}
  
            {cases == 'Gem' ? <GemWealth /> : null}
  
            {cases == 'Gold' ? <GoldWealth /> : null}
  
            {cases == 'Crown' ? <CrownWealthClass /> : null}
  
            {cases == 'King' ? <KingWealthClass /> : null}
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
  