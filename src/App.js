import React, {useState} from 'react';
import {Provider} from 'react-redux';
// import {persistor, store} from './Src/Redux/Store';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store, persistor} from './Redux/Store';
import HomeNavigation from './navigation/HomeNavigation';
import {UserProfileContext} from './context/userProfile';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const [userInfo, setUserInfo] = useState({});
  const setUserData = data => {
    setUserInfo(data);
  };
  return (
    <GestureHandlerRootView>

    <UserProfileContext.Provider value={{userInfo, setUserData}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <HomeNavigation />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </UserProfileContext.Provider>
    </GestureHandlerRootView>
  );
}

///////////Previous Navigation in Case of errorHandling
// export default class App extends Component {
//   render() {
//     return (

//       // <NavigationContainer>
//       //   <Navigator />
//       // </NavigationContainer>
//     );
//   }
// }
