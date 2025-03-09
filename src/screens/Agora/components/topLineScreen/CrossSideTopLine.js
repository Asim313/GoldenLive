import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React,{memo} from 'react';

const CrossSideTopLine = ({onpresS, data2, data}) => {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First2 Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second2 Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third 2Item',
    },
    {
      id: '2',
      title: 'First Item',
    },
    {
      id: '3',
      title: 'Second Item',
    },
    {
      id: '5',
      title: 'Third Item',
    },
  ];

  const renderView = () => {
    return (
      <TouchableOpacity
        onPress={onpresS}
        style={[styles.headerImage, {marginTop: 10}]}>
        {/* <Text style={{color:'white'}}>Hello</Text> */}
        <Image
          source={require('../../../../assets/images/1.png')}
          style={{height: 36, width: 36}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={[styles.headerImageContainer]}>
        {/* {data?.[0]?.image && (
          <TouchableOpacity
            onPress={onpresS}
            style={[styles.headerImage, {marginTop: 20}]}></TouchableOpacity>
        )}
        {data?.[1]?.image && (
          <TouchableOpacity
            onPress={onpresS}
            style={[styles.headerImage, {marginTop: 20}]}>
            <AnimatedProfileDp
              img={data?.[1]?.image}
              imgSize={30}
              frameSize={10}
              frame={data?.[1]?.json_image}
            />
          </TouchableOpacity>
        )}
        {data?.[2]?.image && (
          <TouchableOpacity
            onPress={onpresS}
            style={[styles.headerImage, {marginTop: 20}]}>
            <AnimatedProfileDp
              img={data?.[2]?.image}
              imgSize={30}
              frameSize={10}
              frame={data?.[2]?.json_image}
            />
          </TouchableOpacity>
        )} */}
        <View style={{width:'62.5%',left:50}}>
        <FlatList
          data={DATA}
          renderItem={renderView}
          // keyExtractor={item => item.id}
          horizontal
        />
        </View>
      </View>
      <View
        style={{
          height: 30,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <TouchableOpacity onPress={onpresS} style={styles.headerCounter}>
          <Text style={styles.text}>{data2}</Text>
        </TouchableOpacity>
        <View style={styles.headerCross}>
          <TouchableOpacity
          //  onPress={() => navigation.goBack()}
          >
            <Image source={require('../../../../assets/images/cross.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export default CrossSideTopLine;

const styles = StyleSheet.create({
  headerImageContainer: {
    // marginHorizontal: 5,
  },
  headerImage: {
    borderRadius: 18,
    backgroundColor: 'green',
  },
  headerCounter: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    width: 30,
    alignItems: 'center',
    borderRadius: 10,
 
    marginHorizontal:5
  },
  text: {
    color: 'white',
  },
  headerCross: {
    // marginRight: ,
  },
});
