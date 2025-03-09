import React, { useCallback } from "react";
import { FlatList, Text } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import AnimatedProfileDp from "../../reuseable_Component/AnimatedProfileDP";
import { heightPercentageToDP } from "react-native-responsive-screen";
import AllIcons, { IconList } from "../../../components/AllIcons";

const UserList = ({data, onPressCross=() => {}, onPressSingleUser, selectedItems, inviteUserToCall}) => {
  
  const handleClick = useCallback((item) => {
    console.log("hek", selectedItems)
    {selectedItems?.[0] || selectedItems ? inviteUserToCall(selectedItems?.id, item?.id) :  onPressSingleUser(item)}
  })
    return (
        <View style={styles.flatContainer}>
            <View style={styles.flatListHeader}>
                <Text style={styles.flatListHeaderText}>
                    Viewers ({data.length})
                </Text>
                <TouchableOpacity onPress={onPressCross}>
                  <AllIcons name={IconList.FontAwesome} iconName={'close'} color={'white'} size={18} />
                    {/* <Image source={require('../../../../src/assets/images/cross.png')} /> */}
                </TouchableOpacity>
            </View>

            <FlatList
                data={data}
                renderItem={({ item, i }) => {
                    return (
                        <TouchableOpacity
                            key={i}
                            style={styles.flatInnerContainer}
                            onPress={() => handleClick(item)}>
                            <View style={styles.listImage}>
                            <AnimatedProfileDp img={item.image} imgSize={40} frameSize={14} frame={item?.json_image} />
                            
                            </View>
                            <View style={styles.listText}>
                                <Text style={[styles.text, { fontSize: 16 }]}>
                                    {item.nick_name ?? item.full_name}
                                </Text>
                                <View >
                                    <Image
                                        source={{ uri: item?.sender_level_image }}
                                        style={{ height: 15, width: 38, top: 3, marginLeft: 5 }}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    )
}

export default UserList;

const styles = StyleSheet.create({
    flatContainer: {
        height: heightPercentageToDP(70),
        backgroundColor: 'black',
        position: 'absolute',
        width: '100%',
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        zIndex: 11,
        // padding: 20,
      },
      flatListHeaderText: {
        color: 'white',
        fontSize: 20,
        marginBottom: 20,
      },
      flatListHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
      },
  flatInnerContainer: {
    height: 80,
    flexDirection: 'row',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  listImage: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  listText: {
    flex: 7,
    flexDirection: 'row',
  },
  text: {
    color: 'white',
  },
})