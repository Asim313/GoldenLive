import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import { ApiCallToken } from '../../Services/Apis';
import Header from '../reuseable_Component/Header';
import AgencyRecordTop3 from './components/AgencyRecordTop3';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { formatNumerWithK, truncateAfterTenCharacters, truncateAfterThreeCharacters } from '../../Services/GlobalFuntions';


const AgencyRecords = () => {
  
  const f2Image = require('../../assets/images/agencyrecords/f2.png');
const f1Image = require('../../assets/images/agencyrecords/f1.png');
const f3Image = require('../../assets/images/agencyrecords/f2.png');

  const navigation = useNavigation()
  const [topUsersData, setTopUsersData] = useState([]);
  const userData = useSelector(state => state.auth.userData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAgencyRecord();
  }, []);

  const getAgencyRecord = async () => {
    setIsLoading(true);
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'list/top/agency',
        verb: 'GET',
      });

      setTopUsersData(res?.data);
    } catch (error) {
      console.log('ERROR IS ====>>>', error);
    }
    setIsLoading(false);
  };

  const renderView = ({item}) => {
    return (
      <View style={{marginTop: '5%'}}>
        
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>

            <View style={{flexDirection: 'row', alignItems :'center', width: '40%'}}>
              <Image
                    source={{uri: item?.agency_image}}
                    resizeMode="contain"
                    style={{
                      height: 60,
                      width: 60,
                      borderRadius: 100,
                      borderWidth: 1,
                      borderColor: '#E92F24',
                    }}
                    />
                    <Text
                style={{
                  color: 'black',
                  marginLeft: 10,
                //  marginHorizontal: 5,
                  width: 70,
                  fontSize: 12,
                }}>
                {truncateAfterTenCharacters(item?.agency_name)}
              </Text>
              <Image
            style={{
              left: 2,
              height: 13,
              width: 20,
            }}
            source={{uri: item?.flag}}
          />
          </View>

          <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '20%'
                
                }}>
                <Image
                  style={{
                    height: 18,
                    width: 13,
                  }}
                  source={require('../../assets/images/agencyrecords/fire.png')}
                />
                <Text style={{fontSize: 13, color: 'black', left: 5}}>
                  {formatNumerWithK(item?.coins) ?? 0}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '20%'
                }}>
                <Image
                  style={{
                    height: 13,
                    width: 20,
                    right: 5,
                  }}
                  source={require('../../assets/images/agencyrecords/profile.png')}
                />
                <Text style={{fontSize: 13, color: 'black', right: 5}}>
                  {formatNumerWithK(item?.total_host) ?? 0}
                </Text>
                <TouchableOpacity 
                  onPress={() => {
                    navigation.navigate('AgencyID', {
                      agency_code: item?.agency_code
                    })
                  }}
                style={{
                  backgroundColor: '#E7614F', width: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center'
                  }}>
                <Text style={{fontSize: 11, fontWeight: 'bold', marginVertical: 3}}>Join</Text>
                  
              </TouchableOpacity>
              </View>

             
             
        </View>

      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FF7272'}}>
      <Header name={'Agency Record'} />
          {isLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
      <View>
        <View style={{backgroundColor: '#9C0000', flex: 1, width: '100%'}}>
            
          <ImageBackground
            style={{height: heightPercentageToDP(30), width: '100%', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row'}}
            source={require('../../assets/images/agencyrecords/bg2.png')}>
             <View style={{ top: 20}}>
             <AgencyRecordTop3 topUsersData={topUsersData?.[1]} bgImage={f2Image} />
             </View>
             
              <AgencyRecordTop3 topUsersData={topUsersData?.[0]} bgImage={f1Image} topImage={true} />

             <View style={{ top: 20}}>
             <AgencyRecordTop3 topUsersData={topUsersData?.[2]} bgImage={f3Image} />

             </View>

          </ImageBackground>
        </View>
    
        {topUsersData && (
            <View
              style={{
                top: heightPercentageToDP(30),
                backgroundColor: '#FFFFFF',
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}>
                <View style={{flexDirection: 'row', width: widthPercentageToDP(100), justifyContent: 'space-evenly', left: 30, marginVertical: 10}}>
                  <Text style={{fontSize: 13, fontWeight: 'bold', color: 'black'}}>Name</Text>
                  <Text style={{fontSize: 13, fontWeight: 'bold', color: 'black'}}>Coins</Text>
                  <Text style={{fontSize: 13, fontWeight: 'bold', color: 'black'}}>Members</Text>
                  </View>
              <FlatList data={[...topUsersData]?.splice(3)} renderItem={renderView} style={{marginBottom: heightPercentageToDP(50)}} />
            </View>
          )}
      </View>
        )}
    </View>
  );
};

export default AgencyRecords;

const styles = StyleSheet.create({});
