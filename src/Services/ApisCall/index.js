import { ApiCallToken, ApiCallTokenApiNode } from "../Apis";

export const generateAgoraToken = async (data) => {
        try {
            const res = await ApiCallToken({
              params: data?.token,
              paramsBody: data?.paramsBody,
              route: 'check-block-and-status',
              verb: 'POST',
            });         
            return res

        } catch (e) {
          console.log('generateAgoraToken ', e.toString());
        }
}

export const makeHostLiveStatusInactive = async (data) => {
        try {
            const res = await ApiCallToken({
              params: data?.token,
              route: 'status',
              verb: 'POST',
            });
            console.log('successfully disabled ', res)         
              return res
        } catch (e) {
          console.log('status api ', e.toString());
        }
}


export const checkUserFollowing = async (data) => {
        try {
          const paramsBody = {
            host_id: data?.host_id
          };
         console.log('params', paramsBody)
            const res = await ApiCallToken({
              params: data?.token,
              paramsBody: paramsBody,
              route: 'user/check-following',
              verb: 'POST',
            });
         
              //  console.log("ressssssss checkUserFollowing", res)
              return res
        } catch (e) {
          console.log('checkUserFollowing checkUserFollowing ', e.toString());
        }
      }

   export const followHost = async (data) => {
        const paramsBody = {
          id: data?.id,
        };
        try {
          const res = await ApiCallToken({
            params: data.token,
            paramsBody: paramsBody,
            route: 'user/following-host',
            verb: 'POST',
          });
          console.log('Following response =>>', res, paramsBody);
       
          // alert('' + res?.[0]?.message)
          return res
        } catch (error) {
          console.log('Error in follow host, apicalls index scren', error);
        }
      };
    

      export const checkFcmTokenValidation = async data => {
        try {
           console.log('params', data)
          const paramsBody = {
            device_id: data.deviceID,
          };
          const res = await ApiCallToken({
            params: data?.token,
            route: 'check-token-validation',
            verb: 'POST',
            paramsBody: paramsBody,
          });
      
          console.log('check-token-validation', res);
          return res;
        } catch (e) {
          console.log('generateAgoraToken ', e.toString());
        }
      };

export const heartBeatInterval = async (data) => {
  try {
    // console.log(data)
    const res = await ApiCallToken({
      params: data?.token,
      route: 'heart-beat',
      verb: 'GET',
    });
      console.log("HeartBeatInterval", res)
     return res
  } catch (error) {
    console.log('ERROR HeartBeatInterval ====>>>', error);
  }
      
}
export const getGiftsList = async (data) => {
  try {
    const res = await ApiCallToken({
      params: data?.token,
      route: 'get-gift',
      verb: 'GET',
    });
     return res
  } catch (error) {
    console.log('ERROR getGiftsList ====>>>', error);
  }
      
}
export const checkAppVersion = async (data, version) => {
  try {
    const res = await ApiCallToken({
      params: data?.token,
      route: 'app/version',
      verb: 'GET',
    });

    console.log('API response:', res);

    if (res?.data?.latest_version) {
      return {upToDate: version >= res?.data?.latest_version, data: res};
    } else {
      return {serverError: true, message: 'Internet/Server connection Error'};
    }
  } catch (error) {
    console.error('ERROR checkAppVersion ====>>>', error);
    throw error;
  }
};

export const roomAdminsList = async (data) => {
  try {
    const res = await ApiCallToken({
      params: data?.token,
      route: 'room-admin-list',
      verb: 'GET',
    });

    console.log('room-admin-list:', res);

   
      return res;
  
  } catch (error) {
    console.error('ERROR room-admin-list ====>>>', error);
    throw error;
  }
};

export const makeUserAdmin = async (data) => {
  const paramsBody = {
    channel_name: data?.channelName,
    admin_id: data?.adminId,
  };
  try {
    const res = await ApiCallToken({
      params: data?.token,
      paramsBody: paramsBody,
      route: 'room-admin-status-active',
      verb: 'POST',
    });
     console.log("room-admin-status-active api res: ", res)
    return res;
  } catch (error) {
    console.log('room-admin-status-active api error  ====>>>', error);
  }
};

export const removeUserAdmin = async (data) => {
  const paramsBody = {
    channel_name: data?.channelName,
    admin_id: data?.adminId,
  };
  try {
    const res = await ApiCallToken({
      params: data?.token,
      paramsBody: paramsBody,
      route: 'room-admin-status-disable',
      verb: 'POST',
    });
     console.log("room-admin-status-active api res: ", res)
    return res;
  } catch (error) {
    console.log('room-admin-status-active api error  ====>>>', error);
  }
};

export const checkUserIsAdminOrNot = async (data) => {
  const paramsBody = {
    channel_name: data?.channelName,
  };
  try {
    const res = await ApiCallToken({
      params: data?.token,
      paramsBody: paramsBody,
      route: 'check-room-admin',
      verb: 'POST',
    });
     console.log("check-room-admin api res: ", res)
    return res;
  } catch (error) {
    console.log('check-room-admin api error  ====>>>', error);
  }
};

export const channelSettings = async (data) => {
  const paramsBody = {
    audio_title: data?.title,
    password: data?.password ?? null,
  };
  try {
    const res = await ApiCallToken({
      params: data?.token,
      paramsBody: paramsBody,
      route: 'audio-title',
      verb: 'POST',
    });
    //  console.log("audio-title api res: ", res)
    return res;
  } catch (error) {
    console.log('audio-title api error  ====>>>', error);
  }
};


export const verifyRoomPassword = async (data) => {
  const paramsBody = {
    host_id: data?.hostId,
    password: data?.password,
  };
  try {
    const res = await ApiCallToken({
      params: data?.token,
      paramsBody: paramsBody,
      route: 'private-room-verify-password',
      verb: 'POST',
    });
     console.log("private-room-verify-password api res: ", res)
    return res;
  } catch (error) {
    console.log('private-room-verify-password api error  ====>>>', error);
  }
};


export const unlockRoom = async (data) => {
  try {
    const res = await ApiCallToken({
      params: data?.token,
      route: 'private-room-open',
      verb: 'POST',
    });
     console.log("private-room-open api res: ", res)
    return res;
  } catch (error) {
    console.log('private-room-open api error  ====>>>', error);
  }
};


export const getHostCoins = async (data) => {
  try {
    const res = await ApiCallTokenApiNode({
      paramsBody: data?.paramsBody,
      params: data?.token,
      route: 'host/beans/coins',
      verb: 'POST',
    });
    console.log('host/beans/coins:', res);
      return res;
  
  } catch (error) {
    console.error('ERROR host/beans/coins ====>>>', error);
    throw error;
  }
};

export const deleteChatNotification = async (data) => {
  try {
    const res = await ApiCallToken({
      paramsBody: data?.paramsBody,
      params: data?.token,
      route: 'chat/notifications-delete',
      verb: 'POST',
    });
    console.log('chat/notifications-delete : ', res);
      return res;
  
  } catch (error) {
    console.error('chat/notifications-delete ====>>>', error);
    throw error;
  }
};