import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import RightArrow from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { updateUserData, updateUserLevel } from '../../../Redux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { UserProfileContext } from '../../../context/userProfile';
import { ApiUpdateUserData } from '../../../Services/Apis';

const WealthCertification = ({
  profileImg,
  userName,
  namePlateImage,
  badgeImg,
  posts,
  followers,
  followings,
  beans,
  coins,
  profileFrame,
}) => {
  const dimensions = Dimensions.get('window');
  const userData = useSelector(state => state.auth.userData);
  const { setUserData } = useContext(UserProfileContext);
  const [data, setData] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
    UpdateUserData();
  } ,[])

  const UpdateUserData = async () => {
    try {
      const res = await ApiUpdateUserData({
        params: userData.token,
        paramsBody: userData.user.id,
        route: 'user/updated-data',
        verb: 'POST',
      });
          setUserData(res?.data);
          dispatch(updateUserData(res?.data));
          setData(res.data)

    } catch (e) {
      console.log('saga login error -- ', e.toString());
    }
  };

  return (
    <View style={{ marginHorizontal: 15 }}>
      <View>
        <View style={{ alignSelf: 'center', justifyContent: 'flex-end', top: 8 }}>
          <Image
            source={require('../../../assets/images/wealthClass/crown.png')}
            resizeMode="contain"
            style={{ height: 40, width: 40 }}
          />
        </View>
        <View
          style={{
            backgroundColor: '#303749',
            paddingVertical: 15,
            borderRadius: 8,
            flexDirection: 'row',
            justifyContent: 'center',
            borderTopColor: '#FE9E00',
            borderTopWidth: 5,
          }}>
          <LinearGradient
            colors={['#FE9E00', '#FE7816']}
            style={{
              width: '50%',
              height: 30,
              justifyContent: 'center',
              borderBottomRightRadius: 25,
              borderBottomLeftRadius: 25,
              position: 'absolute',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#FFFFFF',
              }}>
              Wealth Certification
            </Text>
          </LinearGradient>
          <View>
            <View style={{ marginTop: 30, height: dimensions.height * 0.2 }}>
              <View>
                <Image
                  source={require('../../../assets/images/wealthClass/banner.png')}
                  resizeMode="contain"
                  style={{
                    height: dimensions.height * 0.095,
                    width: dimensions.width * 0.91,
                  }}
                />
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  position: 'absolute',
                  height: '100%',
                  justifyContent: 'center',
                  marginTop: 5,
                }}>
                {
                  data?.image == null ?
                    <Image
                    source={require('../../../assets/images/wealthClass/profile.jpg')}
                      resizeMode="contain"
                      style={{
                        height: 90,
                        width: 90,
                        borderRadius: 100,
                        borderWidth: 2,
                        borderColor: '#303749',
                      }}
                    /> : <Image
                      source={data?.image}
                      resizeMode="contain"
                      style={{
                        height: 90,
                        width: 90,
                        borderRadius: 100,
                        borderWidth: 2,
                        borderColor: '#303749',
                      }}
                    />
                }

                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    position: 'absolute',
                    height: '100%',
                    justifyContent: 'center',
                    marginTop: 5,
                  }}>
                  <Image
                    source={profileFrame}
                    resizeMode="contain"
                    style={{ height: 115, width: 115 }}
                  />
                  <Text></Text>
                </View>

                <Text
                  style={{
                    fontSize: 16,
                    color: '#FFFFFF',
                    marginRight: 5,
                    top: 20,
                  }}>
                  {data.full_name}
                </Text>
              </View>
            </View>
            <View
              style={{
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#EA3126',
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  borderRadius: 25,
                  marginRight: 5,
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Image
                    source={require('../../../assets/images/beanA.png')}
                    resizeMode="cover"
                    style={{
                      height: 15,
                      width: 15,
                      alignSelf: 'center',
                      marginRight: 3,
                    }}
                  />
                  <Text style={{ color: '#FFFFFF', fontSize: 10 }}>
                    {beans}K Beans
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: '#40475A',
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  borderRadius: 25,
                  marginLeft: 5,
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Image
                    source={require('../../../assets/images/coinA.png')}
                    resizeMode="cover"
                    style={{
                      height: 15,
                      width: 15,
                      alignSelf: 'center',
                      marginRight: 3,
                    }}
                  />
                  <Text style={{ color: '#AEAECE', fontSize: 10 }}>
                    {coins}K Coins
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ alignSelf: 'center', marginTop: 10 }}>
              <Image
                source={namePlateImage}
                resizeMode="contain"
                style={{ height: 40, width: 85 }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <View>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                  }}>
                  {posts}
                </Text>
                <Text
                  style={{ fontSize: 13, color: '#AEAECE', textAlign: 'center' }}>
                  Posts
                </Text>
              </View>
              <Image
                source={require('../../../assets/images/wealthClass/line.png')}
                resizeMode="contain"
                style={{ height: 40, width: 25 }}
              />
              <View>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                  }}>
                  {followers}k
                </Text>
                <Text
                  style={{ fontSize: 13, color: '#AEAECE', textAlign: 'center' }}>
                  Followers
                </Text>
              </View>
              <Image
                source={require('../../../assets/images/wealthClass/line.png')}
                resizeMode="contain"
                style={{ height: 40, width: 25 }}
              />
              <View>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                  }}>
                  {followings}
                </Text>
                <Text
                  style={{ fontSize: 13, color: '#AEAECE', textAlign: 'center' }}>
                  Followings
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 15 }}>
              <Image
                source={require('../../../assets/images/wealthClass/banner.png')}
                resizeMode="contain"
                style={{ height: 90, width: '100%' }}
              />
              <View
                style={{
                  position: 'absolute',
                  height: '100%',
                  justifyContent: 'center',
                }}>
                <Image
                  source={badgeImg}
                  resizeMode="contain"
                  style={{
                    height: 70,
                    width: 70,
                    marginLeft: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  position: 'absolute',
                  width: '100%',
                  justifyContent: 'flex-end',
                  height: '100%',
                  alignItems: 'center',
                  right: 15,
                }}>
                <Image
                  source={require('../../../assets/images/wealthClass/live.png')}
                  resizeMode="contain"
                  style={{ height: 22, width: 75, marginLeft: 15 }}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: '#900C0F',
                    width: '6%',
                    borderRadius: 100,
                  }}>
                  <RightArrow
                    name="keyboard-arrow-right"
                    size={20}
                    style={{ color: '#FFFFFF' }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WealthCertification;

const styles = StyleSheet.create({});
