import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Linking, Alert, Clipboard, ToastAndroi, ToastAndroid } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen'

import Fontisto from 'react-native-vector-icons/Fontisto'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useSelector } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';

const ReferEarn = () => {
  const customerData = useSelector((state) => state.customer.customerData);
  console.log("customerData", customerData?.referral_code)
  const navigation = useNavigation();
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require('../assets/images/BG2.png')}>
      {back()}
      {refer()}
      {PHOTO()}
      {WELCOMETEXT()}
      {refercode()}
    </ImageBackground>

  )
  function refer() {
    return (
      <View style={{ alignItems: "center", paddingTop: SCREEN_HEIGHT * 0.1, }}>
        <Text style={{ color: "black", fontSize: 20, fontWeight: "500" }}>Refer & Earn</Text>
      </View>
    )
  }
  function PHOTO() {
    return (
      <View style={{ alignItems: "center" }}>
        <Image
          style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.3, }}
          source={require('../assets/images/LOG.png')} />
      </View>
    )
  }
  function WELCOMETEXT() {
    return (
      <View style={{ alignItems: "center", paddingHorizontal: SCREEN_WIDTH * 0.11, paddingTop: SCREEN_HEIGHT * 0.05 }}>
        <Text style={{ color: "black", fontSize: 10, fontWeight: "500" }}>Welcome to your sacred circle! Share the Temple link to add a follower in your Rudraksha Mala. Reach 108 referrals to become a featured Vishisht Bhakt in AstroOne's Mala. The top six Ati Vishisht Bhakt with the most followers will be showcased daily in the esteemed Sanatan Mandir.</Text>
      </View>
    )
  }
  function refercode() {
    return (
      <View>
        <View style={{ alignItems: "center", paddingVertical: SCREEN_HEIGHT * 0.08 }}>
          <Text style={{ color: "black", fontSize: 10, fontWeight: "500" }}>YOUR OWN EXCLUSIVE REFFERRAL CODE</Text>
          <Text
          onPress={() => {
            const referralCode = customerData?.referral_code || 'default_code';
            Clipboard.setString(referralCode);
            ToastAndroid.show('Referral code copied to clipboard!', ToastAndroid.SHORT);  
          }}
          style={{ color: "#D56A14", fontSize: 12, marginTop: 5, fontWeight: "600" }}>{customerData?.referral_code}</Text>
        </View>

        <TouchableOpacity
         onPress={() => {
          const referralCode = customerData?.referral_code || 'default_code';
          const message = `Join AstroOne using my referral code: ${referralCode} and enjoy the benefits!`;
          const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
          Linking.openURL(url).catch(() =>
            Alert.alert('Error', 'WhatsApp is not installed on your device.')
          );
        }}
        style={{
          backgroundColor:"#FBBC09",
          alignSelf:"center",
          display:"flex",
          flexDirection:"row",
          alignItems:'center',
          borderRadius:50,
          paddingHorizontal:10,
          gap:5,
          }}>
          <Image
              style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.09, resizeMode: "contain" }}
              source={require('../assets/images/what.png',)} />
            <Text style={{ fontSize: 12, color: "white", fontWeight: "500" }}>Share the link via Whatsapp</Text>
         
        </TouchableOpacity>



      </View>
    )
  }
  function back() {
    return (
      <View style={{ paddingVertical: SCREEN_HEIGHT * 0.02, paddingHorizontal: SCREEN_WIDTH * 0.025 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
         <Ionicons name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>
      </View>
    )
  }
}

export default ReferEarn

const styles = StyleSheet.create({})