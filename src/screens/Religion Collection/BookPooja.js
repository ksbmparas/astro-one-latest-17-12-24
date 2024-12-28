import { FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT,SCREEN_WIDTH } from '../../config/Screen'
import { colors } from '../../config/Constants1'
import { useNavigation } from '@react-navigation/native'
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
// import Myheader from '../Components/Myheader'

const poojaImages = {
  Satyanarayan_Pooja: require('../../assets/images/satyaNarayanJi.jpg'),
  Durga_Pooja: require('../../assets/images/durgaji.jpg'),
  Laxmi_Pooja: require('../../assets/images/Laxmiji.jpg'),
  Mahakali_Pooja: require('../../assets/images/kaali.jpg'),
  Shiv_Pooja: require('../../assets/images/shiva.jpg'),
  Krishna_Pooja: require('../../assets/images/krishna.jpg'),
  Aarti: require('../../assets/images/newarti.png'),
  Chalisa: require('../../assets/images/newchalisa.png'),
  BeejMantra: require('../../assets/images/newbeejmantra.png'),
  Kavachas: require('../../assets/images/newkavch.png'),
  VratKathas: require('../../assets/images/newvartkatha.png'),
  PoojaVidhi: require('../../assets/images/newpoojavidhi.png'),
};

const poojaDetails = {
  Satyanarayan_Pooja: { name: 'Satyanarayan Pooja', price: 'Rs 2100' },
  Durga_Pooja: { name: 'Durga Pooja', price: 'Rs 2500' },
  Laxmi_Pooja: { name: 'Laxmi Pooja', price: 'Rs 3000' },
  Mahakali_Pooja: { name: 'Mahakali Pooja', price: 'Rs 2200' },
  Shiv_Pooja: { name: 'Shiv Pooja', price: 'Rs 1800' },
  Krishna_Pooja: { name: 'Krishna Pooja', price: 'Rs 2000' },
  Aarti: { name: 'Aarti', price: 'Free' },
  Chalisa: { name: 'Chalisa', price: 'Free' },
  BeejMantra: { name: 'Beej Mantra', price: 'Free' },
  Kavachas: { name: 'Kavachas', price: 'Free' },
  VratKathas: { name: 'Vrat Kathas', price: 'Free' },
  PoojaVidhi: { name: 'Pooja Vidhi', price: 'Free' },
};

const BookPooja = () => {
  const navigation = useNavigation();
  const poojaKeys = Object.keys(poojaImages);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/images/sangrahalay_bg.jpg')}
        style={styles.backgroundImage}
      >
        {/* <Myheader title={"Book Pooja"} /> */}
        <FlatList
          data={poojaKeys}
          keyExtractor={(item) => item}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.touchable}
              onPress={() =>
                navigation.navigate('PoojaDetail')
              }
            >
              <View style={styles.imageContainer}>
                <Image source={poojaImages[item]} style={styles.touchableImage} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.touchableText}>{item}</Text>
                <Text style={styles.touchableText1}>{poojaDetails[item].name}</Text>
                <Text style={styles.priceText}>{poojaDetails[item].price}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <Text style={styles.bookText}>Book</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.flatListContainer}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

export default BookPooja

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    padding: 12,
    flexDirection: 'row',
    backgroundColor:"white"
  },
  backIcon: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    marginTop: responsiveScreenHeight(0.2),
    marginLeft: responsiveScreenWidth(1),
  },
  txt: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: colors.black_color9,
    fontSize: SCREEN_HEIGHT * 0.020,
    marginLeft: responsiveScreenWidth(12),
  },
  touchable: {
    flex: 1,
    alignItems: 'center',
    height:responsiveScreenHeight(30)
  },
  imageContainer: {
    width: responsiveScreenWidth(45),
    height: responsiveScreenWidth(60),
    alignItems: 'center',
    backgroundColor: colors.white_color,
    borderRadius: 5,
    // elevation: 4,
    borderWidth: 0.2,
  },
  touchableImage: {
    width: responsiveScreenWidth(44),
    height: responsiveScreenWidth(40),
    color: colors.black_color9,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 4,
  },
  textContainer: {
    width: responsiveScreenWidth(44),
    alignItems: 'flex-start',
    paddingLeft: responsiveScreenWidth(2),
    bottom: responsiveScreenHeight(9),
  },
  touchableText: {
    fontSize: responsiveScreenFontSize(1.4),
    color: colors.black_color9,
    fontWeight: 'bold',
  },
  touchableText1: {
    fontSize: responsiveScreenFontSize(1.2),
    color: colors.black_color9,
    fontWeight: 'semibold',
  },
  priceText: {
    fontSize: responsiveScreenFontSize(1.1),
    color: colors.black_color9,
    fontWeight: 'bold',
  },
  buttonContainer:{
    width: responsiveScreenWidth(44),
    bottom: responsiveScreenHeight(9.3),
    alignItems:'flex-end',
    marginRight:responsiveScreenWidth(4),
  },
  bookText: {
    borderColor: colors.green_color1,
    color:colors.green_color1,
    borderWidth: 1,
    borderRadius:8,
    paddingVertical:responsiveScreenWidth(2),
    paddingHorizontal:responsiveScreenWidth(7),
    fontSize:responsiveScreenFontSize(1.4),
  },
  flatListContainer: {
    paddingTop: responsiveScreenHeight(2),
  },
});
