import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Fonts } from '../../assets/style'
import { colors } from '../../config/Constants1'




const AartiDetails = ({ route }) => {

  const { aartiName, image } = route.params;

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require('../../assets/images/musicbg.png')}>
      {Header()}
      {photo()}


    </ImageBackground>
  )
  function photo() {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", paddingTop: SCREEN_HEIGHT * 0.1 }}>


        <Image
          style={{ height: SCREEN_HEIGHT * 0.2, width: SCREEN_WIDTH * 0.35 }}
          source={image} />
      </View>
    )
  }
  function Header() {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.03, paddingVertical: SCREEN_HEIGHT * 0.02, alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name='left' size={22} color={colors.black_color9} />
        </TouchableOpacity>
        <Text style={{ ...Fonts.PoppinsMedium, color: colors.black_color9, fontSize: 16 }}>{aartiName} </Text>
        <Image
          style={{ height: SCREEN_HEIGHT * 0.03, width: SCREEN_WIDTH * 0.06 }}
          source={require('../../assets/images/what.png')} />
      </View>
    )
  }
 
}

export default AartiDetails

const styles = StyleSheet.create({})