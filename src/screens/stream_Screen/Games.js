import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {ApiCallToken} from '../../Services/Apis';
import LiveUserBannner from '../../components/LiveUserBannner';
import FruitLoop from '../FruitLoopGame/FruitLoop/FruitLoop';
// import TeenPatti from '../Games/TeenPatti/TeenPatti/TeenPatti';
import RbSheetComponent from '../reuseable_Component/RbSheetComponent';
import {useNavigation} from '@react-navigation/native';
import ChinaGames from '../Games/ChinaGames/ChinaGames';
import {Image} from 'react-native';
import AllIcons, {IconList} from '../../components/AllIcons';
import SecondaryHeader from '../reuseable_Component/SecondaryHeader';

const Games = () => {
  const navigation = useNavigation();

  const teenPattiRef = useRef();
  const fruitLoopGameRef = useRef();
  const chinaGameSheetRef = useRef();

  const [gameId, setGameId] = useState(null);
  const userData = useSelector(state => state.auth.userData);
  const bannerData = useSelector(
    state => state.hostRed.bannerData?.list_of_home_banners,
  );
  const [bannersLoading, setBannersLoading] = useState(true);

  const [gamesList, setGamesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getGames = async () => {
    setIsLoading(true);
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: `game/chines/type`,
        verb: 'GET',
      });
      //  // setBlocked(blocked);
      setGamesList(res?.data ?? []);
      console.log('res', res);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  return (
    <View style={{...styles.container}}>
      <ScrollView
        style={{marginHorizontal: 7, marginBottom: heightPercentageToDP(7)}}>
        {!bannerData ? (
          <ActivityIndicator style={{}} />
        ) : (
          <View style={{marginVertical: 5, marginHorizontal: 7}}>
            <LiveUserBannner data={bannerData} width={92} height={18} />
          </View>
        )}

        <View>
          <FlatList
            data={gamesList}
            horizontal={false}
            keyExtractor={item => item?.gameId}
            renderItem={({item, index}) => {
              // console.log("itemmmmmmm", item)
              return (
                <TouchableOpacity
                  onPress={() => {
                    setGameId(item?.gameId);
                    chinaGameSheetRef.current.open();
                  }}
                  style={styles.gamesMainContainer}>
                  <ImageBackground
                    source={{uri: item?.large_image}}
                    style={{...styles.imagebg}}
                    borderRadius={12}
                  />
                  {/* <Text style={{fontSize: 11, fontWeight: 'bold', color: 'black'}}>{item?.name}</Text> */}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ScrollView>
      {/* <RbSheetComponent
        view={<TeenPatti onCrossPress={() => teenPattiRef.current.close()} />}
        refUse={teenPattiRef}
        close={false}
        backgroundColor={'transparent'}
        height={heightPercentageToDP(50)}
      />

      <RbSheetComponent
        view={
          <FruitLoop onCrossPress={() => fruitLoopGameRef.current.close()} />
        }
        refUse={fruitLoopGameRef}
        close={false}
        height={heightPercentageToDP(50)}
      /> */}

      <RbSheetComponent
        view={
          <View style={{flex: 1}}>
            <View
              style={{
                width: widthPercentageToDP(100),
                height: heightPercentageToDP(5),
                backgroundColor: 'white',
                justifyContent: 'center',
                paddingHorizontal: 10,
              }}>
              <TouchableOpacity
                onPress={() => chinaGameSheetRef.current.close()}>
                <AllIcons
                  iconName={'chevron-left'}
                  name={IconList.Feather}
                  size={widthPercentageToDP(8)}
                  color={'black'}
                />
              </TouchableOpacity>
            </View>
            <ChinaGames
              gameId={gameId}
              onCrossPress={() => chinaGameSheetRef.current.close()}
              fullScreen={true}
            />
          </View>
        }
        backgroundColor={'transparent'}
        refUse={chinaGameSheetRef}
        // close={false}
        height={heightPercentageToDP(100)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 10,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
    top: 4,
  },
  imagebg: {
    height: heightPercentageToDP(20),
    width: widthPercentageToDP(95),
  },
  gamename: {
    height: 90,
    width: 170,
    alignSelf: 'center',
  },
  gradiantbg: {
    height: 25,
    width: 55,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 30,
    alignSelf: 'center',
    top: 10,
  },
  gamesMainContainer: {
    // width: widthPercentageToDP(100),
    // height: heightPercentageToDP(22),
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    // marginVertical: 5,
    // right: 5,
  },
});
export default Games;
