import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import {
  api2_logout,
  api_url,
  base_url,
  colors,
  fonts,
  getFontSize,
} from '../config/Constants1';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Share from 'react-native-share';
import { openFacebook, openInstagram, openLinkedIn } from '../components/Methods';
import { useEffect } from 'react';
const { width, height } = Dimensions.get('screen');
import { GoogleSignin } from '@react-native-google-signin/google-signin';
const Drawer = createDrawerNavigator();
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import { img_url } from '../config/constants';
import { unRegisterZegoCall } from '../utils/zegoServices';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen';
import { showNumber, showNumber0 } from '../utils/services';
import { Colors, Fonts } from '../assets/style';
import * as HomeActions from '../redux/actions/HomeActions';


function CustomDrawerContent(props) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const logout = () => {
    Alert.alert('Wait!', 'Do you want to log out?', [
      {
        text: 'CANCEL',
        style: 'cancel',
      },
      {
        style: 'destructive',
        text: 'LOGOUT',
        onPress: () => on_logout(),
      },
    ]);
  };
  const deleteaccount = () => {
    Alert.alert('Wait!', 'Do you want to Delete Account?', [
      {
        text: 'CANCEL',
        style: 'cancel',
      },
      {
        style: 'destructive',
        text: 'DELETE ACCOUNT',
        onPress: () => props.props.dispatch(HomeActions.getDeleteAccount()),
      },
    ]);
  };


  const openWhatsApp = () => {
    // Replace PHONE_NUMBER with the desired phone number (including the country code)
    const phoneNumber = '+91 9654443667';

    // Replace YOUR_MESSAGE with the optional message (URL-encoded if necessary)
    const message = 'Hello%2C%20I%20have%20a%20question';

    // Create the WhatsApp link
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    // Open the link using the Linking module
    Linking.openURL(whatsappURL)
      .then(data => {
        console.log('WhatsApp opened successfully');
      })
      .catch(() => {
        console.error('An error occurred while opening WhatsApp');
      });
  };

  //share
  const share_app = async () => {
    let options = {
      title: 'Share friend the app',
      message: 'Check out the AstroOne app for personalized astrology remedies and predictions!',
      url: 'https://play.google.com/store/apps/details?id=com.ksbm.astroone', // Replace with your actual URL
    };

    try {
      const res = await Share.open(options);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const on_logout = async () => {
    AsyncStorage.clear();
    GoogleSignin.revokeAccess();
    await unRegisterZegoCall();
    GoogleSignin.signOut();
    go_login();
  };




  const go_login = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'login' }],
      }),
    );
  };

  let Imguri = `${img_url}${props.props?.customerData?.image}`;
  // console.log(Imguri,'image')
  const pic = `${img_url}${props.props?.customerData?.image}`.split('/')[5];
  if (pic === 'user_default.jpg') {
    Imguri = null;
  } else {
    Imguri = `${img_url}${props.props?.customerData?.image}`;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 20, }} />
      <DrawerContentScrollView {...props.props1}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'row',
            top: 0,
            borderRadius: 10,
            marginLeft: -30,
            width: '50%',
            alignSelf: 'center',

          }}>
          <Image
            source={
              Imguri ? { uri: Imguri } : require('../assets/icons/profile.png')
              //   {
              //   uri: img_url + props.props?.customerData?.image,
              //   uri : props?.props?.customerData?.image
              // }
            }
            style={{
              width: width * 0.2,
              height: width * 0.2,
              paddingVertical: 12,
              paddingHorizontal: 14,
              // borderWidth: 1,
              marginRight: 12,
              // borderColor: 'black',
              borderRadius: (width * 0.25) / 2,
              // zIndex:5,
              // elevation:0.6
            }}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('customerAccount')}
            style={{
              width: 20,
              height: 20,
              borderRadius: 13,
              borderWidth: 1,
              borderColor: colors.white_color,
              justifyContent: 'center',
              backgroundColor: colors.background_theme2,
              alignItems: 'center',
              position: 'absolute',
              // top: -4,
              right: 0,
              left: 113,
              zIndex: 1,
              bottom: SCREEN_HEIGHT * 0.01
            }}>
            <Image
              source={require('../assets/images/icon/edit.png')}
              style={{ width: 10, height: 10, tintColor: 'white' }}
            />
          </TouchableOpacity>
          {/* <View style={{marginLeft: 10,borderWidth:1}}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: getFontSize(1.5),
                color: colors.white_color,
                fontFamily: fonts.medium,
                marginTop: 14,
              }}>
              {props.props.customerData?.customerName}
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 15,
                color: colors.white_color,
                fontFamily: fonts.medium,
              }}>
              {props.props.customerData?.phoneNumber != 0 &&
                props.props.customerData?.phoneNumber}
            </Text>
            
          </View> */}
        </View>
        <View
          style={{
            flex: 1,
            width: '100%',
            padding: 20,
            alignSelf: 'center',
            backgroundColor: colors.white_color,

            // height: SCREEN_HEIGHT ,
            // borderTopRightRadius: 25,
            // borderBottomRightRadius: 25,

          }}>

          {/* <TouchableOpacity
            onPress={() => navigation.navigate('wallet')}
            style={styles.buttonContainer}>
            <LinearGradient
              colors={['#dc2f02', '#ff5400']}
              style={{
                borderRadius: 10,
                padding: 5,
                height:SCREEN_WIDTH * 0.085,
                width: SCREEN_WIDTH * 0.085,
                justifyContent:'center',
                alignItems:'center'
              }}>
              <Image
                source={require('../assets/drawericons/wallet.png')}
                style={styles.buttonImage}
              />
            </LinearGradient>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('wallet_balance')}{' '}
              {/* {parseFloat(props.props.customerData?.wallet_balance).toFixed(0)} */}
          {/* {showNumber0(props.props.customerData?.wallet_balance ?? 0)}
            </Text>
          // </TouchableOpacity> */}


          <TouchableOpacity
           onPress={()=> navigation.navigate('SendGifts')}
            style={{ flexDirection: "row", alignItems: "center", gap: 15, paddingVertical:SCREEN_HEIGHT*0.013, borderBottomWidth: 1, borderBottomColor: "gray", paddingHorizontal: SCREEN_WIDTH * 0.04 }}>
            <View>
              <FontAwesome6
                name='gift'
                size={18}
                color={"#D56A14"}
              />
            </View>

            <Text style={styles.DrawerText}>Send Gift</Text>
          </TouchableOpacity>




          {/* <TouchableOpacity
            onPress={() => navigation.navigate('walletHistroy')}
            style={styles.buttonContainer}>
            <LinearGradient
              colors={['#dc2f02', '#ff5400']}
              style={{
                borderRadius: 10,
                padding: 5,
                height: SCREEN_WIDTH * 0.085,
                width: SCREEN_WIDTH * 0.085,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Image
                source={require('../assets/drawericons/paytmenthistory.png')}
                style={styles.buttonImage}
              />
            </LinearGradient>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('payment_bill')}
            </Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => navigation.navigate('liveChatCall')}
            style={styles.DrawerRowContainer}>
            <View>
              <MaterialCommunityIcons
                name='message-text-clock'
                size={18}
                color={"#D56A14"}
              />
            </View>

            <Text style={styles.DrawerText}>Order History</Text>
          </TouchableOpacity>



          {/* <TouchableOpacity
            onPress={() => navigation.navigate('liveChatCall')}
            style={styles.buttonContainer}>
            <LinearGradient
              colors={['#dc2f02', '#ff5400']}
              style={{
                borderRadius: 10,
                padding: 5,
                height: SCREEN_WIDTH * 0.085,
                width: SCREEN_WIDTH * 0.085,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Image
                source={require('../assets/drawericons/orderhistory.png')}
                style={styles.buttonImage}
              />
            </LinearGradient>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('order_history')}
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => navigation.navigate('language')}
            style={styles.DrawerRowContainer}>
            <View>
              <MaterialCommunityIcons
                name='message-text-clock'
                size={18}
                color={"#D56A14"}
              />
            </View>

            <Text style={styles.DrawerText}>Change Language</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('OrderHistory')}
            style={styles.DrawerRowContainer}>
            <View>
              <FontAwesome6
                name='building-columns'
                size={15}
                color={"#D56A14"}
              />
            </View>

            <Text style={styles.DrawerText}>E-Order History</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('following')}
            style={styles.DrawerRowContainer}>
            <View>
              <Ionicons
                name='person-add-outline'
                size={15}
                color={"#D56A14"}
              />
            </View>

            <Text style={styles.DrawerText}>Following</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('howUse')}
            style={styles.DrawerRowContainer}>
            <View>
              <MaterialIcons
                name='smartphone'
                size={15}
                color={"#D56A14"}
              />
            </View>


            <Text style={styles.DrawerText}>How to use our App?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('CustomerTestimonials')}
            style={styles.DrawerRowContainer}>
            <View>
              <MaterialCommunityIcons
                name='account-group'
                size={16}
                color={"#D56A14"}
              />
            </View>

            <Text style={styles.DrawerText}>Customers Testimonials</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ReferEarn')}
            style={styles.DrawerRowContainer}>
            <View>
              <FontAwesome5
                name='people-arrows'
                size={15}
                color={"#D56A14"}
              />
            </View>

            <Text style={styles.DrawerText}>Refer and Earn</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={openWhatsApp}
            style={styles.DrawerRowContainer}>
            <View>
              <MaterialIcons
                name='support-agent'
                size={15}
                color={"#D56A14"}
              />
            </View>

            <Text style={styles.DrawerText}>Help and Support</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('about')}
            style={styles.DrawerRowContainer}>
            <View>
              <Entypo
                name='info-with-circle'
                size={15}
                color={"#D56A14"}
              />
            </View>

            <Text style={styles.DrawerText}>About AstroOne</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={logout}
            style={styles.DrawerRowContainer}>
            <View>
              <Entypo
                name='log-out'
                size={15}
                color={"#D56A14"}
              />
            </View>

            <Text style={styles.DrawerText}>Logout</Text>
          </TouchableOpacity>


          {/* <TouchableOpacity
            onPress={() => navigation.navigate('productCategory')}
            style={styles.buttonContainer}>
            <LinearGradient
              colors={['#dc2f02', '#ff5400']}
              style={{
                borderRadius: 10,
                padding: 5,
                height: SCREEN_WIDTH * 0.085,
                width: SCREEN_WIDTH * 0.085,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Image
                source={require('../assets/drawericons/astroMall.png')}
                style={styles.buttonImage}
              />
            </LinearGradient>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('Astro_Mall')}
            </Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('OrderHistory')}
            style={styles.buttonContainer}>
            <LinearGradient
              colors={['#dc2f02', '#ff5400']}
              style={{
                borderRadius: 10,
                padding: 5,
                height: SCREEN_WIDTH * 0.085,
                width: SCREEN_WIDTH * 0.085,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Image

                source={require('../assets/drawericons/myOrder.png')}
                style={styles.buttonImage}
              />
            </LinearGradient>
            <Text allowFontScaling={false} style={styles.buttonText}>
              My Order
            </Text>
          </TouchableOpacity> */}

          {/* pooja */}
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('astromallCategory')}
            // onPress={()=>navigation.navigate('PoojaList')}
            style={styles.buttonContainer}>
            <LinearGradient
              colors={['#dc2f02', '#ff5400']}
              style={{
                borderRadius: 10,
                padding: 5,
                height: SCREEN_WIDTH * 0.085,
                width: SCREEN_WIDTH * 0.085,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Image
                source={require('../assets/drawericons/AstroPooja.png')}
                style={styles.buttonImage}
              />
            </LinearGradient>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('Astro Puja')}
            </Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity onPress={() => navigation.navigate('GiftOrderHistory')} style={styles.buttonContainer}>
            <LinearGradient
              colors={['#dc2f02', '#ff5400']}
              style={{
                borderRadius: 10,
                padding: 5,
              }}>
              <Image
                source={require('../assets/images/menu/orderhistory.png')}
                style={styles.buttonImage}
              />
            </LinearGradient>
            <Text allowFontScaling={false} style={styles.buttonText}>{t("order_history_gift")}</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('following')}
            style={styles.buttonContainer}>
            <LinearGradient
              colors={['#dc2f02', '#ff5400']}
              style={{
                borderRadius: 10,
                padding: 5,
                height: SCREEN_WIDTH * 0.085,
                width: SCREEN_WIDTH * 0.085,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Image
                source={require('../assets/drawericons/following.png')}
                style={styles.buttonImage}
              />
            </LinearGradient>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('following')}
            </Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('howUse')}
            style={styles.buttonContainer}>
            <LinearGradient
              colors={['#dc2f02', '#ff5400']}
              style={{
                borderRadius: 10,
                padding: 5,
                height: SCREEN_WIDTH * 0.085,
                width: SCREEN_WIDTH * 0.085,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Image
                source={require('../assets/drawericons/howtousethisapp.png')}
                style={styles.buttonImage}
              />
            </LinearGradient>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('How')}
            </Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('astroBlog')}
            style={styles.buttonContainer}>
            <LinearGradient
              colors={['#dc2f02', '#ff5400']}
              style={{
                borderRadius: 10,
                padding: 5,
                height: SCREEN_WIDTH * 0.085,
                width: SCREEN_WIDTH * 0.085,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Image
                source={require('../assets/images/icon/25.png')}
                style={{ ...styles.buttonImage, tintColor: Colors.white, height: SCREEN_WIDTH * 0.06 }}
              />
            </LinearGradient>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('blogs')}
            </Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('astrologerSignUp')}
            style={styles.buttonContainer}>
            <LinearGradient
              colors={['#dc2f02', '#ff5400']}
              style={{
                borderRadius: 10,
                padding: 5,
                height: SCREEN_WIDTH * 0.085,
                width: SCREEN_WIDTH * 0.085,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Image
                source={require('../assets/drawericons/astrologersignup-1.png')}
                style={styles.buttonImage}
              />
            </LinearGradient>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('astrologer_sign')}
            </Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            onPress={openWhatsApp}
            style={styles.buttonContainer}>
            <LinearGradient
              colors={['#dc2f02', '#ff5400']}
              style={{
                borderRadius: 10,
                padding: 5,
                height: SCREEN_WIDTH * 0.085,
                width: SCREEN_WIDTH * 0.085,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Image
                source={require('../assets/drawericons/Helpandsuppoort.png')}
                style={styles.buttonImage}
              />
            </LinearGradient>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('help')}
            </Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.ksbm.astroone')}
            style={styles.buttonContainer}>
            <LinearGradient
              colors={['#dc2f02', '#ff5400']}
              style={{
                borderRadius: 10,
                padding: 5,
                height: SCREEN_WIDTH * 0.085,
                width: SCREEN_WIDTH * 0.085,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Image
                source={require('../assets/drawericons/rateus.png')}
                style={styles.buttonImage}
              />
            </LinearGradient>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('rate')}
            </Text>
          </TouchableOpacity> */}

          {/* About us */}
          {/* <TouchableOpacity
            style={styles.buttonContainer}
            // onPress={() => Linking.openURL('https://astrokunj.com/About-us.html')}
               onPress={() => Linking.openURL('https://remedy.astrofriends.in/#/about-us')}
          >
            <LinearGradient
              colors={['#dc2f02', '#ff5400']}
              style={{
                borderRadius: 10,
                padding: 5,
                height:SCREEN_WIDTH * 0.085,
                width: SCREEN_WIDTH * 0.085,
                justifyContent:'center',
                alignItems:'center'
              }}>
              <Image
              source={require('../assets/drawericons/aboutus.png')}
                style={styles.buttonImage}
              />
            </LinearGradient>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('about')}
            </Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => share_app()}>
            <LinearGradient
              colors={['#dc2f02', '#ff5400']}
              style={{
                borderRadius: 10,
                padding: 5,
                height: SCREEN_WIDTH * 0.085,
                width: SCREEN_WIDTH * 0.085,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Image
                source={require('../assets/drawericons/share.png')}
                style={styles.buttonImage}
              />
            </LinearGradient>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('share')}
            </Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('setting')}
            style={styles.buttonContainer}>
            <LinearGradient
              colors={['#dc2f02', '#ff5400']}
              style={{
                borderRadius: 10,
                padding: 5,
              }}>
              <Image
                source={require('../assets/images/menu/settings.png')}
                style={styles.buttonImage}
              />
            </LinearGradient>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('setting')}
            </Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity onPress={logout} style={styles.buttonContainer}>
            <LinearGradient
              colors={['#dc2f02', '#ff5400']}
              style={{
                borderRadius: 10,
                padding: 5,
                height: SCREEN_WIDTH * 0.085,
                width: SCREEN_WIDTH * 0.085,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Image
                source={require('../assets/drawericons/logout.png')}
                style={styles.buttonImage}
              />
            </LinearGradient>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('logout')}
            </Text>
          </TouchableOpacity> */}
          {/* <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-around' }}>
            <TouchableOpacity style={{ paddingHorizontal: 10 }} activeOpacity={0.8}
              onPress={() => Linking.openURL('https://www.facebook.com/profile.php?id=61552323625258')}>
              <Image source={require('../assets/images/facebook1.png')} style={styles.iconimg} />
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingHorizontal: 10 }} activeOpacity={0.8}
              onPress={() => Linking.openURL('https://www.instagram.com/astrokunjofficial?utm_source=qr&igshid=YTlmZjI0ZWMzOA==')}>
              <Image source={require('../assets/images/instagram1.png')} style={styles.iconimg} />
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingHorizontal: 10 }} activeOpacity={0.8}
              onPress={() => Linking.openURL('https://www.youtube.com/@AstroKunjofficial')}>
              <Image source={require('../assets/images/youtube.png')} style={styles.iconimg} />
            </TouchableOpacity>
          </View> */}
          {/* <TouchableOpacity
            onPress={deleteaccount}
            style={styles.buttonContainer}>
            <LinearGradient
              colors={['#dc2f02', '#ff5400']}
              style={{
                borderRadius: 10,
                padding: 5,
                height: SCREEN_WIDTH * 0.085,
                width: SCREEN_WIDTH * 0.085,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Image
                source={require('../assets/drawericons/logout.png')}
                style={styles.buttonImage}
              />
            </LinearGradient>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {/* {t('logout')} */}
          {/* Delete Account
            </Text>
          </TouchableOpacity> */}

          {/* BOTTOM CONTENT */}

          <View style={{paddingTop:SCREEN_WIDTH*0.08}}>

            <View style={{ alignItems: "center" }}>
              <Text style={{...Fonts.PoppinsMedium,color:'#D56A14',fontSize:20 }}>AstrOne</Text>
            </View>

            <View style={{ alignItems: "center", gap: 8 }}>
              <Text style={{...Fonts.PoppinsRegular}}>Connect the cosmic dots</Text>
              <Text style={{ ...Fonts.PoppinsRegular}}>Folllow AstroOne for exclusive updates on:</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.12, paddingVertical: SCREEN_HEIGHT * 0.02 }}>
              <TouchableOpacity
                style={{ height: SCREEN_HEIGHT * 0.06, width: SCREEN_WIDTH * 0.125 }}
                onPress={() => Linking.openURL('https://www.facebook.com/')}
              >
                <Image
                  resizeMode='contain'
                  style={{ height: '100%', width: '100%' }}
                  source={require('../assets/images/facebook1.png')} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: SCREEN_HEIGHT * 0.06, width: SCREEN_WIDTH * 0.125 }}
                onPress={() => Linking.openURL('https://in.linkedin.com/')}
              >
                <Image
                  resizeMode='contain'
                  style={{ height: '100%', width: '100%' }}
                  source={require('../assets/images/linkedin.png')} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: SCREEN_HEIGHT * 0.06, width: SCREEN_WIDTH * 0.125 }}
                onPress={() => Linking.openURL('https://www.instagram.com/accounts/login/')}
              >
                <Image
                  style={{ height: '100%', width: '100%' }}
                  source={require('../assets/icons/Instagram.png')} />
              </TouchableOpacity>
            </View>


          </View>

        </View>

      </DrawerContentScrollView>
    </View>
  );
}

const DrawerNavigator = props => {
  return (
    <Drawer.Navigator
      drawerContent={props1 => (
        <CustomDrawerContent props1={props1} props={props} />
      )}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: width * 0.85,
          alignSelf: 'center',
          // backgroundColor: colors.background_theme2,
          elevation: 8,
          // borderTopRightRadius: 40,
          // borderBottomRightRadius: 40,
          shadowColor: colors.black_color6,
        },
      }}>
      <Drawer.Screen name="home2" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  wallet: state.customer.wallet,
  homeSimmer: state.home.homeSimmer,
  isRefreshing: state.setting.isRefreshing,
});
const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(DrawerNavigator);

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0.5,
    padding: 8,
  },
  buttonImage: {
    width: width * 0.09,
    height: width * 0.09,
    resizeMode: 'contain'
    // tintColor: '#fff8f0',
  },
  circle: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: getFontSize(1.5),
    color: colors.black_color,
    fontFamily: fonts.medium,
    marginLeft: 10,
  },
  socialLogo: {
    width: width * 0.08,
    height: width * 0.08,
  },
  iconimg: {
    width: width * 0.1,
    height: height * 0.1,
    resizeMode: 'contain',
  },
  DrawerText: {
    ...Fonts.PoppinsSemiBold,
    fontSize: 13
  },
  DrawerRowContainer: {
    flexDirection: "row", alignItems: "center", gap: 15, paddingVertical: SCREEN_HEIGHT * 0.01, borderBottomWidth: 1, borderBottomColor: colors.grey_color, paddingHorizontal: SCREEN_WIDTH * 0.04
  }
});
