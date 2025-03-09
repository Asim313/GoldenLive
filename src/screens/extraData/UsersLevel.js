import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import SpeakerIcon from 'react-native-vector-icons/MaterialIcons';
import { white } from '../../utils/Styles';

const UsersLevel = ({ data }) => {
    return (
        <View
        style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          {data?.flag &&
            <Image
              source={{uri: data?.flag}}
              style={{
                height: 12,
                width: 20,
                right: 3
              }}
            />
            }
          {data?.reciever_level_image &&
            <Image
              source={{uri: data?.reciever_level_image}}
              style={{
                height: 15,
                width: 35,
              }}
            />
            }
        {data?.sender_level_image &&
          <Image
            source={{uri: data?.sender_level_image}}
            style={{
              height: 15,
              width: 35,
              marginHorizontal: 5,
            }}
          />
          }
          {data?.badge &&
            <Image
              source={{uri: data?.badge}}
              style={{
                height: 18,
                width: 80,
              }}
            />
            }
        {data?.star_level_image &&
          <Image
            source={{uri: data?.star_level_image}}
            style={{
              height: 18,
              width: 70,
            }}
          />
          }
      </View>
    )
}

export default UsersLevel

const styles = StyleSheet.create({
    Likebox: {
        flexDirection: 'row',
        marginLeft: 5,
    },
    Kbox: {
        backgroundColor: 'red',
        paddingHorizontal: 5,
        borderRadius: 15,
        marginHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    Starbox: {
        backgroundColor: 'green',
        paddingHorizontal: 5,
        borderRadius: 15,
        marginHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    Startxt: {
        color: 'white',
        fontSize: 11,
    },
})