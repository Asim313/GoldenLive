import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../reuseable_Component/Header';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {ApiCallToken} from '../../Services/Apis';
import {formatNumerWithK} from '../../Services/GlobalFuntions';
import RbSheetComponent from '../reuseable_Component/RbSheetComponent';
import SelectPaymentMethods from './PaymentMethods';
import {useNavigation} from '@react-navigation/native';
import AllIcons, {IconList} from '../../components/AllIcons';
import PaymentScreenHeader from './InApp/components/screensHeader';

const MainBeansBuyScreen = () => {
  const navigation = useNavigation();
  const methods = [
    {
      id: 1,
      name: 'Google Pay',
      image: require('../../assets/images/PaymentMethods/googlePay.png'),
    },
    {
      id: 2,
      name: 'Stripe',
      image: require('../../assets/images/PaymentMethods/stripe.png'),
    },
  ];

  const [packages, setPackages] = useState([]);
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);
  const userData = useSelector(state => state.auth.userData);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    getPackages();
  }, []);

  const getPackages = async () => {
    try {
      setIsLoading(true);
      const res = await ApiCallToken({
        params: userData?.token,
        route: 'beans-packages',
        verb: 'GET',
      });

      console.log('resssssss', res);
      if (res?.data?.[0]) {
        setPackages(res?.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log('Error beans-packages ', error?.toString());
    }
  };

  const handleClick = (item) => {
    // if(item?.name === 'Google Pay') {
    //     navigation.navigate('InAppPurchase', {
    //       packages
    //     })
    //     // Alert.alert('Soon, we will add google pay.')
    //     return
    // }
    // setSelectedMethod(item?.name)
    // onPressClose()
    navigation.navigate('BeansPackage', {
      packages
    })
}

  return (
    <View>
      <Header name={'My Wallet'} />
      <View style={styles.header}>
           <PaymentScreenHeader />
      </View>
      <View style={styles.mainContainer}>
        <View>
          
          <View style={{height: widthPercentageToDP(100), top: heightPercentageToDP(2)}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: 'black',
              paddingVertical: heightPercentageToDP(2),
            }}>
            Select Payment Method
          </Text>
          {isLoading ? 

            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
               <ActivityIndicator />
            </View>
          :

            <FlatList
              data={methods}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.userBeansStyle,
                      {justifyContent: 'space-between'},
                    ]}
                    onPress={() => handleClick(item)}
                    >
                    <View style={[styles.userBeansStyle, {marginVertical: 0}]}>
                      {item?.image && (
                        <Image
                          source={item?.image}
                          style={{height: 22, width: 60}}
                        />
                      )}
                      <Text
                        style={{
                          marginHorizontal: 10,
                          fontSize: 12,
                          color: 'black',
                          fontWeight: '500',
                        }}>
                        {item?.name}
                      </Text>
                    </View>
                    <View style={styles.priceStyle}>
                      <AllIcons
                        name={IconList.Feather}
                        iconName={'chevron-right'}
                        size={20}
                        color={'black'}
                      />
                    </View>
                  </TouchableOpacity>
                );
              }}
            />           
          }

          </View>
        </View>
      </View>
    </View>
  );
};

export default MainBeansBuyScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 15,
  },
  header: {
    height: heightPercentageToDP(20),
  },
  userBeansStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  headerFontStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  priceStyle: {
    backgroundColor: '#FFA800',
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
