import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RbSheetComponent from '../reuseable_Component/RbSheetComponent';

const PkModalNewStyle = () => {
  const GameSheet = () => (
    <View style={{paddingBottom: 25}}>
      <Text style={styles.headingtxt2}>Play games</Text>
      <View style={styles.rbIconbox1}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={[styles.gameIconbox, {backgroundColor: '#F9A200'}]}>
            <Image
              source={require('../../assets/images/teen.png')}
              style={{height: 40, width: 40}}
            />
          </TouchableOpacity>
          <Text style={styles.gametxt}>Teen Patti</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={[styles.gameIconbox, {backgroundColor: '#C7361E'}]}>
            <Image
              source={require('../../assets/images/ticket.png')}
              style={{height: 38, width: 38}}
            />
          </TouchableOpacity>
          <Text style={styles.gametxt}>A Golden Ticket</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={[styles.gameIconbox, {backgroundColor: '#EF4137'}]}>
            <Image
              source={require('../../assets/images/greedy.png')}
              style={{height: 40, width: 40}}
            />
          </TouchableOpacity>
          <Text style={styles.gametxt}>Greedy</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={[styles.gameIconbox, {backgroundColor: '#FFCD00'}]}>
            <Image
              source={require('../../assets/images/fruit.png')}
              style={{height: 40, width: 40}}
            />
          </TouchableOpacity>
          <Text style={styles.gametxt}>Fruit Loops</Text>
        </View>
      </View>
    </View>
  );
  return (
    <View>
      <TouchableOpacity
        onPress={() => Game.current.open()}
        style={[
          styles.icon2box,
          {backgroundColor: 'rgba(0,0,0,0.2)'},
        ]}>
            <Text>Checker</Text>
        </TouchableOpacity>
      <RbSheetComponent view={<GameSheet />} refUse={Game} close={true} />
    </View>
  );
};

export default PkModalNewStyle;

const styles = StyleSheet.create({});
