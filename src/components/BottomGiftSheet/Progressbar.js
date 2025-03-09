import React, {useState} from 'react';
import {Text, View, SafeAreaView, TextInput, Button} from 'react-native';
import ProgressBar from 'react-native-progressbar-with-linear-gradient';

const MAX_LEVEL = 50;
const MIN_LEVEL = 1;

const Progressbar = () => {
  const [level, setLevel] = useState(20);
  const percentage = ((level - 1) / (MAX_LEVEL - 1)) * 100;

  const LevelText = ({level, MAX_LEVEL}) => {
    return (
      <Text
        style={{
          color: 'white',
          fontSize: 9,
          backgroundColor: '#e3367b',
          paddingLeft: 3,
          paddingRight: 3,
          borderRadius: 2,
        }}>
        Lv: {level} {MAX_LEVEL}
      </Text>
    );
  };

  return (
    <SafeAreaView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
      }}>
      <LevelText level={level} />

      <View
        style={{
          transform: [{scaleX: 0.9}, {scaleY: 0.3}],
          width: '65%',
          alignItems: 'center',
        }}>
        <ProgressBar
          BgColor={'#ffffff'}
          FirstColor={'#9f6ab0'}
          LastColor={'#c268de'}
          Percentage={`${percentage.toFixed(0)}%`}
        />
      </View>

      <LevelText MAX_LEVEL={MAX_LEVEL} />
    </SafeAreaView>
  );
};

export default Progressbar;
