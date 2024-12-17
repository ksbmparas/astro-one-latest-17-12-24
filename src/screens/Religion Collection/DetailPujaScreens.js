import { useNavigation, useRoute } from '@react-navigation/native';
import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Aarti from './Aarti';
import { SCREEN_HEIGHT,SCREEN_WIDTH } from '../../config/Screen';
import { colors } from '../../config/Constants1';
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Chalisa from './Chalisa';
import BeejMantra from './BeejMantra';
import Kavachas from './Kavachas';
import VratKathas from './VratKathas';
import PoojaVidhi from './PoojaVidhi';
import BookPooja from './BookPooja';

const DetailPujaScreens = () => {
    const route = useRoute();
    const { itemName } = route.params;
    const navigation = useNavigation()

    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground
                source={require('../../assets/images/sangrahalay_bg.jpg')}
                style={styles.backgroundImage}
            >
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <AntDesign
                            name="left"
                            size={25}
                            color={colors.black_color9}
                            style={styles.backIcon}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.txt}>{itemName}</Text>
                    </View>
                </View>
                {itemName === 'Aarti' && <Aarti />}
                {itemName ==='Chalisa' && <Chalisa/>}
                {itemName ==='BeejMantra' && <BeejMantra/>}
                {itemName ==='Kavachas' && <Kavachas/>}
                {itemName ==='VratKathas' && <VratKathas/>}
                {itemName ==='PoojaVidhi' && <PoojaVidhi/>}
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    headerContainer: {
        padding: 12,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    backIcon: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
        marginTop: responsiveScreenHeight(0.2),
        marginLeft: responsiveScreenWidth(1)
    },
    txt: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: 'black',
        fontSize: SCREEN_HEIGHT * 0.020,
        marginLeft: responsiveScreenWidth(8),
    },
})

export default DetailPujaScreens


