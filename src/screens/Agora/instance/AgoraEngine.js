import { useState, useEffect, useRef } from 'react';
import { createAgoraRtcEngine } from 'react-native-agora';

export const useAgora = (appId, channelProfileType) => {
  const [agoraEngine, setAgoraEngine] = useState(null);
  const agoraEngineRef = useRef(null);

  useEffect(() => {
    const initializeAgora = async () => {
      agoraEngineRef.current = createAgoraRtcEngine();
      const engine = agoraEngineRef.current;

      await engine?.initialize(appId);

      if (channelProfileType) {
        await engine?.setChannelProfile(channelProfileType);
      }

      setAgoraEngine(engine);
    };

    initializeAgora();

    return () => {
      agoraEngineRef.current?.destroy();
    };
  }, [appId, channelProfileType]);

  return agoraEngine;
};
