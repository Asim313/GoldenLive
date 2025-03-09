import * as React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

export default function PersonImgInChat({
  image,
  name,
  mode,
  style,
  onPressDp,
  ...props
}) {
  return (
    <View style={styles.main} 
    >
      <View
        style={[
          styles.circle,
          mode === 'active' && {borderColor: '#DF4B38'},
          style,
        ]}
        mode={mode}
        name={name}
        image={image}
        {...props}>
          
        <Image
          source={image}
          style={[
            styles.imageStyle,
            mode === 'me' && {
              width: widthPercentageToDP('7'),
              height: widthPercentageToDP('7'),
              alignSelf: 'center',
            },
            style,
          ]}
        />
      </View>
      <Text numberOfLines={1}>{name}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    marginHorizontal: widthPercentageToDP('4'),
  },
  circle: {
    height: widthPercentageToDP('12'),
    width: widthPercentageToDP('12'),
    borderRadius: widthPercentageToDP('19'),
  },
  imageStyle: {
    width: widthPercentageToDP('10'),
    height: widthPercentageToDP('10'),
    alignSelf: 'center',
    borderRadius: widthPercentageToDP('8.5'),
    marginTop: widthPercentageToDP('0.67'),
  },
});
