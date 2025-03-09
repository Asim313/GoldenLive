import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import RNFetchBlob from 'rn-fetch-blob';
import AnimatedLottieView from 'lottie-react-native';
import LottieGiftView from './lottieGiftView';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const  Rnfetchblob = ({giftData, handleAnimationEnded}) => {

  const [jsonPath, setJsonPath] = useState();
  const [mp3Path, setMp3Path] = useState(null);

  const [fileName, setFileName] = useState({
    jasonGift:'',
    audio:''
  });

  console.log("fileen nameee", fileName)

  const updateFileName = (newJasonGift, newAudio) => {
    setFileName(prevState => ({
      ...prevState,
      jasonGift: newJasonGift ?? null,
      audio: newAudio ?? null
    }));
  };

  const directoryPath = `${RNFetchBlob.fs.dirs.CacheDir}`;


  useEffect(() => {
    console.log("get new data here's")
    updateFileName(giftData?.icon, giftData?.audio)
  }, [giftData])


  useEffect(() => {
    storeJsonFileToCache(fileName)
  }, [fileName])


  const fileDownloadAndSaveToCache = async mp3file => {

    RNFetchBlob.config({
      fileCache: true,
      path: `${directoryPath}/${mp3file}`,
    })
      .fetch('GET', mp3file, {
        //some headers ..
      })
      .then(res => {
        // console.log('The file saved to ', res.path());
      });
  };


  const storeJsonFileToCache = async giftData => {
    const cachePath = `${directoryPath}/${giftData?.jasonGift}`;

    const fileExists = await RNFetchBlob.fs.exists(cachePath);
    if (fileExists) {
      fetchFromJson(giftData?.jasonGift);
      // console.log('File found in cache:', cachePath);
    } else {
      // console.log('File not found in cache:', cachePath);
      await storeJsonGiftInCache(giftData?.jasonGift);
    }

    const cachePathAudioFile = `${directoryPath}/${giftData?.audio}`;

    const fileExistsAudio = await RNFetchBlob.fs.exists(cachePathAudioFile);
    if (fileExistsAudio) {
     await fetchMp3File(giftData?.audio);
      return;
    } else {
      await fileDownloadAndSaveToCache(giftData?.audio);
    }

  };

  const storeJsonGiftInCache = async jasonGift => {
    console.log("flosnlofhn jdon gilr", jasonGift)
    RNFetchBlob.config({
      fileCache: true,
      path: `${directoryPath}/${jasonGift}`, // Set the cache directory and file name
    })
      .fetch('GET', jasonGift)
      .then(res => {
        // console.log('JSON file saved to', res.path());
        return res.readFile('utf8'); // Read the JSON file as text
      })
      .then(jsonText => {
        const jsonData = JSON.parse(jsonText); // Parse the JSON text
        setJsonPath(jsonData);
      })
      .catch(error => {
        console.error('Error downloading and processing JSON:', error);
      });
  };

  const fetchMp3File = async (mp3file) => {
    try {
   
      setMp3Path('file://' + `${directoryPath}/${mp3file}`)

      // Handle the fetched file data as needed
    } catch (error) {
      console.error('Error fetching MP3 file from cache:', error);
    }
  };

  const fetchFromJson = fileName => {
    console.log('filenam', fileName)
    RNFetchBlob.fs
      .readFile('file://' + `${directoryPath}/${fileName}`, 'utf-8')
      .then(data => {
        const newData = JSON.parse(data);
        // console.log('JDFFKALDK', newData)
        setJsonPath(newData);
      })
      .catch(error => {
        // console.log('File not found or error reading file:', error);
      });
  };

  const animationEnd = () => {
    setFileName({
      jasonGift: null,
      audio: null
    });
    handleAnimationEnded()
  }

  return (
    <SafeAreaView
      style={{justifyContent: 'center', alignItems: 'center', flex: 1, position: 'absolute'}}
    >
      {(jsonPath)  && (
        <View
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(100),
          }}>
          <LottieGiftView jsonPath={jsonPath} mp3Path={mp3Path} hasFinished={() => animationEnd()} />
        </View>
      )}
    </SafeAreaView>
  );
}

export default Rnfetchblob;