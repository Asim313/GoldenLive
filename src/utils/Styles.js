import {StyleSheet} from 'react-native';

const primaryColor = '#242A38';
const secondaryColor = '#ffffff';
// const backgroundColor="#242A38";
// const secondaryColor = '#ffffff'

// Font Family Names
const normalFont = 'Poppins-Regular';
const mediumFont = 'Poppins-Medium';
const boldFont = 'Poppins-Bold';

const textFont = {fontFamily: normalFont};
const mediumTextFont = {fontFamily: mediumFont};
const boldTextFont = {fontFamily: boldFont};

const container = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {
  textFont,
  mediumTextFont,
  boldTextFont,
  container,
  primaryColor,
  secondaryColor,
};

//////Added Updated Styles

// const primaryColor = '#198754'
const secondryColor = '#FFFFFF';
const textColor = '#606060';
const textColorDim = '#BBBBBB';
const transparent = '#00000000';
const white = '#FFFFFF';
const black = 'black';
const dimPrimaryColor = '#F5FFFC';
const txtgrey = '#9293B0';

// const normalFont = Platform.OS === "ios" ? "Metropolis-Regular" : "Metropolis-Regular"
// const mediumFont = Platform.OS === "ios" ? "Metropolis-Medium" : "Metropolis-Medium"
// const boldFont = Platform.OS === "ios" ? "Metropolis-Bold" : "Metropolis-Bold"
const styleFont = Platform.OS === 'ios' ? 'Satisfy-Regular' : 'Satisfy-Regular';
const stylishFont = 'Hello Valentica Regular';
// const textFont = { fontFamily: normalFont }
// const mediumTextFont = { fontFamily: mediumFont }
// const boldTextFont = { fontFamily: boldFont }
const styleTextFont = {fontFamily: styleFont};
const stylishTextFont = {fontFamily: stylishFont};
// const container = StyleSheet.create({
//     center: {
//         flex: 1,
//     },
//     empty: { flex: 1, backgroundColor: secondryColor },
//     roundFormBG: {
//         flex: 1, paddingVertical: 30,
//         borderTopStartRadius: 30, borderTopEndRadius: 30,
//         borderTopLeftRadius: 30, borderTopRightRadius: 30,
//         marginTop: -20
//     }
// })

const headings = StyleSheet.create({
  h1: {...textFont, fontSize: 30, color: textColor},
  h1s: {fontSize: 30, color: textColor, fontFamily: 'Hello Valentica Regular'},
  h2: {...mediumTextFont, fontSize: 24, color: textColor},
  h2b: {...boldTextFont, fontSize: 24, color: textColor},
  h3: {...mediumTextFont, fontSize: 22, color: textColor},
  h4: {...mediumTextFont, fontSize: 20, color: textColor},
  h4b: {...boldTextFont, fontSize: 20, color: textColor},
  h5: {...textFont, fontSize: 18, color: textColor},
  h5b: {...boldTextFont, fontSize: 18, color: textColor},
  h5M: {...mediumTextFont, fontSize: 18, color: textColor},
  h6: {...textFont, fontSize: 16, color: textColor},
  h6M: {...mediumTextFont, fontSize: 16, color: textColor},
  h7: {...mediumTextFont, fontSize: 14, color: textColor},
  h7M: {...mediumTextFont, fontSize: 14, color: textColor},
  h8: {...textFont, fontSize: 12, color: textColor},
  h8M: {...mediumTextFont, fontSize: 12, color: textColor},
  h9: {...textFont, fontSize: 10, color: textColor},
  sh6: {...stylishTextFont, fontSize: 30, color: textColor},
});
const Colors = {
  gray: '#929292',
  lightgrey: '#F4F4F4',
  darkgrey: '#515151',
  golden: '#FFD213',
  black: '#000000',
  lightsky: '#D4FFF2',
  lightGreen: '#F5FFFC',
  redFaded: 'rgba(255,0,0,0.4)',
  red: 'rgb(155,0,0)',
  iconColor: '#198754',
};

const form = StyleSheet.create({
  inputBG: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.7,
    marginVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {...textFont, flex: 1, padding: 10, fontSize: 16},
  leftLogo: {},
});

const shadow = StyleSheet.create({
  whiteShadow: {
    shadowColor: '#000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});

export {
  // textFont,
  // boldTextFont,
  // mediumFont,
  textColorDim,
  dimPrimaryColor,
  secondryColor,
  white,
  textColor,
  stylishFont,
  // mediumTextFont,
  // container,
  // primaryColor,
  headings,
  form,
  shadow,
  transparent,
  Colors,
  black,
  txtgrey,
};

export const imgRegex = /jpg|png|jpeg/g;
export const videoRegex = /mp4|mov|m4v|mkv/g;
import {Platform, PermissionsAndroid} from 'react-native';

export const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        return true;
      } else {
        console.log('Camera permission denied');
      }
      return true;
    } catch (err) {
      console.warn(err);
    }
  }
};

export const requestExternalWritePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Write Permission',
          message: 'App needs write permission',
        },
      );
      // If WRITE_EXTERNAL_STORAGE Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
    }
    return false;
  } else return true;
};

export const timeDifference = previous => {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = new Date() - new Date(previous);

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' s';
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' m';
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' h';
  } else if (elapsed < msPerMonth) {
    return +Math.round(elapsed / msPerDay) + ' d';
  } else if (elapsed < msPerYear) {
    return +Math.round(elapsed / msPerMonth) + ' month';
  } else {
    return +Math.round(elapsed / msPerYear) + ' y';
  }
};
