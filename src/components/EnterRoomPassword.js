import React, {useState} from 'react';
import {
    ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import { verifyRoomPassword } from '../Services/ApisCall';
import { useSelector } from 'react-redux';

const EnterRoomPassword = ({completeData, handlePassword}) => {
  const [password, setPassword] = useState(null);
  const userData = useSelector(state => state.auth.userData);
  const [isLoading, setIsLoading] = useState(null)
//   const handleClick = () => {
   
//   }

  const handleClick = async () => {
    setIsLoading(true)
    const res = await verifyRoomPassword({token: userData?.token, hostId: completeData?.id, password: password })
    console.log('resssssssssssss', res, completeData?.id, password)

    if(res?.data === 1) {
    
      console.log('resssssssssssss', res, completeData?.id, password)
      handlePassword(completeData, true)
    } else {
      alert(res?.message)
    }
    setIsLoading(false)
  }

  return (
    <View style={styles.mainContainer}>
      <View>
        <View style={{margin: 20}}>
          <Text style={styles.settingtxt}>Room is locked</Text>
          <Text style={{color: 'black', fontWeight: '500', fontSize: 10}}>Channel ID: {completeData?.id}</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TextInput
            placeholder="Enter room password"
            placeholderTextColor={'grey'}
            value={password}
            onChangeText={setPassword}
            style={{
              backgroundColor: '#DBD9D9',
              width: widthPercentageToDP(70),
              alignSelf: 'center',
              borderRadius: 20,
              padding: 13,
              color: 'black'
            }}
          />
          <TouchableOpacity
            disabled={isLoading}
            onPress={handleClick}
            style={{
              backgroundColor: 'green',
              padding: 12,
              borderRadius: 20,
              width: widthPercentageToDP(70),
              top: 20,
            }}>
            {isLoading ? 
                <ActivityIndicator />
                :
            <Text
              style={{
                color: 'white',
                fontSize: 13,
                fontWeight: '500',
                alignSelf: 'center',
              }}>
              Join channel
            </Text>
            }
          </TouchableOpacity>
        
        </View>
      </View>
    </View>
  );
};

export default EnterRoomPassword;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  settingtxt: {
    fontSize: 19,
    color: 'black',
    fontWeight: 'bold',
  },
});
