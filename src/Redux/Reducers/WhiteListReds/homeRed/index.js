import {ACTION_TYPES} from '../../../ActionTypes';

const initialState = {
};

const homeReducer = (state = initialState, action) => {
  //  console.log("Data in Redux ===>>> ", action.data, state)
  switch (action.type) {

    case ACTION_TYPES.UPDATE_USER_DATA:
      return {
        ...state,
        // userToken: action.data.token,
        userUpdatedData: action.data,
      };
    case ACTION_TYPES.ACTIVE_STORE:
      // console.log("in acitve store data", action?.data)
      return {
        ...state,
        // userToken: action.data.token,
        activeStoreData: action.data,
      };
      
    case ACTION_TYPES.UNSEENMESSAGES:
      console.log("UNSEENMESSAGES ", action?.data, state?.unseenMessages)
      return {
        ...state,
        // userToken: action.data.token,
        // unseenMessages: action.data,
        unseenMessages: state.unseenMessages ? [...state.unseenMessages, action.data] : [action?.data]
      };

    case ACTION_TYPES.UNSEEN_MESSAGES_RESET:
      console.log("UNSEENMESSAGES Reset", action?.data, state?.unseenMessages)
      return {
        ...state,
        unseenMessages: null
      };
      
      //dilawat code
      case ACTION_TYPES.ADD_ARRAY:
         console.log('aaaaaaaaaaa', state?.unseenMessages, action?.data);
        let ch = false;
  
        //state.unseenMessages.map;
  
        const updatedUnseenMessages = state?.unseenMessages?.map(item => {
          if (item?.id === action?.data?.id) {
            // console.log('data', item?.id);
            ch = true;
            return {...item, message: 'heloo'};
          }
          return item;
        });
        // console.log('bbbbbbbbbbbbbb', updatedUnseenMessages);
        return {
          ...state,
          unseenMessages: updatedUnseenMessages
            ? ch
              ? updatedUnseenMessages
              : [...updatedUnseenMessages, action?.data]
            : [action?.data],
        };
  
      case ACTION_TYPES.REMOVE_ARRAY_ITEM:
        const idToRemove = action.id;
       // console.log('CHECK DATA COME OR NOT INTO THE REMOVE ARRAY ITEM ',idToRemove, state?.unseenMessages)
        let messages = state?.unseenMessages
        const updatedArray = messages?.filter((item) => parseInt(item?.id) !== parseInt(idToRemove))

        return {
          ...state,
          unseenMessages:  updatedArray,
        };
      case ACTION_TYPES.CLEAR_ARRAY:
        return {
          ...state,
          unseenMessages:  [],
        };

      case ACTION_TYPES.UPDATE_USER_LEVEL:
        return {
          ...state,
          // userToken: action.data.token,
          userUpdatedLevel: action.data,
        };

      case ACTION_TYPES.SELECTED_COUNTRY:
        return {
          ...state,
          selectedCountry: action.data,
        };

        case ACTION_TYPES.UPDATE_HOST_LEVEL:

        return {
          ...state,
          // userToken: action.data.token,
          hostUpdatedLevel: action.data,
        };

        case ACTION_TYPES.SET_SOCKET_CONNECTION:
          console.log('connecting socket', action?.data)
        return {
          ...state,
          // userToken: action.data.token,
          socketConnection: action.data,
        };
        case ACTION_TYPES.UPDATE_EDITPROFILE:

        return {
          ...state,
          // userToken: action.data.token,
          hostUpdatedLevel: action.data,
        };

    // case ACTION_TYPES.LOGOUT:
    //   return {
    //     ...state
    //   };

    default:
      return state;
  }
};

export default homeReducer;
