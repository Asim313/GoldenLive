import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SlideAnimationComponent from './SildeAnimationComponent';
import database from '@react-native-firebase/database';

const SlideAnimation = ({channelName, cohostData}) => {
    const img = "https://www.golden-live.com/images/gifs/giftjson/Crystal.png1684489719.png";
    const [giftArray, setGiftArray] = useState([])
      const [right, setRight] = useState(false)
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const outputRanges = [
        {
            translateX: [-45, 0],
            translateY: [-230, 0],
            delay: 500,
        },
        {
            translateX: [45, 0],
            translateY: [-230, 0],
            delay: 1000,
        },
        {
            translateX: [-135, 0],
            translateY: [-120, 0],
            delay: 1500,
        },
        {
            translateX: [-45, 0],
            translateY: [-120, 0],
            delay: 2000,
        },
        {
            translateX: [45, 0],
            translateY: [-120, 0],
            delay: 2500,
        },
        {
            translateX: [135, 0],
            translateY: [-120, 0],
            delay: 3000,
        },
        {
            
            translateX: [-135, 0],
            translateY: [-30, 0],
            delay: 3500,
        },
        {
            translateX: [-45, 0],
            translateY: [-30, 0],
            delay: 4000,
        },
        {
            translateX: [45, 0],
            translateY: [-30, 0],
            delay: 4500,
        },
        {
            translateX: [135, 0],
            translateY: [-30, 0],
            delay: 5000,
        },
    ];


   
    const [animationIndex, setAnimationIndex] = useState(0);
    const [giftReceived, setGiftReceived] = useState(null)
    const [animationKey, setAnimationKey] = useState(0);
    const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
    const animationTimeoutRef = useRef(null);
    const checkDate = new Date();
    
        useEffect(() => {
        // console.log('cohost', cohostData)
        checkGiftStatus()
        checkGiftStatusChanged()
    }, [])

    // useEffect(() => {
    //     console.log('araaaaayyyyyyyyyyyyyyyyyyy', giftArray)
    // }, [giftArray])

    const checkGiftStatus = async () => {
        database()
          .ref(`/giftsaudio/friendGift/${channelName}`)
          .on('child_added', async (snapshot) => {
            // console.log('aaaaaaaaaaaaaaaaaaaa', snapshot.val())
            let messageDate = new Date(snapshot.val()?.date);
            // await delay(5000);
            if (messageDate?.getTime() > checkDate.getTime() + 1000) {
                setGiftReceived(snapshot.val())
                setGiftArray(prev => [...prev, snapshot.val()])
                setIsAnimationPlaying(true)
            }
           
          });
        }

    const checkGiftStatusChanged = () => {
        database()
        .ref(`/giftsaudio/friendGift/${channelName}`)
          .on('child_changed', snapshot => {
                // console.log("oh yes", snapshot.val())
                // setGiftReceived(snapshot.val())
                if(parseInt(snapshot.val()?.status) === 0)
                {
                    handleButtonClick()
                    // console.log("stop222222222")
                    setRight(false); 
                } else {
                    // console.log("stop44444444444")
                    {!giftReceived?.img && setGiftReceived(snapshot.val())}
                    {!giftReceived?.img && setIsAnimationPlaying(true);}
                    setRight(true); 

                }
              
          });
        }

    useEffect(() => {
        if (isAnimationPlaying) {
            animationTimeoutRef.current = setTimeout(() => {
                setAnimationKey((prevKey) => prevKey + 1);
                setAnimationIndex((prevIndex) => (prevIndex + 1) % outputRanges.length);
                setRight(false)
            }, 1250);
        }
   
        return () => {
            clearTimeout(animationTimeoutRef.current);
        };
    }, [animationIndex, isAnimationPlaying]);

    const handleButtonClick = () => {
        // delay(3000).then(() => {
        if(right === true) {
          //  console.log("play")
            //console.log('111111111111111', right )
        } else {
         //   console.log("stop")
           // console.log('222222222222', right )
           setGiftReceived(null)
            setIsAnimationPlaying(false);
            clearTimeout(animationTimeoutRef.current);
        }
    // })
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', zIndex: giftReceived?.img ? 4 : 1 }}>
            {right && handleButtonClick(right) }
            <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                {outputRanges.map((outputRange, index) => (
                    <SlideAnimationComponent
                        handleAnimattionEnd={() => 
                            handleButtonClick(false)
                        //    {}
                        }
                        key={index}
                        delay={outputRange.delay}
                        outputRange={outputRange}
                        imageSource={giftReceived?.img}
                        animationKey={animationKey}
                    />
                ))}
            </View>

        </View>
    );
};

export default SlideAnimation;
