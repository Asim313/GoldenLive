import {
  StyleSheet
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoginMainScreen from '../reuseable_Component/LoginMainScreen';

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LoginMainScreen />
    </SafeAreaView>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242A38',
  }
});
