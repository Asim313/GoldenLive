import React from "react";
import { View } from "react-native";
import { RtcSurfaceView } from "react-native-agora";
import globalStyles from "../../../utils/styles/global-styles";

const AgoraView = React.memo(({ id }) => {
  //  console.log("itemmmmmmmmmmmmmmmmmmmm", id);
  return (
    <View style={globalStyles.screenContainer}>
      <React.Fragment key={parseInt(id)}>
        <RtcSurfaceView
          canvas={{ uid: parseInt(id) }}
          style={globalStyles.screenContainer}
        />
      </React.Fragment>
    </View>
  );
});

export default AgoraView;
