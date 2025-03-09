import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import BackIcon from 'react-native-vector-icons/AntDesign';
import {RadioButton} from 'react-native-paper';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../reuseable_Component/Header';
const Language = () => {
  const navigation = useNavigation();
  const [checked, setchecked] = useState('first');
  const Data = [
    {speak: 'English', val: 'first'},
    {speak: 'Hindi', val: 'fifteen'},
    {speak: 'Urdu', val: 'second'},
    {speak: 'Japanese', val: 'third'},
    {speak: 'Turkish', val: 'fourth'},
    {speak: 'French', val: 'fifth'},
    {speak: 'Egyptian Arabic', val: 'six'},
    {speak: 'Indonesian', val: 'seven'},
    {speak: 'German', val: 'eight'},
    {speak: 'Arabic', val: 'nine'},
    {speak: 'Russian', val: 'ten'},
    {speak: 'Spanish', val: 'eleven'},
    {speak: 'Chiniese', val: 'twelve'},
  ];
  const ItemStyle = props => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        setchecked(props.item.val);
      }}>
      <View style={styles.LanView}>
        <RadioButton
          value={props.item.val}
          status={checked === props.item.val ? 'checked' : 'unchecked'}
          onPress={() => setchecked(props.item.val)}
          color={'#FF6E1C'}
        />
        <Text style={styles.LanTxt}>{props.item.speak}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/image36.png')}
        resizeMode={'stretch'}
        style={{height: '100%', width: '100%'}}>
       <Header name={'Language'}/>
        <View style={{flex: 1}}>
          <FlatList data={Data} renderItem={ItemStyle} />
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  LanView: {
    paddingVertical: heightPercentageToDP('1.8%'),
    flexDirection: 'row',
    paddingLeft: '3%',
    borderBottomWidth: 0.17,
    borderColor: '#B06AB3',
    alignItems: 'center',
  },
  LanTxt: {
    color: 'black',
    fontSize: 13,
    paddingHorizontal: '2%',
  },
});
export default Language;
