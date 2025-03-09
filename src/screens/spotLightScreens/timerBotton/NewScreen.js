// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native'

// const NewScreen = () => {
//     const [enteredText, setEnteredText] = useState('');
//     const [displayText, setDisplayText] = useState([]);

//     const handlePress = () => {
//         setDisplayText([...displayText, enteredText])
//         setEnteredText('');
//         console.log('Input Text', enteredText);
//         console.log('Display Text', displayText);
//     }

//     return (
//         <View style={{ flex: 1 }}>

//             <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 100 }}>
//                 <TextInput
//                     placeholder='Enter Goals'
//                     style={{ borderWidth: 1, borderColor: 'black', width: 200 }}
//                     onChangeText={setEnteredText}
//                     value={enteredText}
//                 />
//                 <Button title='Submit' onPress={handlePress} />

//             </View>

//             <ScrollView>
//                 <View style={{alignItems: 'center'}}>
//                     {displayText.map((text, index) => (
//                         <Text style={styles.txt} key={index}>{text}</Text>
//                     ))}
//                 </View>
//             </ScrollView>

//         </View>
//     );
// }

// export default NewScreen;


// const styles = StyleSheet.create({
//     txt: {
//         backgroundColor: 'grey',
//         width: '80%',
//         padding: 10,
//         borderWidth: 2,
//         borderColor: 'black',
//         color: 'white',
//         marginVertical: 10,
//         // marginHorizontal: 20
//     }
// })




import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Timer from './Timmer';


const Data = [
    {
        image: 'https://assets.bizjournals.com/static/img/potm/marketing/team-success-img.jpg'
    },
    {
        image: 'https://assets.bizjournals.com/static/img/potm/marketing/team-success-img.jpg'
    },
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhQtxUp6hDyEKP1m8Pd0j3-Mon4nFK-SRYIY4LWAeSELO2dfgmu90mrxpZKm9IY4Qrp3Q&usqp=CAU'
    }
]

const renderItem = ({ item }) => {
    return (
        <View style={{}}>
            <Image source={{ uri: item.image }} style={{ width: 30, height: 30, borderRadius: 30 }}></Image>
        </View>
    )
}

const NewScreen = () => {
    return (
        <View style={{ flex: 1,  alignItems: 'center', justifyContent: 'center' }}>

            <View style={{width:'90%'}}>
                <LinearGradient colors={['#181A2D', '#424881']} style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10 }}>

                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white',marginHorizontal:'1%',}}>Next {'\n'}Show </Text>

                  {/* <View> */}
                  <FlatList
                        data={Data}
                        renderItem={renderItem}
                        horizontal={true}
                   />
                  {/* </View> */}

                    <View style={{ backgroundColor: '#181A2D', flexDirection: 'row', alignItems: 'center', borderRadius: 20, paddingHorizontal: 10 }}>
                        <Icon name='alarm-outline' size={20} color={'white'}></Icon>
                        <Timer/>
                    </View>

                </LinearGradient>
            </View>

        </View>
    )
}

export default NewScreen;

const styles = StyleSheet.create({})