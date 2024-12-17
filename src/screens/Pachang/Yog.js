import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { colors } from '../../config/Constants1';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

const Yog = () => {
  const [buttonStatus, setButtonStatus] = useState(0);
    const [show, setShow] = useState(false);
      const [date, setDate] = useState(new Date());
  const onPress = () => {
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  const Data = [
    { id: "1", name: 'Yog', start: 'AMRITSIDHHI',  },
    { id: "2", name: 'Subh', start: '8:20',  },
    { id: "3", name: 'Rog', start: '7:27',  },
    { id: "4", name: 'Udveg', start: '8:20', },
    { id: "4", name: 'Char', start: '4:20',  },
  
  ];

  const Data2 = [
    { id: "1", name: 'yog', start: 'SARVATHSIDHHI', end: '8:20' },
    { id: "2", name: 'Subh', start: '8:20', end: '2:20' },
    { id: "3", name: 'Rog', start: '7:27', end: '4:20' },
    { id: "4", name: 'Udveg', start: '8:20', end: '8:20' },
    { id: "4", name: 'Char', start: '4:20', end: '6:20' },
    { id: "5", name: 'Labh', start: '7:20', end: '8:20' },
    { id: "6",name: 'Amrit', start: '7:20', end: '5:20' },
    { id: "7", name: 'Kaal', start: '7:20', end: '8:20' },
  ];

  const Data3 = [
    { id: "1", name: 'yog', start: 'GURUPUSHYA', end: '7:20' },
    { id: "2",name: 'Subh', start: '7:20', end: '1:20' },
    { id: "3", name: 'Rog', start: '6:27', end: '3:20' },
    { id: "4", name: 'Udveg', start: '7:20', end: '7:20' },
    { id: "5", name: 'Labh', start: '6:20', end: '7:20' },
  ];

  const Data4 = [
    { id: "1", name: 'yog', start: 'RAVIPUSHYA', end: '8:20' },
    { id: "2", name: 'Amrit', start: '7:30', end: '5:20' },
    { id: "3",  name: 'Kaal', start: '8:20', end: '9:20' },
    { id: "4",  name: 'Udveg', start: '7:20', end: '7:20' },
    { id: "5", name: 'Char', start: '5:20', end: '6:20' },
  ];

  
  const getDataForCurrentStatus = () => {
    switch (buttonStatus) {
      case 0:
        return Data;
      case 1:
        return Data2;
      case 2:
        return  Data3;
      case 3:
        return  Data4;
      default:
        return Data;
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.02,borderBottomWidth:1,borderBottomColor:colors.black_color9, borderColor: colors.background_theme2,paddingHorizontal:SCREEN_WIDTH*0.1}}>
      <Text style={{ color: colors.white_color, fontSize: 13, fontWeight: "500" }}>{item.name}</Text>
      <Text style={{ color: colors.white_color, fontSize: 13, fontWeight: "500" }}>{item.start}</Text>
 
    </View>
  );
  return (
    <ImageBackground
      source={require('../../assets/images/BG45.png')}
      style={{ flex: 1, }}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../../assets/images/BG120.png')}>



        {buttons()}



      </ImageBackground>

    </ImageBackground>
  )
  function buttons() {
    return (
      <View>
        <ScrollView

          style={{ height: SCREEN_HEIGHT * 0.1 }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}>

          <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", gap: 10 ,paddingHorizontal:SCREEN_WIDTH*0.015}}>


            <TouchableOpacity onPress={onPress}>
              <MaterialIcons name="date-range" size={25} color={"white"} />
            </TouchableOpacity>



            {show && (
              <DateTimePicker
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}


            <TouchableOpacity
              onPress={() => setButtonStatus(0)}
              style={{

                width: SCREEN_WIDTH * 0.4,
                height: SCREEN_HEIGHT * 0.06,
                borderRadius: 10,

                alignItems: "center",
                justifyContent: "center",
                backgroundColor: buttonStatus === 0 ? colors.background_theme2 : colors.background_theme1,
              }}
            >
              <Text style={{
                fontSize: 14,
                fontWeight: "500",
                color: buttonStatus === 0 ? colors.white_color : colors.background_theme2,
              }}>AMRITSIDHHI</Text>
            </TouchableOpacity>


            <TouchableOpacity
              onPress={() => setButtonStatus(1)}
              style={{

                width: SCREEN_WIDTH * 0.4,
                height: SCREEN_HEIGHT * 0.06,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: buttonStatus === 1 ? colors.background_theme2 : colors.background_theme1,
              }}
            >
              <Text style={{
                fontSize: 14,
                fontWeight: "500",
                color: buttonStatus === 1 ? colors.white_color : colors.background_theme2,
              }}>SARVATHSIDHHI</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setButtonStatus(2)}
              style={{

                width: SCREEN_WIDTH * 0.4,
                height: SCREEN_HEIGHT * 0.06,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: buttonStatus === 2 ? colors.background_theme2 : colors.background_theme1,
              }}
            >
              <Text style={{
                fontSize: 14,
                fontWeight: "500",
                color: buttonStatus === 2 ? colors.white_color : colors.background_theme2,
              }}>GURUPUSHYA</Text>
            </TouchableOpacity>


            <TouchableOpacity
              onPress={() => setButtonStatus(3)}
              style={{

                width: SCREEN_WIDTH * 0.4,
                height: SCREEN_HEIGHT * 0.06,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: buttonStatus === 3 ? colors.background_theme2 : colors.background_theme1,
              }}
            >
              <Text style={{
                fontSize: 14,
                fontWeight: "500",
                color: buttonStatus === 3 ? colors.white_color : colors.background_theme2,
              }}>RAVIPUSHYA</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

       <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:SCREEN_WIDTH*0.1,paddingVertical:SCREEN_HEIGHT*0.02,borderBottomWidth:1,borderBottomColor:colors.background_theme2}}>
          <Text style={{fontSize:15,color:colors.white_color,fontWeight:"500"}}>Day</Text>
          <Text style={{fontSize:15,color:colors.white_color,fontWeight:"500"}}>Sunday</Text>
         
        </View>


        <FlatList
          data={getDataForCurrentStatus()}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />

      </View>
    )
  }
}

export default Yog

const styles = StyleSheet.create({})