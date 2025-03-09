import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AllIcons, {IconList} from './AllIcons';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const CohostCallsList = ({
  changeCohostStatus,
  coHostRemove,
  callRequests,
  switch1,
  onToggleSwitch1,
  onPressCross,
  removeNotification,
}) => {
  useEffect(() => {
    removeNotification && removeNotification();
  }, []);

  return (
    <View>
      <TouchableOpacity
        style={{alignItems: 'flex-end', paddingHorizontal: 10, top: 5}}
        onPress={() => onPressCross()}>
        <AllIcons
          name={IconList.Entypo}
          iconName={'squared-cross'}
          size={28}
          color={'#c1121f'}
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          paddingVertical: 15,
        }}>
        <Text style={{color: 'white', fontSize: 15, fontWeight: '500'}}>
          Allow Anyone to Join as Guest
        </Text>
        <Switch
          value={switch1}
          onValueChange={onToggleSwitch1}
          color="#E92F24"
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        {callRequests && (
          <FlatList
            data={callRequests}
            contentContainerStyle={{paddingBottom: heightPercentageToDP(20)}}
            renderItem={({item}) => {
               
              return (
                <View style={styles.profileViewerbox}>
                  
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                    <Image
                      source={{uri: item?.img}}
                      style={styles.imgStyle}></Image>
                
                    <Text style={[styles.txt, {left: 15}]}>{item?.full_name}</Text>
                </View>

                  <View style={styles.textAndButtonsContainer}>
                    <TouchableOpacity
                      style={[styles.submitButton, {backgroundColor: '#FF0000', right: 5}]}
                      onPress={() => {
                        coHostRemove(item?.coHostID);
                      }}>
                      <Text style={[styles.submitButtonText, {color: 'white', fontSize: 11}]}>
                        Decline
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.submitButton, {backgroundColor: '#3BC940', marginHorizontal: 5}]}
                      onPress={() => {
                        changeCohostStatus(item?.coHostID);
                      }}>
                        <Text style={{color: 'white', fontSize: 11}}>Accept</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}></FlatList>
        )}
      </View>
    </View>
  );
};

export default CohostCallsList;

const styles = StyleSheet.create({
    profileViewerbox: {
        flexDirection: 'row',
        marginHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
      },
      submitButton: {
        backgroundColor: '#3BC940',
        padding: 7,
        borderRadius: 12,
      },
      submitButtonText: {
        fontWeight: 'bold',
        textAlign: 'center',
      },
      textAndButtonsContainer: {
        flexDirection: 'row',
        marginLeft: '12%',
      },
      imgStyle: {
        height: 50,
        width: 50,
        borderRadius: 25,
      },
});
