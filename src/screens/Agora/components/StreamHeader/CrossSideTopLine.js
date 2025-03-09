import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import AllIcons, { IconList } from '../../../../components/AllIcons';
import AnimatedProfileDp from '../../../reuseable_Component/AnimatedProfileDP';

const CrossSideTopLine = ({onpresS, data2, data, onPressCross=() => {},}) => {

  const renderView = ({item}) => {
    return (
      <View
        style={[styles.headerImage, {position: 'relative', top: 17, marginLeft: 5, height: 30, width: 30}]}>
            <AnimatedProfileDp
            img={item?.image}
            imgSize={25}
            frameSize={8}
            frame={item?.json_image}
          />
        
      </View>
    );
  };

  return (
    <>
    <TouchableOpacity onPress={() => onpresS()}>
      
      <View style={[styles.headerImageContainer]}>
        <View style={{flex: 1, justifyContent: 'flex-start'}}>
        <FlatList
          data={data}
          renderItem={renderView}
          keyExtractor={(item, index) => index}
          horizontal
          />
        </View>
      </View>
    </TouchableOpacity>
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
            onPress={() => onPressCross()}
          >
            <AllIcons name={IconList.AntDesign} iconName={'close'} color={'white'} size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default CrossSideTopLine;

const styles = StyleSheet.create({
  headerImageContainer: {
   maxWidth: widthPercentageToDP(40)
  },
  headerImage: {
    borderRadius: 18,
    // backgroundColor: 'green',
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
