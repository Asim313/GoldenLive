import { ACTION_TYPES } from '../../../ActionTypes';

const initialState = {
    mp3SongsList: [],
    giftsQueue: [],
    songVolume: 30
};

const hostReducer = (state = initialState, action) => {
    switch (action.type) {

        case ACTION_TYPES.SET_OFFLINE_HOST:
            // console.log('4444444444444444444444444444444444444444', action?.data)
            return {
                ...state,
                offLineHost: action.data,
            };

        case ACTION_TYPES.SET_LIVEHOST:
            return {
                ...state,
                liveHost: action?.data,
            };

        case ACTION_TYPES.TOP_USER_LIST:
            return {
                ...state,
                topUserList: action?.data,
            };
        case ACTION_TYPES.TOP_UP_HOST_ALL:
            return {
                ...state,
                topUpAllHost: action?.data,
            };

        case ACTION_TYPES.LIST_SEND_GIFT_HOST:
            return {
                ...state,
                listSendGiftHost: action?.data,
            };
        case ACTION_TYPES.POPULAR_HOST_LIST_ALL:
            return {
                ...state,
                popularHostList: action?.data,
            };
        case ACTION_TYPES.FRESHER_HOST_LIST_ALL:
            return {
                ...state,
                fresherHostAll: action?.data,
            };
        case ACTION_TYPES.GET_LIST_GIFT_ALL:
            return {
                ...state,
                getListGiftAll: action?.data,
            };
        case ACTION_TYPES.UPDATED_DATA_USER:
            
            return {
                ...state,
                updatedDataUser: action?.data,
            };
            case ACTION_TYPES.BANNERS_DATA:
                
                return {
                    ...state,
                    bannerData: action?.data,
                };
            case ACTION_TYPES.MP3_SONGS_LIST:
                
                return {
                    ...state,
                    mp3SongsList : [...state?.mp3SongsList, ...action?.data],
                };
            case ACTION_TYPES.SELECTED_SONG:
                
                return {
                    ...state,
                    songSelectedByUser : action?.data,
                };
            case ACTION_TYPES.SONG_VOLUME_INDICATION:
                
                return {
                    ...state,
                    songVolume: action?.data,
                };

            case ACTION_TYPES.HOST_BEANS:
                //  console.log('updated host beans', action?.data)
                return {
                    ...state,
                    hostBeans: action?.data,
                };

            case ACTION_TYPES.USER_BEANS_COINS:
                 console.log('user beans and coins', action?.data)
                return {
                    ...state,
                    userBeansAndCoins: action?.data,
                };

            case ACTION_TYPES.VOLUME_INDICATION:
                return {
                    ...state,
                    volumeIndicator: action?.data,
                };

            case ACTION_TYPES.LUCKY_GIFT_COUNTER:
                // console.log("kkkkkkkkkkkkl;;;;;;;;;;;;;;;;;;;;;;;;", action?.data)
                return {
                    ...state,
                    luckyGiftData: action?.data,
                };

            case ACTION_TYPES.LISTEN_LUCKY_GIFT:
                return {
                    ...state,
                    listenLuckyGift: action?.data,
                };

            case ACTION_TYPES.STICKER_JSON:
               
                return {
                    ...state,
                    stickerData: action?.data,
                };

            case ACTION_TYPES.GIFTS_QUEUE:
             //   const parsedData = JSON.parse(action.data);
                // console.log("ereeeeeeeeeeeeeeeeeeeeeeeeeeeeeee111", action?.data, state?.giftsQueue )
                return {
                    ...state,
                    giftsQueue: [...(state?.giftsQueue ?? []), action?.data],
                };
        default:
            return state;
    }

};

export default hostReducer;
