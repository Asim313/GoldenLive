import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import EmptyMp3List from './emptyMp3List';
import DocumentPicker from 'react-native-document-picker';
import MP3List from './mp3List';
import { useDispatch, useSelector } from 'react-redux';
import { addMp3Songs } from '../../../../Redux/Actions';

const MP3Player = ({selectSongsFromGallery, playSong, handleSongPause}) => {
  const selectedAudioFiles = useSelector(state => state.hostRed.mp3SongsList)


  const dispatch = useDispatch()

  const pickMp3Files = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
        allowMultiSelection: true,
      });

      if (res.length > 0) {
        console.log("mp2", res)
        
        // Flatten the nested arrays and add the selected files to the state
       // setSelectedAudioFiles(prev => [...prev, ...res]);
       dispatch(addMp3Songs(res))
      }
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('No song selected');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F2EAEA'}}>
      <Text style={styles.headerTitle}>My Music</Text>
      {selectedAudioFiles?.[0] ? (
        <View style={{flex: 1}}>
          <MP3List
            selectSongsFromGallery={() => pickMp3Files()}
            selectedFiles={selectedAudioFiles}
            handleSongPause={(value) => handleSongPause(value)}
          />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <EmptyMp3List selectSongsFromGallery={() => pickMp3Files()} />
        </View>
      )}
    </View>
  );
};

export default MP3Player;

const styles = StyleSheet.create({
  headerTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'poppins',
    alignSelf: 'center',
    marginVertical: 10,
  },
});
