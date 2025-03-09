import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import { ApiCallToken } from '../../../Services/Apis';
import ViewersProfile from './ViewersProfile';

const ViewersScreen = ({route}) => {
  const userData = useSelector(state => state.auth.userData);
  const [topHostData, setTopHostData] = useState([]);
  const {id} = route.params;
  const [topTalent, setTopTalent] = [topHostData?.topHosts];
  const [topUser, setTopUser] = [topHostData?.topUsers];

  const [idUse, setIdUse] = useState(id);

  // console.log('check data pass id -=-=-=-id ', idUse);

  const getTopUsersHosts = async () => {
    try {
      const paramsBody = {
        gift_id: idUse,
      };
      const res = await ApiCallToken({
        params: userData.token,
        paramsBody: paramsBody,
        route: 'weekly-star/top-users-hosts',
        verb: 'POST',
      });

       console.log('weekly star api data -=-=-=-12223', res);
      setTopHostData(res.data);
    } catch (e) {
      console.log('error updateUserData func, home screen ', e.toString());
    }
  };

  useEffect(() => {
    getTopUsersHosts();
  }, []);


  const renderView = ({item}) => {
    // console.log('check data come or not into it ', item);
    return <ViewersProfile item={item} />;
  };

  const renderView2 = ({item}) => {
    // console.log('check data come or not into it ', item);
    return <ViewersProfile item={item} />;
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/image36.png')}
      style={{flex: 1, alignItems: 'center', backgroundColor: 'black'}}>
  
      <View style={{height:'5%',width:'90%',justifyContent:'center'}}>
        <Text style={{fontSize: 16, fontWeight: '800', color: 'black'}}>
          Talent Top 3
        </Text>
      </View>
      <View style={{width: '95%', height: '30%', top: 10,}}>
 
        <FlatList data={topTalent} renderItem={renderView} />
      </View>
      <View style={{height:'5%',width:'90%',justifyContent:'center'}}>
        <Text style={{fontSize: 16, fontWeight: '800', color: 'black'}}>
          Talent Top 3
        </Text>
      </View>
      <View style={{width: '90%', height: '30%', top: 10}}>
        <FlatList data={topUser} renderItem={renderView2} />
      </View>
    </ImageBackground>
  );
};

export default ViewersScreen;

const styles = StyleSheet.create({});
