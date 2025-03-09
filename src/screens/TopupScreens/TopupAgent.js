import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Linking,
} from 'react-native';
import React, {useState,useEffect} from 'react';
import {
  black,
  headings,
  secondaryColor,
  white,
} from '../../utils/Styles';
import {ApiCallToken} from '../../Services/Apis';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import HomeModal from '../reuseable_Component/HomeModal';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import AllIcons, { IconList } from '../../components/AllIcons';

export default function TopupAgent() {
  const navigation = useNavigation();
  const modal2Ref = React.createRef();
  const [selectPkBtn, setselectPkBtn] = useState('Select Country');
  const [selectPkBtnA, setselectPkBtnA] = useState(0);
  const [Regions, setRegions] = useState([]);
  const [topUPAgentpi,setTopUPApi] = useState([])
  const [agentCountryData,setAgentCountryData] = useState([])

  const userData = useSelector(state => state.auth.userData);
 


  
  const countries = async() => {
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'countries',
        verb: 'GET',
      });
      setRegions(res)
    } catch (error) {
      console.log('Editprofile, countries func', error);
    }
  };

  const topupAgentAPI = async() => {
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'top-up/agent',
        verb: 'GET',
      });
      setTopUPApi(res)
    } catch (error) {
      console.log('Editprofile, countries func', error);
    }
  };

  const handleWhatsAppPress = phoneNumber => {
    const message = encodeURIComponent('Hi');
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    Linking.openURL(url).catch(error =>
      console.log('Error opening WhatsApp: ', error),
    );
  };
  


  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
    <View style={styles.numberContainer}>
      <Text style={styles.nameText}>{item?.name }</Text>
      <Text style={styles.numberText}>{item?.contact_number }</Text>
    </View>
    <TouchableOpacity
      style={styles.buttonView}
      onPress={() => handleWhatsAppPress(item?.contact_number)}>
      <View style={styles.iconView}>
        <AllIcons name={IconList.FontAwesome} iconName="whatsapp" size={20} color="white" />
      </View>
      <Text style={styles.buttonText}>Message Us!</Text>
    </TouchableOpacity>
  </View>
  );
  

  const SerVicesss = () => {
       let ch = topUPAgentpi.filter((item)=>item?.name===selectPkBtn)
       setAgentCountryData(ch?.[0]?.agent_country)
  }

  useEffect(() => {
    countries()
    topupAgentAPI()
    SerVicesss()
  }, [])

  useEffect(() => {
    SerVicesss()
  }, [selectPkBtn])
  return (
    <View style={styles.container}>
      <View style={styles.topview}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AllIcons name={IconList.Ionicons} iconName="chevron-back" size={30} color={white} />
        </TouchableOpacity>
        <Text style={{...headings.h3, color: 'white'}}>Topup Agent</Text>
      </View>
      <ScrollView
        style={{
          height: '100%',
          width: '100%',
        }}>
        <ImageBackground
          source={require('../../assets/images/topupAgent/topupbg.png')}
          resizeMode="cover">
          <View style={{height: 400, width: '100%'}}></View>
          <View style={styles.topupcard}>
            <LinearGradient
              colors={['#FFE266', '#FFBB2D']}
              style={styles.linearGradient}>
              <Text style={styles.topupText}>Special Topup Offer</Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <Text
                  style={{
                    width: '50%',
                    color: black,
                    fontSize: 16,
                    padding: 10,
                  }}>
                  Abhi TopUp Karain aur Jetain Shandaar Rewards!
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('TopupDetails')}
                  style={{
                    backgroundColor: '#EB352A',
                    width: 120,
                    height: 40,
                    borderRadius: 30,
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',

                      justifyContent: 'center',
                    }}>
                    <Text style={{color: secondaryColor}}>Details</Text>
                    <AllIcons
                      name={IconList.MaterialCommunityIcons}
                      iconName="chevron-double-right"
                      size={20}
                      color={white}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
          <TouchableOpacity
            onPress={() => {
              modal2Ref.current.toggleModal();
            }}
            style={{
              marginVertical: 20,
              backgroundColor: '#FFDE60',
              width: 190,
              height: 40,
              borderRadius: 30,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
              }}>
              <Text style={{color: 'black'}}>{selectPkBtn}</Text>
              <AntDesign
                name="caretdown"
                size={10}
                color={black}
                style={{alignSelf: 'center'}}
              />
            </View>
          </TouchableOpacity>
        </ImageBackground>
        <FlatList
        data={agentCountryData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      </ScrollView>
      <HomeModal
        view={
          <View
            style={{
              backgroundColor: '#FBDB65',
              height: 400,
              width: 300,
              alignSelf: 'center',
              paddingLeft: 5,
              paddingRight: 5,
              borderRadius: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
              }}>
              <Text style={{fontSize: 17}}>Please Select</Text>
              <AllIcons name={IconList.AntDesign} iconName="caretdown" size={16} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {Regions.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    setselectPkBtn(item.name);
                    setselectPkBtnA(index);

                    modal2Ref.current.toggleModal();
                  }}>
                  <Text
                    style={[
                      styles.RegionList,
                      selectPkBtnA == index && {
                        borderColor: '#EB352A',
                        color: black,
                        fontWeight: '500',
                      },
                    ]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        }
        ref={modal2Ref}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9B7833',
  },
  topview: {
    flexDirection: 'row',
    paddingTop: 10,
    backgroundColor: '#E3A542',
    paddingBottom: 10,
  },
  topupcard: {
    alignSelf: 'center',
    width: '90%',
    height: 150,
    borderColor: '#EB352A',
    borderWidth: 1,
    borderRadius: 15,
  },
  agentcard: {
    alignSelf: 'center',
    width: '90%',
    // height: 300,
    borderColor: '#EB352A',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 40,
  },
  topupText: {
    alignSelf: 'center',
    color: black,
    fontSize: 22,
    fontWeight: '500',
    marginTop: 15,
  },
  linearGradient: {
    flex: 1,
    borderRadius: 15,
  },
  RegionList: {
    marginVertical: 8,
    fontSize: 18,
    borderBottomWidth: 0.3,
    color: 'black',
    paddingLeft: 10,
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '1.5%',
    paddingHorizontal: '4%',
    // marginVertical: 1,
    backgroundColor: '#fed758',
    borderRadius: 8,
    marginHorizontal:'8%',
    marginBottom:'5%',
  },
  buttonView: {
    marginLeft: 6,
    backgroundColor: 'white',
    paddingVertical: '2.5%',
    paddingHorizontal: '6%',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconView: {
    height: 27,
    width: 27,
    borderRadius: 14,
    backgroundColor: '#25d366',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '5%',
  },
  buttonText: {
    color: '#158c7f',
    fontSize: 16,
    fontWeight: '500',
  },
  numberContainer: {
    marginLeft: 3,
  },
  nameText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  numberText: {
    fontSize: 16,
    color: 'black',
    // fontWeight: '500',
  },
});
