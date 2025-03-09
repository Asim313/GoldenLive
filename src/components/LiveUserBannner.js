import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import SwiperFlatList from "react-native-swiper-flatlist";

const LiveUserBannner = ({data, height, width }) => {
  return (

    <SwiperFlatList
    autoplay
    autoplayDelay={2}
    autoplayLoop
    showPagination={false}
    data={data}
    renderItem={({item}) => (
      <View style={{width: widthPercentageToDP(width), marginHorizontal: 7, height: heightPercentageToDP(height),     overflow: 'hidden',
        borderRadius: 10,}}>
          <Image
         source={{ uri: item?.banner_image }}
         resizeMode="cover"
         style={styles.swiperimg}
       />
    </View>
    )
    }
  />
    // <View style={styles.child}>
    //   <Image
    //     source={{ uri: item?.banner_image }}
    //     resizeMode="cover"
    //     style={styles.swiperimg}
    //   />
    // </View>
  );
};

export default LiveUserBannner;

const styles = StyleSheet.create({
  child: {
    flex: 1,
  },
  swiperimg: {
  //  backgroundColor:'red',
    height: "100%",
    width: "100%",
    overflow: 'hidden',
    borderRadius: 10,
  },
});
