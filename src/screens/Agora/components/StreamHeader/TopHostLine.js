import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useRef } from 'react';
import AnimatedProfileDp from '../../../reuseable_Component/AnimatedProfileDP';
import {useSelector} from 'react-redux';
import AllIcons, { IconList } from '../../../../components/AllIcons';
import RbSheetComponent from '../../../reuseable_Component/RbSheetComponent';
import ProfileModalStyles from '../../../reuseable_Component/ProfileModalStyle';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { truncateAfterThreeCharacters } from '../../../../Services/GlobalFuntions';
import TextSlideAnimation from '../../../../components/Animation/TextSlideAnimation';

const TopHostLine = React.memo(({onPressHostImage, completeHostData, frameProfileUpdate, userUpdateDataNickName, hostId, hostImage, isFollowing, onPressFollow, fromAudiencePage}) => {
  const active_store = useSelector(state => state.homeRed.activeStoreData);
  const ProfileRef = useRef(null)
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);
  const userData = useSelector(state => state.auth.userData);
  const frameData = active_store?.filter(
    item => item?.parent_title === 'Frames',
  );
  // frameProfileUpdate={frameData?.[0]?.json_image}

    //  console.log('Hellooooooooooooooo11235');
  // const userData = useSelector(state => state.auth.userData);
  

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          if(fromAudiencePage){
           // ProfileRef.current.open()
           console.log('hereeeeeeeee')
           onPressHostImage()
          } 
          }
        } 
        style={[styles.profile, {position: 'relative', top: 17}]}
      >
        <AnimatedProfileDp
          img={hostImage}
          imgSize={30}
          frameSize={9}
          frame={frameProfileUpdate}
        />
      </TouchableOpacity>
      <View style={[styles.txtbox]}>

{ userUpdateDataNickName?.length >= 8 ?
      <View style={{width: 70, overflow: 'hidden'}}>
        <TextSlideAnimation name={userUpdateDataNickName} />
      </View>
  :
       <Text style={[styles.name, {wordWrap: 'break-word', width: 80}]}>
          {userUpdateDataNickName}
        </Text>
}

        <Text style={styles.id}>GL {hostId}</Text>
      </View>
      {fromAudiencePage && !isFollowing &&
      <TouchableOpacity onPress={() => onPressFollow()} style={{left: 0}}>
       <AllIcons name={IconList.AntDesign} iconName={'pluscircle'} size={18} color={'red'} />

      </TouchableOpacity>
}

<RbSheetComponent
          view={
            <ProfileModalStyles
                data={completeHostData}
                onPress={() => ProfileRef.current.close()}
                onPressCros={() => ProfileRef?.current?.close()}
               // isBottomHide={true}
                fromAudiencePage={fromAudiencePage}
              />
          }
        refUse={ProfileRef}
        close={false}
        backgroundColor={'transparent'}
        height={heightPercentageToDP(55)}
      />  

    </>
  );
});

export default TopHostLine;

const styles = StyleSheet.create({
  profile: {
    height: 35,
    width: 35,
    borderRadius: 25,
  },
  txtbox: {
    marginLeft: 3,
  },
  name: {
    color: 'white',
    fontSize: 12,
  },
  id: {
    color: 'white',
    fontSize: 10,
  },
});
