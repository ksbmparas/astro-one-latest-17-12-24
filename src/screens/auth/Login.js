import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  ScrollView,
  Linking,
  Alert,
  Keyboard,
} from 'react-native';
import React, { useEffect } from 'react';
import MyStatusBar from '../../components/MyStatusbar';
import { api_url, colors, fonts, signup_google, api2_get_profile, getFontSize } from '../../config/Constants1';
import { useState } from 'react';
import MyLoader from '../../components/MyLoader';
import axios from 'axios';
import { CommonActions, useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as CustomerActions from '../../redux/actions/CustomerActions';
import { connect } from 'react-redux';
import CountryPicker from 'react-native-country-picker-modal';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import {
  GoogleSignin,

} from '@react-native-google-signin/google-signin';
import { success_toast, warnign_toast } from '../../components/MyToastMessage';
import * as AuthActions from '../../redux/actions/AuthActions'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { logo, mainlogo } from '../../assets/images/Images';
import { Fonts } from '../../assets/style';

const { width, height } = Dimensions.get('screen');

GoogleSignin.configure();

const Login = props => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState({ callingCode: '91', cca2: 'IN' });
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
    });
  }, []);


  const login = async () => {
    try {
      const phoneRegex = /^\d{10}$/;
  
      if (!isChecked) {
        warnign_toast('Please accept the Terms of Use before proceeding');
      } else if (phoneNumber.length === 0) {
        warnign_toast('Please Enter Mobile Number');
      } else if (!phoneRegex.test(phoneNumber)) {
        warnign_toast('Please Enter Correct Mobile Number');
      } else {
        // Proceed with login if all conditions are met
       props.dispatch(AuthActions.onLogin({ phoneNumber: phoneNumber }));
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  const handleSelectCountry = (country) => {
    setCode({
      callingCode: country.callingCode[0],
      cca2: country.cca2,
    });
    setCountryModalOpen(false); 
  };

  const navigation = useNavigation();

  

  return (
    <View style={{ flex: 1, }}>
      <MyStatusBar
        backgroundColor={colors.background_theme1}
        barStyle="dark-content"
      />
      <MyLoader isVisible={isLoading} />
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      {/* <View
          style={{
            backgroundColor: 'white',
            marginTop: 125,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            shadowColor: "#000000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.20,
            shadowRadius: 5.62,
            elevation: 7,
            height: height * 0.8
          }}> */}

      <View style={{ alignItems: "center" }}>
        <Image style={{ transform: [{ rotate: '180deg' }], height: SCREEN_HEIGHT * 0.37, width: SCREEN_WIDTH * 1 }} source={require('../../assets/images/design.png')} />
        <Image
          style={{ height: SCREEN_HEIGHT * 0.41, width: SCREEN_WIDTH * 0.6, bottom: SCREEN_HEIGHT * 0.35 }}
          source={require('../../assets/images/guru.png')} />
      </View>
      <View style={{ bottom: SCREEN_HEIGHT * 0.4 }}>
        <View style={{ alignItems: "center" }}>
          <Text allowFontScaling={false}
            style={{
              textAlign: 'center',
              fontSize: getFontSize(2.5),

// ...Fonts.SourGummyItalic,
              color: colors.black_color8,
              fontWeight: "500"
            }}>
            Login
          </Text>
          <Image
            style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.6 }}
            source={require('../../assets/images/design2.png')} />

        </View>

        <View style={{ bottom: SCREEN_HEIGHT * 0.03 }}>
          {/* <Text allowFontScaling={false}
        style={{
          textAlign: 'center',
          fontSize: getFontSize(2.5),
          color: colors.background_theme2,
          fontFamily: fonts.bold,
          marginTop: 2,
          marginBottom: 2,
        }}> */}
          {/* {isAstrodate ? 'Astrodate' : 'Astrokunj'} */}
          {/* AstroOne
      </Text> */}
          {/* <Text allowFontScaling={false}
        style={{
          textAlign: 'center',
          fontSize: getFontSize(1.5), */}
          {/* // fontSize:15
          // ,
          color: colors.black_color8,
          fontFamily: fonts.medium,
          marginTop: 10,
        }}>
        Enter Your Mobile Number To Continue
      </Text> */}
          <KeyboardAvoidingView
            behavior={Platform.OS == 'android' ? 'padding' : 'height'}>
            <View
              style={{
                flex: 0,
                width: '88%',
                paddingVertical: SCREEN_HEIGHT * 0.003,
                paddingHorizontal:SCREEN_WIDTH*0.02,
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',

                borderColor: colors.background_theme4,
                borderRadius: 10,
                marginBottom: 5,
                marginTop: 30, backgroundColor: "lightgray"
              }}>

              <TouchableOpacity onPress={() => setCountryModalOpen(true)}>
                <View style={{ flexDirection: 'row', alignItems: 'center' ,gap:8}}>
                  <Image
                    style={{
                      width: 25,
                      height: 20,
                     
                      
                    }}
                    source={{
                      uri: `https://flagcdn.com/w320/${code.cca2.toLowerCase()}.png`,
                    }}
                  />
                  <Text allowFontScaling={false} style={{ fontSize: getFontSize(1.3), fontWeight:"500", color: colors.black_color9 }}>
                    {`(${code.cca2}) +${code.callingCode}`} 
                  </Text>
                </View>

                
              </TouchableOpacity>

             
              <View style={{paddingLeft:1.1}}>
              <AntDesign name='caretdown' size={8}/>
              </View>
              <TextInput
                placeholder="Enter Your Mobile Number"
                placeholderTextColor={colors.black_color6}
                keyboardType="numeric"
                onChangeText={text => {

                  if (text.length > 0 && text[0] === '0') {

                    setPhoneNumber(text.slice(1));
                  } else {
                    setPhoneNumber(text);
                  }

                  if (text.length >= 10) {
                    Keyboard.dismiss();
                  }
                }}
                style={{ width: '80%', fontSize: getFontSize(1.4), padding: 8, color: 'black' }}
                maxLength={10}
                onTouchEndCapture={() => console.log('bye')}
                underlineColorAndroid='transparent'
                onSubmitEditing={() => login()}
                cursorColor={colors.background_theme2}
                disableFullscreenUI={false}
              />
            </View>
          </KeyboardAvoidingView>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={login}
            style={{
              flex: 0,
              width: '88%',
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 10,
              marginBottom: height * 0.015,
              paddingVertical: 10,
              backgroundColor: colors.background_theme2,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              // borderWidth:1
            }}>
            <Text allowFontScaling={false} style={{ fontSize: getFontSize(2), paddingRight: 20, fontWeight: 'bold', color: colors.white_color }}>
              Login
            </Text>
            {/* <AntDesign
          name="arrowright"
          color={colors.white_color}
          size={20}
        /> */}
          </TouchableOpacity>

        
          <TouchableOpacity
            onPress={() => navigation.navigate("AstrologerLogin")}
            style={{
              flex: 0,
              width: '88%',
              alignSelf: 'center',

              alignItems: 'center',
              borderRadius: 15,
              marginBottom: height * 0.02,
              paddingVertical: 10,
              borderColor: colors.background_theme2,
              justifyContent: 'center',
              alignItems: 'center',

              borderWidth: 1
            }}>
            <Text allowFontScaling={false} style={{ fontSize: getFontSize(1.8), paddingRight: 20, fontWeight: 'bold', color: colors.background_theme2 }}>Astrologer Login</Text>
          </TouchableOpacity>






          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 46, bottom: SCREEN_HEIGHT * 0.01 }}>

            <View style={{ borderBottomWidth: 1, width: SCREEN_WIDTH * 0.33, borderBottomColor: "lightgray" }}>
            </View>
            <View>
              <Text style={{ fontSize: 13 }}>or</Text>
            </View>
            <View style={{ borderBottomWidth: 1, width: SCREEN_WIDTH * 0.33, borderBottomColor: "lightgray" }}>
            </View>

          </View>


          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", paddingBottom: SCREEN_HEIGHT * 0.01, bottom: SCREEN_HEIGHT * 0.01, }}>

            <TouchableOpacity
            style={{height: SCREEN_HEIGHT * 0.08, width: SCREEN_WIDTH * 0.17,}}
            onPress={() => { props.dispatch(AuthActions.onGoogleLogin()) }}>
              <Image
              resizeMode='contain'
                style={{ height: '100%', width: '100%' }}
                source={require('../../assets/icons/google2.webp')} />
                </TouchableOpacity>

            <TouchableOpacity 
            style={{ height: SCREEN_HEIGHT * 0.052, width: SCREEN_WIDTH * 0.11}}
            onPress={() => Linking.openURL('https://www.facebook.com/')}>
              <Image
              resizeMode='contain'
                style={{ height: '100%', width:'100%' }}
                source={require('../../assets/images/facebook1.png')} />
                </TouchableOpacity>

          </View>



         <View style={{paddingHorizontal:20,}}>
          <View
            style={{
              display:"flex",
              flexDirection:"row",
            }}>
            <BouncyCheckbox
              size={getFontSize(1.8)}
              fillColor={colors.background_theme2}
              onPress={() => setIsChecked(!isChecked)}
              innerIconStyle={{
                borderRadius: 5,
                backgroundColor: isChecked
                  ? colors.background_theme2
                  : colors.background_theme1,
              }}
            /> 
            <Text allowFontScaling={false}
              style={{
                fontSize: getFontSize(1.25),
                color: colors.black_color7,
                fontFamily: 'medium',
                textAlign: 'center',
                width:"90%"
              }}>
              By signing up, you acknowledge and agree to our {' '}
              <Text allowFontScaling={false}
                style={{ fontSize: getFontSize(1.2), color: colors.background_theme2, paddingTop: 10, textDecorationLine: "underline", }}
                onPress={() => Linking.openURL('https://astroone.in/Terms-Conditions.html')}
              >
                Terms of Use
              </Text>{'  '}
              and{'  '}
              <Text allowFontScaling={false}
                style={{ fontSize: getFontSize(1.2), color: colors.background_theme2, textDecorationLine: "underline" }}
                onPress={() => Linking.openURL('https://astroone.in/Privacy-policy.html')}
              >
                Privacy Policy
              </Text>
            </Text>
          </View>
          </View>
          <View style={{ flex: 0, alignItems: 'center' }}>
            {/* <TouchableOpacity onPress={() => {props.dispatch(AuthActions.onGoogleLogin())}} style={{
              borderWidth: 1,
              borderColor: colors.background_theme2,
              borderRadius: 50, padding: 10, flexDirection: 'row', marginBottom: 10
            }}>
              <Image source={require('../../assets/images/icon/google.png')} style={{ width: 20, height: 20 }} />
              <Text allowFontScaling={false} style={{ color: 'black', paddingLeft: 10, fontSize: getFontSize(1.5) }}>Google Login</Text>
            </TouchableOpacity> */}
          </View>

          
          
        </View>
        {/* </View> */}
        {/* </ScrollView> */}
        
        
      </View>

                <View>
                <CountryPicker
          visible={countryModalOpen}
          withFlag
          withCallingCode
          withFilter 
          withCountryNameButton={false}
          onSelect={handleSelectCountry}
          onClose={() => setCountryModalOpen(false)}
          modalProps={{
            style: { ...styles.modalContainer },
            headerStyle: styles.modalHeader,
            headerTextStyle: styles.modalHeaderText, 
          }}
        />
        
                </View>

    </View>
    
  );
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(null, mapDispatchToProps)(Login);


const styles = StyleSheet.create({
  loginButtonContainer: {
    flex: 0,
    width: '40%',
    paddingVertical: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white_color,
    borderWidth: 1,
    borderColor: colors.background_theme4
  },
  loginButtonText: {
    fontSize: getFontSize(1.4),
    color: colors.background_theme4,
    fontFamily: fonts.medium,
  },
  modalContainer: {
    width: '50%',  
    // maxWidth: 500, 
    alignSelf: 'center', 
  },
});
