import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {WebView} from 'react-native-webview';

import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import { joyPlayGames } from '../../../Services/Constants';
import { ApiCallToken } from '../../../Services/Apis';
const ChinaGames = memo(({gameId, size, fullScreen}) => {
  const userData = useSelector(state => state.auth.userData);
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);

  const [gameUrl, setGameUrl] = useState();
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    generateGameToken();
  }, []);

  const generateGameToken = async () => {
    const paramsBody = {
      id: userUpdatedData?.id,
      email: userUpdatedData?.email,
      mini: fullScreen ? 0 : 1,
      gameId: gameId
    };
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'china/game/Signup',
        paramsBody: paramsBody,
        verb: 'POST',
      });
      // route: 'chinees/game/url',
      console.log('ressss game singin china ', res, res?.url);
      if (res?.url) {
       // setToken(res?.data?.token);
        setGameUrl(res?.url);
        // setGameUrl(joyPlayGames(res?.data?.token, gameId, size));
      }
    } catch (error) {
      console.log('Testing screen, generateGameToken func', error);
    }
  };

  return (
    <View
      style={{
        width: widthPercentageToDP(100),
        height: fullScreen ? heightPercentageToDP(95) : widthPercentageToDP(95),
        justifyContent: 'center',
        alignItems: 'center',
      }}>

      {isLoading && 
          <View
            style={{
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 0,
            }}>
              <ActivityIndicator />
          </View>
      }

      {gameUrl && (
        <WebView
          source={{
            uri: gameUrl,
          }}
          style={{
            width: widthPercentageToDP(100),
            height: fullScreen ? heightPercentageToDP(100) : widthPercentageToDP(30),
            backgroundColor: 'transparent',
          }}
          onLoadEnd={() => setIsLoading(false)}
        />
      )}
    </View>
  );
});

export default ChinaGames;

const styles = StyleSheet.create({
  buttonText: {
    color: 'pink',
  },
  // Your styles here
});
