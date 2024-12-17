import { StyleSheet, Text, View, ImageBackground, Image ,TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen'

import Fontisto from 'react-native-vector-icons/Fontisto'
import AntDesign from 'react-native-vector-icons/AntDesign'

const ReferEarn = () => {
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
      <View style={{  alignItems: "center" }}>
        <Image
          style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.3, }}
          source={require('../assets/images/LOG.png')} />
      </View>
    )
  }
  function WELCOMETEXT() {
    return (
      <View style={{ alignItems: "center", paddingHorizontal: SCREEN_WIDTH * 0.11,paddingTop:SCREEN_HEIGHT*0.05 }}>
        <Text style={{ color: "black", fontSize: 10, fontWeight: "500" }}>Welcome to your sacred circle! Share the Temple link to add a follower in your Rudraksha Mala. Reach 108 referrals to become a featured Vishisht Bhakt in AstroOne's Mala. The top six Ati Vishisht Bhakt with the most followers will be showcased daily in the esteemed Sanatan Mandir.</Text>
      </View>
    )
  }
  function refercode() {
    return (
      <View>
        <View style={{  alignItems: "center", paddingVertical:SCREEN_HEIGHT*0.08}}>
          <Text style={{ color: "black", fontSize: 10, fontWeight: "500" }}>YOUR OWN EXCLUSIVE REFFERRAL CODE</Text>
        </View>


      <View style={{gap:10 ,paddingVertical:SCREEN_HEIGHT*0.02}}>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, justifyContent: "center", gap: 15, width: SCREEN_WIDTH * 0.55, backgroundColor: "#060141", paddingVertical: SCREEN_HEIGHT * 0.01, borderRadius: 5, borderColor: "white", borderStyle: "dashed" ,}}>
            <Text style={{ fontWeight: "500", color: "white" }}>DFCR74268</Text>

            <View >
              <Fontisto name='copy' color='white' size={20} />
            </View>
          </View>
        </View>

      <View style={{alignItems:"center"}}>
        <View style={{flexDirection:"row" ,alignItems:"center"  ,backgroundColor:'#FBBC09',gap:4,width:SCREEN_WIDTH*0.5,borderRadius:20,paddingHorizontal:SCREEN_WIDTH*0.01}}>
     
          <View style={{}}>
            <Image
              style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.09 ,resizeMode:"contain"}}
              source={require('../assets/images/what.png',)} />
          </View>
          <View>
            <Text style={{fontSize:8 ,color:"white",fontWeight:"500"}}>Share the link via Whatsapp</Text>
          </View>
        </View>
        </View>

        <View style={{alignItems:"center"}}>
        <View style={{flexDirection:"row" ,alignItems:"center"  ,backgroundColor:'#FBBC09',gap:4,width:SCREEN_WIDTH*0.5,borderRadius:20,paddingVertical:SCREEN_HEIGHT*0.008,paddingHorizontal:SCREEN_WIDTH*0.01}}>
     
          <View> 
          <AntDesign name='sharealt' color={'white'} size={30}/>
          </View>
          <View>
            <Text style={{fontSize:8 ,color:"white",fontWeight:"500"}}>Share the link via Whatsapp</Text>
          </View>
        </View>
        </View>

        </View>


      </View>
    )
  }
  function back(){
    return(
      <View style={{paddingVertical:SCREEN_HEIGHT*0.02,paddingHorizontal:SCREEN_WIDTH*0.025}}>    
                <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name='left' size={27} color='black'/>
              </TouchableOpacity>
      </View>
    )
  }
}

export default ReferEarn

const styles = StyleSheet.create({})