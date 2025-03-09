import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    ToastAndroid
} from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import BackIcon from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ApiCall } from '../../Services/Apis';

const EnterOTP1 = ({ navigation }) => {

    const [otp, setOtp] = useState('')
    const route = useRoute();
    const [loading, setLoading] = useState(false)
    const [forResendOtp, setforResendOtp] = useState(false)
    const userMail = route.params.userMail
    console.log('mail from back  ', userMail)

    const params = {
        code: otp,
        email: userMail
    };

    const paramsResend = {
        email: userMail
    };

    const AddOTP = async () => {

        // console.log('This is Password', confirmPassword);
        try {

            if (otp != '') {

                setLoading(true)
                const res = await ApiCall({
                    params: params,
                    route: 'user/password-verifyotp',
                    verb: 'POST',
                });
                // console.log('API response ====>>>> ',res.email[0])
                if (res.status == true) {
                    ToastAndroid.showWithGravityAndOffset(
                        'Verified',
                        ToastAndroid.SHORT,
                        ToastAndroid.TOP,
                        0,
                        0,
                    );
                    setLoading(false)
                    navigation.navigate('ForgotPassword', { mail: userMail })
                    console.log('here is the respone for ENTR OTP', res);
                }
                else {
                    // if (res.code = 223) {
                    //     setLoading(false)
                    //     console.log(res)
                    //     alert(res.message)
                    // }
                    // else {
                    //     setLoading(false)
                    //     console.log(res)
                    //     alert('Enter correct Email')
                    // }
                    // alert(res.message)
                    ToastAndroid.showWithGravityAndOffset(
                        res.message,
                        ToastAndroid.SHORT,
                        ToastAndroid.TOP,
                        0,
                        0,
                    );
                    setLoading(false)
                    console.log(res)

                }


            } else {  ToastAndroid.showWithGravityAndOffset(
                'Fill All data first',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                0,
                0,
            ); }


            // if (res.code == 200) {
            //   console.log('res == 200 ... ', res.data);
            //   params.data.setMyLoginError(true);
            //   //   yield put({ type: ACTIONS.LOGIN_ERRORS, loginErrors: res });
            //   yield put(setLoginData(res.data));
            // } else if (res.code !== 200) {
            //   console.log('res.responseCode !== 200....', res);
            //   // yield put(setLoginData(res.body));
            // }
        } catch (e) {
            console.log('saga login error -- ', e.toString());
        }
    };

    const ResendOTP = async () => {

        // console.log('This is Password', confirmPassword);
        try {
            console.log('User email is ', userMail)
            setforResendOtp(true)
            const res = await ApiCall({
                params: paramsResend,
                route: 'user/resend-code',
                verb: 'POST',
            });
            // console.log('API response ====>>>> ',res.email[0])
            if (res.code == 200) {
                ToastAndroid.showWithGravityAndOffset(
                    res.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.TOP,
                    0,
                    0,
                );
                // alert(res.message)
                setforResendOtp(false)
                // navigation.navigate('ForgotPassword', { mail: userMail })
                console.log('here is the respone for Resend OTP', res);
            }
            else {
                ToastAndroid.showWithGravityAndOffset(
                    'Write valid Email',
                    ToastAndroid.SHORT,
                    ToastAndroid.TOP,
                    0,
                    0,
                );

                // alert('Write valid email')
                setforResendOtp(false)
                console.log(res)
                console.log('userEmail isssss===>>>', userMail)
            }

            // if (res.code == 200) {
            //   console.log('res == 200 ... ', res.data);
            //   params.data.setMyLoginError(true);
            //   //   yield put({ type: ACTIONS.LOGIN_ERRORS, loginErrors: res });
            //   yield put(setLoginData(res.data));
            // } else if (res.code !== 200) {
            //   console.log('res.responseCode !== 200....', res);
            //   // yield put(setLoginData(res.body));
            // }
        } catch (e) {
            console.log('saga login error -- ', e.toString());
        }
    };
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/images/image36.png')}
                style={{ flex: 1 }}>
                <View style={styles.settingbox}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackIcon name="left" size={20} style={styles.icon} />
                    </TouchableOpacity>
                    <Text style={styles.settingtxt}>Forgot Password</Text>
                </View>
                <ScrollView keyboardShouldPersistTaps="always">
                    <View>
                        <Image
                            source={require('../../assets/images/faq.png')}
                            style={{
                                height: 150,
                                width: 150,
                                alignSelf: 'center',
                                marginTop: '20%',
                            }}
                        />
                    </View>
                    <View>
                        <TextInput
                            placeholder="Enter OTP"
                            style={styles.input}
                            placeholderTextColor="#C6C6C6"
                            onChangeText={(e) => setOtp(e)}
                        />
                        {/* <TextInput
                placeholder="Confirm Password"
                style={styles.input}
                placeholderTextColor="#C6C6C6"
              /> */}
                    </View>
                    <View>
                        {
                            loading ? <ActivityIndicator style={{ marginTop: 25 }} />
                                :
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#ED2D21',
                                        width: '80%',
                                        alignSelf: 'center',
                                        alignItems: 'center',
                                        paddingVertical: '4%',
                                        borderRadius: 5,
                                        marginVertical: '5%',
                                        elevation: 3,
                                    }}
                                    onPress={() => AddOTP()}
                                >
                                    <Text style={{ color: 'white', fontWeight: '500', fontSize: 15 }}>
                                        Done
                                    </Text>
                                </TouchableOpacity>
                        }

                        {
                            forResendOtp ? <ActivityIndicator style={{ marginTop: 25 }} />
                                :
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#ED2D21',
                                        width: '80%',
                                        alignSelf: 'center',
                                        alignItems: 'center',
                                        paddingVertical: '4%',
                                        borderRadius: 5,
                                        marginVertical: '5%',
                                        elevation: 3,
                                    }}
                                    onPress={() => ResendOTP()}
                                >
                                    <Text style={{ color: 'white', fontWeight: '500', fontSize: 15 }}>
                                        Resend OTP
                                    </Text>
                                </TouchableOpacity>
                        }



                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    settingbox: {
        flexDirection: 'row',
        paddingVertical: heightPercentageToDP('2%'),
        alignItems: 'center',
        backgroundColor: '#303749',
    },
    settingtxt: {
        fontSize: 19,
        color: 'white',
        fontWeight: '500',
    },
    icon: {
        color: 'white',
        paddingHorizontal: 5,
    },
    input: {
        backgroundColor: '#303749',
        marginVertical: '2%',
        width: '80%',
        alignSelf: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#535C73',
        paddingVertical: '3%',
        paddingLeft: 12,
        color: 'white',
    },
});

export default EnterOTP1;
