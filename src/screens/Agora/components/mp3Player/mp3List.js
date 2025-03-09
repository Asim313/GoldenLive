import React, {memo, useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AllIcons, {IconList} from '../../../../components/AllIcons';
import {FlatList} from 'react-native-gesture-handler';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Slider from '@react-native-community/slider';
import { useDispatch, useSelector } from 'react-redux';
import { selectedSongByUser, songVolumeIndication } from '../../../../Redux/Actions';

const MP3List = memo(({selectSongsFromGallery, selectedFiles, handleSongPause}) => {


  // const [song, setSong] = useState(null)
   const song = useSelector(state => state.hostRed.songSelectedByUser)
   const songVolume = useSelector(state => state.hostRed.songVolume)
   const [isPuased, setIsPaused] = useState(false)
    const dispatch = useDispatch()

    const [filterSongs, setFilterSongs] = useState(selectedFiles)
    //  const [selectedAudioFiles,setSelectAudioFile] = useState([])

    useEffect(() => {
        setFilterSongs(selectedFiles)
}, [selectedFiles])
    
    
    const fitlerData = (substring) => {
        setFilterSongs(selectedFiles.filter(item => item.name.includes(substring)));
    }
    
      useEffect(() => {
        console.log('jkdfkkkkkkkkkkkkk', filterSongs)
      }, [filterSongs])

   const handleSongSelection = (item) => {
       // setSong(item)
        dispatch(selectedSongByUser(item))
       // selectedSong(item)
   }

  const renderSongsList = ({item, index}) => {
    //  console.log('itemmmmmm', item)
    return (
      <TouchableOpacity
        onPress={() => handleSongSelection(item)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
          width: '90%',
        }}>
        <Image
          source={require('../../../../assets/images/mp3playerImages/checkMark.png')}
          style={{width: 15, height: 15}}
        />
        <Text
          style={{
            color: song?.name === item?.name ? '#FC6C1A' : 'black',
            fontSize: 12,
            fontWeight: 'bold',
            fontFamily: 'poppins',
            marginHorizontal: 5,
          }}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.textInputBack}>
          <AllIcons
            name={IconList.AntDesign}
            iconName={'search1'}
            size={16}
            color={'grey'}
          />
          <TextInput
            placeholder="Enter music name to search"
            onChangeText={(txt) => fitlerData(txt)} 
            placeholderTextColor={'#9A9696'}
            style={styles.textInputStyle}
          />
        </View>

        <TouchableOpacity
          onPress={() => selectSongsFromGallery()}
          style={{width: '6%', alignItems: 'flex-start'}}>
          <AllIcons name={IconList.Feather} iconName={'plus'} size={25} />
        </TouchableOpacity>
      </View>

      <View style={{flex: 1, top: 10, marginHorizontal: 10, marginBottom: 10}}>
        <FlatList
          data={filterSongs}
          renderItem={renderSongsList}
          key={({index}) => index + 1}
        />
      </View>

<View style={{ backgroundColor: 'white',
    height: heightPercentageToDP(10), paddingHorizontal: 40}}>


<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>

<TouchableOpacity>
            <Image
              source={require('../../../../assets/images/mp3playerImages/volume.png')}
              style={{height: 20, width: 20}}
            />
          </TouchableOpacity>

<Slider
            style={{width: '100%', height: 40}}
            value={songVolume}
            minimumValue={0}
            maximumValue={100}
            onValueChange={(value) => {
                console.log('val', value)
                dispatch(songVolumeIndication(parseInt(value)))
               // handleVolumeIndication(parseInt(value))
            }}
            minimumTrackTintColor="#D24F05"
            maximumTrackTintColor="#B5B4B4"
            />
            </View>

{song?.name && 
      <View style={styles.bottomStyle}>
        <Text style={{color: 'black', fontWeight: '500', fontSize: 9, width: '80%' }}>
          {song?.name}
        </Text>


          <TouchableOpacity
            style={{left: 20}}
          onPress={() => {
            // selectedSong(null)
            setIsPaused(!isPuased)
            handleSongPause(isPuased)
            }}>
            <Image
              source={ isPuased ? require('../../../../assets/images/mp3playerImages/pause.png') : require('../../../../assets/images/mp3playerImages/play.png')}
              style={styles.image}
            />
          </TouchableOpacity>
    
      </View>
}

      </View>
    </View>
  );
});

export default MP3List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'blue',
  },
  headerContainer: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInputStyle: {
    fontSize: 11,
    color: 'black',
    width: '90%',
  },
  textInputBack: {
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 5,
    height: 40,
    width: '92%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 25.5,
    height: 25.5,
  },
  bottomStyle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',

  },
});
