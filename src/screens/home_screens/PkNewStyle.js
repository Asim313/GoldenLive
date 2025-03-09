import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useRef} from 'react';
import RbSheetComponent from '../reuseable_Component/RbSheetComponent';
import BackIcon from 'react-native-vector-icons/AntDesign';
import CrossIcon from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import AllIcons from '../../components/AllIcons';



const PkNewStyle = () => {

  const PkScreen = useRef();

 
  const ComponentSheet = props => (
    <LinearGradient
      colors={[
        props.valueOne ? props.valueOne : '#365FB6',
        props.valueTwo ? props.valueTwo : '#062058',
      ]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={{
        paddingBottom: 25,
        width: props.width,
        height: 115,
        borderRadius: 15,
        marginVertical: 10,
      }}>
      <Text
        style={{
          fontSize: 26,
          marginLeft: 5,
          marginTop: 8,
          fontWeight: '900',
          color: 'white',
        }}>
        {props.title}
      </Text>
      <Text
        style={{
          fontSize: 15,
          marginLeft: 5,
          marginTop: 5,
          fontWeight: '600',
          color: 'white',
        }}>
        {props.battle}
      </Text>
      <View style={{flexDirection: 'row-reverse'}}>
        <Image
          style={{
            height: props.heightPic ? props.heightPic : 60,
            width: props.widthPic ? props.widthPic : 104,
            bottom: props.BottomPic ? props.BottomPic : 19,
          }}
          source={props.imageBattle}
        />
      </View>
    </LinearGradient>
  );

  const PKSheet = () => (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
        }}>
      
        <AllIcons name={'AntDesign'} iconName={'left'} size={20}  color={'white'}/>
        <TouchableOpacity onPress={() => PkScreen.current.close()}>
        <AllIcons name={'Entypo'} iconName={'cross'} size={20}  color={'white'}/>
     
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 5,
        }}>
        <ComponentSheet
          title="PK"
          battle="Win the Battle"
          imageBattle={require('../../assets/images/PKFile/tinywow_Rectangle.png')}
          width={170}
          valueOne="#365FB6"
          valueTwo="#062058"
          heightPic={72}
          widthPic={124}
          BottomPic={15}
        />
        <ComponentSheet
          title="TEAM PK"
          battle="3v3"
          imageBattle={require('../../assets/images/PKFile/tinywow_Rectangle.2.png')}
          width={170}
          valueOne="#7e1217"
          valueTwo="#b4304c"
          heightPic={72}
          widthPic={124}
        />
      </View>
      <View style={{marginHorizontal: 8}}>
        <LinearGradient
          colors={['#365FB6', '#7e1217']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            paddingBottom: 25,
            // width: props.width,
            height: 122,
            borderRadius: 15,
            marginVertical: 1,
            marginBottom: 12,
          }}>
          <View style={{flexDirection: 'row', width: '100%'}}>
            <View style={{width: '60%'}}>
              <Text
                style={{
                  fontSize: 20,
                  marginLeft: 5,
                  marginTop: 8,
                  fontWeight: '800',
                  color: 'white',
                }}>
                PK SUPER LEAGUE ROUND
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{
                    height: 20,
                    width: 20,
                    marginLeft: 10,
                    marginVertical: 5,
                  }}
                  source={require('../../assets/images/PKFile/Circle.png')}
                />
                <Text
                  style={{
                    fontSize: 20,
                    color: 'white',
                    fontWeight: '800',
                    marginVertical: 3,
                    marginLeft: 6,
                  }}>
                  Points : 0
                </Text>
                <BackIcon
                  name="right"
                  size={18}
                  style={{marginVertical: 7, marginLeft: 6, color: 'white'}}
                />
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 40,
                  width: '70%',
                  marginLeft: 13,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#0B2D50',
                    fontWeight: '500',
                    marginVertical: 3,
                  }}>
                  Random Match
                </Text>
              </View>
            </View>
            <View>
              <Image
                style={{height: 123, width: 170, marginTop: 20}}
                source={require('../../assets/images/PKFile/Rectangle.png')}
              />
            </View>
          </View>
        </LinearGradient>
      </View>
      
    </View>
  );


  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => PkScreen.current.open()}
        style={[styles.icon2box, {backgroundColor: 'rgba(0,0,0,0.2)'}]}>
        <Text>Checker</Text>
      </TouchableOpacity>
      <RbSheetComponent view={<PKSheet />} refUse={PkScreen} close={true} /> 
    </View>
  );
};
export default PkNewStyle;
const styles = StyleSheet.create({
  icon: {
    color: 'white',
    paddingHorizontal: 5,
  },

});

