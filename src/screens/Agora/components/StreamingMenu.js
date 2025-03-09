import React from "react";
import { View } from "react-native";
import AllIcons, { IconList } from "../../../components/AllIcons";

const StreamingMenu = ({videoStreaming}) => {
    return(
        <View style={{alignSelf: 'center', marginHorizontal: 10}}>
        <Text style={styles.headingtxt}>Stream Duration 00:02:11</Text>
        <Text
          style={{
            borderBottomWidth: 1,
            borderColor: 'white',
            marginHorizontal: 20,
          }}></Text>
        <View style={styles.rbIconbox}>
          <View style={styles.gameIconView}>
            <TouchableOpacity
              style={[styles.gameIconbox, {backgroundColor: 'red'}]}>
              <AllIcons
                name={IconList.Entypo}
                iconName="emoji-happy"
                color={'white'}
                size={22}
              />
            </TouchableOpacity>
            <Text style={styles.gametxt}>Steakers</Text>
          </View>
          <View style={styles.gameIconView}>
            <TouchableOpacity
              style={[styles.gameIconbox, {backgroundColor: 'green'}]}>
              <AllIcons name={IconList.Feather} iconName="music" size={22} color={'white'} />
            </TouchableOpacity>
            <Text style={styles.gametxt}>Music</Text>
          </View>
          <View style={styles.gameIconView}>
            <TouchableOpacity
              style={[
                styles.gameIconbox,
                {backgroundColor: '#FFBB2D'},
              ]}>
              <Image
                source={require('../../../assets/images/beans.png')}
                style={{height: 30, width: 30, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
            <Text style={styles.gametxt}>Beans</Text>
          </View>
          <View style={styles.gameIconView}>
            <TouchableOpacity
              style={[
                styles.gameIconbox,
                {backgroundColor: '#7893CA'},
              ]}>
              <Image
                source={require('../../../assets/images/room.png')}
                style={{height: 30, width: 30, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
            <Text style={styles.gametxt}>Room Effects</Text>
          </View>
          {/* <View style={styles.gameIconView}>
            <TouchableOpacity
              onPress={() => FlipCamera()}
              style={[
                styles.gameIconbox,
                {backgroundColor: '#023188'},
              ]}>
              <Image
                source={require('../../assets/images/flipcam.png')}
                style={{height: 30, width: 30, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
            <Text style={styles.gametxt}>Flip Camera</Text>
          </View> */}
          <View style={styles.gameIconView}>
            <TouchableOpacity
              style={[
                styles.gameIconbox,
                {backgroundColor: '#039CDD'},
              ]}>
              <AllIcons name={IconList.Octicons} iconName="mirror" size={22} color={'white'} />
            </TouchableOpacity>
            <Text style={styles.gametxt}>Mirror On</Text>
          </View>
          <View style={styles.gameIconView}>
            <TouchableOpacity
              style={[
                styles.gameIconbox,
                {backgroundColor: '#6B8EF2'},
              ]}>
              <AllIcons
                name={IconList.MaterialCommunityIcons}
                iconName="message-text-outline"
                size={22}
                color={'white'}
              />
            </TouchableOpacity>
            <Text style={styles.gametxt}>Chat</Text>
          </View>
          <View style={styles.gameIconView}>
            <TouchableOpacity
              onPress={() =>
                shareToWhatsApp(
                  userUpdatedData?.nick_name ??
                    userUpdatedData?.full_name,
                  userUpdatedData?.id,
                )
              }
              style={[
                styles.gameIconbox,
                {backgroundColor: '#023188'},
              ]}>
              <AllIcons name={IconList.SimpleLineIcons} iconName="share-alt" size={30} color="white" />
            </TouchableOpacity>
            <Text style={styles.gametxt}>Share</Text>
          </View>
        </View>
      </View>
    )
}

export default StreamingMenu

const styles = StyleSheet.create({
    headingtxt: {
        color: 'white',
        marginLeft: 15,
        fontSize: 15,
        fontWeight: '400',
        backgroundColor: '#3A3A3A',
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 3,
      },
      rbIconbox: {
        marginTop: 25,
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      rbIconbox1: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      gameIconView: {
        alignItems: 'center',
        width: '25%',
      },
      gameIconbox: {
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        // backgroundColor: '#3A3A3A',
        // opacity: 0.7,
      },
      gametxt: {
        color: '#FFFFFF',
        width: 90,
        textAlign: 'center',
      },
})