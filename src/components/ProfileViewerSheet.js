import React from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../utils/styles/global-styles";
import { useSelector } from "react-redux";
import { Image } from "react-native";
import AllIcons, { IconList } from "./AllIcons";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import VideoCallBtn from "./VideoCallBtn";
import { GradientButtonMain } from "./GradientButtonMain";

const ProfileViewerSheet = () => {

    
    const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);


    return(
        <View style={styles.mainContainer}>
            <View style={globalStyles.mainContainer}>
            {/* first top line */}
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Image source={{ uri: userUpdatedData?.image}} style={{height: 70, width: 70, borderRadius: 50}} />
                    <View style={{justifyContent: 'center', alignItems: 'center', left: 5, height: 30}}>
                        <GradientButtonMain txt={'Follow'} icon={require('../assets/images/profileViewer/follow.png')} />
                    </View>
                    <View style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center', width: '100%', right: 20}}>
                        <TouchableOpacity style={[styles.iconBorderStyle, {right: 10}]}>
                            <Image source={require('../assets/images/profileViewer/tag.png')} style={{height: 22, width: 33, borderRadius: 50}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconBorderStyle}>
                            <AllIcons iconName={'alert-octagon'} name={IconList.Feather} color={'black'} size={20}/>
                        </TouchableOpacity>
                    </View>
                </View>
            {/* user name level and id */}
                <View style={{left: 10, top: 10}}>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',}}>
                        <Text style={{fontSize: 13, color: 'black', fontWeight: 'bold'}}>{userUpdatedData?.nick_name ?? userUpdatedData?.full_name ?? userUpdatedData?.name}</Text>
                        <Image source={{ uri: userUpdatedData?.sender_level_image}} style={{height: 16, width: 38, marginHorizontal: 5}} />
                        <Image source={{ uri: userUpdatedData?.sender_level_image}} style={{height: 16, width: 38}} />
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', top: 10}}>
                        <Text style={{fontSize: 13, color: 'black', fontWeight: '500'}}>{'ID:' + userUpdatedData?.id}</Text>
                        <Image source={require('../assets/images/profileViewer/copy.png')} style={{height: 16, width: 16, left: 5}} />
                    </View>
                </View>
            </View>

            <View style={globalStyles.mainContainer}>

                {/* rich level and charm level design */}
                <View style={{flex: 0.8, flexDirection: "row", justifyContent: 'space-between', top: 15}}>
                    <ImageBackground source={require('../assets/images/profileViewer/senderlevel.png')} style={styles.levelBoxStyles} borderRadius={6} >
                        <Image source={require('../assets/images/profileViewer/senderlevelicon.png')} style={styles.levelIconStyles} />
                        <View style={{left: 5}}>
                            <Text style={styles.levelTextStyle}>Rich Level</Text>
                            <Text style={styles.levelTextStyle}>{userUpdatedData?.sender_level}</Text>
                        </View>
                    </ImageBackground>
                    <ImageBackground source={require('../assets/images/profileViewer/receiverlevel.png')} style={styles.levelBoxStyles}  borderRadius={6} >
                        <Image source={require('../assets/images/profileViewer/receiverlevelicon.png')} style={[styles.levelIconStyles, {width: '38%'}]} />
                        <View style={{left: 5}}>
                            <Text style={styles.levelTextStyle}>Charm Level</Text>
                            <Text style={styles.levelTextStyle}>{userUpdatedData?.reciever_level}</Text>
                        </View>
                    </ImageBackground>
                </View>
                
            <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems: 'flex-end', flex: 1}}>
                <TouchableOpacity style={{backgroundColor: '#E8A5FF', height: '50%', width: '45%', borderRadius: 50, borderColor: '#9C00D2', borderWidth: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <Image source={require('../assets/images/profileViewer/giftBox.png')} style={{width: 22, height: 22, right: 5}} />
                    <Text style={styles.levelTextStyle}>Send gifts</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height: '50%', width: '45%' }}>
                   <VideoCallBtn />
                    {/* <Image source={require('../assets/images/profileViewer/giftBox.png')} style={{width: 22, height: 22, right: 5}} />
                    <Text style={styles.levelTextStyle}>Send gifts</Text> */}
                </TouchableOpacity>
            </View>
            </View>
        </View>
    )
}

export default ProfileViewerSheet;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingVertical: '5%',
    paddingHorizontal: 20,
  },
  iconBorderStyle: {

    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 3, 
  },
  levelBoxStyles: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 5,
    paddingHorizontal: 10,
    flexDirection: 'row', 
    alignItems: 'center',
    marginHorizontal: 5
  }, 
  levelIconStyles: {
    height: '83%',
    width: '32.5%',
  },
  levelTextStyle: {
    color: 'black',
    fontSize: 11,
    fontWeight: '500'
  }
});