import React from "react";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";

export const LiveStreamingHostManu = () => {
    return(
        <View>
            
            <View style={styles.lefticonsbox}>
                <TouchableOpacity style={styles.icon1box} onPress={() => msgRef.current.open()}>
                  <MessageIcon
                    name="facebook-messenger"
                    size={22}
                    color="#c471ed"
                  />
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.icon1box}>
                <SpeakerIcon name="settings-voice" size={22} style={styles.icon1} />
                  </TouchableOpacity> */}

                <TouchableOpacity
                  onPress={() => {
                    handleMicButton();
                  }}
                  style={styles.icon1box}>
                  <Feather name={isMicOn ? "mic" : "mic-off"} size={22} color="orange" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    AllowCall.current.open();
                  }}
                  style={styles.icon1box}>
                  <Feather name="phone-call" size={22} color="#12c2e9" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => refRBSheet1.current.open()}
                  style={[styles.icon1box, { backgroundColor: 'red' }]}>
                  <Text style={styles.PK}>PK</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.icon1box}
                  onPress={() => refRBSheet.current.open()}>
                  <Entypo name="game-controller" color="#FFE000" size={22} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.icon1box}
                  onPress={() => refRBSheetOptions.current.open()}>
                  {/* <OptionIcon name="three-bars" size={20} color="#fbc7d4" /> */}
                </TouchableOpacity>
              </View>
        </View>
    )
}