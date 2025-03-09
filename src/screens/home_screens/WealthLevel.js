import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

export default function WealthLevel({navigation}) {
  const [profileGrid, setProfileGrid] = useState([
    {
      title: 'Lv.1',
      maintitle: 'Level 01',
      count: 'Beans: 0',
    },
    {
      title: 'Lv.1',
      maintitle: 'Level 01',
      count: 'Beans: 0',
    },
    {
      title: 'Lv.1',
      maintitle: 'Level 01',
      count: 'Beans: 0',
    },
  ]);
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View style={styles.editprofilebox}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EditProfile');
            }}>
            <Ionicon name="chevron-back" size={30} color={'white'} />
          </TouchableOpacity>
          <Text style={styles.editprofiletxt}>Wealth Level Explanation</Text>
        </View>
        <TouchableOpacity>
          <View style={styles.savebox}>
            <Text style={styles.savetxt}>Close</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* <View>
        <Text style={styles.lvlofwealthtxt}>LEVEL OF WEALTH</Text>
      </View> */}
      {/* <FlatList
        renderItem={({item, index, separators}) => (
          <TouchableOpacity>
            <View style={styles.maincontainer}>
              <View
                style={{
                  padding: 25,
                  backgroundColor: 'blue',
                }}>
                <Text>{item.maintitle}</Text>
                <View>
                  <Text>{item.count}</Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: 'pink',
                  width: widthPercentageToDP(25),
                  height: heightPercentageToDP(12),
                  justifyContent: 'center',
                  borderRadius: 80,
                  top: heightPercentageToDP(4),
                  position: 'absolute',
                }}>
                <View
                  style={{
                    backgroundColor: 'orange',
                    alignItems: 'center',
                    borderRadius: 20,
                    width: widthPercentageToDP(14),
                    alignSelf: 'center',
                    position: 'absolute',
                  }}>
                  <Text>{item.title}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        data={profileGrid}
        contentContainerStyle={{
          alignSelf: 'center',
          marginTop: widthPercentageToDP(3),
          height: heightPercentageToDP(88),
          marginVertical: 100,
        }}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainview: {
    backgroundColor: '#242A38',
    flex: 1,
    paddingBottom: heightPercentageToDP(10),
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#303749',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  editprofilebox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: widthPercentageToDP(60),
    justifyContent: 'space-between',
  },
  editprofiletxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  savebox: {
    backgroundColor: 'red',
    padding: 5,
    width: widthPercentageToDP(20),
    borderRadius: 20,
  },
  savetxt: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  lvlofwealthtxt: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: heightPercentageToDP(2),
    fontWeight: 'bold',
    color: '#ED2D21',
  },
  maincontainer: {
    marginHorizontal: 2,
    backgroundColor: 'red',
  },
});
