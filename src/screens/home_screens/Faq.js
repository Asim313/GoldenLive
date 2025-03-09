import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {ImageBackground} from 'react-native';
import BackIcon from 'react-native-vector-icons/AntDesign';
import {FlatList} from 'react-native';
import {ScrollView} from 'react-native';
import {headings} from '../../utils/Styles';
import DropDown from '../reuseable_Component/DropDown';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../reuseable_Component/Header';
const Faq = () => {
  const navigation = useNavigation();
  const [check, setcheck] = useState(false);
  const [ValCheck, setValCheck] = useState('');
  const [Icon, setIcon] = useState('right');
  const [FlatIcon, setFlatIcon] = useState('right');
  const Data = [
    {
      id: 0,
      name: 'Account Basics',
    },
    {
      id: 1,
      name: 'Starting a Live Show',
    },
    {
      id: 2,
      name: 'Beans, Coins, Gifts & Cash Out',
    },
    {
      id: 3,
      name: 'Level',
    },
    {
      id: 4,
      name: 'My Check-In',
    },
    {
      id: 5,
      name: 'Top Up',
    },
    {
      id: 6,
      name: 'Shop',
    },
    {
      id: 7,
      name: 'Beans Bag',
    },
  ];
  const ItemStyle = props => (
    <TouchableOpacity
      onPress={() => {
        setValCheck(props.item.id);
      }}>
      <View style={styles.BarView}>
        <View>
          <Text style={styles.BarTxt}>{props.item.name}</Text>
        </View>
        <BackIcon name={FlatIcon} size={20} color={'white'} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/image36.png')}
        resizeMode={'stretch'}
        style={{height: '100%', width: '100%'}}>
        <Header name={'FAQ'} />
        <ScrollView>
          <View>
           
          </View>
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                check == false ? setcheck(true) : setcheck(false);
                Icon == 'right' ? setIcon('down') : setIcon('right');
              }}>
              <View style={styles.UseAble}>
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 17,
                        color: 'black',
                        fontWeight: 'bold',
                      }}>
                      Golden
                    </Text>
                    <Text
                      style={{
                        fontSize: 17,
                        color: 'red',
                        fontWeight: '450',
                        left: 2,
                      }}>
                      Live
                    </Text>
                  </View>
                  <View>
                    {check == true ? (
                      <DropDown
                        // height={120}
                        title={
                          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor,consectetur adipiscing elit, sed do eiusmod tempor'
                        }
                      />
                    ) : null}
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    check == false ? setcheck(true) : setcheck(false);
                    Icon == 'right' ? setIcon('down') : setIcon('right');
                  }}>
                  <BackIcon name={Icon} size={20} color={'black'} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <FlatList data={Data} renderItem={ItemStyle} />
          </View>
          <View style={{height: heightPercentageToDP('8%')}}></View>
        </ScrollView>
        <View style={{justifyContent: 'flex-end'}}>
          <View style={[styles.logbox]}>
            <Text style={styles.power}>
              Powered by LimeTechnologies Pvt Ltd
            </Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242A38',
  },
  settingbox: {
    flexDirection: 'row',
    paddingVertical: heightPercentageToDP('1.5%'),
    alignItems: 'center',
  },
  settingtxt: {
    fontSize: 19,
    color: 'black',
    fontWeight: '500',
  },
  icon: {
    color: 'black',
    paddingHorizontal: 5,
  },
  Img: {
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  UseAble: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '2%',
    paddingVertical: heightPercentageToDP('2.5%'),

    borderBottomWidth: heightPercentageToDP(0.4),
    borderColor: '#242A38',
  },
  BarView: {
    paddingVertical: heightPercentageToDP('2.5%'),
    flexDirection: 'row',
    paddingHorizontal: '2%',
    borderBottomWidth: heightPercentageToDP(0.4),
    borderColor: '#242A38',
    justifyContent: 'space-between',
  },
  BarTxt: {
    color: 'black',
    fontSize: 13,
  },
  para: {
    borderBottomWidth: heightPercentageToDP(0.4),
    borderColor: '#242A38',
    backgroundColor: '#303749',
  },
  logbox: {
    paddingVertical: heightPercentageToDP('1%'),
    marginHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'flex-end',
  },
  logtxt: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  power: {
    textAlign: 'center',
    ...headings.h8,
    color: 'black',
  },
});
export default Faq;
