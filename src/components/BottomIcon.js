import React, {useState} from 'react';
import {TouchableOpacity,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import AllIcons from './AllIcons';


const BottomIcon = ({iconName,name, size, color, onPress}) => {
  const [data, checkData] = useState(false);


  const onPressFun = () => {
    checkData(!data)
    onPress()

 
  }

  return (
    <TouchableOpacity
      style={styles.icon1box}
      onPress={()=>onPressFun()}>
      <AllIcons name={name} iconName={iconName} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default BottomIcon;

const styles = StyleSheet.create({
  icon1box: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: 35,
    width: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
})


