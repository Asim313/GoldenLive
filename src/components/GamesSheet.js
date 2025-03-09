import React, { memo, useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Image, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
// import TeenPatti from "../screens/Games/TeenPatti/TeenPatti/TeenPatti";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import RbSheetComponent from "../screens/reuseable_Component/RbSheetComponent";
import FruitLoop from "../screens/FruitLoopGame/FruitLoop/FruitLoop";
import { FlatList } from "react-native";
import ChinaGames from "../screens/Games/ChinaGames/ChinaGames";
import { useSelector } from "react-redux";
import { ApiCallToken, ApiCallTokenApiNode } from "../Services/Apis";
import BaishunGames from "../screens/baishunGames/BaishunGames";

const GameSheet = memo(({}) => {

  console.log('ingames')
const userData = useSelector(state => state.auth.userData);
  const gameListref = useRef();
  const [gameId, setGameId] = useState(null)
  const [size, setSize] = useState(1)
  const dummyGameData = {
    appChannel: 'mesh',
    appId: 88888888,
    userId: '396060626',
    code: 'Q9p7aV7Hd5aviQBDzsv47K3lRKmWVD5deP87YNrnEDUPDAw49sZMmmKGH6zp',
    gameConfig: {
      currencyIcon:
        'https://bobilive-com-test.jieyou.shop/h5web/GameH5/showDemo/game_bean.png',
      sceneMode: 0,
    },
    gameMode: '2',
    roomId: "0",
    gsp: 101,
    language: '2',
    url: 'https://game-center-test.jieyou.shop/game-packages/common-web/teenpatti/1.1.3/web-mobile/index.html',
  };
  const [gamesList, setGamesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [gameData, setGameData] = useState(null)
  const getGames = async () => {
    setIsLoading(true);
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: `game/chines/type`,
        verb: 'GET',
      });
      //  // setBlocked(blocked);
      setGamesList(res?.data ?? []);
      console.log('res game cine typoe ::: ', res);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };


  const userCodeApi = async () => {
   const res = await ApiCallTokenApiNode({
    route: `get_code?user_id=${userData?.user?.id}`,
    verb: 'GET',
   })

   console.log("resssssssssss userCodeApi", res)
  }

  const getGameConfigData = async (gameName) => {
    setIsLoading(true);
    try {
      await userCodeApi()
      const paramsBody = {
        game_name: gameName,
        user_id: userData?.user?.id,
        game_mode: '2'
      }

      console.log('params body', paramsBody)
      const res = await ApiCallToken({
        params: userData.token,
        paramsBody: paramsBody,
        route: 'china/game/Signup',
        verb: 'POST',
      });
      //  // setBlocked(blocked);
     // setGamesList(res?.data ?? []);
     console.log('res', JSON.stringify(res));
     if(res?.url) {
         console.log('res', res);
        setGameData(res)
         gameListref.current.open()
       }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGames();
  }, []);


    return(
        <View style={{flex: 1}}>
        {gamesList?.[0] && <Text style={styles.headingtxt1}>Play games</Text>}
        {isLoading ? 
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <ActivityIndicator />
        </View>  
        :
      
       <View style={{paddingBottom: heightPercentageToDP(5)}}> 
      {gamesList?.[0] ? <FlatList
            data={gamesList}
            numColumns={4}
            contentContainerStyle={{}}
            horizontal={false}
            keyExtractor={(item) => item?.id}
            renderItem={({item, index}) => {
              //  console.log("itemmmmmmm", item)
              return(
                <TouchableOpacity
                onPress={() => {
                  setGameId(item?.gameId)
                    setSize(item?.size)
                    gameListref.current.open()
                  console.log('item', item)
                  // setGameId(item?.gameId)
                  // setSize(item?.size)
                  // gameListref.current.open()
                }}
                 style={{width: widthPercentageToDP(25), justifyContent: 'center', alignItems: 'center', marginVertical: 5}}>
                 <Image
                          source={{uri: item?.image}}
                          style={{height: 50, width: 50, marginVertical: 2, borderRadius: 12}}
                        />
                  <Text style={{fontSize: 7, fontWeight: 'bold', color: 'black'}}>{item?.name}</Text>
                  </TouchableOpacity>
              )
            }}
          />
        :
        <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
             <Text style={{color: 'black'}}>No data...</Text>
          </View>
        }
       </View>
}
       <RbSheetComponent
        view={
          <ChinaGames gameId={gameId} size={size} />
        }
        refUse={gameListref}
        close={false}
        backgroundColor={'transparent'}
        height={widthPercentageToDP(100)}
      />
       {/* <RbSheetComponent
        view={
          <BaishunGames gameData={gameData} />
        }
        refUse={gameListref}
        close={false}
        backgroundColor={'transparent'}
        height={heightPercentageToDP(65)}
      /> */}
      </View>
    )
})

export default GameSheet

const styles = StyleSheet.create({
  headingtxt1: {
    color: 'black',
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '500',
    paddingVertical: 3,
    paddingHorizontal: 15,
    borderRadius: 3,
  },
})




// import React, { memo, useEffect, useRef, useState } from "react";
// import { ActivityIndicator, StyleSheet } from "react-native";
// import { Image, Text, TouchableOpacity } from "react-native";
// import { View } from "react-native";
// import TeenPatti from "../screens/Games/TeenPatti/TeenPatti/TeenPatti";
// import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
// import RbSheetComponent from "../screens/reuseable_Component/RbSheetComponent";
// import FruitLoop from "../screens/FruitLoopGame/FruitLoop/FruitLoop";
// import { FlatList } from "react-native";
// import ChinaGames from "../screens/Games/ChinaGames/ChinaGames";
// import { useSelector } from "react-redux";
// import { ApiCallToken, ApiCallTokenApiNode } from "../Services/Apis";
// import BaishunGames from "../screens/baishunGames/BaishunGames";

// const GameSheet = memo(({}) => {

// const userData = useSelector(state => state.auth.userData);
//   const gameListref = useRef();
//   const [gameId, setGameId] = useState(null)
//   const [size, setSize] = useState(1)

//   const [gamesList, setGamesList] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [gameData, setGameData] = useState(null)
//   const getGames = async () => {
//     setIsLoading(true);
//     try {
//       const res = await ApiCallToken({
//         params: userData.token,
//         route: `china/list/game`,
//         verb: 'GET',
//       });
//       //  // setBlocked(blocked);
//       setGamesList(res?.data ?? []);
//       // console.log('res', res);
//       setIsLoading(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };


//   const userCodeApi = async () => {
//    const res = await ApiCallTokenApiNode({
//     route: `get_code?user_id=${userData?.user?.id}`,
//     verb: 'GET',
//    })

//    console.log("resssssssssss userCodeApi", res)
//   }

//   const getGameConfigData = async (gameName) => {
//     setIsLoading(true);
//     try {
//       await userCodeApi()
//       const paramsBody = {
//         game_name: gameName,
//         user_id: userData?.user?.id,
//         game_mode: '2'
//       }

//       console.log('params body', paramsBody)
//       const res = await ApiCallToken({
//         params: userData.token,
//         paramsBody: paramsBody,
//         route: `game/chines/list`,
//         verb: 'POST',
//       });
//       //  // setBlocked(blocked);
//      // setGamesList(res?.data ?? []);
//      console.log('res', JSON.stringify(res));
//      if(res?.url) {
//          console.log('res', res);
//         setGameData(res)
//          gameListref.current.open()
//        }
//       setIsLoading(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getGames();
//   }, []);


//     return(
//         <View style={{flex: 1}}>
//         {gamesList?.[0] && <Text style={styles.headingtxt1}>Play games</Text>}
//         {isLoading ? 
//         <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
//             <ActivityIndicator />
//         </View>  
//         :
      
//        <View style={{paddingBottom: heightPercentageToDP(5)}}> 
//       {gamesList?.[0] ? <FlatList
//             data={gamesList}
//             numColumns={4}
//             contentContainerStyle={{}}
//             horizontal={false}
//             keyExtractor={(item) => item?.id}
//             renderItem={({item, index}) => {
//               //  console.log("itemmmmmmm", item)
//               return(
//                 <TouchableOpacity
//                 onPress={() => {
//                   getGameConfigData(item?.gameID)
//                   console.log('item', item)
//                   // setGameId(item?.gameId)
//                   // setSize(item?.size)
//                   // gameListref.current.open()
//                 }}
//                  style={{width: widthPercentageToDP(25), justifyContent: 'center', alignItems: 'center', marginVertical: 5}}>
//                  <Image
//                           source={{uri: item?.gameIcon}}
//                           style={{height: 50, width: 50, marginVertical: 2, borderRadius: 12}}
//                         />
//                   <Text style={{fontSize: 7, fontWeight: 'bold', color: 'black'}}>{item?.name}</Text>
//                   </TouchableOpacity>
//               )
//             }}
//           />
//         :
//         <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
//              <Text style={{color: 'black'}}>No data...</Text>
//           </View>
//         }
//        </View>
// }
//        {/* <RbSheetComponent
//         view={
//           <ChinaGames gameId={gameId} size={size} />
//         }
//         refUse={gameListref}
//         close={false}
//         backgroundColor={'transparent'}
//         height={widthPercentageToDP(100)}
//       /> */}
//        <RbSheetComponent
//         view={
//           <BaishunGames gameData={gameData} />
//         }
//         refUse={gameListref}
//         close={false}
//         backgroundColor={'transparent'}
//         height={heightPercentageToDP(65)}
//       />
//       </View>
//     )
// })

// export default GameSheet

// const styles = StyleSheet.create({
//   headingtxt1: {
//     color: 'black',
//     marginLeft: 10,
//     fontSize: 18,
//     fontWeight: '500',
//     paddingVertical: 3,
//     paddingHorizontal: 15,
//     borderRadius: 3,
//   },
// })

