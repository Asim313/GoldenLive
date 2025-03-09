import {createContext} from 'react';

export const UserProfileContext = createContext({
  userInfo: {},
  setUserData: () => {},
});
