import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {headings} from '../../utils/Styles';
import BackIcon from 'react-native-vector-icons/AntDesign';
import Header from '../reuseable_Component/Header';

export default function Terms({navigation}) {
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={'black'} />

      <ImageBackground
        source={require('../../assets/images/image36.png')}
        resizeMode={'stretch'}
        style={{flex: 1}}>
        <Header name={'Terms $ Conditions'}/>
        <ScrollView>
          <View style={{height: '100%'}}>
            <Text
              style={{
                color: 'black',
                fontSize: 17,
                fontWeight: 'bold',
                margin: 8,
                marginTop: '6%',
              }}>
              Terms and Conditions relating to Talents:
            </Text>
            <Text
              style={{
                color: 'black',
                width: '90%',
                left: 10,
                fontSize: 12,
              }}>
              1. Coins sharing is based on the current balance of coins shown in
              the Talent’s profile in GoldenLive
            </Text>
            <Text
              style={{
                color: 'black',
                width: '90%',
                left: 10,
                fontSize: 12,
                marginTop: 10,
              }}>
              2. Talent shall be eligible, only if, he/she satisfies at least 35
              hours and 12 valid days of streaming
            </Text>
            <Text
              style={{
                color: 'black',
                width: '90%',
                left: 10,
                fontSize: 12,
                marginTop: 15,
              }}>
              3. 20,000 coins shall be equal to USD 1$/-.
            </Text>
            <Text
              style={{
                color: 'black',
                width: '90%',
                left: 10,
                fontSize: 12,
                marginTop: 15,
              }}>
              4. Multi-broad shall not be included in the eligibility criteria
              payment
            </Text>
            <Text
              style={{
                color: 'black',
                width: '90%',
                left: 10,
                fontSize: 12,
                marginTop: 15,
              }}>
              5. Talent Fee shall be paid to the Talent Recruiter in 10 – 15
              working days of each cycle, subject to smooth functioning of Golden
              live business
            </Text>
            <Text
              style={{
                color: 'black',
                width: '90%',
                left: 10,
                fontSize: 12,
                marginTop: 15,
              }}>
              6. Only coins received as paid gifts from users shall be
              calculated towards the talent’s income/ reward
            </Text>
            <Text
              style={{
                color: 'black',
                width: '90%',
                left: 10,
                fontSize: 12,
                marginTop: 15,
              }}>
              7. The gifts, sent as “Points”, shall not be included in
              calculating remuneration/reward of talents
            </Text>
            <Text
              style={{
                color: 'black',
                width: '90%',
                left: 10,
                fontSize: 12,
                marginTop: 15,
              }}>
              8. Talent must use his/her ID himself/herself. He/she shall not be
              eligible for any kind of payment, if, anyone other than the Talent
              is caught using his/her GoldenLive ID. The violation of this
              obligation may also result in the Talent being removed from the
              firm code.
            </Text>
            <Text
              style={{
                color: 'black',
                width: '90%',
                left: 10,
                fontSize: 12,
                marginTop: 15,
              }}>
              9. Each Talent must use only one ID for live stream. If a Talent
              is using more than one ID, he/she shall not be eligible for any
              Talent Fee for the month
            </Text>
            <Text
              style={{
                color: 'black',
                width: '90%',
                left: 10,
                fontSize: 12,
                marginTop: 15,
              }}>
              10. To maintain a threshold of at least 10 active Talents, in his/
              her Talent Recruiter Firm, completing the basic Talent Fee targets
            </Text>
            <Text
              style={{
                color: 'black',
                width: '90%',
                left: 10,
                fontSize: 12,
                marginTop: 15,
              }}>
              11. Talent Recruiter shall not be given a second warning for
              offenses like cheating or fraud and/or gross negligence and
              misconduct with Talent. If found guilty, Talent Recruiter shall be
              liable to pay by way of compensation US$ 150 for each offence and
              in severe cases termination of Agreement and cessation of the
              recruitment arrangement
            </Text>
            <Text
              style={{
                color: 'black',
                width: '90%',
                left: 10,
                fontSize: 12,
                marginTop: 15,
              }}>
              12. If, during the live stream by any Talent, LT notices anything
              which is detrimental to interests or brand image of Banolve
              Application, LT shall be entitled to intervene or notify the
              Talent Recruiter to take necessary measures
            </Text>
            <Text
              style={{
                color: 'black',
                width: '90%',
                left: 10,
                fontSize: 12,
                marginTop: 15,
              }}>
              13. Neither Party shall make claim against the other Party or be
              deemed to be in breach of Agreement where such failure or omission
              is caused by Force Majeure.
            </Text>
            <Text
              style={{
                color: 'black',
                width: '90%',
                left: 10,
                fontSize: 12,
                marginTop: 15,
              }}>
              14. All right of interpretation of this agreement are held
              exclusively by the LT and the interpretation by LT shall be held
              as a final decision
            </Text>
            <Text
              style={{
                color: 'black',
                width: '90%',
                left: 10,
                fontSize: 12,
                marginTop: 15,
              }}>
              1. LT shall have the right to alter any clause of this Agreement
              (including income percentage and reward policy) in accordance with
              business requirements.
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303749',
  },
  settingbox: {
    flexDirection: 'row',
    paddingVertical: heightPercentageToDP('2%'),
    alignItems: 'center',
    backgroundColor: '#303749',
  },
  settingtxt: {
    fontSize: 19,
    color: 'black',
    fontWeight: '500',
  },
  icon: {
    color: 'black',
    paddingHorizontal: 5,
  },
  ItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: heightPercentageToDP('2.5%'),
    borderBottomWidth: 1,
    alignItems: 'center',
    borderColor: '#303749',
    paddingLeft: '3%',
    paddingRight: '3%',
    backgroundColor: 'transparent',
  },
  headingtxt: {
    fontSize: 15,
    color: 'black',
  },
  logbox: {
    paddingVertical: heightPercentageToDP('2%'),
    marginHorizontal: 10,
    borderRadius: 5,
  },
  logtxt: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  power: {
    textAlign: 'center',
    ...headings.h8,
    color: 'black',
  },
});
