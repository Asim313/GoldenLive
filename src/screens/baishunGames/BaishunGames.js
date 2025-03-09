import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';
import globalStyles from '../../utils/styles/global-styles';
import CatLoadingComponent from '../../components/loadings/CatLoadingComponent';

const BaishunGames = ({gameData}) => {
  const webViewRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true)
  // const appId = 7789599357
  // const user_id = "1"
  // const code = ''

  console.log('game data ', gameData?.url, gameData)

  //Receive H5 messages
  const handlemessage = (event) => {
    console.log('event,', event.nativeEvent)
    const message = JSON.parse(event.nativeEvent.data);
    const jsFunName = message["jsCallback"];
    console.log(jsFunName)
    if (jsFunName.includes('getConfig')) {
      console.log("BSGAME 游戏调用getConfig")
      const configData = {
        appChannel: "mesh",
        appId: 88888888,
        userId: "396060626",
        // sstoken: "a13685ae-6c80-48d9-af31-cb8eb662a4bd",
        code: "Q9p7aV7Hd5aviQBDzsv47K3lRKmWVD5deP87YNrnEDUPDAw49sZMmmKGH6zp",
        roomId: "0",
        gameMode: "2",
        language: "2",
        gameConfig: {
          sceneMode: 0,
          currencyIcon: "https://bobilive-com-test.jieyou.shop/h5web/GameH5/showDemo/game_bean.png"
        },
        gsp: 101,
        url: "https://game-center-test.jieyou.shop/game-packages/common-web/teenpatti/1.1.0/web-mobile/index.html"
      }
      const configDataStr = JSON.stringify(gameData);
      this.webViewRef.injectJavaScript(`window.${jsFunName}(${configDataStr})`);
    }
    else if (jsFunName.includes('destroy')) {
      console.log("BSGAME 游戏调用destroy");
      //关闭游戏 TODO 客户端
    }
    else if (jsFunName.includes('gameRecharge')) {
      console.log("BSGAME 游戏调用gameRecharge")
      //拉起支付商城 TODO 客户端
    }
    else if (jsFunName.includes('gameLoaded')) {
      console.log("BSGAME 游戏调用gameLoaded")
      //游戏加载完毕 TODO 客户端
      setIsLoading(false)
    }
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Text style={{color: 'black', fontSize: 11}}>{'game url: ' + JSON.stringify(gameData)}</Text> */}
      {isLoading && 
        <View style={globalStyles.containerWithCenterAlign}>
          <CatLoadingComponent txt={'Loading Game...'} />
        </View>
      }
      <WebView
        style={{backgroundColor: 'transparent'}}
        ref={(r) => (this.webViewRef = r)}
        source={{ uri: gameData?.url }}
        onMessage={handlemessage}
        javaScriptEnabled={true}
        onLoad={() => console.log("onload")}
        onLoadEnd={() => console.log("ib kiad edbd")}
      />
    </SafeAreaView>);
};

export default BaishunGames;