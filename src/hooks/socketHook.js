import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { socketConnetion } from '../Redux/Actions';
import { SOCKET_URL } from '../Services/Constants';

const useSocket = () => {
  const socketRef = useRef(null);
  const dispatch = useDispatch();
  const socket = useSelector(state => state?.homeRed?.socketConnection)

  const connectSocket = (userId) => {
    console.log('user', userId)
    // Connect to the server with specified configuration
    if(!socket) {

        socketRef.current = io(SOCKET_URL, {
            transports: ['polling'],
            query: { user_id: userId },
        });
        console.log('socketkkkk', socketRef)
        dispatch(socketConnetion(socketRef.current))
        return socketRef.current;
    } else {
        return socket
    }

    // Set up event listeners or any other logic here

    
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      dispatch(socketConnetion(null))
    }
  };

  // useEffect(() => {
  //   // Clean up the socket connection when the component is unmounted
  //   return () => {
  //     disconnectSocket();
  //   };
  // }, []);

  return { connectSocket, disconnectSocket };
};

export default useSocket;
