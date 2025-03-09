import React, {
  createRef,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  Button,
  FlatList,
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import languages from '../assets/languages/English.json';
// import { primaryColor, secondryColor, textColor, headings, shadow, transparent, primaryColorDim, white, container } from '../utils/Styles';
const StarModal = React.forwardRef((props, ref) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [icon, seticon] = useState('left');
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useImperativeHandle(ref, () => ({
    toggleModal,
  }));
  return (
    // style={{ ...container.empty }}
    <View>
      {/* <Button title="Show modal" onPress={toggleModal} /> */}
      <Modal
        isVisible={isModalVisible}
        // swipeDirection={['left', 'right']}
        onBackdropPress={toggleModal}
        backdropOpacity={0.3}
        coverScreen={true}
        backdropColor={null}
        onBackButtonPress={toggleModal}
        onSwipeComplete={toggleModal}
        animationIn={props.animationIn}
        animationOut={props.animationOut}
        animationInTiming={500}
        animationOutTiming={500}>
        {props.view}
      </Modal>
    </View>
  );
});
export default StarModal;

// import {View, Text} from 'react-native';
// import React from 'react';
// import Modal from 'react-native-modal';
// export default function StarModal() {
//   return (
//     <View style={{height: 200}}>
//       <Modal isVisible={true}>
//         <View>
//           <Text>Hello</Text>
//         </View>
//       </Modal>
//     </View>
//   );
// }
