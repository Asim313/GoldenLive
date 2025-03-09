import React, {Component, useEffect} from 'react';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';

export default function Splash(props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.navigation.replace('Login');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  ///////////UseEffect Without Setting Back the
  //   useEffect(() => {
  //     setTimeout(() => props.navigation.navigate('Login_With_SocialMedia'), 2000);
  //   }, []);

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor="#242A38" /> */}

      <ImageBackground
        // source={require('../../assets/images/persian_cat_2_.png')}
        // resizeMode="contain"
        style={styles.image}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={{
            alignSelf: 'center',
            resizeMode: 'contain',
            flex: 1,
            marginBottom: '70%',
          }}></Image>
      </ImageBackground>
    </View>
  );
}

///////////Classs Component reverted to Functional

// class Splash extends Component {
// 	componentDidMount(){
// 		setTimeout(()=>this.props.navigation.navigate('Login_With_SocialMedia'),2000)
// 	}
// 	render() {
// 		return (
// 			<View style={styles.container}>
// 				    <StatusBar backgroundColor="#242A38" />

// 				<ImageBackground source={require("../../assets/images/persian_cat_2_.png")}
// 					resizeMode="cover"
// 					style={styles.image} >
// 					<Image source={require("../../assets/images/logo.png")}
// 					style={{
// 						alignSelf:"center",
// 						resizeMode:"contain",
// 						flex:1,
// 						marginBottom:"70%"
// 					}}
// 					>
// 					</Image>
// 				</ImageBackground>
// 			</View>
// 		);
// 	}
// }

// export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: '60%',
  },
});
