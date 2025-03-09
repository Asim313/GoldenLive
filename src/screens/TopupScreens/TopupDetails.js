import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React from 'react';
import {
  black,
  headings,
  primaryColor,
  secondaryColor,
  white,
} from '../../utils/Styles';
import {Divider} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const Garage = [
  {
    id: 1,
    name: 'Ferrari Car',
    price: '10,0000',
    src: require('../../assets/images/ferr.png'),
  },
  {
    id: 2,
    name: 'Bentley Car',
    price: '10,0000',
    src: require('../../assets/images/bentley.png'),
  },
  {
    id: 3,
    name: 'Heavy Bike',
    price: '10,0000',
    src: require('../../assets/images/heavybike.png'),
  },
  {
    id: 4,
    name: 'Roar',
    price: '10,0000',
    src: require('../../assets/images/roar.png'),
  },
  {
    id: 5,
    name: 'Pheonix',
    price: '10,0000',
    src: require('../../assets/images/pheonix.png'),
  },
  {
    id: 6,
    name: 'Audi Car',
    price: '10,0000',
    src: require('../../assets/images/audi.png'),
  },
  {
    id: 7,
    name: 'MotorCycle',
    price: '10,0000',
    src: require('../../assets/images/motorcycle.png'),
  },
  {
    id: 8,
    name: 'Speed Boat',
    price: '10,0000',
    src: require('../../assets/images/speedboat.png'),
  },
];
export default function TopupDetails() {
  const navigation = useNavigation();
  const RenderView = props => {
    return (
      <View
        style={{
          marginBottom: '2%',
          flex: 1,

          alignItems: 'center',
        }}>
        <Text
          style={{fontSize: 16, color: secondaryColor, alignSelf: 'center'}}>
          Amount (PKR)
        </Text>
        <ImageBackground
          source={require('../../assets/images/topupAgent/topupframe.png')}
          style={{height: 230, width: 175, marginHorizontal: 2}}>
          <Text
            style={{
              alignSelf: 'center',
              color: '#E82519',
              fontWeight: '600',
              marginTop: 3,
            }}>
            10,000 to 19,999
          </Text>
          <Image
            source={props.item.src}
            style={{
              width: '70%',
              height: 100,
              alignSelf: 'center',
              marginTop: '32%',
            }}
            resizeMode="contain"
          />
          <Text
            style={{fontSize: 14, color: secondaryColor, alignSelf: 'center'}}>
            {props.item.name} (7 Days)
          </Text>
          <Text
            style={{fontSize: 14, color: secondaryColor, alignSelf: 'center'}}>
            Pirate (25 Days)
          </Text>
        </ImageBackground>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.topview}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color={white}></Ionicons>
        </TouchableOpacity>
        <Text style={{...headings.h3, color: 'white'}}></Text>
      </View>
      <ScrollView
        style={{
          height: '100%',
          width: '100%',
        }}>
        <ImageBackground
          source={require('../../assets/images/topupAgent/topupd.png')}
          resizeMode="cover">
          <View style={{height: 400, width: '100%'}}></View>
          <View
            style={{
              backgroundColor: '#FFDE60',
              width: '80%',
              height: 60,
              alignSelf: 'center',
              marginBottom: 20,
              borderRadius: 30,
            }}>
            <Text
              style={{
                color: black,
                fontSize: 16,
                paddingVertical: 10,
                paddingHorizontal: 20,
                textAlign: 'center',
              }}>
              TopUp karain aur jetain extra beans, VIP, Entrance Effects aur
              bhod Koch
            </Text>
          </View>
          <View style={styles.topupcard}>
            <LinearGradient
              colors={['#FFE266', '#FFBB2D']}
              style={styles.linearGradient}>
              <Text style={styles.topupText}>Amount (PKR) Bonus</Text>
              <Divider
                bold="2"
                style={{
                  backgroundColor: '#000000',
                  marginHorizontal: 20,
                  opacity: 0.2,
                  marginTop: 10,
                }}
              />
              <Text
                style={{
                  color: black,
                  fontSize: 16,
                  paddingVertical: 5,
                  paddingHorizontal: 20,
                }}>
                10,000 to 1,00,000 3%
              </Text>
              <Divider
                bold="2"
                style={{
                  backgroundColor: '#000000',
                  marginHorizontal: 20,
                  opacity: 0.2,
                }}
              />
            </LinearGradient>
          </View>
        </ImageBackground>
        <View style={styles.agentcard}>
          <LinearGradient
            colors={['#FFE266', '#FFBB2D']}
            style={styles.linearGradient}>
            <Text
              style={{
                color: black,
                fontWeight: '500',
                fontSize: 17,
                marginHorizontal: 20,
                marginTop: 20,
                marginBottom: 5,
              }}>
              Amount (PKR) Beans % Bonus Total
            </Text>
            <Divider
              bold="2"
              style={{
                backgroundColor: '#000000',
                marginHorizontal: 20,
                opacity: 0.2,
              }}
            />
            <Text
              style={{
                color: black,
                fontSize: 17,
                marginHorizontal: 20,
                marginVertical: 4,
              }}>
              {' '}
              10,000 20,000 3% 600 20,600
            </Text>
            <Divider
              bold="2"
              style={{
                backgroundColor: '#000000',
                marginHorizontal: 20,
                opacity: 0.2,
              }}
            />
            <Text
              style={{
                color: black,
                fontSize: 17,
                marginHorizontal: 20,
                marginVertical: 4,
              }}>
              {' '}
              10,000 20,000 3% 600 20,600
            </Text>
            <Divider
              bold="2"
              style={{
                backgroundColor: '#000000',
                marginHorizontal: 20,
                opacity: 0.2,
              }}
            />
            <Text
              style={{
                color: black,
                fontSize: 17,
                marginHorizontal: 20,
                marginVertical: 4,
              }}>
              {' '}
              10,000 20,000 3% 600 20,600
            </Text>
            <Divider
              bold="2"
              style={{
                backgroundColor: '#000000',
                marginHorizontal: 20,
                opacity: 0.2,
              }}
            />
            <Text
              style={{
                color: black,
                fontSize: 17,
                marginHorizontal: 20,
                marginVertical: 4,
              }}>
              {' '}
              10,000 20,000 3% 600 20,600
            </Text>
            <Divider
              bold="2"
              style={{
                backgroundColor: '#000000',
                marginHorizontal: 20,
                opacity: 0.2,
              }}
            />
            <Text
              style={{
                color: black,
                fontSize: 17,
                marginHorizontal: 20,
                marginVertical: 4,
              }}>
              {' '}
              10,000 20,000 3% 600 20,600
            </Text>
          </LinearGradient>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',

            alignItems: 'center',
          }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Garage}
            numColumns={2}
            renderItem={RenderView}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9B54A',
  },
  topview: {
    flexDirection: 'row',
    paddingTop: 10,
    backgroundColor: '#E3A542',
    paddingBottom: 10,
  },
  topupcard: {
    alignSelf: 'center',
    width: '90%',
    height: 150,
    borderColor: '#EB352A',
    borderWidth: 1,
    borderRadius: 15,
  },
  agentcard: {
    alignSelf: 'center',
    width: '90%',
    height: 240,
    borderColor: '#EB352A',
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 40,
    marginBottom: 40,
  },
  topupText: {
    paddingHorizontal: 20,
    color: black,
    fontSize: 20,
    fontWeight: '500',
    marginTop: 15,
  },
  linearGradient: {
    flex: 1,
    borderRadius: 15,
  },
});
