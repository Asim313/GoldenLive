import { useNavigation } from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const FollowLiveBtn = () => {

  const navigation = useNavigation()
  return (
    <TouchableOpacity
    onPress={() =>   navigation.navigate('Follow', {
      showLives: true,
    })}
      style={{
        height: 30,
        backgroundColor: '#451E08',
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <Text style={{fontSize: 9, color: 'white', right: 5}}>Your followers</Text>

      <View
        style={{
          // flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AnimatedLottieView
          autoPlay
          style={{
            width: 14,
            height: 14,
          }}
          source={require('../../../assets/json/14467-music.json')}
        />
        {/* <Text style={{fontSize: 11, fontWeight: 'bold', color: 'white'}}> Live</Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default FollowLiveBtn;



// import AnimatedLottieView from 'lottie-react-native';
// import React from 'react';
// import {Text, View} from 'react-native';

// const FollowLiveBtn = () => {
//   return (
//     <View
//       style={{
//         height: 40,
//         borderRadius: 40,
//         backgroundColor: '#451E08',
//         width: 100,
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <Text style={{fontSize: 9, color: 'white'}}>follow talent</Text>

//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         <AnimatedLottieView
//           autoPlay
//           style={{
//             width: 14,
//             height: 14,
//           }}
//           source={require('../../../assets/json/14467-music.json')}
//         />
//         <Text style={{fontSize: 11, fontWeight: 'bold', color: 'white'}}> Live</Text>
//       </View>
//     </View>
//   );
// };

// export default FollowLiveBtn;

