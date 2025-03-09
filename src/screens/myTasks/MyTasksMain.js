import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import LeftArrow from 'react-native-vector-icons/MaterialIcons';
import InamGhar from './InamGhar';
import DailyTasks from './DailyTask';
import LinearGradient from 'react-native-linear-gradient';

const MyTasksMain = ({navigation}) => {
  const [show, setShow] = useState(true);
  return (
    <View style={{flex: 1, backgroundColor: '#242A38'}}>
      <ImageBackground
        source={require('../../assets/images/image36.png')}
        resizeMode={'stretch'}
        style={{height: '100%', width: '100%'}}>
        <LinearGradient
          colors={['#4568DC', '#B06AB3']}
          style={{
            backgroundColor: '#303749',
            height: 50,
            justifyContent: 'center',
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginHorizontal: 15,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <LeftArrow
                  name="arrow-back-ios"
                  size={20}
                  style={{color: 'white', alignSelf: 'center'}}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                }}>
                My Task
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View
          style={{
            marginTop: 15,
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '80%',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: show ? '#E92F24' : '#333F67',
              width: '40%',
              alignItems: 'center',
              paddingVertical: 8,
              borderRadius: 25,
            }}
            onPress={() => setShow(true)}>
            <Text style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>
              Daily Task
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: show ? '#333F67' : '#E92F24',
              width: '40%',
              alignItems: 'center',
              paddingVertical: 8,
              borderRadius: 25,
            }}
            onPress={() => setShow(false)}>
            <Text style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>
              Inam Ghar
            </Text>
          </TouchableOpacity>
        </View>
        {show ? <DailyTasks /> : <InamGhar />}
      </ImageBackground>
    </View>
  );
};

export default MyTasksMain;

const styles = StyleSheet.create({});
