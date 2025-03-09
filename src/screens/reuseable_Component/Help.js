import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Button,
  Alert,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import DocumentPicker from 'react-native-document-picker';
import {useNavigation} from '@react-navigation/native';
import CheckBox from 'expo-checkbox';
import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import Header from './Header';

const buttonData = [
  'Feedback',
  'My Feedback',
  'Top-Up',
  'App Error',
  'Suggestion',
  'Earning',
  'Other-Info',
];

const Help = () => {
  const userData = useSelector(state => state.auth.userData);
  const [isEmailChecked, setIsEmailChecked] = useState(true);
  const [isPhoneChecked, setIsPhoneChecked] = useState(false);
  const [email, setEmail] = useState(null);
  const [selectedItem, setSelectedItem] = useState(0);

  const [issueMsg, setIssueMsg] = useState(null);

  const handleAddData = async () => {
    try {
      console.log('userData');
      const newNodeKey = database().ref().child(`helpCenter`).push().key;
      const resp = await database()
        .ref(`helpCenter/${userData?.user?.id}/${newNodeKey}`)
        .set({
          email: email,
          issueMessage: issueMsg,
          selectItem: selectedItem,
          id: userData?.user?.id,
        })
        .then(() => {
          setSelectedItem(0);
          setEmail('');
          setIssueMsg('');
        });
      Alert.alert('Successfully sent.');
      console.log('Its responce value from firebase ', resp);
    } catch (error) {
      console.log(error);
    }
  };

  const [numColumns, setNumColumns] = useState('');

  const handlePhoneOnChange = () => {
    setIsPhoneChecked(true);
    setIsEmailChecked(false);
  };

  const handleEmailOnChange = () => {
    setIsPhoneChecked(false);
    setIsEmailChecked(true);
  };

  const [issueText, setIssueText] = useState('');

  const handleTextChange = newText => {
    setIssueText(newText);
  };

  const renderItem = ({item, index}) => {
    return (
      <LinearGradient
        start={{x: 0.2, y: 1}}
        end={{x: 1, y: 0.5}}
        colors={
          selectedItem === index
            ? [
                'rgba(202, 73, 1, 1)',
                'rgba(255, 110, 28, 1)',
                'rgba(183, 66, 0, 1)',
              ]
            : ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0,0, 0)']
        }
        style={{
          width: 150,
          height: 55,
          borderBottomWidth: 1,
          borderColor: '#3a455e',
          fontWeight: '400',
          borderRadius: 5,
          marginLeft: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity style={{}} onPress={() => setSelectedItem(index)}>
          <Text style={[styles.buttontext]}>{item}</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  const [selectedDocs, setSelectedDocs] = useState('');

  const handleSelectDocs = async () => {
    try {
      const docs = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      setSelectedDocs(result.uri);
    } catch (err) {
      console.log(err);
    }
    console.log('This is Image', selectedDocs);
  };

  const navigation = useNavigation();

  return (
    <View
      style={{flex: 1, backgroundColor: '#FFFFFF'}}
      // source={require("../../assets/images/image36.png")}
      //   style={{height: '100%', width: '100%'}}
    >
      <ScrollView style={{flex: 1, marginBottom: 10}}>
        <Header name={'Help & Support'} />
        <View style={styles.container}>
          <FlatList
            data={buttonData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            numColumns={2}
          />
        </View>

        <Text
          style={{
            color: 'black',
            fontSize: 15,
            marginTop: '5%',
            marginLeft: '3%',
          }}>
          Choose Your Contact Information
        </Text>

        <View style={{marginTop: '2%'}}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: '5%',
              marginBottom: '3%',
              alignItems: 'center',
            }}>
            <CheckBox
              value={isEmailChecked}
              onValueChange={handleEmailOnChange}
              style={{color: 'black', borderRadius: 10, marginRight: '4%'}}
            />
            <TouchableOpacity
              onPress={() => handleEmailOnChange(!isEmailChecked)}>
              <Text style={{color: 'black', fontSize: 16, margin: '5%'}}>
                Email
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginLeft: '5%',
              marginBottom: '5%',
              alignItems: 'center',
            }}>
            <CheckBox
              value={isPhoneChecked}
              onValueChange={handlePhoneOnChange}
              style={{color: 'black', borderRadius: 10, marginRight: '5%'}}
            />
            <TouchableOpacity
              onPress={() => handlePhoneOnChange(!isPhoneChecked)}>
              <Text style={{color: 'black', fontSize: 16}}>Phone</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TextInput
          value={email}
          placeholder={
            isPhoneChecked
              ? 'Enter your Phone number'
              : 'Enter your Email Address'
          }
          placeholderTextColor="black"
          style={{
            backgroundColor: 'white',
            margin: '3%',
            borderRadius: 7,
            padding: 10,
            fontSize: 17,
            borderWidth: 1,
            borderColor: '#FF6E1C',
            color: 'black',
          }}
          onChangeText={value => setEmail(value)}
        />

        {/* <TextInput placeholder='Enter your Email' placeholderTextColor="#FF6E1C" style={{ backgroundColor: "white", margin: "3%", borderRadius: 7, padding: 10, fontSize: 17, borderWidth: 1, borderColor: "#FF6E1C", color: "black" }}></TextInput> */}

        <ScrollView style={{flex: 1}}>
          <TextInput
            placeholder="Explain Your Issue In Details?"
            placeholderTextColor="black"
            style={{
              backgroundColor: 'white',
              margin: '3%',
              borderRadius: 7,
              padding: 10,
              fontSize: 17,
              borderWidth: 1,
              borderColor: '#FF6E1C',
              color: 'black',
            }}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            value={issueMsg}
            onChangeText={value => setIssueMsg(value)}
          />
        </ScrollView>

        <Text
          style={{
            color: 'black',
            fontSize: 15,
            marginTop: '3%',
            marginLeft: '3%',
          }}>
          Uplaod Picture/Video
        </Text>

        <TouchableOpacity onPress={handleSelectDocs}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '5%',
              backgroundColor: 'white',
              padding: '20%',
              margin: '3%',
              borderWidth: 1,
              borderColor: '#FF6E1C',
              borderRadius: 5,
            }}>
            <Ionicons name="camera" size={25} color="black" style={{}} />
            <Text style={{color: 'black'}}>Upload Photo</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity
        onPress={() => handleAddData()}
        fontSize={18}
        color="black"
        textAlign="center"
        fontWeight="300"
        style={{
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FF6E1C',
          padding: 12,
          marginHorizontal: 5,
        }}>
        <Text style={{fontWeight: 'bold', color: 'black'}}>Submit now</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Help;

const styles = StyleSheet.create({
  topview: {
    flexDirection: 'row',
    paddingTop: 10,
    backgroundColor: 'white',
    paddingBottom: 10,
  },

  container: {
    height: '30%',
    width: '100%',
    marginTop: '5%',
    // backgroundColor: 'red',
  },
  buttontext: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
});
