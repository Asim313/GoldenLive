
import React from 'react';
import { Image, ImageBackground, StyleSheet, View ,Text, FlatList} from 'react-native';

const StarsComponent = () => {
    const DATA = [
        {
          ImagePath: require('../../../assets/images/DailyStarAssests/Star-Designs-02.png'),
          nameOfStar: '1 Star',
        },
        {
            ImagePath: require('../../../assets/images/DailyStarAssests/Star-Designs-04.png'),
            nameOfStar: '2 Star',
          },
          {
            ImagePath: require('../../../assets/images/DailyStarAssests/Star-Designs-05.png'),
            nameOfStar: '3 Star',
          },
          {
            ImagePath: require('../../../assets/images/DailyStarAssests/Star-Designs-06.png'),
            nameOfStar: '4 Star',
          },
          {
            ImagePath: require('../../../assets/images/DailyStarAssests/Star-Designs-07.png'),
            nameOfStar: '5 Star',
          },
     
      ];

      const renderView = (item) => {
            return (
                <View style={{marginHorizontal:4}}>
                <Image source={item.item.ImagePath} style={{height:50,width:60,marginTop:10,}}/>
                <View style={{backgroundColor:'orange',justifyContent:'center',alignItems:'center',borderRadius:40,marginTop:12}}>
                    <Text style={{fontWeight:'600',color:'white',}}>
                   {item.item.nameOfStar}
                    </Text>
                </View>
            </View>   
            )
      }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/DailyStarAssests/StarBG2.png')}
        style={styles.image}
        resizeMode="cover" // This will scale the image uniformly to fill the entire container
      >
      <View style={{paddingLeft:'2%'}}>
      <FlatList
        data={DATA}
        renderItem={renderView}
        horizontal={true}
        />
      </View>
       
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  image: {
    width: 355, // Set the desired width
    height: 99, // Set the desired height
  },
});

export default StarsComponent;
