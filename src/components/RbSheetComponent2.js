import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import KickUserComponent from './KickUserComponent';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Kick 1 min',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Kick 1 hour',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Kick 24 hours',
    },
  ];
  const DATA2 = [
    {
 
      title: 'Mute 5 mins',
    },
    {
  
      title: 'Mute 1 hour',
    },
    {
     
      title: 'Mute 1 days',
    },
    {
      title: 'Mute 7 days',
    },
    {
      title: 'Mute 30 days',
    },
  ];
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <KickUserComponent name={'Mute User'} DATA={DATA2} marginVertical={6}/>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    width:'85%',
    height:'35%',
    // margin: 20,
    backgroundColor: '#22263a',
    borderRadius: 15,
    // padding: 35,
    // alignItems: 'center',
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default App;