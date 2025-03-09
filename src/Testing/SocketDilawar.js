import React, {useEffect, useReducer, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import io from 'socket.io-client';
import database from '@react-native-firebase/database';
import { firebaseReadDataOnce } from '../Services/Firebase';
import { useDispatch, useSelector } from 'react-redux';
import { getHostCoins } from '../Services/ApisCall';
import { updateHostBeans } from '../Redux/Actions';
import { refresh } from '@react-native-community/netinfo';
import useSocket from '../hooks/socketHook';




const SocketDilawar = () => {
  //  const newSocket = useSocket(1)
  const socket = useSelector(state => state?.homeRed?.socketConnection)
  const TstSocket = useRef(socket)
  // const [newSocket, setSocket] = useState(null);
  const [number, setNumber] = useState(0);
  const [showMesage, setShowMessage] = useState();
  const [listnershow, setListnershow] = useState();
  const [socketId, setScoketId] = useState();
  console.log('value show hererrrr', listnershow);
  const { connectSocket, disconnectSocket } = useSocket();
  

  useEffect(() => {
    // Connect to the server with specified configuration
    // TstSocket.current.emit('channelJoin', {channel: 100013149})

    socket.on('LucyCount', data => {
      console.log('LucyCount >>>>>>>>>!!!!!!!!!!!!!!!!!<<<<<<<<<<<<<<', data);
    });

    TstSocket.current.on('ChannelJoinMessage', (data) => {
      console.log('Channel Join Messages >>> :', data);
    });
    
    // Set up event listeners
    TstSocket.current.on('connect', () => {
      console.log('Connected to server');
    });

    TstSocket.current.on('connected', count => {
      console.log('Connected :', count);
      setShowMessage(count);
    });

    TstSocket.current.on('my_socket_id', socketId => {
      console.log(`Socket ID 11: ${socketId}`);
      setScoketId(socketId);
    });

    TstSocket.current.on('increase_number', data => {
      console.log(`increase_number Ijkh D: `, typeof data);
      setListnershow(data);
    });

    TstSocket.current.on('currunt_number', updatedNumber => {
      console.log("updatenume", updatedNumber)
      setShowMessage(updatedNumber?.count)
       setNumber(updatedNumber?.number);
    });

    // Save the socket to state0
  

    // Clean up the socket connection when the component unmounts
    return () => {
      TstSocket.current.off('currunt_number')
      TstSocket.current.off('LucyCount')
      TstSocket.current.off('increase_number')
      TstSocket.current.off('connected')
      TstSocket.current.off('my_socket_id')
      TstSocket.current.off('connect')
      TstSocket.current.off('Channel Join Message')
      //  TstSocket.current.disconnect();
    };
  }, []);

  const count = useRef(1)
  const increaseNumber = async () => {
    console.log('innnnnnnnnnnn ');
    const data1 = {
      count_gift: count.current,
      channel: 100013149
    }
    await socket.emit('LuckyCounter', data1)
    // TstSocket.current.emit('channelJoin', {channel: 100013149});
    // TstSocket.current.emit('increase_number');
    console.log('doneeeeeeeeeeeeer ', count.current);
  count.current = count.current + 1
  };

  const dispatch = useDispatch()
  const userData = useSelector(state => state.auth.userData);
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);
  const decreaseNumber = async () => {
    //dispatch(updateHostBeans(userUpdatedData?.coins))
    paramsBody = {
      "host_id": "100013149"
    }
     let res = await getHostCoins({paramsBody, token: userData?.token })
    //  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', res)
    // TstSocket.current.emit('decrease_number');
    // console.log('decrease numvber ');
    // disconnectSocket()
  };

  

  return (
    <View style={{}}>
      <Text style={{color: 'black'}}>Current Number: {showMesage}</Text>
      <TouchableOpacity
        style={{backgroundColor: 'red', width: 100, padding: 20}}
        onPress={increaseNumber}>
        <Text style={{}}>Increase</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{backgroundColor: 'green', top: 20, width: 100, padding: 20}}
        onPress={decreaseNumber}>
        <Text>Decrease</Text>
      </TouchableOpacity>
      <Text style={{top: 30, fontSize: 20, color: 'black'}}> show value here : {number}</Text>
      <Text style={{top: 30, fontSize: 20, color: 'black'}}>{socketId}</Text>
    </View>
  );
};

export default SocketDilawar;
