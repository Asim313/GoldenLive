import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ApiCallToken } from '../../../Services/Apis';
import { useSelector } from 'react-redux';

const RecordCardComponent = ({onCrossPress}) => {
  const userData = useSelector(state => state.auth.userData);
  const [recordData,setRecordData] = useState([]);

  useEffect(() => {
    getRecordData()
  }, [])

  const getRecordData = async () => {
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'get-winner-record',
        verb: 'GET',
      });
      setRecordData(res?.code)
    } catch (error) {
      console.log('ERROR getRecordData', error);
    }
  };

  const renderItem = ({item}) => (
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
    
      <View
        style={styles.rowCellStyle}>
        {item?.winner_record === 'A' && 
          <Image style={{width: 30, height: 30}}
                          source={require('../images/strawberry.png')}
          />
        }
      </View>

      <View
        style={styles.rowCellStyle}>
        {item?.winner_record === 'B' && 
          <Image style={{width: 30, height: 30}}
                          source={require('../images/melon.png')}
          />
        }
      </View>

      <View
        style={styles.rowCellStyle}>
        {item?.winner_record === 'C' && 
          <Image style={{width: 30, height: 30}}
                          source={require('../images/orange.png')}
          />
        }
      </View>

    </View>
  );

  return (
    <View style={styles.container}>

<View style={[styles.titleView, {position: 'absolute', top: 0}]}>
          <Image
            source={require('../images/RecordTitle.png')}
            style={styles.titleImage}
          />
          {/* <Text style={styles.titleText}>Record</Text> */}
        </View>
      <View style={styles.bar}>
        <View style={styles.imageView}>
          <TouchableOpacity onPress={onCrossPress}>
            <Image
              source={require('../images/Cross.png')}
              style={styles.crossImage}
            />
          </TouchableOpacity>
        </View>
  
</View>
      

      
      <View style={styles.namesBar}>
        <View style={styles.strawberryView}>
          <Text style={styles.strawberryText}>Strawberry</Text>
        </View>
        <View style={styles.waterMelonView}>
          <Text style={styles.waterMelonText}>Watermelon</Text>
        </View>
        <View style={styles.mangoView}>
          <Text style={styles.mangoText}>Orange</Text>
        </View>
      </View>

      <View
        style={{
          height: '75%',
          width: '75%',
          // left: '18%',
          top: 5,
        }}>
        <FlatList
          data={recordData}
          renderItem={renderItem}
          // numColumns={1}
          contentContainerStyle={{justifyContent: 'space-evenly'}}
        />
      </View>
    </View>
  );
};

export default RecordCardComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#71008B',
    borderRadius: 10,
  },
  bar: {
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  titleView: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 10,
   
  },
  titleImage: {
    height: 50,
    width: 100,
  },
  imageView: {
    height: '70%',
    width: '10%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: -17,
    // marginTop: -3,
  },
  crossImage: {
    height: 40,
    width: 40,
  },
  namesBar: {
    height: '7%',
    width: '75%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 8,
    // marginLeft: '18%',
  },
  mangoView: {
    flex: 1,
    height: '100%',
    backgroundColor: '#F7B110',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waterMelonView: {
    flex: 1,
    height: '100%',
    backgroundColor: '#4C971A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  strawberryView: {
    flex: 1,
    height: '100%',
    backgroundColor: '#98292B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mangoText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  waterMelonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  strawberryText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  rowCellStyle: {
    width: '33.3%',
    height: 40,
    borderWidth: 1,
    borderColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
