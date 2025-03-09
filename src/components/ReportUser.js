import React, { useRef } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import AllIcons, { IconList } from "./AllIcons";
import { Text } from "react-native";
import { ApiCallToken } from "../Services/Apis";
import { useSelector } from "react-redux";
import database from '@react-native-firebase/database';
import RbSheetComponent from "../screens/reuseable_Component/RbSheetComponent";
import { heightPercentageToDP } from "react-native-responsive-screen";
import Timer from "./Timings";
import { useState } from "react";

const ReportUser = ({userData, channelName, onPressCross, fromAudio}) => {
    const User = useSelector(state => state.auth.userData);
    const reportSheetRef = useRef();
    const [type, setType] = useState(null)
    const blockTypes = [
        { title: ' ' },
        { title: 'Mute User' },
        { title: 'Boot User' },
        { title: 'Add to Showroom Blocklist' },
      ];


      const handleTypeClick = (index) => {
        if(parseInt(userData?.id) !== parseInt(channelName))
        {
          if(index === 1) {
            setType('mute')
            reportSheetRef.current.open();
            //musteUser(userData?.id)
          }
          if(index === 2) {
            setType('block')
            reportSheetRef.current.open();
           // handleBlockUser(userData?.id)
          }
        } else {
          alert("you can't block or mute host. ")
        }
     
    }

    return(
        <View style={styles.blockSheetStyle}>
        <View style={{ alignItems: 'flex-end', paddingHorizontal: 10 }}>
          <TouchableOpacity onPress={onPressCross} >
          <AllIcons name={IconList.FontAwesome} iconName={'close'} color={'black'} size={28} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={blockTypes}
          renderItem={({ item, index }) => (
            <View>
              <View style={{ borderBottomWidth: 0.3, width: '100%', borderBottomColor: '#dbe0d1' }}>
                <TouchableOpacity onPress={() => {handleTypeClick(index)}}>
                  <Text style={{ fontSize: 17, textAlign: 'center', marginVertical: "3%", color: 'black' }}>{item.title}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        >
        </FlatList>

        <RbSheetComponent
              view={<Timer
                fromAudio={fromAudio} 
                blockType={type}   
                userData={userData}
                channelName={channelName}
                onPressCross={() => {
                  reportSheetRef.current.close()
                  onPressCross()
                }
              }
              />}

              backgroundColor={'white'}
              refUse={reportSheetRef}
              close={false}
              height={heightPercentageToDP(30)}

            />
      </View>
    )
}

const styles = StyleSheet.create({
    blockSheetStyle: {
        height: heightPercentageToDP(30),
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // padding: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      },
})

export default ReportUser