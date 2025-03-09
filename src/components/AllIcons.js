import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

export const IconList = {
  MaterialCommunityIcons: 'MaterialCommunityIcons',
  MaterialIcons: 'MaterialIcons',
  Ionicons: 'Ionicons',
  Feather: 'Feather',
  FontAwesome: 'FontAwesome',
  FontAwesome5: 'FontAwesome5',
  AntDesign: 'AntDesign',
  Entypo: 'Entypo',
  SimpleLineIcons: 'SimpleLineIcons',
  Octicons: 'Octicons',
  Foundation: 'Foundation',
  EvilIcons: 'EvilIcons',
  Fontisto: 'Fontisto',
};

const AllIcons = ({name, iconName, size, color}) => {
  switch (name) {
    case IconList.AntDesign:
      return (
        <View>
          <AntDesign
            name={iconName ? iconName : 'pluscircle'}
            color={color ? color : 'black'}
            size={size ? size : 24}
          />
        </View>
      );
      break;
    case IconList.FontAwesome:
      return (
        <View>
          <FontAwesome
            name={iconName ? iconName : 'pluscircle'}
            color={color ? color : 'black'}
            size={size ? size : 24}
          />
        </View>
      );
      break;
    case IconList.Ionicons:
      return (
        <View>
          <Ionicons
            name={iconName ? iconName : 'pluscircle'}
            color={color ? color : 'black'}
            size={size ? size : 24}
          />
        </View>
      );
      break;
    case IconList.FontAwesome5:
      return (
        <View>
          <FontAwesome5
            name={iconName ? iconName : 'pluscircle'}
            color={color ? color : 'black'}
            size={size ? size : 24}
          />
        </View>
      );
      break;
    case IconList.Feather:
      return (
        <View>
          <Feather
            name={iconName ? iconName : 'pluscircle'}
            color={color ? color : 'black'}
            size={size ? size : 24}
          />
        </View>
      );
      break;
    case IconList.Entypo:
      return (
        <View>
          <Entypo
            name={iconName ? iconName : 'pluscircle'}
            color={color ? color : 'black'}
            size={size ? size : 24}
          />
        </View>
      );
      break;
    case IconList.EvilIcons:
      return (
        <View>
          <EvilIcons
            name={iconName ? iconName : 'pluscircle'}
            color={color ? color : 'black'}
            size={size ? size : 24}
          />
        </View>
      );
      break;
    case IconList.MaterialCommunityIcons:
      return (
        <View>
          <MaterialCommunityIcons
            name={iconName ? iconName : 'pluscircle'}
            color={color ? color : 'black'}
            size={size ? size : 24}
          />
        </View>
      );
      break;
    case IconList.SimpleLineIcons:
      return (
        <View>
          <SimpleLineIcons
            name={iconName ? iconName : 'pluscircle'}
            color={color ? color : 'black'}
            size={size ? size : 24}
          />
        </View>
      );
      break;
    case IconList.MaterialIcons:
      return (
        <View>
          <MaterialIcons
            name={iconName ? iconName : 'pluscircle'}
            color={color ? color : 'black'}
            size={size ? size : 24}
          />
        </View>
      );
      break;
    case IconList.Octicons:
      return (
        <View>
          <Octicons
            name={iconName ? iconName : 'pluscircle'}
            color={color ? color : 'black'}
            size={size ? size : 24}
          />
        </View>
      );
      break;
    case IconList.Foundation:
      return (
        <View>
          <Foundation
            name={iconName ? iconName : 'pluscircle'}
            color={color ? color : 'black'}
            size={size ? size : 24}
          />
        </View>
      );
      break;
    case IconList.Fontisto:
      return (
        <View>
          <Fontisto
            name={iconName ? iconName : 'pluscircle'}
            color={color ? color : 'black'}
            size={size ? size : 24}
          />
        </View>
      );
      break;
    default:
      break;
  }
};

export default AllIcons;

const styles = StyleSheet.create({});
