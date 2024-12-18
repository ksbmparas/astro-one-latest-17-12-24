import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, TextInput, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH, } from '../../config/Screen'
import { useState } from 'react';
import { colors } from '../../config/Constants1';
import { Fonts } from '../../assets/style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import DateTimePicker from '@react-native-community/datetimepicker';

const Chogadiya = () => {
  const [buttonStatus, setButtonStatus] = useState(true);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const onPress = () => {
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  const Data = [

    { id: "1", chogadiya: 'Kaal', start: '7;20', end: '8:20' },
    { id: "2", chogadiya: 'Subh', start: '8;20', end: '2:20' },
    { id: "3", chogadiya: 'Rog', start: '7;27', end: '4:20' },
    { id: "4", chogadiya: 'Udveg', start: '8;20', end: '8:20' },
    { id: "4", chogadiya: 'Char', start: '4;20', end: '6:20' },
    { id: "5", chogadiya: 'Labh', start: '7;20', end: '8:20' },
    { id: "6", chogadiya: 'Amrit', start: '7;20', end: '5:20' },
    { id: "7", chogadiya: 'Kaal', start: '7;20', end: '8:20' },

  ]
  const Data2 = [

    { id: "1", chogadiya: 'Udveg', start: '7;20', end: '8:20' },
    { id: "2", chogadiya: 'Subh', start: '8;20', end: '2:20' },
    { id: "3", chogadiya: 'Rog', start: '7;27', end: '4:20' },
    { id: "4", chogadiya: 'Udveg', start: '8;20', end: '8:20' },
    { id: "4", chogadiya: 'Char', start: '4;20', end: '6:20' },
    { id: "5", chogadiya: 'Labh', start: '7;20', end: '8:20' },
    { id: "6", chogadiya: 'Amrit', start: '7;20', end: '5:20' },
    { id: "7", chogadiya: 'Kaal', start: '7;20', end: '8:20' },

  ]

  const renderItem = ({ item }) => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.02, borderWidth: 1, borderRadius: 10, borderColor: colors.background_theme2, margin: SCREEN_HEIGHT * 0.005 }}>
        <Text style={{ color: colors.white_color, fontSize: 13, fontWeight: "500" }}>{item.chogadiya}</Text>
        <Text style={{ color: colors.white_color, fontSize: 13, fontWeight: "500" }}>{item.start}</Text>
        <Text style={{ color: colors.white_color, fontSize: 13, fontWeight: "500" }}>{item.end}</Text>
      </View>
    )
  }
  const renderItem2 = ({ item }) => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.02, borderWidth: 1, borderRadius: 10, borderColor: colors.background_theme2, margin: SCREEN_HEIGHT * 0.005 }}>
        <Text style={{ color: colors.white_color, fontSize: 13, fontWeight: "500" }}>{item.chogadiya}</Text>
        <Text style={{ color: colors.white_color, fontSize: 13, fontWeight: "500" }}>{item.start}</Text>
        <Text style={{ color: colors.white_color, fontSize: 13, fontWeight: "500" }}>{item.end}</Text>
      </View>
    )
  }
  return (
    <ImageBackground
      source={require('../../assets/images/BG45.png')}
      style={{ flex: 1, }}>

      {buttons()}
    </ImageBackground>
  )

  function buttons() {
    return (
      <View>

        <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.022, paddingTop: SCREEN_HEIGHT * 0.02 }}>
          <View
            style={{
              flex: 0,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingVertical: 7,
              borderRadius: 10,

            }}>

            <TouchableOpacity
              onPress={() => setButtonStatus(true)}
              style={{
                elevation: 20,
                width: SCREEN_WIDTH * 0.4,
                height: SCREEN_HEIGHT * 0.05,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
              
                backgroundColor: buttonStatus

                  ? colors.background_theme2
                  : colors.background_theme1,
              }}>
              <Text allowFontScaling={false}
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: buttonStatus
                    ? colors.white_color
                    : colors.black_color9,
                }}>
                Today
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setButtonStatus(false)}
              style={{
                borderRadius: 20,
                elevation: 20,
                width: SCREEN_WIDTH * 0.4,
                height: SCREEN_HEIGHT * 0.05,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: !buttonStatus
                  ? colors.background_theme2
                  : colors.background_theme1,
              }}>
              <Text allowFontScaling={false}
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: !buttonStatus
                    ? colors.white_color
                    : colors.black_color9,
                }}>
                Tommorow
              </Text>
            </TouchableOpacity>
            
          </View>
        </View>
           
        {buttonStatus ? (
          <View style={{ height: "100%", width: '100%', paddingBottom: SCREEN_HEIGHT * 0.1 }}>
            <View style={{ paddingBottom: SCREEN_HEIGHT * 0.03, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingRight: SCREEN_WIDTH * 0.03 }}>
              <View style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.4, paddingVertical: SCREEN_HEIGHT * 0.005 }}>
                <Image
                  style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.4, resizeMode: "contain" }}
                  source={require('../../assets/images/pal2.png')} />
                <View style={{ width: SCREEN_WIDTH * 0.4, alignItems: "center", bottom: SCREEN_HEIGHT * 0.04 }}>

                  <Text style={{ color: colors.white_color, fontWeight: "500", fontSize: 13 }}>आज का चौघड़िया</Text>
                </View>
              </View>
              <TouchableOpacity onPress={onPress}>
                <MaterialIcons name="date-range" size={20} color={"black"} />
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
            </View>


            <ImageBackground
              style={{ flex: 0.7 }}
              source={require('../../assets/images/BG120.png')}>

              <View style={{ flexDirection: 'row', justifyContent: "space-evenly", alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.017, backgroundColor: colors.background_theme2 }}>
                <Text style={{ color: colors.white_color, fontSize: 12, fontWeight: "500" }}>Chogadiya</Text>
                <Text style={{ color: colors.white_color, fontSize: 12, fontWeight: "500" }}>START TIME</Text>
                <Text style={{ color: colors.white_color, fontSize: 12, fontWeight: "500" }}>END TIME</Text>
              </View>

              <View>
                <FlatList
                  data={Data}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id} />

              </View>


            </ImageBackground>







          </View>
        ) : (
          <View
            style={{ height: "100%", width: '100%', paddingBottom: SCREEN_HEIGHT * 0.1 }}>

            <View style={{ paddingBottom: SCREEN_HEIGHT * 0.03, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingRight: SCREEN_WIDTH * 0.03 }}>
              <View style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.4, paddingVertical: SCREEN_HEIGHT * 0.005 }}>
                <Image
                  style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.4, resizeMode: "contain" }}
                  source={require('../../assets/images/pal2.png')} />
                <View style={{ width: SCREEN_WIDTH * 0.4, alignItems: "center", bottom: SCREEN_HEIGHT * 0.04 }}>

                  <Text style={{ color: colors.white_color, fontWeight: "500", fontSize: 13 }}>कल का चौघड़िया</Text>
                </View>
              </View>
              <TouchableOpacity onPress={onPress}>
                <MaterialIcons name="date-range" size={20} color={"black"} />
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
            </View>


            <ImageBackground
              style={{ flex: 0.7 }}
              source={require('../../assets/images/BG120.png')}>

              <View style={{ flexDirection: 'row', justifyContent: "space-evenly", alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.017, backgroundColor: colors.background_theme2 }}>
                <Text style={{ color: colors.white_color, fontSize: 12, fontWeight: "500" }}>Chogadiya</Text>
                <Text style={{ color: colors.white_color, fontSize: 12, fontWeight: "500" }}>START TIME</Text>
                <Text style={{ color: colors.white_color, fontSize: 12, fontWeight: "500" }}>END TIME</Text>
              </View>

              <View>
                <FlatList
                  data={Data2}
                  renderItem={renderItem2}
                  keyExtractor={(item) => item.id} />

              </View>


            </ImageBackground>





          </View>
        )}

      </View>
    )
  }
}

export default Chogadiya

const styles = StyleSheet.create({})