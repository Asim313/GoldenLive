// import React, { useState } from 'react';
// import { SafeAreaView, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
// import { Stopwatch, Timer } from 'react-native-stopwatch-timer';

// const App = () => {
//   const [isStopwatchStart, setIsStopwatchStart] = useState(false);
//   const [resetStopwatch, setResetStopwatch] = useState(false);

//   const [totalTime, setTotalTime] = useState(0);

//   const handleStopwatchComplete = (time) => {
//     console.log("Total Time", time);
//     setTotalTime(totalTime + time);
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.container}>
//         <View style={styles.sectionStyle}>
//           <Stopwatch
//             laps
//             msecs
//             start={isStopwatchStart}
//             reset={resetStopwatch}
//             options={options}
//             getTime={(time) => {
//               console.log("Total Time", time);
//             }}
//             onComplete={handleStopwatchComplete}
//           />
//           <TouchableHighlight
//             onPress={() => {
//               setIsStopwatchStart(!isStopwatchStart);
//               setResetStopwatch(false);
//             }}
//           >
//             <Text style={styles.buttonText}>
//               {!isStopwatchStart ? 'START' : 'STOP'}
//             </Text>
//           </TouchableHighlight>
//           <TouchableHighlight
//             onPress={() => {
//               setIsStopwatchStart(false);
//               setResetStopwatch(true);
//             }}
//           >
//             <Text style={styles.buttonText}>RESET</Text>
//           </TouchableHighlight>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     textAlign: 'center',
//     fontSize: 20,
//     fontWeight: 'bold',
//     padding: 20,
//   },
//   sectionStyle: {
//     marginTop: 32,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     fontSize: 20,
//     marginTop: 10,
//   },
// });

// const options = {
//   container: {
//     backgroundColor: '#FF0000',
//     padding: 5,
//     borderRadius: 5,
//     width: 200,
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 25,
//     color: '#FFF',
//     marginLeft: 7,
//   },
// };

// export default App;


// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { Stopwatch, Timer } from 'react-native-stopwatch-timer';

// const Timmer = () => {
//   const [isStopwatchStart, setIsStopwatchStart] = useState(false);
//   const [resetStopwatch, setResetStopwatch] = useState(false);
//   // const [totalTime, setTotalTime] = useState(0);

//   // const handleStopwatchFinish = (time) => {
//   //   setTotalTime(time);
//   // };

//   return (
//     <View style={styles.container}>
//       <Stopwatch
//         laps
//         start={isStopwatchStart}
//         reset={resetStopwatch}
//         options={options}
//         // getTime={handleStopwatchFinish} // call handleStopwatchFinish when stopwatch finishes
//       />
//       <TouchableOpacity
//         onPress={() => {
//           setIsStopwatchStart(!isStopwatchStart);
//           setResetStopwatch(false);
//         }}
//       >
//         <Text style={styles.buttonText}>
//           {!isStopwatchStart ? 'START' : 'STOP'}
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => {
//           setIsStopwatchStart(false);
//           setResetStopwatch(true);
//           // setTotalTime(0); // reset total time when stopwatch is reset
//         }}
//       >
//         <Text style={styles.buttonText}>RESET</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     textAlign: 'center',
//     fontSize: 20,
//     fontWeight: 'bold',
//     padding: 20,
//   },
//   sectionStyle: {
//     marginTop: 32,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     fontSize: 20,
//     marginTop: 10,
//     backgroundColor: 'red',
//     padding: 10,
//     color: 'white',
//     borderRadius: 10,
//   },
// });

// const options = {
//   container: {
//     backgroundColor: 'grey',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 25,
//     color: '#FFF',
//   },
// };

// export default Timmer;

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const Timer = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 10); // Increment by 10 milliseconds
    }, 10);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  // Calculate hours, minutes, seconds, and milliseconds
  // const milliseconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / 1000 / 60) % 60);
  const hours = Math.floor(time / 1000 / 60 / 60);

  return (
    <View>
      <Text style={{ fontSize: 15, color: 'white' }}>
        {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        {/* {milliseconds.toString().padStart(2, '0')} */}
      </Text>
    </View>
  );
};

export default Timer;


