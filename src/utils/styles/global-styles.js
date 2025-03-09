import { StatusBar, StyleSheet, Dimensions } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const globalStyles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    flexRowAndCenter: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center'
    },  
    containerWithCenterAlign: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screenContainer:{
            flex:1,
             backgroundColor: 'black',
        },
    animatedGiftViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',  
        position: 'absolute', 
        height: heightPercentageToDP(100), 
        width: widthPercentageToDP(100)
    }
});

export default globalStyles
