import AnimatedLottieView from 'lottie-react-native';
import React, { memo, useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Sound from 'react-native-sound';
Sound.setCategory('Playback');

const LottieGiftView = memo(({ jsonPath, mp3Path, hasFinished }) => {
  const giftRef = useRef();

  const initializeSoundAndPlay = () => {
    // Initialize the sound
    var ding = new Sound(mp3Path, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        // console.log('Failed to load the sound', error);
        return;
      }

      // Successfully loaded sound
      // console.log('duration in seconds:', ding.getDuration(), 'number of channels:', ding.getNumberOfChannels());

      // Play the sound
      ding.play((success) => {
        // console.log('Playback result:', success);
        // if (success) {
        //   console.log('Successfully finished playing');
        // } else {
        //   console.log('Playback failed due to audio decoding errors');
        // }
      });
    });

    // Cleanup: stop and release the sound when the component unmounts
    return () => {
      if (ding) {
        ding.stop();
        ding.release();
      }
    };
  };

  useEffect(() => {
    // Play the animation
    giftRef.current?.play();

    // Initialize the sound and play after animation starts
    const cleanupSound = initializeSoundAndPlay();

    // Cleanup sound when the component unmounts
    return cleanupSound;
  }, [jsonPath, mp3Path]);

  return (
    <View style={{ flex: 1 }}>
      <AnimatedLottieView
        onAnimationFinish={hasFinished}
        loop={false}
        autoPlay={false}
        ref={giftRef}
        style={{
          flex: 1
        }}
        // source={jsonPath}
        source={jsonPath}
      />
    </View>
  );
});

export default LottieGiftView;
