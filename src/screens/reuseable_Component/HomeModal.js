import React, {
  createRef,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {Button, FlatList, Text, TextInput, View} from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';

const HomeModal = React.forwardRef((props, ref) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [icon, seticon] = useState('left');
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useImperativeHandle(ref, () => ({
    toggleModal,
  }));
  return (
    <View>
      {/* <Button title="Show modal" onPress={toggleModal} /> */}
      <Modal
        isVisible={isModalVisible}
        // swipeDirection={['left', 'right']}
        onBackdropPress={toggleModal}
        backdropOpacity={0.3}
        coverScreen={true}
        onBackButtonPress={toggleModal}
        onSwipeComplete={toggleModal}
        animationIn={props.animationIn}
        animationOut={props.animationOut}
        animationInTiming={500}
        animationOutTiming={1}>
        {props.view}
      </Modal>
    </View>
  );
});
export default HomeModal;
