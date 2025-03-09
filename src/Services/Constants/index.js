// export const BASE_URL = 'http://127.0.0.1:8000';
// export const SITE_URL = 'http://127.0.0.1:8000';

import RNFetchBlob from "rn-fetch-blob";

export const STRIPE_TEST_PUBLISH_KEY = 'pk_test_eUUKnTPUvpzKuhhcx0TogPWI006L8Lxd7s'
export const STRIPE_LIVE_PUBLISH_KEY = 'pk_live_yoP845WfpJut3a9vJNcLZUsY00lWh8aS55'
// export const BASE_URL = 'https://demo.golden-live.com/api';
export const BASE_URL = 'https://golden-live.com/api'

export const BASE_URL_NODE = 'https://sockets.golden-live.com'

export const SOCKET_URL = 'https://sockets.golden-live.com/'

export const BASE_URL_API_NODE = 'https://sockets.golden-live.com'

// export const BASE_URL_NODE = 'https://test.golden-live.com'

// export const SOCKET_URL = 'https://sockets.golden-live.com/'

// export const BASE_URL_API_NODE = 'https://mobile.golden-live.com'

// export const GIFT_SOCKET = 'https://www.limes.golden-live.com/'

// http://test.golden-live.com
export const GIFT_SOCKET = ''

export const CAHCE_DIRECTORY_PATH = `${RNFetchBlob.fs.dirs.CacheDir}`;

// available in google-services.json file which we download from firebase. in this file it is placed in client object then oauth_client object wiht client_type: 3
export const GOOGLE_SIGNIN_WEBCLIENTID = '616982564207-tc3b0bevcrtfpl2ufc4bpl3tpna5cpbd.apps.googleusercontent.com'
export const SITE_URL = 'https://demo.golden-live.com';
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.bano.live&pcampaignid=web_share';

export const appKey = 's6b1srp4w4ijupap7zt5'


export const joyPlayGames = (token, gameId, size) => {
    console.log("lllllll", size)
    if (size) {
        return `https://test.joysdk.com/?mini=${size}&appKey=${appKey}&token=${token}&gameId=${gameId}`
    } else {
        return `https://test.joysdk.com/?appKey=${appKey}&token=${token}&gameId=${gameId}`
    }
}

// export const BASE_URL = 'https://golden-live.cybinix.com/api';
// export const SITE_URL = 'https://golden-live.cybinix.com';


export const FIREBASE_REF = {
    coHostNode: `cohostTest/`,
    channelNode: 'channels/',
    userListNode: 'userlist/',
    commentsVideoStream: 'comments/',
    PKsearch: 'PK/Search/',
}

 export const COHOST_DATA = [
    { id: 1, value: null, isLocked: false, isMicOn: 'true', giftsReceived: 0, position: {x:120 , y:10 } },
    { id: 2, value: null, isLocked: false, isMicOn: 'true', giftsReceived: 0, position: {x:210 , y:10 } },
    { id: 3, value: null, isLocked: false, isMicOn: 'true', giftsReceived: 0, position: {x:35 , y:100 } },
    { id: 4, value: null, isLocked: false, isMicOn: 'true', giftsReceived: 0, position: {x:123 , y:100 } },
    { id: 5, value: null, isLocked: false, isMicOn: 'true', giftsReceived: 0, position: {x:210 , y:100 } },
    { id: 6, value: null, isLocked: false, isMicOn: 'true', giftsReceived: 0, position: {x:300 , y:100 } },
    { id: 7, value: null, isLocked: false, isMicOn: 'true', giftsReceived: 0, position: {x:35 , y:190 } },
    { id: 8, value: null, isLocked: false, isMicOn: 'true', giftsReceived: 0, position: {x:123 , y:190 } },
    { id: 9, value: null, isLocked: false, isMicOn: 'true', giftsReceived: 0, position: {x:210 , y:190 } },
    { id: 10, value: null, isLocked: false, isMicOn: 'true', giftsReceived: 0, position: {x:300 , y:190 } },
  ]

  export const commnetsColor = {
    userColor: '#03FFF0',
    hostColor: '#FF51E3',
    commentName: '#F9F018',
    commentTxt: '#00FFA3',
  }

