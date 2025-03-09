
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { ApiCallToken } from '../../Services/Apis';
import { useDispatch, useSelector } from 'react-redux';

const Data = [
  { title: 'Set As Admin' },
  { title: 'Mute User' },
  { title: 'Boot User' },
  { title: 'Add to Showroom Blocklist' },
];


const BlockUserSheet = ({showBottomSheet}) => {
    console.log("bottom sheet var", showBottomSheet)
  const [modalVisible, setModalVisible] = useState(showBottomSheet);
  const userData = useSelector(state => state.auth.userData);
  const [blocked, setBlocked] = useState(100000778)
  const [unBlocked, setUnBlocked] = useState(100000778)

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const renderItem = ({ item }) => (
    <View>
      <View style={{ borderBottomWidth: 0.3, width: '100%', borderBottomColor: '#dbe0d1' }}>
        <TouchableOpacity>
          <Text style={{ fontSize: 17, textAlign: 'center', marginVertical: "3%", color: 'black' }}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const ListOfChaters = async () => {
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'list/chat/friends',
        verb: 'POST',
      });
      console.log("check data ", res)
    } catch (error) {
      console.log('error in Store Fun', error);
    }
  };


  const blockedMethod = async () => {
    try {
      const res = await ApiCallToken({
        params: userData.token,
        paramsBody: {
          id: blocked
        },
        route: 'user/block',
        verb: 'POST',
      });
      setBlocked(blocked);
      console.log("check data ", res)
    } catch (error) {
      console.log('ERROR IS Store Purchase ====>>>', error);
    }
  }


  const unBlockedMethod = async () => {
    try {
      const res = await ApiCallToken({
        params: userData.token,
        paramsBody: {
          id: blocked
        },
        route: 'user/unblocked',
        verb: 'POST',
      });
      setUnBlocked(unBlocked);
      console.log("check data ", res)


    } catch (error) {
      console.log('ERROR IS Store Purchase ====>>>', error);
    }

  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal}>
        <Text style={{ fontSize: 15 }}>Open Bottom Sheet</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: "5%" }} onPress={() => blockedMethod()}>
        <Text style={{ fontSize: 15 }}>Block SomeOne {blocked}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: "5%" }} onPress={() => unBlockedMethod()}>
        <Text style={{ fontSize: 15 }}>UnBlock SomeOne {unBlocked}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: "5%" }} onPress={() => ListOfChaters()}>
        <Text style={{ fontSize: 15 }}>UnBlock SomeOne {unBlocked}</Text>
      </TouchableOpacity>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalView}>
          <FlatList
            data={Data}
            renderItem={renderItem}>
          </FlatList>
          <TouchableOpacity style={styles.closeButton} onPress={() => toggleModal()}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>

        </View>
      </Modal>
    
    </View>
  );
}

export default BlockUserSheet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // padding: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  closeButton: {
    marginVertical: "2%",
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'grey',
    fontSize: 18,
  },
});


