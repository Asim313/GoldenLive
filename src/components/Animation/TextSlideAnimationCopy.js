import React, { memo, useEffect } from "react";
import { Animated, Text, View } from "react-native";

const TextSlideAnimation = ({ animatedValue, fontSize, text, fontWeight, color }) => {
  return (
    <Animated.View
      style={[
        {
          transform: [{ translateX: animatedValue }],
        },
      ]}
    >
      <View style={{}}>
        <Text
          style={{
            textAlign: "center",
            width: 200,
            color: color ?? "white",
            fontWeight: fontWeight ?? 'normal',
            fontSize: fontSize ?? 12,
          }}
        >
          {text}
        </Text>
      </View>
    </Animated.View>
  );
};

const TextSlideAnimation2 = memo(({ name, fontSize, fontWeight, color }) => {
  const animated = new Animated.Value(25);
  const animated2 = new Animated.Value(150);

  useEffect(() => {
    animateText();
  }, []);

  const animateText = () => {
    animated.setValue(25);

    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(animated, {
            toValue: -180,
            duration: 6000, // Reduce the duration to half
            useNativeDriver: true,
          }),
          Animated.timing(animated2, {
            toValue: -55,
            duration: 6000, // Reduce the duration to half
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(1000), // Delay for 1 second

        Animated.parallel([
          Animated.timing(animated2, {
            toValue: -100,
            duration: 5000, // Reduce the duration to half
            useNativeDriver: true,
          }),
    
        ]),

      ])
    ).start(() => animateText()); // Restart the animation after completion
  };
  
  if (name?.length >= 8) {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{position: 'absolute'}}>
          <TextSlideAnimation text={name} animatedValue={animated} fontSize={fontSize} fontWeight={fontWeight} color={color} />

        </View>
        <TextSlideAnimation text={name} animatedValue={animated2} fontSize={fontSize} fontWeight={fontWeight} color={color} />
      </View>
    );
  } else {
    return (
      <Text
        style={{
          wordWrap: "break-word",
          width: 80,
          fontWeight: fontWeight ?? 'normal',
          fontSize: fontSize ?? 12,
          color: color ?? "white",
        }}
      >
        {name}
      </Text>
    );
  }
});

export default TextSlideAnimation2;
