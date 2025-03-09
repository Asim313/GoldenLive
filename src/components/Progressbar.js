import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, TextInput, Button } from 'react-native';
import ProgressBar from 'react-native-progressbar-with-linear-gradient';

const x = 100

const MAX_LEVEL = x; // Maximum level value
const MIN_LEVEL = 0; // Minimum level value

const Progressbar = () => {
  const [level, setLevel] = useState('');
  const [inputValue, setInputValue] = useState(16);

  const handleInputChange = (text) => {
    setInputValue(text);
  };


  const handleSubmit = () => {
    const newLevel = parseInt(inputValue);
    if (isNaN(newLevel) || newLevel < MIN_LEVEL || newLevel > MAX_LEVEL) {
      alert(`Please enter a valid level between ${MIN_LEVEL} and ${MAX_LEVEL}`);
    } else {
      setLevel(newLevel);
      setInputValue('');
    }
  };

// useEffect(() => {
//     handleSubmit()
// }, [])


  // Convert level to percentage
  const percentage = (level - 1) / (MAX_LEVEL - 1) * 100;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#eeeeee',
        justifyContent: 'center',
      }}>
      <Text style={{ textAlign: 'center' }}>ProgressBar with linear gradient</Text>
      <View
        style={{
          height: 100,
          padding: 20,
        }}>
        <ProgressBar
          BgColor={'#ffffff'}
          FirstColor={'#58BF68'}
          LastColor={'#F1640E'}
          Percentage={`${percentage.toFixed(0)}%`}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{level}/{MAX_LEVEL}</Text>
            <Text>{percentage.toFixed(0)}%</Text>
          </View>
          <Text style={{ alignSelf: 'center',color:'black',position:'absolute' }}>
            {/* {percentage.toFixed(0)} */}
            Hello
            </Text>
        </ProgressBar>
        <View style={{flexDirection:'row',justifyContent:'space-between',position:"absolute",marginTop:8,marginLeft:150}}>
          {/* <Text style={{ textAlign: 'center', marginTop: 10 }}>
             {percentage.toFixed(0)}
          </Text> */}
          <Text style={{ textAlign: 'center', marginTop: 10 }}>
       {level}/{MAX_LEVEL}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TextInput
          style={{ borderColor: 'gray', borderWidth: 1, padding: 5, width: 100 }}
          onChangeText={handleInputChange}
          value={inputValue}
          keyboardType="numeric"
        />
        <Button title="Set Level" onPress={() =>handleSubmit()} />
      </View>
    </SafeAreaView>
  );
};

export default Progressbar;





// const Progressbar = () => {
//   const [level, setLevel] = useState('');
//   const [inputValue, setInputValue] = useState('');

//   const handleInputChange = (text) => {
//     setInputValue(text);
//   };

//   const handleSubmit = () => {
//     const newLevel = parseInt(inputValue);
//     if (isNaN(newLevel) || newLevel < MIN_LEVEL || newLevel > MAX_LEVEL) {
//       alert(`Please enter a valid level between ${MIN_LEVEL} and ${MAX_LEVEL}`);
//     } else {
//       setLevel(newLevel);
//       setInputValue('');
//     }
//   };

//   // Convert level to percentage
//   const percentage = (level - 1) / (MAX_LEVEL - 1) * 100;

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: '#eeeeee',
//         justifyContent: 'center',
//       }}>
//       <Text style={{ textAlign: 'center' }}>
//         ProgressBar with linear gradient
//       </Text>
//       <View
//         style={{
//           height: 100,
//           padding: 20,
//         }}>
//         <ProgressBar
//           BgColor={'#ffffff'}
//           FirstColor={'#58BF68'}
//           LastColor={'#F1640E'}
//           Percentage={`${percentage}%`} // Pass the percentage as text
//         >
//           <Text style={{ textAlign: 'center', color: 'white' }}>
//             {`${level}%`} // Display the level value inside the progress bar
//           </Text>
//         </ProgressBar>
//       </View>
//     </SafeAreaView>
//   );
// };
