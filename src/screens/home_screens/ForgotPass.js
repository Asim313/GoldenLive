import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useNavigation} from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import BackIcon from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native';
import Input from '../reuseable_Component/Input';
import Input_Passowrd from '../../components/Input_Password';
const ForgotPass = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/bg.png')}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.settingbox}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon name="left" size={20} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <ScrollView keyboardShouldPersistTaps="always">
          <View>
            <Image
              source={require('../../assets/images/faq.png')}
              style={{
                height: 150,
                width: 150,
                alignSelf: 'center',
                marginTop: '20%',
              }}
            />
          </View>
          <View>
            <Input_Passowrd
              title={'Password'}
              keyboardType="numeric"
              // value={this.setState.phone_number}
              eye={true}
              // onChange={txt => setPassword(txt)}
              bgStyle={{marginTop: '4%', borderWidth: 1, width: '80%'}}
            />
            <Input_Passowrd
              title={'Confirm Password'}
              keyboardType="numeric"
              // value={this.setState.phone_number}
              eye={true}
              // onChange={txt => setPassword(txt)}
              bgStyle={{marginTop: '4%', borderWidth: 1, width: '80%'}}
            />
          </View>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: '#ED2D21',
                width: '80%',
                alignSelf: 'center',
                alignItems: 'center',
                paddingVertical: '4%',
                borderRadius: 5,
                marginVertical: '5%',
                elevation: 3,
              }}>
              <Text style={{color: 'white', fontWeight: '500', fontSize: 15}}>
                Change Password
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242A38',
  },
  settingbox: {
    flexDirection: 'row',
    paddingVertical: heightPercentageToDP('2%'),
    alignItems: 'center',
  },
  settingtxt: {
    fontSize: 19,
    color: 'white',
    fontWeight: '500',
  },
  icon: {
    color: 'white',
    paddingHorizontal: 5,
  },
  input: {
    backgroundColor: '#303749',
    marginVertical: '2%',
    width: '80%',
    alignSelf: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#535C73',
    paddingVertical: '3%',
    paddingLeft: 12,
    color: 'white',
  },
  image: {
    flex: 1,
  },
});

export default ForgotPass;
