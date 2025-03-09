import React from "react";
import { TextInput, View } from "react-native";

const TextInputAboveKeyboard = () => {

    // keyboard functions to hide and show and set height of input
  const [keyboardStatus, setKeyboardStatus] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [show, setShow] = useState(false)
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', (event) => {
      setKeyboardHeight(event.endCoordinates.height);
      console.log('Keyboard height:', keyboardHeight);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
    
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const textInputRef = useRef(null);

  const handleButtonPress = () => {
    Keyboard.dismiss();
    textInputRef.current.focus();
  }

    return(
        <View style={{position: 'absolute', bottom: keyboardHeight + 2, left: keyboardHeight != 0 ? 0 : 20, backgroundColor: keyboardHeight == 0 ? 'transparent' :'white', zIndex: 11, justifyContent: 'space-evenly'}}>
        <View style={{flexDirection: 'row', alignItems: 'center', width: keyboardHeight == 0 ? "0%" : "100%"}}>
                           <TextInput
                               ref={textInputRef} 
                               style={[keyboardHeight != 0 && styles.input, {color: 'white', width: '85%'}]}
                               onChangeText={text => setMessageR(text)}
                               value={messsageR}
                               maxLength={25}
                               // value={message}
                               placeholder="Leave a comment..."
                               placeholderTextColor="grey"
                               />
                               {keyboardHeight != 0 &&  <TouchableOpacity
                                   onPress={() => rldbSendMessage()}
                                   style={styles.icon1box}>
                                   <Feather name="send" size={16} color="white" />
                                 </TouchableOpacity>}
                         </View>
        </View>
    )
}

export default TextInputAboveKeyboard;