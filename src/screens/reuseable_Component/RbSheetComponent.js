import React, {useState, useImperativeHandle} from 'react';
import {View, StyleSheet} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

const RbSheetComponent = React.forwardRef(props => {
  // console.log('bakgrokkkkkkkkk', props.backgroundColor)
  return (
    <View>
      <View>
        <RBSheet
          ref={props.refUse}
          closeOnDragDown={props.close}
          closeOnPressMask={true}
          animationType={props.animationType ?? 'none'}
          openDuration={250}
          closeDuration={200}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: 'red',
              height: 2,
            },
            container: {
              backgroundColor: props.backgroundColor ?? 'rgba(0, 0, 0, 0.8)',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              height: props.height,
            },
          }}>
          {props.view}

        </RBSheet>
      </View>
    </View>
  );
});
export default RbSheetComponent;
