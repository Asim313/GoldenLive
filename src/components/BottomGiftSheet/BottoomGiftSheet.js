import { useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import GiftSheetData from './GiftSheetData';

const BottoomGiftSheet = () => {

  const refRBSheetG = useRef(null);

  return (
    // <>
    //   <TouchableOpacity style={styles.OpenBtn}
    //     onPress={() => refRBSheetG.current.open()}>
    //     <Text style={styles.btnTxt}>
    //       Open Sheet!!
    //     </Text>
    //   </TouchableOpacity>

      <View>
        {/* <OpenSheet OpenSheetRef={refRBSheetG} /> */}
        <RBSheet
          ref={refRBSheetG}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: 'white',
              height: 2,
            },
            container: {
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              backgroundColor: '#31384A',
              height: '55%',
            },
          }}>

          <GiftSheetData />

        </RBSheet>
      </View>
    // </>
  );
};

export default BottoomGiftSheet;

const styles = StyleSheet.create({
  OpenBtn: {
    backgroundColor: 'red',
    padding: 10,
    marginHorizontal: 50,
    borderRadius: 10,
    marginTop: 10,
  },
  btnTxt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18
  }
});