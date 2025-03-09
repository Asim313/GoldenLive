import React, {useState, useRef, useEffect, memo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import {heightPercentageToDP, widthPercentageToDP} from 'react-native-responsive-screen';
import TextSlideAnimation2 from '../../../components/Animation/TextSlideAnimationCopy';
import { commnetsColor } from '../../../Services/Constants';
// import { heightPercentageToDP } from 'react-native-responsive-screen';

const CommentsComponent = memo(({message, onPressComment}) => {
  const listRef = useRef(null);

  const handleEndReached = () => {
    // console.log('working')
    listRef.current.scrollToEnd({animated: true, duration: 200});
  };

  useEffect(() => {
    {
      message && handlePress(message);
    }
  }, [message]);

  const [messages, setMessages] = useState([]);

  const newMessage = {
    message: 'How are you?',
  };

  const handlePress = msg => {
    setMessages(msg);
    handleEndReached();
  };

  return (
    <View style={{}}>
      <FlatList
        ref={listRef}
        showsVerticalScrollIndicator={false}
        data={messages}
        renderItem={({item, i}) => {
          return (
            <TouchableOpacity key={i} onPress={() => onPressComment(item)}>
              <View style={[styles.commentContainer, { backgroundColor: item?.bg ?? 'rgba(5, 3, 102, 0.1)' }]}>
            <View style={{flexDirection: 'row', alignItems: 'center',
                paddingRight: 5,
                wordWrap: 'break-word',
                width: item?.colorType === '#41C2D2' ? '90%' : '100%',
              }}>
               
                {item?.isAdmin && (
                    <Text style={{color: 'white', backgroundColor: 'red', paddingHorizontal: 2, borderRadius: 60, fontSize: 11, marginHorizontal: 4}}>{'A'}</Text>
                  )}
                  
                {item?.sender_level && (
                    <Image
                      source={{uri: item?.sender_level_image}}
                      style={{height: 15, width: 35,}}
                    />
                  )}

                {item?.name && (
                    
                    <View
                      style={{
                        marginHorizontal: 5,
                        width: 120,
                        overflow: 'hidden',
                      }}>
                        <TextSlideAnimation2 name={item?.name} fontSize={heightPercentageToDP(1.5)} fontWeight={'bold'} color={item?.titleColor ?? 'orange'} />
                    </View> 
                  )}


                </View>

                {!item?.beans ?
                  <View>
                      <Text style={[
                      styles.commentText,
                      {
                        left: 10,
                        wordWrap: 'break-word',
                        fontSize: 11,
                        marginHorizontal: 5,
                        color: item?.colorType ?? 'white',
                      },
                    ]}>
                        {item?.mentionedUser && '@'+item?.mentionedUser} {item?.message} 
                      </Text>
                  </View>
                 :
                  <View>
                      <Text style={[
                      styles.commentText,
                      {
                        left: 10,
                        wordWrap: 'break-word',
                        fontSize: 11,
                        fontWeight: '500',
                        marginHorizontal: 5,
                        color: item?.colorType ?? 'white',
                      },
                    ]}>
                        Wow, Congratulations to 
                        <Text style={{color: 'yellow', }}>
                        {' ' + item?.senderNickname}
                          </Text> for getting 
                          <Text style={{color: 'yellow',}}>
                        {' ' + item?.beans + ' '}
                          </Text>
                          coins back in {item?.winningIn}.
                      </Text>
                  </View>
                }
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index}
        onContentSizeChange={() => handleEndReached()} // Add this callback
      />
    </View>
  );
});

export default CommentsComponent;

const styles = StyleSheet.create({
  commentContainer: {
    padding: 5,
    backgroundColor: 'rgba(5, 3, 102, 0.1)',
    marginHorizontal:10,
    borderRadius: 12,
    marginVertical: 3,
  },
  commentText: {
    fontSize: 9,
    color:"white"
  },
});
