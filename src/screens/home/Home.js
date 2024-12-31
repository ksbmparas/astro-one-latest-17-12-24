import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  StyleSheet,
  Animated,
  ImageBackground,
  RefreshControl,
  Linking,
  PermissionsAndroid,
  Platform,
  Alert,
  FlatList,
  PixelRatio,
  BackHandler,
  AppState,
  Modal,
  TouchableWithoutFeedback,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { WebView } from 'react-native-webview';

import { useEffect, useRef } from 'react';
import {
  api_url,
  blog,
  colors,
  fonts,
  getFontSize,
  updateFlash,
} from '../../config/Constants1';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as HomeActions from '../../redux/actions/HomeActions';
import * as EcommerceActions from '../../redux/actions/ecommerceActions';
import { base_url, get_astro_blogs, img_url } from '../../config/constants';
// import HomeSimmer from './components/HomeSimmer';
import HomeSimmer from '../../components/HomeSimmer';
import { Sizes, Fonts, Colors } from '../../assets/style';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeHeader from '../../components/HomeHeader';
import MyStatusBar from '../../components/MyStatusbar';
// import { SCREEN_HEIGHT } from '../../config/Screen';
import * as BlogActions from '../../redux/actions/BlogActions';
import * as PoojaActions from '../../redux/actions/PoojaActions';
import * as AstrologerActions from '../../redux/actions/AstrologerActions';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import Video from 'react-native-video';
const { width, height } = Dimensions.get('screen');
import FastImage from 'react-native-fast-image';

const Home = ({
  props,
  navigation,
  dispatch,
  productCategoryData,
  isRefreshing,
  homeSimmer,
  bannerData,
  callAstrologer,
  chatAstrologer,
  astroBlogData,
  customerData,
  videoCallAstrologers,
  poojaData,
  videoCallAstrolgoer,
  newPoojaData,
  templegif,
  getabhijitdata,
  getdurmuhurtdata,
  getgulikdata,
  getyamgantakdata,
  liveTempleData
}) => {
  const [astoListData, setAstroListData] = useState(false);
  const [livelist, setLivelist] = useState(null);
  const [ModalView, setModalView] = useState(null);
  const [modalVisible, setModalVisible] = useState(true);
  const [search, setSearchInput] = useState('');
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [male, setMale] = useState(true);
  const [female, setFemale] = useState(false);
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(HomeActions.getHomeData());
    dispatch(HomeActions.getTemplegif());
    dispatch(EcommerceActions.getProductCategory());
    dispatch(BlogActions.getAstroBlogs());
    dispatch(PoojaActions.getPoojaData());
    dispatch(PoojaActions.getNewPoojaData());
    dispatch(PoojaActions.getAllPoojaList());
    dispatch(HomeActions.getAbijitMuhurt());
    dispatch(HomeActions.getDurMuhurat());
    dispatch(HomeActions.getGulikMuhurat());
    dispatch(HomeActions.getYamMuhurat());
    dispatch(HomeActions.getLiveTempleData());
    // dispatch(AstrologerActions.getVideoCallAstrologers());
  }, [dispatch]);

  const update_flash = () => {
    axios({
      method: 'post',
      url: api_url + updateFlash,
      data: {
        user_id: customerData?._id,
      },
    })
      .then(res => { })
      .catch(err => {
        console.log(err);
      });
  };

  const openYouTubeVideo = youtubeLink => {
    // Assuming the youtubeLink is a valid YouTube video URL
    Linking.openURL(youtubeLink);
  };

  const astrologer_list = item => {
    navigation.navigate('astrologerList', { routename: item });
  };

  const getStatusColor = status => {
    switch (status) {
      case 'online':
        return '#29bf12';
      case 'offline':
        return '#6c757d';
      case 'busy':
        return '#fca311';
      default:
        return 'white';
    }
  };

  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(item => {
        const itemData = item.owner_name
          ? item.owner_name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.includes(textData); // Use includes for partial matching
      });

      setAstroListData(newData);
      setvastulist(newData);
      setOtherVastuList(newData);
      setSearchInput(text);
    } else {
      on_referesh();
      setAstroListData(astoListData);
      setvastulist(vastulist);
      setOtherVastuList(othervastulist);
      setSearchInput(text);
    }
  };

  const _listEmptyComponent = () => {
    return (
      <View
        style={{
          alignSelf: 'center',
          marginTop: 20,
          marginBottom: 20,
          alignSelf: 'center',
        }}>
        <Text
          allowFontScaling={false}
          style={{
            color: '#000',
            textAlign: 'center',
            marginHorizontal: width * 0.35,
          }}>
          {t('NoVideo')}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar
        backgroundColor={colors.background_theme2}
        barStyle="light-content"
      />
      <HomeHeader navigation={navigation} />

      <View
        style={{
          flex: 1,
          backgroundColor: colors.black_color1,
          paddingHorizontal: Sizes.fixPadding,
        }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => dispatch(HomeActions.getHomeDataOnRefresh())}
            />
          }
          ListHeaderComponent={
            <>
              {homeSimmer ? (
                <HomeSimmer />
              ) : (
                <>
                  <View style={{ flex: 1, gap: SCREEN_WIDTH * 0.08 }}>
                    {/* {sreaching()} */}
                    {/* {kundliInfo()} */}
                    <View style={{ gap: 10 }}>
                      {ASTROONENOTE()}
                      {getabhijitdata && getdurmuhurtdata && getgulikdata && getyamgantakdata && CARD1()}
                    </View>

                    {/* {bannerData && bannerInfo()} */}

                    {banner()}
                    {templegif && placeofworship()}
                    {BANNER2()}
                    {banner3()}
                    {YourHoroscope()}
                    {banner5()}
                    {banner6()}
                    {visittemple({ liveTempleData })}
                    {analysis()}
                    {ALMANAC()}
                    {HAPPY()}
                    {SHOPPING()}
                    {livelist && liveListInfo()}
                    {anuj()}
                    {/* {callAstrologer && callAstrologerListInfo()}
                  {chatAstrologer && chatAstrologerList()} */}
                    {/* {videoCallAstrolgoer && videoCallAstrologerList()} */}
                    {/* {OtherExperts()} */}
                    {/* {blogsInfo()} */}
                    {/* {mallInfo()}
                  {astropooja()} */}

                    {/* {footerInfo()} */}
                  </View>
                </>
              )}
            </>
          }
        />
      </View>

      {/* {astoListData && customerData?.flash_seen == 0 && (
        <Modal visible={modalVisible} transparent={true}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#00000050',
                justifyContent: 'center',
                alignItems: 'center',
                // opacity: 0.4
              }}>
              <View
                style={{
                  flex: 0,
                  width: '90%',
                  alignSelf: 'center',
                  backgroundColor: colors.background_theme2,
                  borderRadius: 10,
                }}>
                <TouchableOpacity
                  style={{ padding: 10, left: width * 0.75 }}
                  onPress={() => {
                    update_flash();
                    setModalVisible(false);
                  }}>
                  <Ionicons name="close" color={colors.white_color} size={25} />
                </TouchableOpacity>
                <View
                  style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    borderRadius: 1000,
                    borderWidth: 10,
                    overflow: 'hidden',
                    top: -60,
                    backgroundColor: 'white',
                    padding: 10,
                    borderColor: colors.background_theme2,
                  }}>
                  <Image
                    source={require('../../assets/images/ganesha.png')}
                    style={{ width: 70, height: 70 }}
                  />
                </View>
                <View
                  style={{
                    flex: 0,
                    padding: 15,
                    backgroundColor: colors.background_theme1,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}>
                  {ModalView && (
                    <>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                        }}>
                        {ModalView?.image?.map((imageUrl, index) => (
                          <View key={index}>
                            <Image
                              source={{ uri: imageUrl }}
                              style={{
                                width: width * 0.2,
                                height: width * 0.2,
                                borderRadius: (width * 0.22) / 2,
                                borderWidth: 1,
                                borderColor: 'black',
                                alignSelf: 'center',
                                overflow: 'hidden',
                              }}
                            />
                          </View>
                        ))}
                      </View>
                      <View
                        style={{
                          alignItems: 'center',
                          marginTop: 20,
                          marginBottom: 20,
                        }}>
                        <Text
                          allowFontScaling={false}
                          style={{ color: 'black', fontSize: getFontSize(2.6) }}>
                          {ModalView.text}
                        </Text>
                      </View>
                    </>
                  )}

                  <TouchableOpacity
                    onPress={() => astrologer_list('astroChatList')}
                    style={{
                      alignSelf: 'center',
                      backgroundColor: colors.background_theme2,
                      borderRadius: 10,
                      padding: 10,
                    }}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: 'black',
                      }}>
                      {t('chat_now')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )} */}
    </View>
  );

  // function astropooja() {
  //   const renderItem = ({ item }) => {
  //     return (
  //       <TouchableOpacity
  //         onPress={() => navigation.navigate('PoojaDetails2', { ...item })}
  //         style={{ margin: 10, overflow: 'hidden', elevation: 2 }}>
  //         <Image
  //           source={{ uri: img_url + item?.image }}
  //           style={{
  //             width: 200,
  //             height: 100,
  //             borderTopRightRadius: 10,
  //             borderTopLeftRadius: 10,
  //             borderWidth: 1,
  //             borderColor: colors.background_theme2,

  //             // borderColor: colors.black_color,
  //             resizeMode: 'stretch',
  //           }}
  //         />
  //         <Text
  //           style={{
  //             width: 200,
  //             height: 20,
  //             color: colors.white_color,
  //             textAlign: 'center',
  //             marginTop: 5,
  //             backgroundColor: colors.background_theme2,
  //             borderBottomLeftRadius: 10,
  //             borderBottomRightRadius: 10,
  //             // borderWidth: 1,
  //             top: -5,
  //           }}>
  //           {item?.pujaName}
  //           {/* Vivah Badha Nivaran Puja */}
  //         </Text>
  //         {/* <View style={{ position: 'absolute', backgroundColor: Colors.white, padding: Sizes.fixPadding * 0.5, right: 0, paddingHorizontal: Sizes.fixPadding, borderBottomLeftRadius: 10, borderWidth: 1 }}>
  //           <Text style={{ ...Fonts.black16RobotoMedium }}>{item?.type}</Text>
  //         </View> */}
  //       </TouchableOpacity>
  //     )
  //   };
  //   return (
  //     <ScrollView>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           justifyContent: 'space-between',
  //           marginHorizontal: 10,
  //           alignItems: 'center',
  //         }}>
  //         <Text
  //           allowFontScaling={false}
  //           style={{
  //             color: 'black',
  //             // marginHorizontal: 10,
  //             fontSize: getFontSize(1.8),
  //           }}>
  //           {/* {t('e-commerce')} */}
  //           Astro Puja
  //         </Text>
  //         <TouchableOpacity
  //           activeOpacity={0.8}
  //           onPress={
  //             () =>
  //               navigation.navigate('astromallCategory')
  //           }
  //           style={{
  //             paddingHorizontal: 10,
  //             paddingVertical: 3,
  //             elevation: 15,
  //             shadowColor: colors.background_theme2,
  //             borderRadius: 20,
  //             backgroundColor: colors.white_color,
  //           }}>
  //           <Text
  //             allowFontScaling={false}
  //             style={{
  //               fontSize: 12,
  //               color: colors.black_color,
  //               fontFamily: 'BalluBhai-Regular',
  //               fontWeight: '800',
  //               paddingHorizontal: 5,
  //               paddingVertical: 2,
  //             }}>
  //             {t('view_all')}
  //           </Text>
  //         </TouchableOpacity>
  //       </View>
  //       <FlatList
  //         data={newPoojaData}
  //         renderItem={renderItem}
  //         // keyExtractor={item => item.id}
  //         horizontal={true} // Change to true for horizontal scroll
  //       />
  //     </ScrollView>
  //   )
  // }

  // function footerInfo() {
  //   return (
  //     <View style={styles.info}>
  //       <View style={styles.row}>
  //         {/* <TouchableOpacity
  //           style={styles.box2}
  //           onPress={() => navigation.navigate('Notes')}>
  //           <Image
  //             source={require('../../assets/images/icon/home_notes.png')}
  //             style={{
  //               width: 60,
  //               height: 60,
  //               alignSelf: 'center',
  //               resizeMode: 'contain',
  //             }}
  //           />
  //           <Text allowFontScaling={false} style={styles.boxtext}>
  //             {t('daily')}
  //           </Text>
  //         </TouchableOpacity> */}
  //         {/* <TouchableOpacity
  //           style={styles.box2}
  //           onPress={() => navigation.navigate('DownloadKundali')}>
  //           <Image
  //             source={require('../../assets/images/icon/download.png')}
  //             style={{
  //               width: 60,
  //               height: 60,
  //               alignSelf: 'center',
  //               resizeMode: 'contain',
  //             }}
  //           />
  //           <Text allowFontScaling={false} style={styles.boxtext}>
  //             {t('free_pdf')}
  //           </Text>
  //         </TouchableOpacity> */}
  //         <TouchableOpacity
  //           style={styles.box2}
  //           onPress={() => navigation.navigate('DailyPanchang')}>
  //           <Image
  //             source={require('../../assets/images/icon/hinduism.png')}
  //             style={{
  //               width: 60,
  //               height: 60,
  //               alignSelf: 'center',
  //               resizeMode: 'contain',
  //             }}
  //           />
  //           <Text allowFontScaling={false} style={styles.boxtext}>
  //             {t('daily_panchang')}
  //           </Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           style={styles.box2}
  //           onPress={() => navigation.navigate('auspicions')}>
  //           <Image
  //             source={require('../../assets/images/muhurat.png')}
  //             style={{
  //               width: 85,
  //               height: 85,
  //               alignSelf: 'center',
  //               resizeMode: 'contain',
  //             }}
  //           />
  //           <Text allowFontScaling={false} style={styles.boxtext}>
  //             {t('muhurat')}
  //           </Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           style={{}}
  //           onPress={() => navigation.navigate('birhatHoroscope')}>
  //           <Image
  //             source={require('../../assets/images/icon/astrology.png')}
  //             style={{
  //               width: 60,
  //               height: 60,
  //               alignSelf: 'center',
  //               resizeMode: 'contain',
  //             }}
  //           />
  //           <Text allowFontScaling={false} style={styles.boxtext}>
  //             {t('birhat')}
  //           </Text>
  //         </TouchableOpacity>
  //       </View>
  //       <View style={[styles.row, {}]}>
  //         <TouchableOpacity
  //           style={styles.box2}
  //           onPress={() => navigation.navigate('magazine')}>
  //           <Image
  //             source={require('../../assets/images/icon/book.png')}
  //             style={{
  //               width: 60,
  //               height: 60,
  //               alignSelf: 'center',
  //               resizeMode: 'contain',
  //             }}
  //           />
  //           <Text allowFontScaling={false} style={styles.boxtext}>
  //             {t('magazine')}
  //           </Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           style={styles.box2}
  //           onPress={() => navigation.navigate('religion')}>
  //           <Image
  //             source={require('../../assets/images/icon/pray.png')}
  //             style={{
  //               width: 60,
  //               height: 60,
  //               alignSelf: 'center',
  //               resizeMode: 'contain',
  //             }}
  //           />
  //           <Text allowFontScaling={false} style={styles.boxtext}>
  //             {t('religion')}
  //           </Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           style={{}}
  //           onPress={() => navigation.navigate('remedies')}>
  //           <Image
  //             source={require('../../assets/images/icon/medicine.png')}
  //             style={{
  //               width: 60,
  //               height: 60,
  //               alignSelf: 'center',
  //               resizeMode: 'contain',
  //             }}
  //           />
  //           <Text allowFontScaling={false} style={styles.boxtext}>
  //             {t('remedies')}
  //           </Text>
  //         </TouchableOpacity>
  //       </View>
  //       <View style={[styles.row, {}]}>
  //         <TouchableOpacity
  //           style={styles.box2}
  //           onPress={() =>
  //             openYouTubeVideo('https://www.youtube.com/@AstroKunjofficial')
  //           }>
  //           <Image
  //             source={require('../../assets/images/icon/youtube_1.png')}
  //             style={{
  //               width: 60,
  //               height: 60,
  //               alignSelf: 'center',
  //               resizeMode: 'contain',
  //             }}
  //           />
  //           <Text allowFontScaling={false} style={styles.boxtext}>
  //             {t('youtube')}
  //           </Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           style={styles.box2}
  //           onPress={() => navigation.navigate('yellowBook')}>
  //           <Image
  //             source={require('../../assets/images/book1.png')}
  //             style={{
  //               width: 80,
  //               height: 70,
  //               alignSelf: 'center',
  //               resizeMode: 'contain',
  //             }}
  //           />
  //           <Text allowFontScaling={false} style={styles.boxtext}>
  //             {t('yellow_book')}
  //           </Text>
  //         </TouchableOpacity>
  //       </View>
  //       {/* <View style={[styles.row1, {}]}>

  //         <TouchableOpacity
  //           style={{ ...styles.box2, marginTop: 0 }}
  //           onPress={() =>
  //             openYouTubeVideo('http://www.omshivmaa.blogspot.in')
  //           }>
  //           <Image
  //             source={require('../../assets/images/icon/blog1.png')}
  //             style={{
  //               width: 55,
  //               height: 55,
  //               alignSelf: 'center',
  //               resizeMode: 'contain',
  //             }}
  //           />
  //           <Text
  //             allowFontScaling={false}
  //             style={{ ...styles.boxtext, marginTop: 10 }}>
  //             {t('oma')}
  //           </Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           style={styles.box2}
  //           onPress={() => navigation.navigate('askQuestion')}>
  //           <Image
  //             source={require('../../assets/images/ask_ques.png')}
  //             style={{
  //               width: 100,
  //               height: 90,
  //               alignSelf: 'center',
  //               resizeMode: 'contain',
  //             }}
  //           />
  //           <Text allowFontScaling={false} style={styles.boxtext}>
  //             {t('ask_a_question')}
  //           </Text>
  //         </TouchableOpacity>
  //       </View> */}
  //     </View>
  //   );
  // }

  function banner() {
    return (
      <View
        style={{ flexDirection: 'row', marginTop: -50 }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={{ alignItems: 'center', marginRight: 10 }}>
            <Image
              style={{
                height: SCREEN_HEIGHT * 0.2,
                width: SCREEN_WIDTH * 0.95,
                elevation: 1,
                resizeMode: 'contain',

              }}
              source={require('../../assets/images/banner.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center', marginRight: 10 }}>
            <Image
              style={{
                height: SCREEN_HEIGHT * 0.2,
                width: SCREEN_WIDTH * 0.95,
                elevation: 1,
                resizeMode: 'contain',

              }}
              source={require('../../assets/images/banners.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center' }}>
            <Image
              style={{
                height: SCREEN_HEIGHT * 0.2,
                width: SCREEN_WIDTH * 0.95,
                elevation: 1,
                resizeMode: 'contain',
              }}
              source={require('../../assets/images/banner1.png')}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  function placeofworship() {
    return (
      <View style={styles.containerGap}>
        <View style={styles.HeadingContainer}>
          <Text style={styles.Heading}>Place of Worship</Text>
          <Image
            source={require('../../assets/images/flower2.png')}
            resizeMethod="contain"
            style={{ height: SCREEN_WIDTH * 0.06, width: SCREEN_WIDTH * 0.06 }}
          />
        </View>

        <View
          style={{
            paddingHorizontal: SCREEN_WIDTH * 0.03,
            paddingVertical: SCREEN_HEIGHT * 0.02,
            gap: 10,
            borderRadius: 10,
            backgroundColor: 'white',
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Sanatan')}
              style={{
                height: SCREEN_HEIGHT * 0.21,
                width: SCREEN_WIDTH * 0.42,
                borderRadius: 10,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* Container for the text */}
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  alignItems: 'center',
                  zIndex: 1,
                  paddingVertical: 5,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    ...Fonts.grayA14RobotoMedium,
                    color: 'white',
                    // fontWeight: 'bold',
                  }}>
                  Sanatan Temple
                </Text>
              </View>

              {/* Image with GIF */}
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={{ uri: templegif?.SanatanTemple }}
                // source={require('../../assets/Videos/sanatanTemple2.gif')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Navgrah')}
              style={{
                height: SCREEN_HEIGHT * 0.21,
                width: SCREEN_WIDTH * 0.42,
                borderRadius: 10,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* Container for the text */}
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  alignItems: 'center',
                  zIndex: 1,
                  paddingVertical: 5,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    ...Fonts.grayA14RobotoMedium,
                    color: 'white',
                    // fontWeight: 'bold',
                  }}>
                  Navgrah Temple
                </Text>
              </View>

              {/* Image with GIF */}
              <FastImage
                style={{ width: '100%', height: '100%' }}
                // source={require('../../assets/Videos/vardaniBargad2.gif')}
                source={{ uri: templegif?.NavgrahTemple }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('VardaniBargad')}
              style={{
                height: SCREEN_HEIGHT * 0.21,
                width: SCREEN_WIDTH * 0.42,
                borderRadius: 10,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* Container for the text */}
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  alignItems: 'center',
                  zIndex: 1,
                  paddingVertical: 5,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    ...Fonts.grayA14RobotoMedium,
                    color: 'white',
                    // fontWeight: 'bold',
                  }}>
                  VardaniBargad
                </Text>
              </View>

              {/* Image with GIF */}
              <FastImage
                style={{ width: '100%', height: '100%' }}
                // source={require('../../assets/Videos/vardaniBargad2.gif')}
                source={{ uri: templegif?.NavgrahTemple2 }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Shivalya')}
              style={{
                height: SCREEN_HEIGHT * 0.21,
                width: SCREEN_WIDTH * 0.42,
                borderRadius: 10,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* Container for the text */}
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  alignItems: 'center',
                  zIndex: 1,
                  paddingVertical: 5,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    ...Fonts.grayA14RobotoMedium,
                    color: 'white',
                    // fontWeight: 'bold',
                  }}>
                  Shivalya Temple
                </Text>
              </View>

              {/* Image with GIF */}
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('../../assets/Videos/Shivalya2.gif')}
                // source={{ uri: templegif?.Shivalya }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  function BANNER2() {
    return (
      <View style={styles.containerGap}>
        <View style={styles.HeadingContainer}>
          {/* <Text style={{ color: colors.background_theme2, fontSize: 18, fontWeight: "900" }}>|</Text> */}
          <Text style={styles.Heading}>Complete Horoscope Solution</Text>
          <Image
            source={require('../../assets/images/flower3.png')}
            resizeMethod="contain"
            style={{ height: SCREEN_WIDTH * 0.04, width: SCREEN_WIDTH * 0.04 }}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('kundli')}
          style={{ alignItems: 'center', borderRadius: 10, overflow: 'hidden' }}>
          <Image
            style={{
              height: SCREEN_HEIGHT * 0.2,
              width: SCREEN_WIDTH * 0.98,
              elevation: 1,
              resizeMode: 'cover',
            }}
            source={require('../../assets/images/BANNER2.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function banner3() {
    return (
      <View style={styles.containerGap}>
        <View style={styles.HeadingContainer}>
          <Text style={styles.Heading}> Horoscope Matching</Text>
          <Image
            source={require('../../assets/images/flower.png')}
            resizeMethod="contain"
            style={{ height: SCREEN_WIDTH * 0.04, width: SCREEN_WIDTH * 0.04 }}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('newMatching')}
          style={{
            alignItems: 'center',
            borderRadius: 10,
            borderRadius: 10,
            overflow: 'hidden',
          }}>
          <View
            style={{
              alignItems: 'center',
              borderRadius: 10,
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <Image
              style={{
                height: SCREEN_HEIGHT * 0.2,
                width: SCREEN_WIDTH * 0.98,
                elevation: 1,
                resizeMode: 'cover',
              }}
              source={require('../../assets/images/banner3.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  function YourHoroscope() {
    return (
      <View style={styles.containerGap}>
        <View style={styles.HeadingContainer}>
          {/* <Text style={{ color: colors.background_theme2, fontSize: 18, fontWeight: "900" }}>|</Text> */}
          <Text style={styles.Heading}>Your Horoscope </Text>
          <Image
            source={require('../../assets/images/flower2.png')}
            resizeMethod="contain"
            style={{ height: SCREEN_WIDTH * 0.04, width: SCREEN_WIDTH * 0.04 }}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('selectSign')}
          style={{ alignItems: 'center', borderRadius: 10, overflow: 'hidden' }}>
          <Image
            style={{
              height: SCREEN_HEIGHT * 0.2,
              width: SCREEN_WIDTH * 0.98,
              elevation: 1,
              resizeMode: 'cover',
            }}
            source={require('../../assets/images/BANNER4.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
  function banner5() {
    return (
      <View style={styles.containerGap}>
        <View style={styles.HeadingContainer}>
          <Text style={styles.Heading}>Religion Collection</Text>
          <Image
            source={require('../../assets/images/flower3.png')}
            resizeMethod="contain"
            style={{ height: SCREEN_WIDTH * 0.04, width: SCREEN_WIDTH * 0.04 }}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('PujaSection')}
          style={{ alignItems: 'center', borderRadius: 10, overflow: 'hidden' }}>
          <Image
            style={{
              height: SCREEN_HEIGHT * 0.2,
              width: SCREEN_WIDTH * 0.98,
              elevation: 1,
              resizeMode: 'cover',
            }}
            source={require('../../assets/images/banner5.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
  function banner6() {
    return (
      <View style={styles.containerGap}>
        <View style={styles.HeadingContainer}>
          <Text style={styles.Heading}>AstroOne Special Devotee Rosery</Text>
          <Image
            source={require('../../assets/images/flower.png')}
            resizeMethod="contain"
            style={{ height: SCREEN_WIDTH * 0.04, width: SCREEN_WIDTH * 0.04 }}
          />
        </View>
        <TouchableOpacity
          // onPress={() => navigation.navigate('ReferEarn')}
          style={{ alignItems: 'center', borderRadius: 10, overflow: 'hidden' }}>
          <View
            style={{
              alignItems: 'center',
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <Image
              style={{
                height: SCREEN_HEIGHT * 0.2,
                width: SCREEN_WIDTH * 0.98,
                elevation: 1,
                resizeMode: 'cover',
              }}
              source={require('../../assets/images/banner7.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }





  function visittemple({ liveTempleData }) {

    const renderItem = ({ item }) => (

      <View
        style={{
          borderWidth: 0.5,
          borderRadius: 10,
          backgroundColor: 'white',
          borderColor: 'gray',
        }}>

        <View
          style={{
            height: SCREEN_HEIGHT * 0.18,
            width: SCREEN_WIDTH * 0.41,
          }}>
          <FastImage
            style={{
              width: SCREEN_WIDTH * 0.22,
              height: SCREEN_WIDTH * 0.07,
            }}
            source={require('../../assets/gifs/live_gif.gif')}
          />
          <WebView
            source={{ uri: item?.VideoLink }}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />


        </View>


        <View style={{ padding: 10 }}>
          <Text style={{ ...Fonts.PoppinsRegular, textAlign: "center", fontWeight: "bold" }}>{item?.TempleName}</Text>
          <Text style={{ ...Fonts.PoppinsRegular, textAlign: "center", width: SCREEN_WIDTH * 0.4 }}
            numberOfLines={1} ellipsizeMode="tail"
          >{item?.Description}</Text>
        </View>


      </View>
    );
    return (
      <View style={styles.containerGap}>
        <View style={styles.HeadingContainer}>
          <Text style={styles.Heading}>Virtue of visiting famous temples</Text>
          <Image
            source={require('../../assets/images/SanatanFlag.png')}
            resizeMethod="contain"
            style={{ height: SCREEN_WIDTH * 0.08, width: SCREEN_WIDTH * 0.08 }}
          />
        </View>

        <FlatList
          horizontal
          data={liveTempleData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            flexDirection: 'row',
            gap: 10,
          }}
        />
      </View>
    );
  }








  function analysis() {
    const data = [
      {
        id: '1',
        label: 'Lalkitab',
        image: require('../../assets/images/horoscope2.png'),
      },
      {
        id: '2',
        label: 'Prashna',
        image: require('../../assets/images/horoscope3.png'),
      },
      {
        id: '3',
        label: 'Vastu',
        image: require('../../assets/images/horoscope2.png'),
      },
    ];
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          width: SCREEN_WIDTH * 0.4,
          paddingHorizontal: SCREEN_WIDTH * 0.02,
          gap: 5,
          paddingVertical: SCREEN_HEIGHT * 0.006,
          borderRadius: 100,
          backgroundColor: colors.background_theme2,
        }}>
        <View
          style={{
            height: SCREEN_HEIGHT * 0.054,
            width: SCREEN_WIDTH * 0.111,
          }}>
          <Image
            resizeMode="contain"
            style={{
              height: '100%',
              width: '100%',
            }}
            source={item.image}
          />
        </View>
        <Text style={{ ...Fonts.PoppinsMedium, color: colors.white_color }}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 5 }}>
            <Text
              style={{
                color: colors.background_theme2,
                fontSize: 18,
                fontWeight: '900',
              }}>
              |
            </Text>
            <View>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={styles.Heading}>Contact now for astrological</Text>
                <Image
                  source={require('../../assets/images/flower2.png')}
                  resizeMethod="contain"
                  style={{
                    height: SCREEN_WIDTH * 0.04,
                    width: SCREEN_WIDTH * 0.04,
                  }}
                />
              </View>

              <Text style={styles.Heading}>analysis for solution</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: colors.background_theme2,
                width: SCREEN_WIDTH * 0.18,
                borderRadius: 20,
                alignItems: 'center',
                paddingVertical: SCREEN_HEIGHT * 0.005,
              }}>
              <Text
                style={{
                  color: colors.background_theme2,
                  ...Fonts.PoppinsMedium,
                }}>
                View
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <ScrollView
          horizontal={true}
          style={{ flexDirection: "row", paddingVertical: SCREEN_HEIGHT * 0.025 }}>

          <View style={{ gap: 3, flexDirection: "row" }}>
            <TouchableOpacity style={{ alignItems: "center", flexDirection: "row", width: SCREEN_WIDTH * 0.4, paddingHorizontal: SCREEN_WIDTH * 0.02, gap: 5, paddingVertical: SCREEN_HEIGHT * 0.012, borderRadius: 100, backgroundColor: colors.background_theme2 }}>
              <Image
                style={{ height: SCREEN_HEIGHT * 0.054, width: SCREEN_WIDTH * 0.111 }}
                source={require('../../assets/images/circle.png')} />
              <Text style={{ fontSize: 12, color: "white" }}>Lalkitab</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: "center", flexDirection: "row", width: SCREEN_WIDTH * 0.4, paddingHorizontal: SCREEN_WIDTH * 0.02, gap: 5, paddingVertical: SCREEN_HEIGHT * 0.012, borderRadius: 100, backgroundColor: colors.background_theme2 }}>
              <Image
                style={{ height: SCREEN_HEIGHT * 0.054, width: SCREEN_WIDTH * 0.111 }}
                source={require('../../assets/images/circle.png')} />
              <Text style={{ fontSize: 12, color: "white" }}>Prashna</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: "center", flexDirection: "row", width: SCREEN_WIDTH * 0.4, paddingHorizontal: SCREEN_WIDTH * 0.02, gap: 5, paddingVertical: SCREEN_HEIGHT * 0.012, borderRadius: 100, backgroundColor: colors.background_theme2 }}>
              <Image
                style={{ height: SCREEN_HEIGHT * 0.054, width: SCREEN_WIDTH * 0.111 }}
                source={require('../../assets/images/circle.png')} />
              <Text style={{ fontSize: 12, color: "white" }}>Vastu</Text>
            </TouchableOpacity>
          </View>
        </ScrollView> */}

        <FlatList
          horizontal
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            flexDirection: 'row',
            paddingVertical: SCREEN_HEIGHT * 0.025,
            gap: 3,
          }}
        />
      </View>
    );
  }

  function ALMANAC() {
    return (
      <View style={styles.containerGap}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={styles.HeadingContainer}>
            <Text style={styles.Heading}>Today's Almanac</Text>
            <Image
              source={require('../../assets/images/flower3.png')}
              resizeMethod="contain"
              style={{ height: SCREEN_WIDTH * 0.04, width: SCREEN_WIDTH * 0.04 }}
            />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('NewPanchang')}>
            <Entypo name="calendar" color={'black'} size={20} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 25,
            paddingHorizontal: SCREEN_WIDTH * 0.025,
            paddingVertical: SCREEN_HEIGHT * 0.02,
            borderRadius: 10,
            backgroundColor: colors.background_theme2,
          }}>
          <View
            style={{ height: SCREEN_HEIGHT * 0.15, width: SCREEN_WIDTH * 0.3 }}>
            <Image
              resizeMode="contain"
              style={{ height: '100%', width: '100%' }}
              source={require('../../assets/images/rishi.png')}
            />
          </View>

          <View>
            <Text style={styles.AlmanacCommonText}>thithi</Text>
            <Text style={styles.AlmanacCommonText}>din</Text>
            <Text style={styles.AlmanacCommonText}>Special Diwali</Text>
            <Text style={styles.AlmanacCommonText}>Constellation</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function HAPPY() {
    return (
      <View style={styles.containerGap}>
        <View style={styles.HeadingContainer}>
          <Text style={styles.Heading}>AstroOne's Happy Family</Text>
          <Image
            source={require('../../assets/images/SanatanFlag.png')}
            resizeMethod="contain"
            style={{ height: SCREEN_WIDTH * 0.08, width: SCREEN_WIDTH * 0.08 }}
          />
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: SCREEN_WIDTH * 0.02,
            paddingVertical: SCREEN_HEIGHT * 0.015,
            paddingBottom: SCREEN_HEIGHT * 0.04,
            backgroundColor: '#FCCDC7',
            borderRadius: 10,
            borderColor: colors.gray,
            borderWidth: 1,
          }}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View
              style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.2 }}>
              <Image
                resizeMode="contain"
                style={{ height: '100%', width: '100%' }}
                source={require('../../assets/icons/astroone.png')}
              />
            </View>
            <View>
              <Text style={{ ...Fonts.PoppinsMedium }}>Shreesh & Anju</Text>
              <Text style={{ ...Fonts.PoppinsMedium, color: colors.grey_color }}>
                Nyc work
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <EvilIcons name="star" size={20} color={'gray'} />
            <EvilIcons name="star" size={20} color={'gray'} />
            <EvilIcons name="star" size={20} color={'gray'} />
            <EvilIcons name="star" size={20} color={'gray'} />
            <EvilIcons name="star" size={20} color={'gray'} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function SHOPPING() {
    const data = [
      { id: '1', title: 'E-Puja', image: require('../../assets/images/god.png') },
      {
        id: '4',
        title: 'Hawan-Samagri',
        image: require('../../assets/images/Fire.png'),
      },

      {
        id: '2',
        title: 'Jyoti samarghree',
        image: require('../../assets/images/shreeRam.png'),
      },
      {
        id: '3',
        title: 'Braclet',
        image: require('../../assets/images/Braclet.png'),
      },
    ];
    return (
      <View style={styles.containerGap}>
        <View style={styles.HeadingContainer}>
          <Text style={styles.Heading}>Online shop of astrology material</Text>
          <Image
            source={require('../../assets/images/flower.png')}
            resizeMethod="contain"
            style={{ height: SCREEN_WIDTH * 0.04, width: SCREEN_WIDTH * 0.04 }}
          />
        </View>

        <FlatList
          horizontal
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                width: SCREEN_WIDTH * 0.4,
                borderRadius: 10,
                backgroundColor: 'white',
                marginRight: 10,
              }}
              onPress={() => {
                if (item.title === 'E-Puja') {
                  navigation.navigate('BookPooja', { itemId: item.id, title: item.title });
                }
              }}
            >

              <View
                style={{
                  height: SCREEN_HEIGHT * 0.2,
                  width: SCREEN_WIDTH * 0.4,
                  overflow: 'hidden',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}>
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                    resizeMode: 'cover',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                  source={item.image}
                />
              </View>

              <View
                style={{
                  alignItems: 'center',
                  paddingVertical: SCREEN_HEIGHT * 0.01,
                }}>
                <Text style={{ ...Fonts.PoppinsMedium }}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  function liveListInfo() {
    const live = (live_ud, astroId, data) => {
      if (customerData.username != null) {
        navigation.navigate('goLive', {
          liveID: live_ud,
          astro_id: astroId,
          userID: customerData.id,
          userName: customerData.username,
          astroData: data,
        });
      } else {
        Alert.alert('Message', 'Please Update Customer Account.');
      }
    };

    const renderItems = ({ item, index }) => {
      return item.current_status1 === 'Live' ? (
        <TouchableOpacity
          activeOpacity={0.9} // Set the active opacity level here
          onPress={() => live(item.live_id, item.user_id, item)}
          key={index}
          style={{
            flex: 0,
            width: width * 0.355,
            borderRadius: 5,
            marginVertical: 10,
            shadowColor: colors.black_color5,
            shadowOffset: { width: 2, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            zIndex: 100,
            marginHorizontal: 20,
          }}>
          <View
            style={{
              borderRadius: 10,
              borderColor: '#ddd',
              backgroundColor: colors.background_theme2,
            }}>
            <View
              style={{
                height: 150,
                alignItems: 'center',
              }}>
              <Image
                source={{ uri: item.img_url }}
                style={{
                  width: width * 0.25,
                  height: width * 0.25,
                  borderRadius: 100,
                  borderWidth: 0.5,
                  borderColor: colors.white_color,
                  marginTop: 10,
                }}
              />
              <View style={{}}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: getFontSize(1.2),
                    color: colors.black_color9,
                    fontFamily: fonts.semi_bold,
                    paddingRight: 10,
                    textAlign: 'center',
                  }}>
                  {item.owner_name}
                </Text>
                <View
                  style={{
                    flex: 0.9,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../../assets/images/live_gif.gif')}
                    style={{ width: 102, height: 25 }}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ) : null;
    };
    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            allowFontScaling={false}
            style={{
              color: 'black',
              marginHorizontal: 10,
              fontSize: getFontSize(1.8),
            }}>
            {t('astrologer_live')}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('astrolive', { data: 'home' })}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 3,
              elevation: 15,
              shadowColor: colors.background_theme2,
              borderRadius: 20,
              backgroundColor: colors.white_color,
            }}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 12,
                color: colors.black_color,
                fontFamily: 'BalluBhai-Regular',
                fontWeight: '800',
                paddingHorizontal: 5,
                paddingVertical: 2,
              }}>
              {t('view_all')}
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={livelist}
          renderItem={renderItems}
          keyExtractor={item => item.id}
          numColumns={1}
          ListEmptyComponent={_listEmptyComponent}
          showsVerticalScrollIndicator={false}
          horizontal
          centerContent={true}
        />
      </View>
    );
  }

  function anuj() {
    return (
      <Modal visible={modalVisible} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#00000070',
              justifyContent: 'center',
              alignItems: 'center',
              // opacity: 0.4
            }}>
            <KeyboardAvoidingView
              style={{
                flex: 0,
                width: '90%',
                height: '40%',
                alignSelf: 'center',
                backgroundColor: colors.background_theme1,
                borderRadius: 10,

              }}

              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

              <View style={{ flexDirection: "row", alignItems: "center", gap: SCREEN_WIDTH * 0.15, paddingHorizontal: SCREEN_WIDTH * 0.04, paddingVertical: SCREEN_HEIGHT * 0.014, borderBottomWidth: 1, borderBottomColor: colors.grey_color }}>

                <View style={{ height: SCREEN_HEIGHT * 0.08, width: SCREEN_WIDTH * 0.14 }}>
                  <Image
                    resizeMode='contain'
                    style={{ height: "100%", width: '100%' }}
                    source={require('../../assets/icons/astroone.png')} />
                </View>

                <View   >
                  <Text style={styles.modaltext}>Thank you for choosing AstroONE </Text>
                  <Text style={styles.modaltext}>-your one-step calestial solution !</Text>
                </View>


              </View>

              <View style={{ alignItems: "center", paddingTop: SCREEN_HEIGHT * 0.03 }}>
                <Text style={[styles.modaltext, { color: colors.black_color7 }]}>Do you have a Referral Code Unlock AstroONE Privileges by</Text>
                <Text style={[styles.modaltext, { color: colors.black_color7 }]} >Submitting it here! Otherwise,Continue to explore</Text>
              </View>

              <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.03, paddingVertical: SCREEN_HEIGHT * 0.02 }}>
                <View style={{ backgroundColor: "lightgray", borderRadius: 10, paddingHorizontal: SCREEN_WIDTH * 0.02, paddingVertical: SCREEN_HEIGHT * 0.005 }}>
                  <TextInput
                    placeholder='Refferal code'
                  />
                </View>
              </View>

              <View style={{ flexDirection: "row", justifyContent: "center", gap: 20 }}>
                <TouchableOpacity style={{ backgroundColor: "lightgray", paddingVertical: SCREEN_HEIGHT * 0.016, alignItems: "center", borderColor: "gray", width: '30%', borderRadius: 10 }}>
                  <Text style={[styles.modaltext, { color: colors.white_color }]}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  update_flash();
                  setModalVisible(false);
                }} style={{ backgroundColor: "red", paddingVertical: SCREEN_HEIGHT * 0.016, alignItems: "center", borderColor: "gray", width: '30%', borderRadius: 10 }}>
                  <Text style={[styles.modaltext, { color: colors.white_color }]}>No, Continue</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: "center",

                  paddingHorizontal: 2,


                }}>
                <View
                  style={{
                    flex: 0.5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: "center",

                    paddingHorizontal: SCREEN_WIDTH * 0.1,
                    paddingTop: SCREEN_HEIGHT * 0.015

                  }}>
                  <BouncyCheckbox

                    size={23}
                    fillColor={colors.background_theme2}
                    unfillColor="#FFFFFF"
                    // isChecked={male}
                    disableBuiltInState
                    text="Don not show again"
                    textStyle={styles.checkBoxText}
                    iconStyle={{
                      borderRadius: 0,

                    }}
                    onPress={() => {
                      setMale(true);

                    }}
                  />
                </View>
                {/* <View
                  style={{
                    flex: 0.5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth:1
                  }}>
                  <BouncyCheckbox
                    size={20}
                    fillColor={colors.background_theme2}
                    unfillColor="#FFFFFF"
                    isChecked={female}
                    disableBuiltInState
                    text="Female"
                    textStyle={styles.checkBoxText}
                    onPress={() => {
                      setMale(false);
                      setFemale(true);
                    }}
                  />
                </View> */}
              </View>


            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  function sreaching() {
    return (
      <View
        style={{
          flex: 0,
          width: '95%',
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          borderRadius: 5,
          backgroundColor: colors.white_color,
          elevation: 5,
          shadowColor: colors.black_color6,
          marginTop: '2%',
        }}>
        <Ionicons name="search" color={colors.black_color7} size={20} />
        <TextInput
          value={search}
          placeholder="Search Experts by name..."
          placeholderTextColor={colors.black_color5}
          onChangeText={text => searchFilterFunction(text)}
          style={{
            width: '100%',
            fontFamily: 'BalluBhai-Regular',
            color: colors.black_color8,
            padding: 8,
          }}
        // onFocus={() => navigation.navigate('astroForChat')}
        />
      </View>
    );
  }

  function videoCallAstrologerList() {
    const renderItems = ({ item, index }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          key={index}
          onPress={
            () =>
              navigation.navigate('astrologerDetailes', {
                _id: item?._id,
                type: 'video',
              })
            // navigation.navigate('AstroForVideo', {
            //   _id: item?._id,
            //   type: 'video',
            // })
          }
          style={{
            width: width * 0.4,
            borderRadius: 10,
            marginHorizontal: 10,
            backgroundColor: getStatusColor(item?.video_call_status),
            shadowColor: Colors.gray,
            shadowOffset: {
              width: 2,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            marginBottom: Sizes.fixPadding * 2,
            elevation: 8,
          }}>
          <Text
            style={{
              ...Fonts.white14RobotoMedium,
              textAlign: 'center',
              textTransform: 'capitalize',
            }}>
            {item?.video_call_status}
          </Text>
          <View
            style={[
              styles.box,
              { borderColor: getStatusColor(item?.video_call_status) },
            ]}>
            <Image
              source={{ uri: base_url + item?.profileImage }}
              style={{
                width: width * 0.18,
                height: width * 0.18,
                borderRadius: 1000,
                borderWidth: 1,
                borderColor: colors.background_theme2,
                alignSelf: 'center',
                overflow: 'hidden',
                marginTop: Sizes.fixPadding,
              }}
            />
            <Text
              allowFontScaling={false}
              style={{
                fontSize: getFontSize(1.6),
                color: colors?.black_color,
                fontFamily: fonts.medium,
                textAlign: 'center',
                marginBottom: Sizes.fixPadding,
                marginTop: Sizes.fixPadding * 0.5,
              }}>
              {item?.astrologerName}
            </Text>
            <View
              style={{
                paddingLeft: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: getFontSize(1.4),
                    color: colors.black_color6,
                    fontFamily: fonts.medium,
                  }}>
                  {`${parseFloat(item?.rating).toFixed(0)}/5`}
                </Text>
                <Image
                  source={require('../../assets/images/icon/star.png')}
                  style={{ width: 15, height: 15 }}
                />
              </View>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: getFontSize(1.2),
                  color: Colors.primaryLight,
                  fontFamily: fonts.medium,
                  textAlign: 'center',
                  marginBottom: Sizes.fixPadding,
                }}>
                Followers: {item?.follower_count}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <SafeAreaProvider style={{ marginBottom: Sizes.fixPadding }}>
        <View
          style={{
            flex: 0,
            width: '95%',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 15,
          }}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: getFontSize(1.6),
              color: colors.black_color,
              fontFamily: fonts.medium,
            }}>
            Video Call With Astrologers{' '}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            // onPress={() => navigation.navigate('astroForChat')}
            onPress={() => navigation.navigate('astroForVideo')}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 3,
              elevation: 15,
              shadowColor: colors.background_theme2,
              borderRadius: 20,
              backgroundColor: colors.white_color,
            }}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 12,
                color: colors.black_color,
                fontFamily: 'BalluBhai-Regular',
                fontWeight: '800',
                paddingHorizontal: 5,
                paddingVertical: 2,
              }}>
              {t('view_all')}
            </Text>
          </TouchableOpacity>
        </View>
        {videoCallAstrolgoer.length === 0 ? (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: Colors.grayA }}>No Chat Astrologer Online</Text>
          </View>
        ) : (
          <FlatList
            data={videoCallAstrolgoer}
            horizontal
            renderItem={renderItems}
          />
        )}
      </SafeAreaProvider>
    );
  }

  function chatAstrologerList() {
    const renderItems = ({ item, index }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          key={index}
          onPress={() =>
            navigation.navigate('astrologerDetailes', {
              _id: item?._id,
              type: 'chat',
            })
          }
          style={{
            width: width * 0.4,
            borderRadius: 10,
            marginHorizontal: 10,
            backgroundColor: getStatusColor(item?.chat_status),
            shadowColor: Colors.gray,
            shadowOffset: {
              width: 2,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            marginBottom: Sizes.fixPadding * 2,
            elevation: 8,
          }}>
          <Text
            style={{
              ...Fonts.white14RobotoMedium,
              textAlign: 'center',
              textTransform: 'capitalize',
            }}>
            {item?.chat_status}
          </Text>
          <View
            style={[
              styles.box,
              { borderColor: getStatusColor(item?.chat_status) },
            ]}>
            <Image
              source={{ uri: base_url + item?.profileImage }}
              style={{
                width: width * 0.18,
                height: width * 0.18,
                borderRadius: 1000,
                borderWidth: 1,
                borderColor: colors.background_theme2,
                alignSelf: 'center',
                overflow: 'hidden',
                marginTop: Sizes.fixPadding,
              }}
            />
            <Text
              allowFontScaling={false}
              style={{
                fontSize: getFontSize(1.6),
                color: colors?.black_color,
                fontFamily: fonts.medium,
                textAlign: 'center',
                marginBottom: Sizes.fixPadding,
                marginTop: Sizes.fixPadding * 0.5,
              }}>
              {item?.astrologerName}
            </Text>
            <View
              style={{
                paddingLeft: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: getFontSize(1.4),
                    color: colors.black_color6,
                    fontFamily: fonts.medium,
                  }}>
                  {`${parseFloat(item?.rating).toFixed(0)}/5`}
                </Text>
                <Image
                  source={require('../../assets/images/icon/star.png')}
                  style={{ width: 15, height: 15 }}
                />
              </View>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: getFontSize(1.2),
                  color: Colors.primaryLight,
                  fontFamily: fonts.medium,
                  textAlign: 'center',
                  marginBottom: Sizes.fixPadding,
                }}>
                Followers: {item?.follower_count}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <SafeAreaProvider style={{ marginBottom: Sizes.fixPadding }}>
        <View
          style={{
            flex: 0,
            width: '95%',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 15,
          }}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: getFontSize(1.6),
              color: colors.black_color,
              fontFamily: fonts.medium,
            }}>
            {t('chat_astrologer')}{' '}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('astroLive')}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 3,
              elevation: 15,
              shadowColor: colors.background_theme2,
              borderRadius: 20,
              backgroundColor: colors.white_color,
            }}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 12,
                color: colors.black_color,
                fontFamily: 'BalluBhai-Regular',
                fontWeight: '800',
                paddingHorizontal: 5,
                paddingVertical: 2,
              }}>
              {t('view_all')}
            </Text>
          </TouchableOpacity>
        </View>
        {chatAstrologer.length === 0 ? (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: Colors.grayA }}>No Chat Astrologer Online</Text>
          </View>
        ) : (
          <FlatList data={chatAstrologer} horizontal renderItem={renderItems} />
        )}
      </SafeAreaProvider>
    );
  }

  function callAstrologerListInfo() {
    const renderItems = ({ item, index }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          key={index}
          onPress={() =>
            navigation.navigate('astrologerDetailes', {
              _id: item?._id,
              type: 'vastu',
            })
          }
          style={{
            width: width * 0.4,
            borderRadius: 10,
            marginHorizontal: 10,
            backgroundColor: getStatusColor(item?.call_status),
            shadowColor: Colors.gray,
            shadowOffset: {
              width: 2,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 8,
            marginBottom: Sizes.fixPadding,
          }}>
          <Text
            style={{
              ...Fonts.white14RobotoMedium,
              textAlign: 'center',
              textTransform: 'capitalize',
            }}>
            {item?.call_status}
          </Text>
          <View
            style={[
              styles.box,
              { borderColor: getStatusColor(item?.call_status) },
            ]}>
            <Image
              source={{ uri: base_url + item?.profileImage }}
              style={{
                width: width * 0.18,
                height: width * 0.18,
                borderRadius: 1000,
                borderWidth: 1,
                borderColor: colors.background_theme2,
                alignSelf: 'center',
                overflow: 'hidden',
                marginTop: Sizes.fixPadding,
              }}
            />
            <Text
              allowFontScaling={false}
              style={{
                fontSize: getFontSize(1.6),
                color: colors?.black_color,
                fontFamily: fonts.medium,
                textAlign: 'center',
                marginBottom: Sizes.fixPadding,
                marginTop: Sizes.fixPadding * 0.5,
              }}>
              {item?.astrologerName}
            </Text>
            <View
              style={{
                paddingLeft: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: getFontSize(1.4),
                    color: colors.black_color6,
                    fontFamily: fonts.medium,
                  }}>
                  {`${parseFloat(item?.rating).toFixed(0)}/5`}
                </Text>
                <Image
                  source={require('../../assets/images/icon/star.png')}
                  style={{ width: 15, height: 15 }}
                />
              </View>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: getFontSize(1.2),
                  color: Colors.primaryLight,
                  fontFamily: fonts.medium,
                  textAlign: 'center',
                  marginBottom: Sizes.fixPadding,
                }}>
                Followers: {item?.follower_count}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <SafeAreaProvider>
        <View
          style={{
            flex: 0,
            width: '95%',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 15,
          }}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: getFontSize(1.6),
              color: colors.black_color,
              fontFamily: fonts.medium,
            }}>
            {t('call_astrologer')}{' '}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('astroForCall')}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 3,
              elevation: 15,
              shadowColor: colors.background_theme2,
              borderRadius: 20,
              backgroundColor: colors.white_color,
            }}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 12,
                color: colors.black_color,
                fontFamily: 'BalluBhai-Regular',
                fontWeight: '800',
                paddingHorizontal: 5,
                paddingVertical: 2,
              }}>
              {t('view_all')}
            </Text>
          </TouchableOpacity>
        </View>

        {callAstrologer.length === 0 ? (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: Colors.grayA }}>No Call Astrologer Online</Text>
          </View>
        ) : (
          <FlatList
            data={callAstrologer}
            horizontal
            renderItem={renderItems}
            keyExtractor={item => item?.id?.toString()} // Use a unique key for each item
          />
        )}
      </SafeAreaProvider>
    );
  }

  function OtherExperts() {
    const renderItems = ({ item, index }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          key={index}
          onPress={() =>
            navigation.navigate('astrologerDetailes', {
              _id: item?._id,
              type: 'call',
            })
          }
          style={{
            width: width * 0.4,
            borderRadius: 10,
            marginHorizontal: 10,
            backgroundColor: getStatusColor(item?.call_status),
            shadowColor: Colors.gray,
            shadowOffset: {
              width: 2,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 8,
            marginBottom: Sizes.fixPadding,
          }}>
          <Text
            style={{
              ...Fonts.white14RobotoMedium,
              textAlign: 'center',
              textTransform: 'capitalize',
            }}>
            {item?.call_status}
          </Text>
          <View
            style={[
              styles.box,
              { borderColor: getStatusColor(item?.call_status) },
            ]}>
            <Image
              source={{ uri: base_url + item?.profileImage }}
              style={{
                width: width * 0.18,
                height: width * 0.18,
                borderRadius: 1000,
                borderWidth: 1,
                borderColor: colors.background_theme2,
                alignSelf: 'center',
                overflow: 'hidden',
                marginTop: Sizes.fixPadding,
              }}
            />
            <Text
              allowFontScaling={false}
              style={{
                fontSize: getFontSize(1.6),
                color: colors?.black_color,
                fontFamily: fonts.medium,
                textAlign: 'center',
                marginBottom: Sizes.fixPadding,
                marginTop: Sizes.fixPadding * 0.5,
              }}>
              {item?.astrologerName}
            </Text>
            <View
              style={{
                paddingLeft: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: getFontSize(1.4),
                    color: colors.black_color6,
                    fontFamily: fonts.medium,
                  }}>
                  {`${parseFloat(item?.rating).toFixed(0)}/5`}
                </Text>
                <Image
                  source={require('../../assets/images/icon/star.png')}
                  style={{ width: 15, height: 15 }}
                />
              </View>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: getFontSize(1.2),
                  color: Colors.primaryLight,
                  fontFamily: fonts.medium,
                  textAlign: 'center',
                  marginBottom: Sizes.fixPadding,
                }}>
                Followers: {item?.follower_count}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <SafeAreaProvider>
        <View
          style={{
            flex: 0,
            width: '95%',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 15,
          }}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: getFontSize(1.6),
              color: colors.black_color,
              fontFamily: fonts.medium,
            }}>
            {t('Other_experts')}{' '}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('astroForCall')}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 3,
              elevation: 15,
              shadowColor: colors.background_theme2,
              borderRadius: 20,
              backgroundColor: colors.white_color,
            }}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 12,
                color: colors.black_color,
                fontFamily: 'BalluBhai-Regular',
                fontWeight: '800',
                paddingHorizontal: 5,
                paddingVertical: 2,
              }}>
              {t('view_all')}
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList data={callAstrologer} horizontal renderItem={renderItems} />
      </SafeAreaProvider>
    );
  }

  function kundliInfo() {
    return (
      <ScrollView
        nestedScrollEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: 8 }}>
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 5,
          }}>
          <View style={{ alignContent: 'center', alignSelf: 'center' }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('kundli')}
              style={styles.panchangContainer}>
              <Image
                source={require('../../assets/images/kundlilogo/logo3.png')}
                style={styles.panchangImage}
              />
            </TouchableOpacity>
            <Text allowFontScaling={false} style={styles.punchangText}>
              {t('kundli')}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('newMatching')}
              style={styles.panchangContainer}>
              <Image
                source={require('../../assets/images/kundlilogo/matchmaking.png')}
                style={styles.panchangImage}
              />
            </TouchableOpacity>
            <Text allowFontScaling={false} style={styles.punchangText}>
              {t('matching')}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('selectSign')}
              style={styles.panchangContainer}>
              <Image
                source={require('../../assets/images/kundlilogo/horoscope-one.png')}
                style={styles.panchangImage}
              />
            </TouchableOpacity>
            <Text allowFontScaling={false} style={styles.punchangText}>
              {t('rashi_report')}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('numerology')}
              style={styles.panchangContainer}>
              <Image
                source={require('../../assets/images/kundlilogo/numerology-one.png')}
                style={styles.panchangImage}
              />
            </TouchableOpacity>
            <Text allowFontScaling={false} style={styles.punchangText}>
              {t('numerology')}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('panchange')}
              style={styles.panchangContainer}>
              <Image
                source={require('../../assets/images/kundlilogo/krishnamurtipadti.png')}
                style={styles.panchangImage}
              />
            </TouchableOpacity>
            <Text allowFontScaling={false} style={styles.punchangText}>
              Panchang
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
  function ASTROONENOTE() {
    return (
      <View style={{ marginTop: SCREEN_WIDTH * 0.04 }}>
        <View style={styles.HeadingContainer}>
          <Text style={styles.Heading}>Auspicious and Inauspicious time</Text>
          <Image
            source={require('../../assets/images/flower.png')}
            resizeMethod="contain"
            style={{ height: SCREEN_WIDTH * 0.04, width: SCREEN_WIDTH * 0.04 }}
          />
        </View>
      </View>
    );
  }


  function bannerInfo() {
    // function bannerInfo() {
    //   const renderItem = ({ index, item }) => {

    const renderItem = ({ index, item }) => {

      const handlePress = () => {
        const url = item?.redirectionUrl; // Replace with your desired URL
        const urlPattern = new RegExp(
          '^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$',
          'i', // fragment locator
        );
        if (url && urlPattern.test(url)) {
          Linking.openURL(url).catch(err => {
            // console.error("Failed to open URL", err);
            // Alert.alert("Error", "Failed to open URL.");
          });
        } else {
          Alert.alert('Invalid URL', 'The provided URL is not valid.');
        }
      };

      return (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
          }}
          onPress={handlePress}>
          <Image
            source={{ uri: img_url + item?.bannerImage }}
            style={{ width: width * 0.95, height: width / 2.3, borderRadius: 10, marginBottom: SCREEN_WIDTH * 0.09 }}
            resizeMode="stretch"
          />
        </TouchableOpacity>
      );
    };

    return (
      <View style={{}}>
        <Carousel
          loop
          width={width}
          height={width / 2}
          autoPlay={true}
          data={bannerData}
          scrollAnimationDuration={1500}
          autoPlayInterval={5000}
          renderItem={renderItem}
        />
      </View>
    );
  }

  function CARD1() {
    return (
      //  backgroundColor: "",
      <View style={{}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: Sizes.fixPadding,
            paddingVertical: Sizes.fixPadding,
            borderRadius: 10,
            backgroundColor: 'white',
            borderColor: 'gray',
            elevation: 1,
          }}>
          <View style={{ gap: 10 }}>
            <View style={styles.AuspiciousContainer}>
              <Text style={[styles.AuspiciousCommanText, { color: '#10EC86' }]}>
                Abhijeet Mahurata
              </Text>
              <Text
                style={[
                  styles.AuspiciousCommanText,
                  { color: colors.black_color },
                ]}>
                {getabhijitdata?.abhijitmuhuratstart} - {getabhijitdata?.abhijitmuhuratend}
              </Text>
            </View>
            <View
              style={[
                styles.AuspiciousContainer,
                { backgroundColor: '#FCCDC7' },
              ]}>
              <Text style={[styles.AuspiciousCommanText, { color: '#EB1C0A' }]}>
                Rahukaal
              </Text>
              <Text
                style={[
                  styles.AuspiciousCommanText,
                  { color: colors.black_color },
                ]}>
                {getdurmuhurtdata?.rahukaalstart} - {getdurmuhurtdata?.rahukaalend}
              </Text>
            </View>
          </View>

          <View style={{ gap: 10 }}>
            <View
              style={[
                styles.AuspiciousContainer,
                { backgroundColor: '#685F02' },
              ]}>
              <Text style={[styles.AuspiciousCommanText, { color: '#DACD29' }]}>
                Gulik period
              </Text>
              <Text
                style={[
                  styles.AuspiciousCommanText,
                  { color: colors.black_color },
                ]}>
                {getgulikdata?.gulikkaalstart} - {getgulikdata?.gulikkaalend}
              </Text>
            </View>
            <View
              style={[
                styles.AuspiciousContainer,
                { backgroundColor: '#6D88D5' },
              ]}>
              <Text style={[styles.AuspiciousCommanText, { color: '#0849F1' }]}>
                Yamghantak
              </Text>
              <Text
                style={[
                  styles.AuspiciousCommanText,
                  { color: colors.black_color },
                ]}>
                {getyamgantakdata?.yamgantakkaalstart} - {getyamgantakdata?.yamgantakkaalend}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('NewPanchang')}
          style={{ alignItems: 'center', bottom: SCREEN_HEIGHT * 0.12 }}>
          <Image
            style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.24 }}
            source={require('../../assets/images/panchang.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function blogsInfo() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('blogDetailes', {
              blogData: item,
            })
          }
          style={{ margin: 10, overflow: 'hidden', elevation: 5 }}>
          <Image
            source={{ uri: img_url + item?.image }}
            style={{
              width: 200,
              height: 100,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              resizeMode: 'stretch',
            }}
          />
          <Text
            style={{
              textAlign: 'center',
              marginTop: 5,
              backgroundColor: colors.background_theme2,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              top: -5,
              width: 200,
              height: 20,
              color: colors.white_color,
            }}>
            {' '}
            {item.title}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}>
          <Text
            allowFontScaling={false}
            style={{
              color: 'black',
              // marginHorizontal: 10,
              fontSize: getFontSize(1.8),
            }}>
            {t('blogs')}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('astroBlog')}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 3,
              elevation: 15,
              shadowColor: colors.background_theme2,
              borderRadius: 20,
              backgroundColor: colors.white_color,
            }}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 12,
                color: colors.black_color,
                fontFamily: 'BalluBhai-Regular',
                fontWeight: '800',
                paddingHorizontal: 5,
                paddingVertical: 2,
              }}>
              {t('view_all')}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={astroBlogData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal={true}
        />
      </ScrollView>
    );
  }

  function mallInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        onPress={() => navigation.navigate('products', { ...item })}
        style={{ margin: 10, overflow: 'hidden', elevation: 2 }}>
        <Image
          source={{ uri: img_url + item?.image }}
          style={{
            width: 200,
            height: 100,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            borderWidth: 1,
            // borderColor:Colors.backgroundColor.pri
            backgroundColor: colors.background_theme2,
            borderColor: colors.background_theme2,
            resizeMode: 'stretch',
          }}
        />
        <Text
          style={{
            width: 200,
            height: 20,
            color: colors.white_color,
            textAlign: 'center',
            marginTop: 5,
            backgroundColor: colors.background_theme2,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            // borderWidth: 1,
            top: -5,
          }}>
          {item?.categoryName}
        </Text>
      </TouchableOpacity>
    );

    return (
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
            alignItems: 'center',
          }}>
          <Text
            allowFontScaling={false}
            style={{
              color: 'black',
              // marginHorizontal: 10,
              fontSize: getFontSize(1.8),
            }}>
            {t('e-commerce')}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('productCategory', { data: 'home' })
            }
            style={{
              paddingHorizontal: 10,
              paddingVertical: 3,
              elevation: 15,
              shadowColor: colors.background_theme2,
              borderRadius: 20,
              backgroundColor: colors.white_color,
            }}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 12,
                color: colors.black_color,
                fontFamily: 'BalluBhai-Regular',
                fontWeight: '800',
                paddingHorizontal: 5,
                paddingVertical: 2,
              }}>
              {t('view_all')}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={productCategoryData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal={true} // Change to true for horizontal scroll
        />
      </ScrollView>
    );
  }
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  wallet: state.customer.wallet,
  notificationData: state.customer.notificationData,
  firebaseId: state.customer.firebaseId,
  bannerData: state.home.bannerData,
  callAstrologer: state.home.callAstrologer,
  chatAstrologer: state.home.chatAstrologer,
  // videoCallAstrologers: state.astrologer.videoCallAstrologers,
  homeSimmer: state.home.homeSimmer,
  isRefreshing: state.setting.isRefreshing,
  productCategoryData: state.ecommerce.productCategoryData,
  astroBlogData: state.blogs.astroBlogData,
  poojaData: state.pooja.poojaData,
  newPoojaData: state.pooja.newPoojaData,
  videocallInvoiceVisble: state.chat.videocallInvoiceVisble,
  videoCallAstrolgoer: state.home.videoCallAstrolgoer,
  templegif: state.home.templegif,
  getabhijitdata: state.home.getabhijitdata,
  getdurmuhurtdata: state.home.getdurmuhurtdata,
  getgulikdata: state.home.getgulikdata,
  getyamgantakdata: state.home.getyamgantakdata,
  liveTempleData: state.home.liveTempleData,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  panchangContainer: {
    width: width * 0.18,
    height: width * 0.18,
    backgroundColor: '#48cae4',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 9,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: colors.black_color6,
  },

  punchangText: {
    fontSize: getFontSize(1.2),
    fontWeight: '400',
    fontFamily: fonts.medium,
    marginTop: 4,
    color: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  box: {
    backgroundColor: colors.white_color,
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 10,
    flex: 1,
  },
  box2: {
    alignSelf: 'center',
  },
  boxtext: {
    textAlign: 'center',
    fontSize: getFontSize(1.5),
    fontWeight: 'bold',
    paddingTop: 5,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    borderBottomWidth: 1, // Add a border to the bottom of each row
    borderColor: '#dee2e6',
    marginTop: 10,
    marginBottom: 10,
  },
  row1: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  info: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    margin: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  panchangImage: {
    width: width * 0.13,
    height: width * 0.13,
    resizeMode: 'contain',
    borderRadius: 1000,
  },
  Heading: {
    ...Fonts.PoppinsMedium,
    fontSize: 16,
    // textAlign:'center'
  },
  HeadingContainer: {
    paddingLeft: Sizes.fixPadding,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    borderLeftWidth: 2,
    borderLeftColor: colors.background_theme2,
  },
  AuspiciousContainer: {
    width: SCREEN_WIDTH * 0.43,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: Sizes.fixPadding,
    backgroundColor: '#40956E',
    elevation: 1,
  },
  AuspiciousCommanText: {
    ...Fonts.PoppinsRegular,
    color: Colors.white,
  },
  containerGap: {
    gap: 10,
  },
  AlmanacCommonText: {
    ...Fonts.PoppinsMedium,
    color: Colors.white
  },
  checkBoxText: {
    fontSize: 11,
    color: "gray",
    fontWeight: "500",
    textDecorationLine: 'none',


  },
  modaltext: {
    fontSize: 11, fontWeight: "500", color: colors.background_theme2,
    color: Colors.white,
  },
});
