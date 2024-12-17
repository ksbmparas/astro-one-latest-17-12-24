import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  ImageBackground,
  // Modal,
} from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import MyHeader from '../../../components/MyHeader';
import Entypo from 'react-native-vector-icons/Entypo'
import {
  colors,
  fonts,
  getFontSize,
} from '../../../config/Constants1';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react';
import MyLoader from '../../../components/MyLoader';
import { connect } from 'react-redux';
const { width } = Dimensions.get('screen');
import { useTranslation } from 'react-i18next';
import * as AstrologerActions from '../../../redux/actions/AstrologerActions';
import { base_url, img_url } from '../../../config/constants';
import { Colors, Sizes, Fonts } from '../../../assets/style'
import * as ChatActions from '../../../redux/actions/ChatActions';
import { showNumber, showToastMessage } from '../../../utils/services';
import { SCREEN_WIDTH } from '../../../config/Screen'
import Stars from 'react-native-stars';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SCREEN_HEIGHT } from '../../../config/Screen';
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { VIEW_KUNDLI_FROM_KUNDLI_MATCHING } from '../../../redux/actionTypes';

const AstrologerDetailesChat = ({
  route,
  navigation,
  dispatch,
  reviewData,
  astroData,
  isFollow
}) => {
  const { t } = useTranslation();
  // const purpose = route.params.type;
  const [isLoading, setIsLoading] = useState(false);

  const [state, setState] = useState({
    seeMore: false,
    seeMore1: false
  });
  console.log(astroData, 'IMage')

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <MyHeader
          title={t('astrologer_details')}
          navigation={navigation}
          statusBar={{
            backgroundColor: colors.background_theme2,
            barStyle: 'light-content',
          }}
        />
      ),
    });
  }, []);

  useEffect(() => {
    dispatch(AstrologerActions.getAstrologerData(route?.params?._id));
    return () => {
      dispatch(AstrologerActions.setAstrologerReviewData(null));
    }
  }, [dispatch]);

  const updateState = data => {
    setState(prevState => {
      const newData = { ...prevState, ...data }
      return newData
    })
  }

  const { seeMore, seeMore1 } = state
  console.log(seeMore1, 'muskan')
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <MyHeader title={'Astrologer Details'} navigation={navigation} />
      <MyLoader isVisible={isLoading} />
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={
            <>
              {astroData && astroDetailInfo()}
              {astroData && chatCallPriceInfo()}
              {astroData?.nextOnline?.date && nextOnlineInfo()}
              {astroData && aboutInfo()}
              {ProfessionalGallery()}
              {/* {astroData && skillsInfo()} */}
              {/* {astroData && mainExpertiesInfo()} */}
              {astroData && remediesInfo()}
              {/* {reviewData && ratingInfo()} */}
              {reviewData && reviewInfo()}
             
            </>
          }
        />
        {chatCallButtonInfo()}
      </View>
    </View>
  );

  function ProfessionalGallery() {

    const Data = [
      { id: '1', image: require('../../../assets/images/theempress.png') },
      { id: '2', image: require('../../../assets/images/themoon.png') },
      { id: '3', image: require('../../../assets/images/temperance.png') },
      { id: '3', image: require('../../../assets/images/twoofwands.png') },
    ];

    const renderCardItem = ({ item }) => {
      return (
        <View>



            <View style={{marginHorizontal:SCREEN_WIDTH*0.01,marginVertical:SCREEN_HEIGHT*0.01}}>
          <Image
            style={{ height: SCREEN_HEIGHT * 0.2, width: SCREEN_WIDTH * 0.3, borderRadius: 10 }}
            source={item.image} />
</View>
        </View>
      );
    };



    return (
      <View style={{ paddingHorizontal:SCREEN_WIDTH*0.02}}>
        <View style={{ paddingHorizontal:SCREEN_WIDTH*0.01,paddingVertical:SCREEN_HEIGHT*0.02}}> 
          <Text style={{fontSize:17,fontWeight:"700",color:colors.background_theme2}}>Professional Gallery</Text>
        </View>
        <FlatList
          data={ Data}
          renderItem={renderCardItem}

          horizontal
        />


      </View>


    )
  }

  function reviewInfo() {
    const noreviewFound = () => {
      return (
        <View>
          <Text style={{ color: Colors.grayDarkA, textAlign: 'center' }}>No Review Found</Text>
        </View>
      )
    }
    const renderItem = ({ item }) => {
      return (
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: Colors.gray,
            marginBottom: 10,
            padding: Sizes.fixPadding,
            marginHorizontal: Sizes.fixPadding
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  width: SCREEN_WIDTH * 0.12,
                  height: SCREEN_WIDTH * 0.12,
                  borderRadius: 100,
                  overflow: 'hidden',
                }}>
                <Image
                  source={{ uri: img_url + item?.customer?.image }}
                  resizeMode="cover"
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ ...Fonts.black14InterMedium }}>
                  {item?.customer?.customerName}
                </Text>
                <Text style={{ ...Fonts.gray14RobotoRegular }}>
                  {moment(item?.createdAt).format('DD MMM YYYY')}
                </Text>
              </View>
            </View>
            <View>
              <Stars
                default={parseFloat(item?.ratings)}
                disabled
                count={5}
                half={true}
                starSize={14}
                fullStar={
                  <Ionicons
                    name={'star'}
                    size={14}
                    color={Colors.primaryLight}
                  />
                }
                emptyStar={
                  <Ionicons
                    name={'star-outline'}
                    size={14}
                    color={Colors.primaryLight}
                  />
                }
                halfStar={
                  <Ionicons
                    size={14}
                    name={'star-half'}
                    style={{ color: Colors.primaryLight }}
                  />
                }
              />
            </View>
          </View>
          <View style={{ marginTop: 10 }}>

            {item?.comments === '' ? (<Text style={{ ...Fonts.gray12RobotoMedium }}>
              No Comments
            </Text>) : (<Text style={{ ...Fonts.black12RobotoRegular }}>
              {item?.comments}
            </Text>)}
          </View>
        </View>
      );
    };
    return (
      <View
        style={{
          // paddingHorizontal: Sizes.fixPadding * 1.5,
          // paddingTop: Sizes.fixPadding * 1.5,
          backgroundColor: Colors.white,
        }}>

        <View style={{ marginTop: Sizes.fixPadding * 1.5, justifyContent: 'center', borderColor: Colors.grayMedium, paddingHorizontal: SCREEN_WIDTH * 0.03 }}>
          <Text style={{ ...Fonts.primaryDark18RobotoMedium, fontWeight: "700" }}>
            Rating & Reviews
          </Text>
        </View>
        <View style={{ marginTop: Sizes.fixPadding }}>
          <FlatList
            data={reviewData?.reviews}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={noreviewFound()}
          />
        </View>
      </View>
    );
  }


  function ratingInfo() {
    const getFillColor = (percentage) => {
      return percentage > 0 ? Colors.primaryLight : Colors.grayLight;
    };

    const getStarColor = (percentage) => {
      return percentage > 0 ? Colors.primaryLight : Colors.gray;
    };

    return (
      <View
        style={{
          // margin: Sizes.fixPadding * 1.5,
          backgroundColor: Colors.white,
        }}>
        <View style={{ padding: Sizes.fixPadding * 0.4, backgroundColor: Colors.grayLight, marginTop: Sizes.fixPadding * 1.5 }}>
        </View>
        <View style={{ marginTop: Sizes.fixPadding * 1.5, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: Colors.grayMedium, paddingBottom: Sizes.fixPadding }}>
          <Text style={{ ...Fonts.primaryDark18RobotoMedium }}>
            Rating and Reviews <Text style={{ color: Colors.black }}>({reviewData?.summary?.totalReview})</Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: Sizes.fixPadding * 1.5,
          }}>
          <Stars
            default={reviewData?.summary?.averageRating ?? astroData?.rating}
            disabled
            count={5}
            half={true}
            starSize={20}
            fullStar={
              <Ionicons name={'star'} size={20} color={getStarColor(reviewData?.summary?.averageRating ?? 0)} />
            }
            emptyStar={
              <Ionicons
                name={'star-outline'}
                size={20}
                color={getStarColor(reviewData?.summary?.averageRating ?? 0)}
              />
            }
            halfStar={
              <Ionicons
                size={20}
                name={'star-half'}
                style={{ color: getStarColor(reviewData?.summary?.averageRating ?? 0) }}
              />
            }
          />
        </View>
        {['five', 'four', 'three', 'two', 'one'].map((rating, index) => {
          const ratingPercentage = reviewData?.summary[`${rating}Percentage`] ?? 0;
          const ratingCount = reviewData?.summary[`${rating}Rating`] ?? 0;
          const starCount = 5 - index;

          return (
            <View
              key={rating}
              style={{
                flexDirection: 'row',
                marginVertical: 5,
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: Sizes.fixPadding * 1.5,

              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ ...Fonts.black14InterMedium, marginRight: 5 }}>
                    {starCount}
                  </Text>
                  <Ionicons name={'star'} size={14} color={getStarColor(ratingPercentage)} />
                </View>
                <View
                  style={{
                    backgroundColor: Colors.grayLight,
                    width: SCREEN_WIDTH * 0.7,
                    height: SCREEN_WIDTH * 0.04,
                    borderRadius: 10,
                    overflow: 'hidden',
                    marginLeft: 10,
                  }}>
                  <View
                    style={{
                      backgroundColor: getFillColor(ratingPercentage),
                      width: `${ratingPercentage}%`,
                      height: '100%',
                    }}></View>
                </View>
              </View>
              <Text style={{ ...Fonts.gray14RobotoMedium, marginLeft: 10 }}>
                {ratingCount}
              </Text>
            </View>
          );
        })}
      </View>
    );
  }


  function mainExpertiesInfo() {
    return (
      <View style={{ backgroundColor: Colors.white, }}>
        <View style={{ padding: Sizes.fixPadding * 0.4, backgroundColor: Colors.grayLight, marginTop: Sizes.fixPadding * 1.5 }}>
        </View>
        <View style={{ marginTop: Sizes.fixPadding * 1.5, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: Colors.grayMedium, paddingBottom: Sizes.fixPadding }}>
          <Text style={{ ...Fonts.primaryDark18RobotoMedium, }}>Main Experties</Text>
        </View>
        <Text
          textBreakStrategy='highQuality'
          style={{ ...Fonts.blackLight14RobotoRegular, marginTop: Sizes.fixPadding, paddingHorizontal: Sizes.fixPadding * 1.5, }}
        >{astroData?.mainExpertise && astroData?.mainExpertise.map(item => item?.mainExpertise).join(', ')}</Text>
      </View>
    )
  }

  // function remediesInfo() {

  //   return (
  //     <View style={{  backgroundColor: Colors.white, }}>
  //       <View style={{padding:Sizes.fixPadding * 0.4,backgroundColor:Colors.grayLight,marginTop:Sizes.fixPadding * 1.5}}>
  //       </View>
  //          <View style={{marginTop:Sizes.fixPadding * 1.5,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:Colors.grayMedium,}}>
  //       <Text style={{ ...Fonts.primaryDark18RobotoMedium, marginBottom: Sizes.fixPadding }}>Remedies</Text>
  //       </View>
  //       <View style={{flexDirection:'row',alignItems:'center',marginTop:Sizes.fixPadding,paddingHorizontal: Sizes.fixPadding * 1.5, }}>

  //       <Text
  //         textBreakStrategy='highQuality'
  //         style={{ ...Fonts.blackLight14RobotoRegular, }}
  //         >{astroData?.remedies && astroData?.remedies.map(item => item?.title).join(', ')}</Text>
  //        {/* {astroData?.remedies ? (<Text
  //         textBreakStrategy='highQuality'
  //         style={{ ...Fonts.blackLight14RobotoRegular, padding: Sizes.fixPadding * 1.5,}}
  //         >{astroData?.remedies?.description.length > 100 && !seeMore ? astroData?.remedies?.description.slice(0, 100) : astroData?.remedies?.description}<Text onPress={() => updateState({ seeMore: !seeMore })} style={{ color: Colors.primaryLight }}> {astroData?.remedies?.description.length > 350 ? seeMore ? 'See less...' : 'See more...' : ''}</Text></Text>) : <Text style={{ textAlign: 'center', color: Colors.grayA }}>No Description Found </Text>} */}
  //      <Text>- </Text>
  //        <Text
  //         textBreakStrategy='highQuality'
  //         style={{ ...Fonts.blackLight14RobotoRegular, }}
  //         >{astroData?.remedies && astroData?.remedies.map(item => item?.description).join(', ')}</Text>
  //         </View>
  //     </View>
  //   )
  // }

  function remediesInfo() {
    const renderItem = ({ item }) => {
      return (
        <View style={{ backgroundColor: '#F6F5F5', width: SCREEN_WIDTH / 2 - Sizes.fixPadding, marginHorizontal: Sizes.fixPadding, borderRadius: 10, marginTop: Sizes.fixPadding }}>
          <Text style={{ ...Fonts.primaryDark18RobotoMedium, marginTop: Sizes.fixPadding, textAlign: 'center' }}>{item?.title}</Text>
          <View style={{ paddingVertical: Sizes.fixPadding * 0.3, backgroundColor: Colors.white }}>

          </View>

          {item?.description ? (<Text
            textBreakStrategy='highQuality'
            style={{ ...Fonts.blackLight14RobotoRegular, padding: Sizes.fixPadding * 1.5, }}
          >{item?.description?.length > 10 && !seeMore ? item?.description.slice(0, 90) : item?.description}<Text onPress={() => updateState({ seeMore: !seeMore })} style={{ color: Colors.primaryLight }}> {item?.description.length > 10 ? seeMore ? 'Read less...' : 'Read more...' : ''}</Text></Text>) : <Text style={{ textAlign: 'center', color: Colors.grayA }}>No Description Found </Text>}
        </View>
      )
    }
    return (
      <View style={{ backgroundColor: Colors.white }}>
        <View style={{ padding: Sizes.fixPadding * 0.4, backgroundColor: Colors.grayLight, marginTop: Sizes.fixPadding * 1.5 }}>
        </View>
        <View style={{ marginTop: Sizes.fixPadding * 1.5, paddingHorizontal: SCREEN_WIDTH * 0.03 }}>
          <Text style={{ ...Fonts.primaryDark18RobotoMedium, marginBottom: Sizes.fixPadding, fontWeight: "700" }}>Remedies</Text>
        </View>
        <FlatList
          data={astroData?.remedies}
          renderItem={renderItem}

          horizontal
        />
      </View>
    )
  }

  function skillsInfo() {
    return (
      <View style={{ padding: Sizes.fixPadding * 1.5, backgroundColor: Colors.white, }}>
        <Text style={{ ...Fonts.primaryDark18RobotoMedium, marginBottom: Sizes.fixPadding }}>Skills</Text>
        <Text
          textBreakStrategy='highQuality'
          style={{ ...Fonts.blackLight14RobotoRegular, }}
        >{astroData?.skill && astroData?.skill.map(item => item?.skill).join(', ')}</Text>
      </View>
    )
  }

  function aboutInfo() {
    console.log(astroData?.long_bio, 'longbio')
    return (
      <View style={{ backgroundColor: Colors.white, paddingTop: SCREEN_HEIGHT * 0.02 }}>
        <View style={{ padding: Sizes.fixPadding * 0.4, backgroundColor: "white" }}>
        </View>
        <View style={{ marginTop: Sizes.fixPadding * 0.7, justifyContent: 'center', borderColor: Colors.grayMedium, paddingBottom: Sizes.fixPadding * 0.5 }}>
          <Text style={{ ...Fonts.primaryDark18RobotoMedium, color: Colors.primaryLight, paddingVertical: Sizes.fixPadding * 0.2, fontWeight: "700", paddingHorizontal: SCREEN_HEIGHT * 0.02 }}>About Astrologer</Text>
        </View>
        {astroData?.long_bio ? (<Text
          textBreakStrategy='highQuality'
          style={{ ...Fonts.blackLight14RobotoRegular, paddingHorizontal: SCREEN_HEIGHT * 0.02, color: "black", fontWeight: "600" }}
        >{astroData?.long_bio.length > 350 && !seeMore1 ? astroData?.long_bio.slice(0, 350) : astroData?.long_bio}<Text onPress={() => updateState({ seeMore1: !seeMore1 })} style={{ color: Colors.primaryLight }}> {astroData?.long_bio.length > 350 ? seeMore1 ? 'Read less ..' : 'Read more ..' : ''}</Text></Text>) : <Text style={{ textAlign: 'center', color: Colors.grayA }}>No Description Found </Text>}

      </View>
    )
  }

  function nextOnlineInfo() {
    return <View style={{ padding: Sizes.fixPadding * 1.5, backgroundColor: '#fff4e8', marginBottom: Sizes.fixPadding }}>
      <Text style={{ ...Fonts.black18RobotoMedium, marginBottom: Sizes.fixPadding * 0.5 }}>Next Online Time</Text>
      <View style={styles.servicesContainer}>
        <Text style={styles.servicesCol1}>{`${moment(astroData?.nextOnline?.data).format('DD MMMM YYYY')} ${moment(astroData?.nextOnline?.time).format('hh:mm A')}`}</Text>
      </View>
    </View>;
  }

  function chatCallPriceInfo() {
    const chatmultiply2 = (astroData?.chat_price + parseFloat(astroData?.commission_chat_price)) + (astroData?.chat_price + parseFloat(astroData?.commission_chat_price))
    const callmultiply2 = (astroData?.call_price + parseFloat(astroData?.commission_call_price)) + (astroData?.call_price + parseFloat(astroData?.commission_call_price))
    const videocall2 = (astroData?.normal_video_call_price + parseFloat(astroData?.commission_normal_video_call_price)) + (astroData?.normal_video_call_price + parseFloat(astroData?.commission_normal_video_call_price))

    return <View style={{ backgroundColor: Colors.white, }}>
      <View style={{ padding: Sizes.fixPadding * 0.5, backgroundColor: "white" }}>
      </View>
      <View style={{ alignItems: "flex-start", paddingHorizontal: SCREEN_HEIGHT * 0.02 }}>
        <Text style={{ ...Fonts.primaryDark18RobotoMedium, fontWeight: "700", marginBottom: Sizes.fixPadding * 0.5, color: Colors.primaryLight, textAlign: 'center' }}>Consultancy Charges</Text>
      </View>

      {/* <View style={{ flexDirection: 'row', marginHorizontal: Sizes.fixPadding,justifyContent:"space-evenly" }}>
        
        
          <LinearGradient
            colors={[colors.background_theme2, colors.background_theme2]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ width: '30%', paddingVertical: Sizes.fixPadding * 0.6, borderRadius: 10 }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
  
              <View style={{
                height: SCREEN_WIDTH * 0.08, width: SCREEN_WIDTH * 0.08, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white, marginLeft: Sizes.fixPadding * 0.6
              }}>
                <Ionicons
                  name={'call'}
                  size={17}
                  color={Colors.primaryLight}
                />
              </View>
              <View style={{ backgroundColor: colors.white_color, paddingHorizontal: Sizes.fixPadding * 1.5, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                <Text style={{ ...Fonts.black14InterMedium, color: Colors.primaryLight }}>Call</Text>
              </View>
  
            </View>
            <View style={{ marginVertical: Sizes.fixPadding }}>
              <Text style={styles.servicesCol2}>{showNumber(astroData?.call_price + parseFloat(astroData?.commission_call_price))}/min</Text>
              <Text style={styles.servicesCol3}>{showNumber(callmultiply2)} /min</Text>
            </View>
         
          </LinearGradient>
  
          <LinearGradient
          colors={[colors.background_theme2, colors.background_theme2]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ width: '30%', paddingVertical: Sizes.fixPadding * 0.6, borderRadius: 10, marginHorizontal: Sizes.fixPadding * 1.5 }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
  
              <View style={{
                height: SCREEN_WIDTH * 0.08, width: SCREEN_WIDTH * 0.08, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white, marginLeft: Sizes.fixPadding * 0.6
              }}>
                <Ionicons
                  name={'chatbubbles-outline'}
                  size={17}
                  color={Colors.primaryLight}
                />
              </View>
              <View style={{ backgroundColor: colors.white_color, paddingHorizontal: Sizes.fixPadding * 1.2, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                <Text style={{ ...Fonts.black14InterMedium, color: Colors.primaryLight }}>Chat</Text>
              </View>
  
            </View>
            <View style={{ marginVertical: Sizes.fixPadding }}>
              <Text style={styles.servicesCol2}>{showNumber(astroData?.chat_price + parseFloat(astroData?.commission_chat_price))}/min</Text>
              <Text style={styles.servicesCol3}>{showNumber(chatmultiply2)} /min</Text>
            </View>
          </LinearGradient>
          {/* <LinearGradient
            colors={['#4b86f1', '#4b86f1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ width: '30%', paddingVertical: Sizes.fixPadding * 0.6, borderRadius: 10 }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
  
  
  
              <View style={{
                height: SCREEN_WIDTH * 0.08, width: SCREEN_WIDTH * 0.08, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white, marginLeft: Sizes.fixPadding * 0.6
              }}>
                <Ionicons
                  name={'videocam'}
                  size={17}
                  color={Colors.primaryLight}
                />
              </View>
              <View style={{ backgroundColor: colors.white_color, paddingHorizontal: Sizes.fixPadding * 1, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                <Text style={{ ...Fonts.black14InterMedium, color: Colors.primaryLight }}>Video</Text>
              </View>
  
            </View>
            <View style={{ marginVertical: Sizes.fixPadding }}>
              <Text style={styles.servicesCol2}>{showNumber(astroData?.normal_video_call_price + parseFloat(astroData?.commission_normal_video_call_price))}/min</Text>
              <Text style={styles.servicesCol3}>{showNumber(videocall2)} /min</Text>
            </View>
          </LinearGradient> */}
      {/* </View> */}

      <View style={{ flexDirection: "row", gap: 13, paddingHorizontal: SCREEN_HEIGHT * 0.02 }}>

        <Text style={{ textDecorationLine: "line-through", color: "red", fontSize: 13 }}>{showNumber(chatmultiply2)} /min</Text>
        <Text style={{ color: "black", fontSize: 13 }}>{showNumber(astroData?.chat_price + parseFloat(astroData?.commission_chat_price))}/min</Text>

      </View>

    </View>;

  }



  function astroDetailInfo() {
    //   return (
    //     <View
    //     //   source={require('../../assets/images/astrologer_background.png')}
    //       style={{
    //         flex: 0,
    //         paddingHorizontal: 15,
    //         paddingVertical: 15,
    //         borderWidth:1
    //       }}>

    //       <View
    //         style={{
    //           flex: 0,
    //           flexDirection: 'row',
    //           alignItems: 'center',
    //           justifyContent: 'space-around',
    //           position: 'relative',
    //           bottom: -20,
    //           zIndex: 1,
    //         }}>
    //       </View>
    //       <View
    //         style={{
    //           flex: 0,
    //           width: '80%',
    //           alignSelf: 'center',
    //           borderWidth:1,

    //           backgroundColor: 'rgba(0.741, 0.741, 0.741, 0.451)',
    //           // backgroundColor:'red',
    //           borderRadius: 20,
    //           paddingVertical: width * 0.12,
    //           marginTop: 10,
    //         }}>

    //         <Text style={{ ...Fonts.white16RobotoMedium, position: 'absolute', top: 10, left: 10 }}>{astroData?.astrologerName}</Text>

    //         <View style={{
    //           flexDirection: 'row',
    //           justifyContent: 'center',
    //         }}>
    //           <Image
    //             source={{ uri: base_url + astroData?.profileImage }}
    //             style={{
    //               width: width * 0.25,
    //               height: width * 0.25,
    //               borderWidth: 2,
    //               borderRadius: (width * 0.25) / 2,
    //               borderColor: colors.background_theme2,
    //               position: 'relative',
    //               left: (-width * 0.25) / 2,
    //               marginLeft: 10,
    //               shadowColor: '#000',
    //               shadowOffset: {
    //                 width: 0,
    //                 height: 4,
    //               },
    //               shadowOpacity: 0.3,
    //               shadowRadius: 4.65,
    //             }}
    //           />
    //           <View
    //             style={{
    //               flex: 1,
    //               position: 'relative',
    //               justifyContent: 'center',
    //               left: (-width * 0.25) / 2.5,
    //             }}>

    //             <View style={{ flex: 0, flexDirection: 'row', marginBottom: 2 }}>
    //               <Ionicons
    //                 name="people-circle-sharp"
    //                 color={colors.white_color}
    //                 size={15}
    //               />
    //               {/* <Text
    //                 allowFontScaling={false}
    //                 style={{
    //                   width: '100%',
    //                   marginLeft: 5,
    //                   fontSize: getFontSize(1.4),
    //                   color: colors.white_color,
    //                   fontFamily: fonts.medium,
    //                 }}>
    //                 {astroData?.expertise && astroData?.expertise.map(item => item.expertise).join(', ')}
    //               </Text> */}
    //               <Text
    //                 allowFontScaling={false}
    //                 style={{
    //                   // width: '150%',
    //                   flex: 1,
    //                   // marginLeft: 5,
    //                   fontSize: getFontSize(1.4),
    //                   color: colors.white_color,
    //                   fontFamily: fonts.medium,
    //                   // borderWidth:2,
    //                   alignItems:'center',
    //                   // right: 5
    //                 }}>{astroData?.skill && astroData?.skill.map(item => item?.skill).join(',')}</Text>
    //             </View>

    //             <View style={{ flex: 0, flexDirection: 'row', marginBottom: 2 }}>
    //               <MaterialCommunityIcons
    //                 name="google-translate"
    //                 color={colors.white_color}
    //                 size={15}
    //               />
    //               <Text
    //                 allowFontScaling={false}
    //                 style={{
    //                   width: '100%',
    //                   marginLeft: 5,
    //                   fontSize: getFontSize(1.4),
    //                   color: colors.white_color,
    //                   fontFamily: fonts.medium,
    //                 }}>
    //                 {[...astroData?.language].join(',')}
    //               </Text>
    //             </View>

    //             <View style={{ flex: 0, flexDirection: 'row', marginBottom: 2 }}>
    //               <MaterialIcons
    //                 name="explicit"
    //                 color={colors.white_color}
    //                 size={15}
    //               />
    //               <Text
    //                 allowFontScaling={false}
    //                 style={{
    //                   width: '100%',
    //                   marginLeft: 5,
    //                   fontSize: getFontSize(1.3),
    //                   color: colors.white_color,
    //                   fontFamily: fonts.medium,
    //                 }}>
    //                 {`${t('experience')}: ${astroData?.experience}-Years`}
    //               </Text>
    //             </View>
    //           </View>
    //         </View>
    //       </View>
    //       <View
    //         style={{
    //           flex: 0,
    //           flexDirection: 'row',
    //           alignItems: 'center',
    //           justifyContent: 'space-around',
    //           position: 'relative',
    //           bottom: 12,
    //         }}>
    //         <TouchableOpacity
    //           onPress={() => dispatch(AstrologerActions.onFollowUnfollowAstrologer(route?.params?._id))}
    //           style={{
    //             flex: 0,
    //             width: '30%',
    //             paddingVertical: 2,
    //             backgroundColor: colors.background_theme2,
    //             borderRadius: 20,
    //           }}>
    //           <Text
    //             allowFontScaling={false}
    //             style={{
    //               fontSize: getFontSize(1.3),
    //               color: colors.black_color,
    //               fontFamily: fonts.medium,
    //               textAlign: 'center',
    //             }}>
    //             {isFollow
    //               ? `${t('following')}`
    //               : `${t('follow')}`}
    //             {/* {astroData?.follower_count} */}
    //           </Text>
    //         </TouchableOpacity>
    //         {/* {astroData?.offer_category &&
    //           astroData.offer_category.split(',').includes('2') && (
    //             <TouchableOpacity
    //               style={{
    //                 flex: 0,
    //                 width: '30%',
    //                 paddingVertical: 2,
    //                 backgroundColor: colors.background_theme2,
    //                 borderRadius: 20,
    //               }}>
    //               <Text
    //                 allowFontScaling={false}
    //                 style={{
    //                   fontSize: getFontSize(1.3),
    //                   color: colors.black_color,
    //                   fontFamily: fonts.medium,
    //                   textAlign: 'center',
    //                 }}>
    //                 {t('special_offer')}
    //               </Text>
    //             </TouchableOpacity>
    //           )} */}
    //       </View>
    //     </View>
    //   );
    const getFillColor = (percentage) => {
      return percentage > 0 ? Colors.primaryLight : Colors.grayLight;
    };

    const getStarColor = (percentage) => {
      return percentage > 0 ? Colors.primaryLight : Colors.gray;
    };

    return (

      <View style={{}}>
        <View style={{ overflow: "hidden", backgroundColor: "white", paddingVertical: SCREEN_HEIGHT * 0.03 }}>
          <View style={{ flexDirection: "row", gap: 20, paddingHorizontal: SCREEN_WIDTH * 0.035, paddingVertical: SCREEN_HEIGHT * 0.02, backgroundColor: 'white' }}>
            <View>
              <Image
                style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.2, borderRadius: 100 }}
                source={{ uri: base_url + astroData?.profileImage }} />
            </View>
            <View style={{ gap: 2 }}>

              <View style={{ paddingBottom: SCREEN_HEIGHT * 0.005, paddingLeft: SCREEN_WIDTH * 0.01 }}>

                <Text style={{ color: colors.black_color8, fontSize: 14, fontWeight: "500" }}>{astroData?.astrologerName}</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 6 }}>
                <Ionicons
                  name="people-circle-sharp"
                  color={colors.black_color8}
                  size={17}



                />
                <Text style={{ color: colors.black_color8, fontSize: 12, fontWeight: "500" }}>{astroData?.skill && astroData?.skill.map(item => item?.skill).join(',')}</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 3 }}>
                <MaterialCommunityIcons
                  name="google-translate"
                  color={colors.grey_color}
                  size={17}
                />
                <Text style={{ color: "gray", fontSize: 12, fontWeight: "600" }}> {[...astroData?.language].join(',')}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ flexDirection: "row", }}>
                  {/* <EvilIcons name='star' size={20} color={'gray'} />
                    <EvilIcons name='star' size={20} color={'gray'} />
                    <EvilIcons name='star' size={20} color={'gray'} />
                    <EvilIcons name='star' size={20} color={'gray'} />
                    <EvilIcons name='star' size={20} color={'gray'} /> */}
                </View>
                <View>
                  <View style={{ flexDirection: "row", gap: 7 }}>
                    <AntDesign name="clockcircleo" size={12} />
                    <Text style={{ color: "gray", fontSize: 11, fontWeight: "500" }}>Free 1 min</Text>
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingTop: 10 }}>
                <Ionicons name={'star'} size={12} color={getStarColor(reviewData?.summary?.averageRating ?? 0)} />
                <Text style={{ fontSize: 10, fontWeight: "500" }}>{reviewData?.summary?.averageRating ?? astroData?.rating}/5 (200+ Rating)</Text>
                <AntDesign name="clockcircleo" size={13} />
                <Text style={{ fontSize: 10, fontWeight: "500" }}>{astroData?.experience} - Years Exp</Text>





              </View>

            </View>
          </View>


          <View style={{ flexDirection: "row", gap: SCREEN_WIDTH * 0.025, paddingHorizontal: SCREEN_WIDTH * 0.15, paddingTop: SCREEN_HEIGHT * 0.03 }}>
            <View style={{ width: SCREEN_WIDTH * 0.2, alignItems: "center", height: SCREEN_HEIGHT * 0.022, justifyContent: "center", borderBottomLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: colors.background_theme2 }}>
              <Text style={{ fontSize: 10, fontWeight: "700", color: "white" }}>Today's Deal</Text>
            </View>

            <TouchableOpacity
              onPress={() => dispatch(AstrologerActions.onFollowUnfollowAstrologer(route?.params?._id))}
              style={{ width: SCREEN_WIDTH * 0.23, alignItems: "center", height: SCREEN_HEIGHT * 0.022, justifyContent: "center", borderRadius: 10, backgroundColor: colors.background_theme2 }}>
              <Text style={{ fontSize: 10, fontWeight: "700", color: "white" }}>{isFollow
                ? `${t('following')}`
                : `${t('follow')}`}  {astroData?.follower_count}
              </Text>
            </TouchableOpacity>

            <View style={{ width: SCREEN_WIDTH * 0.2, alignItems: "center", height: SCREEN_HEIGHT * 0.022, justifyContent: "center", borderBottomLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: colors.background_theme2 }}>
              <Text style={{ fontSize: 10, fontWeight: "700", color: "white" }}>special offer</Text>
            </View>
          </View>


        </View>
      </View>

    )


  }

  function chatCallButtonInfo() {
    const onChatNow = () => {

      if (astroData?.chat_status != 'online') {
        showToastMessage({ message: `Astrologer is ${astroData?.chat_status}` })
        return
      }
      const payload = {
        type: 'chat',
        astrologerName: astroData?.astrologerName,
        language: astroData?.language,
        astrologerId: astroData?._id,
        chatPrice:
          parseFloat(astroData?.chat_price) +
          parseFloat(astroData?.commission_chat_price),
        astrostatus: astroData?.chat_status
      };
      dispatch(ChatActions.onChatNow(payload));


    };
    const onCallNow = () => {

      if (astroData?.call_status != 'online') {
        showToastMessage({ message: ` Astrologer is ${astroData?.call_status}` })
        return
      }
      const payload = {
        type: 'call',
        astrologerName: astroData?.astrologerName,
        language: astroData?.language,
        astrologerId: astroData?._id,
        callPrice:
          parseFloat(astroData?.call_price) +
          parseFloat(astroData?.commission_call_price),
        astrostatus: astroData?.call_status
      };
      dispatch(ChatActions.onChatNow(payload));

    };

    const onVideoCallNow = () => {
      if (astroData?.video_call_status != 'online') {
        showToastMessage({ message: `Astrologer is ${astroData?.video_call_status}` })
        return
      }
      const payload = {
        type: 'video call',
        astrologerName: astroData?.astrologerName,
        language: astroData?.language,
        astrologerId: astroData?._id,
        callPrice:
          parseFloat(astroData?.normal_video_call_price) +
          parseFloat(astroData?.commission_normal_video_call_price),
        astrostatus: astroData?.video_call_status
      };
      dispatch(ChatActions.onChatNow(payload));
    }
    const comingsoon = () => {
      showToastMessage({ message: 'Feature Coming Soon' })
    }

    const getChatColor = (status) => {
      switch (status) {
        case 'online':
          return Colors.primaryLight;
        case 'offline':
          return Colors.grayA;
        case 'busy':
          return Colors.orange_light;
        default:
          return Colors.primaryLight;
      }
    }

    return (
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-around',
          backgroundColor: "#fbfdff",
          // paddingVertical: Sizes.fixPadding,
          // paddingHorizontal: 10,
          padding: 10,




        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>


          {/* <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onCallNow()}
            style={{
              paddingVertical: Sizes.fixPadding,
              backgroundColor: '#ffffff', // White background for consistency
              borderWidth: 1,
              borderColor: '#fff',
              width: '45%',
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 6,
              alignItems: 'center', // Center the content inside the button
              justifyContent: 'center', // Center vertically
              paddingHorizontal: 10, // Add padding for spacing
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}
          >
            <FontAwesome name="phone" size={20} color="#E15602" />
            <Text style={{ fontSize: 18, textAlign: 'center', color: '#E15602', fontWeight: '800', fontFamily: 'sans-serif', marginLeft: 5 }}>
              Call
            </Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onChatNow()}
            style={{
              paddingVertical: Sizes.fixPadding,
              backgroundColor: colors.background_theme2, // White button background
              left: SCREEN_WIDTH * 0.02,
              borderColor: '#fff', // Border color for all buttons
              width: '95%',
              borderRadius: 10,



              elevation: 6, // Elevated shadow effect for Android
              alignItems: 'center', // Center the content inside the button
              justifyContent: 'center', // Center vertically
              paddingHorizontal: SCREEN_WIDTH * 0.04, // Add padding for spacing
              flexDirection: 'row',
              justifyContent: "space-between"
            }}
          >
            <MaterialIcons name="chat" size={25} color="white" />
            <Text style={{ fontSize: 18, textAlign: 'center', color: 'white', fontWeight: '800', fontFamily: 'sans-serif', marginLeft: 5 }}>
              Chat now
            </Text>
            <View style={{ alignItems: "center", justifyContent: "center", gap: 4 }}>

              <Text style={{ fontWeight: "700", fontSize: 12, color: "white" }}>{showNumber(astroData?.chat_price + parseFloat(astroData?.commission_chat_price))}</Text>
              <Text style={{ fontSize: 10, fontWeight: "500", color: "white" }}>Per min</Text>
            </View>

          </TouchableOpacity>

          {/* <TouchableOpacity
            activeOpacity={0.8}
            onPress={onVideoCallNow}
            style={{
              paddingVertical: Sizes.fixPadding,
              backgroundColor: '#ffffff',
              borderWidth: 1,
              borderColor: '#fff',
              width: '30%',
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 6,
              alignItems: 'center', // Center the content inside the button
              justifyContent: 'center', // Center vertically
              paddingHorizontal: 10, // Add padding for spacing
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}
          >
            <FontAwesome name="video-camera" size={20} color="#E15602" />
            <Text style={{ textAlign: 'center', color: '#E15602', fontWeight: '800', fontFamily: 'sans-serif', marginLeft: 5, fontSize: 18 }}>
              Video
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  wallet: state.customer.wallet,
  astroData: state.astrologer.astroData,
  reviewData: state.astrologer.reviewData,
  isFollow: state.astrologer.isFollow
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AstrologerDetailesChat);

const styles = StyleSheet.create({
  servicesContainer: {
    flexDirection: 'column',
    marginBottom: Sizes.fixPadding * 0.5
  },
  servicesCol1: {
    ...Fonts.black14InterMedium,
    flex: 0.6
  },
  servicesCol2: {

    fontWeight: 'bold',
    fontSize: 14,
    flex: 0.4,
    color: colors.white_color,
    textAlign: 'center'

  },
  servicesCol3: {
    color: colors.white_color,
    fontSize: 12,
    flex: 0.4,
    textDecorationLine: 'line-through',
    textAlign: 'center'
  }
})
