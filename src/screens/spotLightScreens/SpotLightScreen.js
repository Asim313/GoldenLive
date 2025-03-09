import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Checkbox from 'expo-checkbox';
import AllIcons from '../../components/AllIcons';
// import AllIcons, { IconList } from '../AllIcons';
import {useSelector} from 'react-redux';
import {ApiCallToken} from '../../Services/Apis';
import CategoryBotton from './categoryBotton/CategoryBotton';

const SpotLightScreen = ({navigation}) => {
  const [Checked, setChecked] = useState(false);
  const userData = useSelector(state => state.auth.userData);
  const [categoryTitle, setCategoryTitle] = useState([]);

  const GetApiData = async () => {
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'spot/light/category/listing',
        verb: 'GET',
      });
      // console.log('categoryTitle iiiiiiiiiiiiiiin', res.spotlight);
      //   const keys = Object.keys(res);
      setCategoryTitle(res.spotlight);

      // console.log('Data fetch from button component ',luckyDraw)
    } catch (e) {
      console.log('saga login error -- ', e.toString());
    }
  };

  // console.log('categoryTitle oooooo', categoryTitle);

  useEffect(() => {
    GetApiData();
  }, []);

  const renderItem = ({item}) => {
    // console.log('renderView data into flatlist ', item.id);

    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={styles.bottomImageText}
          onPress={() => navigation.navigate('UploadData', {id: item.id})}>
          <Image
            source={{uri: item.spot_light_category_image}}
            style={styles.imageStyle}></Image>
          <Text style={styles.imgText}>{item.category_name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.headerView}>
        <TouchableOpacity>
          <AllIcons
            name={'Ionicons'}
            iconName={'chevron-back-outline'}
            size={25}
            color="black"
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Spotlight Talent Verification</Text>
      </View>

      <ScrollView>
        <ImageBackground
          source={require('../../assets/images/SpotLightImages/spotlighttt.png')}
          style={{width: '100%', height: '100%'}}>
          <Text style={styles.imageText}>
            <Text style={{color: 'red'}}>Achieve</Text> Your Start{' '}
            <Text style={{color: 'red'}}>Potential</Text>
          </Text>

          <View style={{padding: 20}}>
            <LinearGradient
              colors={['#FFE266', '#FFBB2D']}
              style={styles.linearGradientStyle}>
              <View style={styles.linearTopView}>
                <Text style={styles.linearTopText}>
                  Discover Your True You!
                </Text>
              </View>

              <View style={styles.linearText}>
                <Text style={{color: 'white'}}>
                  Become an GoldenLive Limelight ralent and receive the fallowing
                  special privileges:
                </Text>
              </View>

              <Text style={styles.boxText}>
                1.Appear in the GoldenLive Limelight Marquee list with the most
                exclusive crowd of GoldenLive talents,
              </Text>

              <Text style={styles.boxText}>
                2.Glorify yourself with Limelight talent tag and receive more
                recognition. Be seen & known by all!
              </Text>

              <Text style={styles.boxText}>
                3.Get Me chance to be pinned to top on the Spotlight Marquee,
                join All-Star PKs for exclusive rewards and more! Maybe even Min
                GoldenLive exclusive In-Real-Life parties
              </Text>

              <View style={styles.checkbox}>
                <Checkbox
                  value={Checked}
                  onValueChange={setChecked}
                  color={'red'}
                />
                <Text style={styles.checkboxText}>
                  Please contact our official Facebook page with any inquires.
                </Text>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.imageView}>
            <LinearGradient
              colors={['#FFE266', '#FFBB2D']}
              style={styles.linearGradientStyle}>
                <TouchableOpacity>
                <CategoryBotton />
                </TouchableOpacity>
           

              <FlatList
                data={categoryTitle}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                // horizontal={true}
                numColumns={2}></FlatList>
            </LinearGradient>
          </View>
        
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

export default SpotLightScreen;

const styles = StyleSheet.create({
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
  imageText: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 280,
    color: 'black',
    paddingHorizontal: 15,
  },
  linearGradientStyle: {
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'red',
    padding: 10,
  },
  linearTopView: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: -20,
  },
  linearTopText: {
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#FFC43A',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  linearText: {
    backgroundColor: 'red',
    alignItems: 'center',
    borderRadius: 10,
    padding: 7,
    marginBottom: 10,
  },
  boxText: {
    color: 'black',
    marginBottom: 10,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    fontSize: 10,
    paddingLeft: 7,
  },
  imageView: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  topText: {
    backgroundColor: 'red',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  bottomImageText: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  imageStyle: {
    width: 70,
    height: 112,
  },
  imgText: {
    color: 'black',
    fontWeight: 'bold',
  },
  imgandtxt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
