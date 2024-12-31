import { StyleSheet, Text, View, ScrollView, TouchableOpacity, KeyboardAvoidingView, FlatList, Image } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen'
import { useState, useEffect } from 'react'

import { Colors } from '../config/Screen'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../config/Constants1'
import MyStatusBar from '../components/MyStatusbar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  fonts,
  getFontSize
} from '../config/Constants1'
import { Sizes } from '../assets/style'
import { goBack } from '../navigations/NavigationServices'
import { Searchbar } from 'react-native-paper';


const SendGifts = () => {
  const navigate = useNavigation()
  const [buttonStatus, setButtonStatus] = useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');

  const images = {
    samagri: require('../assets/images/Samagri.png'),
    flowers: require('../assets/images/Flowers.png'),
    heart: require('../assets/images/Heart.png'),
    chocolates: require('../assets/images/Choclates.png'),
    clove: require('../assets/images/clove.png'),
    sweets: require('../assets/images/Sweets.png'),
  };
  const DATA = [
    { id: '1', image: images.samagri, title: 'Samagri', prize: 11 },
    { id: '2', image: images.flowers, title: 'Flowers', prize: 15 },
    { id: '3', image: images.heart, title: 'Heart', prize: 21 },
    { id: '4', image: images.chocolates, title: 'Chocolates', prize: 21 },
    { id: '5', image: images.clove, title: 'Clove', prize: 21 },
    { id: '6', image: images.sweets, title: 'Sweets', prize: 21 },
  ];
  const renderitem = ({ item }) => {
    return (

        <View style={{flex:1, padding:5}}>
          <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderWidth:0.3, paddingHorizontal:20, paddingVertical:10, borderRadius:10}}>
            {/* <Image
              style={{ height: SCREEN_HEIGHT * 0.092, width: SCREEN_WIDTH * 0.19 }}
              source={item.image} /> */}
            <View>
              <Text style={{ fontSize: 16, fontWeight: "500", color: "black" }}>Dcp Rana</Text>
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#D56A14" }}>Prize:₹ 100 </Text>
            </View>
            <View style={{ paddingVertical: SCREEN_HEIGHT * 0.01 }}>
              <TouchableOpacity style={{ backgroundColor: "#D56A14", width: SCREEN_WIDTH * 0.35, alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.01, borderRadius: 5 }}>
                <Text style={{ color: "white,", fontSize: 12, color: "white" }}>Send Mudra</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>


    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: SCREEN_WIDTH * 0.02, }}>

      <MyStatusBar
        backgroundColor={colors.white_color}
        barStyle="dark-content"
        N

      />

      <View style={{ flexDirection: "row", justifyContent: "space-between", width: "50%", paddingVertical: SCREEN_HEIGHT * 0.02 }}>
        <TouchableOpacity onPress={() => goBack()}>
          < AntDesign name='left' size={23} color={colors.black_color} />
        </TouchableOpacity>
        <Text style={{ color: colors.black_color, fontWeight: "500", fontSize: Sizes.fixPadding * 2 }}>Gift</Text>
      </View>


      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingVertical: 13,
          borderRadius: 10,

          backgroundColor: colors.background_theme2
        }}>
        <TouchableOpacity
          onPress={() => setButtonStatus(true)}
          style={{
            ...styles.buttonContainer,
            backgroundColor: buttonStatus
              ? "white"
              : colors.background_theme2,
          }}>
          <Text allowFontScaling={false}
            style={{
              ...styles.buttonText,
              color: buttonStatus
                ? colors.black_color
                : colors.white_color,
            }}>
            Send Gift
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setButtonStatus(false)}
          style={{
            ...styles.buttonContainer,
            backgroundColor: !buttonStatus
              ? "white"
              : colors.background_theme2,
          }}>
          <Text allowFontScaling={false}
            style={{
              ...styles.buttonText,
              color: !buttonStatus
                ? colors.black_color9
                : colors.white_color,
            }}>
            Gift History
          </Text>
        </TouchableOpacity>


      </View>

      <View style={{ padding: 10 }}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{backgroundColor:"white", borderWidth:0.2}}
        />
      </View>



      {buttonStatus ? (
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 0,
              width: '100%',
              backgroundColor: colors.white_color,
              // paddingTop: SCREEN_HEIGHT * 0.05

            }}>


            <FlatList

              // numColumns={2}
              // numColumns={1}
              data={DATA}
              renderItem={renderitem}
              keyExtractor={(item) => item.id}

            />













          </View>
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, margin: 15 }}>
          <View
            style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }}>

            {NODATA()}

          </View>
          <View
            style={{
              flex: 0,
              width: '100%',
              backgroundColor: colors.white_color,
              padding: 15,
              marginTop: 20,
              borderRadius: 5,
              shadowColor: colors.black_color6,
              shadowOffset: {
                width: -2,
                height: 2,
              },
              shadowOpacity: 0.3,
            }}>
            <View
              style={{
                flex: 0,
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 2,
                paddingHorizontal: 2,
                marginTop: 30,
              }}>

            </View>
          </View>
        </KeyboardAvoidingView>
      )}



    </View>
  )
  function NODATA() {
    return (

      <View style={{ alignItems: "center", justifyContent: "center", paddingTop: SCREEN_HEIGHT * 0.25 }}>

        <View>
          <Image
            style={{ height: SCREEN_HEIGHT * 0.2, width: SCREEN_WIDTH * 0.4 }}
            source={require('../assets/images/emptybox.png')} />
        </View>
        <Text style={{ color: "black", fontWeight: "400", fontSize: 15 }}>No Data Available </Text>
      </View>

    )
  }
}

export default SendGifts

const styles = StyleSheet.create({
  buttonContainer: {
    width: '40%',
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: colors.background_theme1,
  },
  buttonText: {
    fontSize: getFontSize(1.4),
    color: colors.background_theme1,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
  inputContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.black_color6,
    paddingHorizontal: SCREEN_WIDTH * 0.02,
    paddingVertical: SCREEN_HEIGHT * 0.003,
    borderRadius: 10,
    marginBottom: 20,
  },
  checkBoxText: {
    fontSize: getFontSize(1.4),
    color: colors.black_color8,
    fontFamily: fonts.medium,
    textDecorationLine: 'none',
  },
});