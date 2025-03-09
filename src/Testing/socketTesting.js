import {Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import {GIFT_SOCKET} from '../Services/Constants';
import { createSocket } from '../Services/sockets';
import { ApiCallTokenNode } from '../Services/Apis';


// const socket = io.connect('https://test.golden-live.com/', {
//   withCredentials: true,
//   transports: ['polling'], // Specify the transport as polling
//   reconnectionAttempts: 10, // Set the connection retry limit to 10
//   // reconnectionDelayMax: 5000,
// });

const SocketTesting = () => {

  // useEffect(() => {
  //   GetLiveHosts()
  //   console.log('hekkkkkkkkkkk');
  // }, []);
  const [Welcome, setWelcome] = useState('Not listening to sever .');
  const [beans, setBeans] = useState(0);

  const [numGifts, setNumGifts] = useState(1);
  const [giftId, setGiftId] = useState(72);
  const [hostId, setHostId] = useState(100013144);
  const [authId, setAuthId] = useState(100013149);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [luckeyGift, setLuckyGift] = useState(null);

  // const socket = createSocket(100013149)

  //  const channelName = '100013149'
  // useEffect(() => {
  //   console.log('useeffect ');

  //   socket.on('Lucky Gift', data => {
  //     console.log('lucky gift', data);
  //     // setMessage(data)
  //   });
  //   socket.on(channelName, data => {
  //     console.log('ahcnelllllllllllllllllllll', data);
  //     // setMessage(data)
  //   });

  //   socket.on('rewardLucky', data => {
  //     console.log('lucky gift!!!!!!!!!!!!!', data);
  //     // setMessage(data)
  //   });

  //   socket.on('connected', (data) => {
  //     console.log('connected node',data);
  //     setMessage(data)
  //   });

  //   // socket.on('Lucky Gift',(response)=>{
  //   //   console.log('Lucky gift', JSON.stringify(response));
  //   //   setLuckyGift(JSON.stringify(response))
  //   // })

  //   // socket.on('error', (err) => {
  //   //   console.log('Error to the server',err);

  //   //   setError(err)
  //   // });

  //   return () => {
  //     // socket.off('connected');
  //     // socket.off('error');
  //     socket.off('Lucky Gift');
  //     socket.off(channelName);
  //     socket.emit('removeJoin', {channelName : channelName});
  //   };
  // }, [socket]);

  const handleSendButtonClick = () => {
    const data = {
      num_gift: numGifts,
      gift_id: giftId,
      host_id: hostId,
      auth_id: authId,
      count_gift: 1,
      channelName: channelName
    };

     console.log("here", data)
    socket.emit('channelJoin', data);
     console.log("here2222222222", data)
  };

  const GetLiveHosts = async () => {
      const data = {
        numgift: numGifts,
        gift_id: giftId,
        host_id: hostId,
        auth_id: authId,
        count_gift: 1,
        channelName: channelName
      };

      try {
        const res = await ApiCallTokenNode({
          paramsBody: data,
          route: `lucky/store`,
          verb: 'POST',
        });
        console.log('node api lucky gift ', res);
      } catch (error) {
        console.log('ERROR lucky/store api', error);
      }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => GetLiveHosts()}
        style={{padding: 7, backgroundColor: 'blue'}}>
        <Text>Click me</Text>
      </TouchableOpacity>
      <Text>Connected: {message}</Text>
      <Text>Lucky GiftResponse: {JSON.stringify(luckeyGift)}</Text>
      <Text>Error: {error}</Text>
    </View>
  );
};

export default SocketTesting;
