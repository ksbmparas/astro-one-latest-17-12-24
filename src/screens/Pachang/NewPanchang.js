import { StyleSheet, Text, View , } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Panchangscreen from './Panchangscreen';
import Chogadiya from './Chogadiya';
import Mahurat from './Mahurat';
import Yog from './Yog';
import { SCREEN_HEIGHT,SCREEN_WIDTH } from '../../config/Screen';
import MyHeader from '../../components/MyHeader';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../config/Constants1';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Fonts } from '../../assets/style';
import Ionicons from 'react-native-vector-icons/Ionicons'



const Tab=createMaterialTopTabNavigator();


const NewPanchang = () => {
    const navigation=useNavigation();
  return (
    <View style={{flex:1,}}>
        
         <View style={{ flexDirection: 'row', alignItems: 'center', gap: SCREEN_WIDTH * 0.06 ,paddingVertical:SCREEN_HEIGHT*0.01 }}>
        <TouchableOpacity onPress={()=>{
          navigation.goBack()
        }}>
        <Ionicons name="chevron-back" size={30} color={colors.black_color} />

        </TouchableOpacity>
        <Text style={{ ...Fonts.PoppinsMedium }}>Pachang</Text>
      </View>
       
      <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#D56A14", 
 
    
          
    
        },
        tabBarIndicatorStyle: {
            backgroundColor: 'white',
           
          },
       
        tabBarActiveTintColor: 'black', 
        tabBarInactiveTintColor: 'white', 
        tabBarLabelStyle: {
         
         fontWeight:"500", 
         fontSize:11
         
        },
      }}>

                <Tab.Screen name='Panchang' component={Panchangscreen}/>
                <Tab.Screen name='Chogadiya' component={Chogadiya}/>
                <Tab.Screen name='Mahurat' component={Mahurat}/>
                <Tab.Screen name='Yog' component={Yog}/>

    </Tab.Navigator>
     
    </View>
  )
}

export default NewPanchang

const styles = StyleSheet.create({})