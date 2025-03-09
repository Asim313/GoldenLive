import database from '@react-native-firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { put } from 'redux-saga/effects';
import { setLoginData, socialLoginRequest } from '../../Redux/Actions';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const firebaseBlockUser = async (userID, dispatch) => {
  console.log("block callback")
  const isSignedIn = await GoogleSignin.isSignedIn();
   database()
  .ref(`blocklist`)
  .on('child_added', snapshot => {
    if(parseInt(userID) === parseInt(snapshot.val()?.user_id))
    {
      if(isSignedIn) {
          try {
            GoogleSignin.signOut();
            dispatch({
              type: 'LOGOUT',
            });    
            //this.setState({ user: null }); // Remember to remove the user from your app's state as well
          } catch (error) {
            console.error(error);
          }
      }
    }
  });
}


export const firebaseWriteData = async (node,data) => {
  try {
    await database()
    .ref(node)
    .set(data)
  } catch (error) {
    console.log('Error reading data:', error);
    throw error;
  }
}

export const firebaseUpdateData = async (node,data) => {
  try {
    await database()
    .ref(node)
    .update(data)
    // return snapshot.val();
  } catch (error) {
    console.log('Error reading data:', error);
    throw error;
  }
}

export const firebaseOnChildAddedCallBack = async (node, callback) => {
     database()
    .ref(node)
    .on('child_added', snapshot => {
      console.log('child added', snapshot.val());
      callback(snapshot.val());
    });
}

export const firebaseOnChildChangedCallBack = async (node, callback) => {
    database()
    .ref(node)
    .on('child_changed', snapshot => {
      console.log('child changed', snapshot.val());
      callback(snapshot.val());
    });
}

export const firebaseOnChildRemovedCallBack = (node, callback) => {
  database()
  .ref(node)
  .on('child_removed', snapshot => {
    console.log('child removed', snapshot.val());
    callback(snapshot.val());
  });
}

export const firebaseReadDataOnce = async (node) => {
  try {
    const snapshot = await database()
      .ref(node)
      .once('value');
    
    // console.log('reading data once', snapshot.val());
    return snapshot.val();
  } catch (error) {
    console.log('Error reading data:', error);
    throw error;
  }
}
export const firebaseRemoveNode = async (node) => {
  try {
    await database()
      .ref(node)
      .remove()
  } catch (error) {
    console.log('Error removing node:', error);
    throw error;
  }
}

export const removeListener = async (node, eventType, child) => {
  try {
     await database().ref(node).off(eventType, child).then(() => {
        console.log('listener removed successfully')
      });
    } catch (error) {
      console.log('Listener removing error', error);
      throw error;
    }
     
}


