import { ACTION_TYPES } from '../ActionTypes';

export const loginRequest = data => ({
  type: ACTION_TYPES.LOGIN_REQUEST,
  data,
});
export const socialLoginRequest = data => {
  return ({
    type: ACTION_TYPES.SOCIAL_LOGIN_REQUEST,
    data,
  })
};
export const otpRequest = data => ({
  type: ACTION_TYPES.OTP_REQUEST,
  data,
});
export const signupRequest = data => ({
  type: ACTION_TYPES.SIGNUP_REQUEST,
  data,
});

export const setLoginData = data => ({
  type: ACTION_TYPES.SET_LOGIN_DATA,
  data,
});
export const logoutUser = data => ({
  type: ACTION_TYPES.LOGOUT,
});
export const updateUserData = data => ({
  type: ACTION_TYPES.UPDATE_USER_DATA,
  data,
})
export const updatedData = data => ({
  type: ACTION_TYPES.UPDATED_DATA,
  data,
})
export const activeStoreData = data => ({
  type: ACTION_TYPES.ACTIVE_STORE,
  data,
})
export const unseenMessages = data => ({
  type: ACTION_TYPES.UNSEENMESSAGES,
  data,
})
export const unseenMessageReset = data => ({
  type: ACTION_TYPES.UNSEEN_MESSAGES_RESET,
  data,
})
export const updateUserLevel = data => ({
  type: ACTION_TYPES.UPDATE_USER_LEVEL,
  data,
})

export const updateHostLevel = data => ({
  type: ACTION_TYPES.UPDATE_HOST_LEVEL,
  data,
})

export const updateEditProfile = data => ({
  type: ACTION_TYPES.UPDATE_EDITPROFILE,
  data,
})

export const addMessageInArray = data => ({
  type: ACTION_TYPES.ADD_ARRAY,
  data,
}
)
export const removeArrayItem = id => ({
  type: ACTION_TYPES.REMOVE_ARRAY_ITEM,
  id,
});
export const clearArray = () => ({
  type: ACTION_TYPES.CLEAR_ARRAY,

});

export const listAllHostData = data => {
  return ({
    type: ACTION_TYPES.LIST_ALL_HOST_DATA,
    data,
  })
}
export const setOfflineHost = data => {
  return ({
    type: ACTION_TYPES.SET_OFFLINE_HOST,
    data,
  })
}
export const setLiveHost = data => {

  return ({
    type: ACTION_TYPES.SET_LIVEHOST,
    data,
  })
}
export const topUpUserList = data => {
  return ({
    type: ACTION_TYPES.TOP_USER_LIST,
    data,
  })
}
export const topUpHostAll = data => {
  return ({
    type: ACTION_TYPES.TOP_UP_HOST_ALL,
    data,
  })
}
export const ListsendGiftTOHOstAll = data => {
  return ({
    type: ACTION_TYPES.LIST_SEND_GIFT_HOST,
    data,
  })
}
export const popularHostListingAll = data => {
  return ({
    type: ACTION_TYPES.POPULAR_HOST_LIST_ALL,
    data,
  })
}
export const fresherHostListingAll = data => {
  return ({
    type: ACTION_TYPES.FRESHER_HOST_LIST_ALL,
    data,
  })
}
export const getListOfGiftAll = data => {
  return ({
    type: ACTION_TYPES.GET_LIST_GIFT_ALL,
    data,
  })
}

export const updatedDataUser = data => {
  return ({
    type: ACTION_TYPES.UPDATED_DATA_USER,
    data,
  })
}

export const selectCountryToSearch = data => {
   console.log('888888888888888888888888888888888', data)
  return ({
    type: ACTION_TYPES.SELECTED_COUNTRY,
    data,
  })
}

export const bannersData = data => {
  return ({
    type: ACTION_TYPES.BANNERS_DATA,
    data,
  })
}

export const addMp3Songs = data => {
  return ({
    type: ACTION_TYPES.MP3_SONGS_LIST,
    data,
  })
}

export const selectedSongByUser = data => {
  return ({
    type: ACTION_TYPES.SELECTED_SONG,
    data,
  })
}

export const songVolumeIndication = data => {
  return ({
    type: ACTION_TYPES.SONG_VOLUME_INDICATION,
    data,
  })
}

export const updateHostBeans = data => {
  return ({
    type: ACTION_TYPES.HOST_BEANS,
    data,
  })
}

export const userBeansAndCoins = data => {
  return ({
    type: ACTION_TYPES.USER_BEANS_COINS,
    data,
  })
}

export const updateVolumeIndication = data => {
  return ({
    type: ACTION_TYPES.VOLUME_INDICATION,
    data,
  })
}

export const luckyGiftCounter = data => {
  return ({
    type: ACTION_TYPES.LUCKY_GIFT_COUNTER,
    data,
  })
}

export const listenLuckyGiftSocket = data => {
  return ({
    type: ACTION_TYPES.LISTEN_LUCKY_GIFT,
    data,
  })
}

export const addSticker = data => {
  return ({
    type: ACTION_TYPES.STICKER_JSON,
    data,
  })
}

export const addGiftsToQueue = data => {
  return ({
    type: ACTION_TYPES.GIFTS_QUEUE,
    data,
  })
}

export const socketConnetion = data => {
  return ({
    type: ACTION_TYPES.SET_SOCKET_CONNECTION,
    data,
  })
}