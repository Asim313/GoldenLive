import React, { useRef, useState, useEffect } from 'react';
import { Image } from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ImageBackground } from 'react-native';



const GiftSheetTopUsers = ({handleUsers, cohostData, channelName, selectedItem}) => {

  const [Data, setData] = useState()
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isSelected, setIsSelected] = useState(null)
  // console.log('cohost', cohostData)

  useEffect(() => {
    //code to select all cohost because we send gift to all cohost in FriendGift
    if(selectedItem === "Friend Gift")
    {
      // console.log("yessssssss")
      setSelectedUsers(cohostData)
    }
    setData(cohostData)
  }, [cohostData, selectedItem])

  useEffect(() => {  
    //Store SelectedUser Id
    //  console.log("This is user ID", selectedUsers);
    handleUsers(selectedUsers)
  }, [selectedUsers]);

  const renderItem = ({ item, index }) => {
    // const isSelected = selectedUsers.includes(item?.cohostID);
    const dataManipulate = {cohostID: item?.cohostID ?? item?.id, name: item?.name ?? item?.full_name, isMicOn: item?.isMicOn, image: item?.image, value: item?.value, id: item?.id}
  //  console.log('dadddddddddddddddddd', dataManipulate)

    const handlePress = () => {
      if (isSelected === index) {
        setSelectedUsers(selectedUsers.filter(data => data?.cohostID !== dataManipulate.cohostID));
        setIsSelected(null)
      } else {
        setSelectedUsers([{cohostID: dataManipulate?.cohostID, name: dataManipulate?.name, isMicOn: dataManipulate?.isMicOn}]);
        setIsSelected(index)
      }
      
    }

    return (
      <View>
        {dataManipulate?.cohostID && dataManipulate?.name && 
          <TouchableOpacity onPress={handlePress}  style={styles.UserData} >
            <Image
              source={{uri: dataManipulate?.image}}
              style={[styles.UserImg, (isSelected === index || selectedItem === "Friend Gift") && { borderColor: 'red', borderWidth: 2 }, (selectedUsers?.length > 1 && {borderColor: 'red', borderWidth: 2})]}>
            </Image>
            <View style={[styles.levelContainer, (isSelected === index  || selectedItem === "Friend Gift") && { backgroundColor: 'red' }]}>
              <Text style={styles.Userlvl}>{dataManipulate.id ?? item?.cohostID}</Text>
            </View>
          </TouchableOpacity>
        }
      </View>
    )
  }


  return (
    <View style={styles.Container}>

      <View style={styles.UserContainer}>
        <Text style={{ color: 'white', fontSize: 11 }}>Select User :  </Text>
        <View style={{ width: 135 }}>
          <FlatList
            data={Data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            horizontal={true}
            snapToInterval={10}
          />
        </View>

        <TouchableOpacity style={{width: '100%', alignItems: 'center'}} onPress={() => {selectedUsers?.length > 1 ? setSelectedUsers([]) : setSelectedUsers(cohostData)}}  >
            <Text style={{fontSize: 11, color: 'white', backgroundColor: 'green', padding: 4, borderRadius: 4, }}>{selectedUsers?.length > 1 ? 'Deselect' : 'Select all'}</Text>
        </TouchableOpacity>
      </View>
    </View>

  )
}

export default GiftSheetTopUsers;

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'space-evenly',
    marginVertical: 4,
    // paddingHorizontal: 5,
    width: 170,
  },
  UserData: {
    paddingHorizontal: 5,

    width: 50,
   // height: 40,
    justifyContent: 'center', 
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  UserImg: {
    width: 30,
    height: 30,
    borderRadius: 20,
    overflow: 'hidden',
  },
  Userlvl: {
    fontSize: 8,
    textAlign: 'center',
    color: 'white'
  },
  levelContainer: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    backgroundColor: 'grey',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',

  },
  UserContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
