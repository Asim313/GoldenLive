import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {ApiCallToken} from '../../Services/Apis';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Header from '../reuseable_Component/Header';

const UserLevels = () => {
  const userData = useSelector(state => state.auth.userData);
  const [talentList, setTalentList] = useState([]);
  const [showList, setShowList] = useState()
  const [totalLength, setTotalLength] = useState(null);
  const [selectedItem, setSelectedItem] = useState(0)
  const [isLoading, setIsLoading] = useState(null)
  const portionSize = 10;

  useEffect(() => {
    talentLevelListApi();
  }, []);

  useEffect(() => {
    console.log('kkkkkkllllllllllll...............', totalLength);
  }, [totalLength]);
  const talentLevelListApi = async () => {
    try {
      setIsLoading(true)
      const res = await ApiCallToken({
        params: userData?.token,
        route: 'user/levelsList',
        verb: 'GET',
      });

      if (res?.code === 200) {
        setTalentList(res ?? []);
        setShowList([...res?.data]?.splice(0, 10))
        let iterations = parseInt(res?.data?.length / portionSize);
        if (iterations > 0) {
          setTotalLength(
            Array.from({length: iterations}, (_, index) => ({
              key: index.toString(),
            })),
          );
        }
        console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', res?.data?.length);
      }
      setIsLoading(false)
    } catch (e) {
      console.log('error updateUserData func, home screen ', e.toString());
    }
  };


  const handleLevelSelect = (index) => {

    console.log('length', talentList?.data?.length, index)
    if(index === 0) {
      setShowList([...talentList?.data]?.splice(0, 10))
    } else if(index + 1 === parseInt(totalLength?.length)) {
      setShowList([...talentList?.data]?.splice((index * 10), talentList?.data?.length + 1))
    } else {
      setShowList([...talentList?.data]?.splice((index * 10), index * 10))
    }
  }
  const renderLevels = ({item}) => {
    return (
      <View style={{padding: 10}}>
        <Image
          source={{uri: item?.level_image}}
          style={styles.levelImageStyle}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header name={'User Level'} />
      {isLoading ? 
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />            
        </View>
          : 
          <>
      <Image
        source={{uri: talentList?.userbanner}}
        style={styles.bannerStyle}
        />
      <View style={{ marginVertical: heightPercentageToDP(2), marginHorizontal: widthPercentageToDP(2) }}>
  {totalLength?.[0] && (
    <FlatList
    data={totalLength}
    horizontal
    renderItem={({ item, index }) => {
      const indexVal = index + 1 === parseInt(totalLength?.length) ? talentList?.data?.length : index * 10
      return(
        <TouchableOpacity onPress={() => {
          setSelectedItem(index)
            handleLevelSelect(index)
          }} style={[styles.levelMenuContainer, { marginHorizontal: 5 }]}>
          <Text style={{...styles.levelFontStyle, color: selectedItem === index ? 'black' : '#50350D' }}>
            Level {(index * 10) + 1}-{indexVal}
          </Text>
        </TouchableOpacity>
          )
        }}
        contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1, // Ensure flexibility to fill the container horizontally
      }}
      keyExtractor={(item, index) => index.toString()}
      />
      )}
      </View>
  {showList &&
      <View style={{paddingHorizontal: 5, paddingBottom: heightPercentageToDP(44)}}>
        <FlatList
          data={showList}
          numColumns={2}
          contentContainerStyle={{alignItems: 'center'}}
          horizontal={false}
          keyExtractor={item => item?.id}
          renderItem={renderLevels}
          />
      </View>
      }
  </>
}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerStyle: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(28),
  },
  levelImageStyle: {
    height: heightPercentageToDP(20),
    width: heightPercentageToDP(20),
  },
  levelFontStyle: {fontSize: 11, fontWeight: 'bold', color: '#50350D', opacity: 0.7},
  levelMenuContainer: {
    backgroundColor: '#E78A00',
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
export default UserLevels;
