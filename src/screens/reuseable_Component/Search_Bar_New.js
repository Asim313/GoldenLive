import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Search from 'react-native-vector-icons/Feather';

import { useRef } from 'react';
import GameSheet from '../../components/GamesSheet';
import RbSheetComponent from './RbSheetComponent';


const New_Search_Bar = () => {
  const navigation = useNavigation();

  const gameSheetRef = useRef(null);


  return (
    <View style={{}}>

      <View
        style={{
          
          width: widthPercentageToDP(100), flexDirection: 'row', justifyContent: 'space-around',
        }}>
       
       <TouchableOpacity onPress={() => navigation.navigate('AgencyRecords')}>
        <Image source={require('../../assets/images/search_bar/agency.png')} style={styles.iconStyle} />
       </TouchableOpacity>
       
          <TouchableOpacity onPress={() => {
            navigation.navigate('SearchUser')
            //  navigation.navigate('SocketTesting')
            }}>
            <View
              style={{
                backgroundColor: '#F0ECEC',
                borderRadius: 50,
                paddingHorizontal: 5,
                width: widthPercentageToDP(70),
                flexDirection: 'row',
                
                alignItems: 'center'
              }}>
              <Search name="search" size={25} color="grey" style={{}} />
              <Text style={{color: 'grey', fontSize: 14, left: 8}}>Search ID</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('RecordsMain')}>
            <Image source={require('../../assets/images/search_bar/family.png')} style={{height: 25, width: 30}} />
          </TouchableOpacity>
        
        </View>

      <RbSheetComponent
        view={
          <GameSheet />
        }
        refUse={gameSheetRef}
        close={true}
        height={heightPercentageToDP(21)}
        />

        </View>
  );
};

export default New_Search_Bar;

const styles = StyleSheet.create({
  iconStyle: {height: 25, width: 25}
});
