import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    ImageBackground,
    StatusBar,
} from 'react-native';
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import AjkaPradhan from './Components/AjkaPradhan';
import { Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect, useSelector } from 'react-redux';
import * as HomeActions from '../../redux/actions/HomeActions';
import LottieView from 'lottie-react-native';

const Shivalya = ({ dispatch, mudradata }) => {
    const customerData = useSelector((state) => state.customer.customerData);
    console.log("customerData",customerData)

    const navigation = useNavigation();
    const [showLota, setShowLota] = useState(false);
    const [showSecondLota, setShowSecondLota] = useState(true);
    const [showLottieMudra, setShowLottieMudra] = useState(false);
    const [localBalance, setLocalBalance] = useState(mudradata?.balance || 0);

    useEffect(() => {
        const data = {
            userId: customerData?._id
        }
        dispatch(HomeActions.getAllMudra(data));
    }, [dispatch, customerData?._id, mudradata?.balance]);
    useEffect(() => {
        setLocalBalance(mudradata?.balance || 0);
    }, [mudradata]);
    const shivalyaBalance = mudradata?.balance
    const lotaArpan = () => {
        const data = {
            userId: customerData?._id,
            gifts: "Lota",
            credit: "1",
            debited: "0"
        }
        dispatch(HomeActions.getLotaMudra(data));

        setShowLota(true)
        setShowSecondLota(false)
        setShowLottieMudra(true)
        setLocalBalance((prevBalance) => prevBalance + 1);
        setTimeout(() => {
            setShowLottieMudra(false);
        }, 2000);
        setTimeout(() => {
            setShowSecondLota(true);
        }, 5000);
        setTimeout(() => {
            setShowLota(false);
        }, 5000);
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={Colors.primaryTheme} barStyle={'dark-content'} />
            <View style={styles.centeredImageContainer}>
                <ImageBackground
                    source={require('../../assets/images/shivalay.png')}
                    style={styles.imageBackground}
                >
                    <View style={{ display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, paddingVertical: 10, }}>
                        <View>
                            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                <Ionicons name="chevron-back" size={30} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            backgroundColor: "#fff",
                            borderRadius: 30,
                            display: "flex",
                            flexDirection: "row", alignItems: "center", gap: 5,
                            justifyContent: "space-around",
                            paddingLeft: 15
                        }}>
                            <Text style={{ fontWeight: "700", fontSize: 20, color: "#000" }}>{localBalance}</Text>
                            <Image source={require('../../assets/images/mudra.png')} style={{
                                width: 30,
                                height: 30,
                                objectFit: "contain"

                            }} />
                        </View>
                        {showLottieMudra && (
                            <LottieView
                                source={require('../../assets/lottie/mudra.json')}
                                autoPlay
                                loop
                                style={{
                                    position: 'absolute',
                                    top: SCREEN_HEIGHT * 0.1,
                                    zIndex: 99999,
                                    width: SCREEN_WIDTH,
                                    height: SCREEN_HEIGHT * 0.3,
                                    left: SCREEN_WIDTH * 0.3,
                                    top: 10,
                                }}
                            />
                        )}

                    </View>
                    {showLota && (
                        <View>
                            <Image source={require('../../assets/images/lota.png')}
                                style={{
                                    width: SCREEN_WIDTH * 0.15,
                                    height: SCREEN_WIDTH * 0.15,
                                    transform: [{ rotate: '45deg' }],
                                    position: 'absolute',
                                    left: SCREEN_WIDTH * 0.2,
                                    top: -5,
                                }} />
                            <LottieView
                                source={require('../../assets/lottie/water.json')}
                                autoPlay
                                loop
                                style={{
                                    position: 'absolute',
                                    top: SCREEN_HEIGHT * 0.1,
                                    zIndex: 99999,
                                    width: SCREEN_WIDTH,
                                    height: SCREEN_HEIGHT * 0.3,
                                    right: SCREEN_WIDTH * 0.04,
                                    top: -8,
                                }}
                            />
                        </View>
                    )}

                    {showSecondLota && (
                        <TouchableOpacity
                            onPress={() => {
                                lotaArpan();
                            }}
                            style={{
                                position: "absolute",
                                bottom: SCREEN_HEIGHT * 0.16,
                                alignSelf: "center"
                                
                            }}
                        >
                            <Image source={require('../../assets/images/lota.png')}
                                style={{
                                    width: SCREEN_WIDTH * 0.15,
                                    height: SCREEN_WIDTH * 0.15,

                                }} />
                        </TouchableOpacity>
                    )}


                    <View style={styles.pradhan}>
                        <AjkaPradhan />
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
};



const mapStateToProps = state => ({
    mudradata: state.home.mudradata,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Shivalya);

const styles = StyleSheet.create({
    centeredImageContainer: {
        flex: 1,
    },
    imageBackground: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,

    },
    pradhan: {
        position: "absolute",
        bottom: 20,
        alignSelf: "center"
    }

});
