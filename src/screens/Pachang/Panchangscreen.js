import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, TextInput, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH, } from '../../config/Screen'
import { useState } from 'react';
import { colors } from '../../config/Constants1';
import { Fonts } from '../../assets/style';
import AntDesign from 'react-native-vector-icons/AntDesign'



const Panchangscreen = () => {

    const DATA = [
        { id: '1', title: '01', Event: '**' },
        { id: '2', title: '02', Event: 'pratipada,sukla' },
        { id: '3', title: '03', Event: 'dwatiya' },
        { id: '4', title: '04', Event: 'tritiya' },
        { id: '5', title: '05', Event: 'chaturti' },
        { id: '6', title: '06', Event: 'panchmi' },
        { id: '7', title: '07', Event: 'saptmi' },
        { id: '8', title: '08', Event: 'astmi' },
        { id: '9', title: '09', Event: 'navmi' },
        { id: '10', title: '10', Event: 'dashmi' },
        { id: '11', title: '11', Event: 'ekdashi' },
        { id: '12', title: '12', Event: '12sukla' },
        { id: '13', title: '13', Event: 'dwashi' },
        { id: '14', title: '14', Event: 'dwatiya' },
        { id: '15', title: '15', Event: 'panchmi' },
        { id: '16', title: '16', Event: 'dwatiya' },
        { id: '17', title: '17', Event: 'dwatiya' },
        { id: '18', title: '18', Event: 'ekdashi' },
        { id: '19', title: '19', Event: 'dwatiya' },
        { id: '20', title: '20', Event: 'ekdashi' },
        { id: '21', title: '21', Event: 'tritiya' },
        { id: '22', title: '22', Event: 'pratipada,sukla' },
        { id: '23', title: '23', Event: 'dwarkija' },
        { id: '24', title: '24', Event: 'ekdashi' },
        { id: '25', title: '25', Event: 'tritiya' },
        { id: '26', title: '26', Event: 'dwatiya' },
        { id: '27', title: '27', Event: 'tritiya' },
        { id: '28', title: '28', Event: 'ekdashi' },
        { id: '29', title: '29', Event: 'ekdashi' },
        { id: '30', title: '30', Event: 'tritiya' },
        { id: '31', title: '31', Event: 'tritiya' },
    ];

    const renderItem = ({ item }) => {
        return (
            <View style={{ borderWidth: 1, paddingTop: SCREEN_HEIGHT * 0.005, width: SCREEN_WIDTH * 0.142, height: SCREEN_HEIGHT * 0.08, alignItems: "center", gap: 2, backgroundColor: colors.background_theme2, borderColor: colors.grey_color }}>
                <Text style={{ fontSize: 14, fontWeight: "500", color: colors.black_color9 }}>{item.title}</Text>
                <Text style={{ fontSize: 11, fontWeight: "500", color: colors.black_color9 }}>{item.Event}</Text>
            </View>
        )
    }

    const [buttonStatus, setButtonStatus] = useState(true);
    return (

        <ImageBackground
            style={{ flex: 1 }}
            source={require('../../assets/images/BG45.png')}

        >
            <ScrollView style={{}}>
                {PachangPHOTO()}
                {buttons()}
            </ScrollView>
        </ImageBackground>
    )
    function PachangPHOTO() {
        return (
            <View style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.4, paddingVertical: SCREEN_HEIGHT * 0.005 }}>
                <Image
                    style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.4, resizeMode: "contain" }}
                    source={require('../../assets/images/newpanchang.png')} />
            </View>
        )
    }
    function buttons() {
        return (
            <View>

                <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.022, paddingTop: SCREEN_HEIGHT * 0.02 }}>
                    <View
                        style={{
                            flex: 0,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            paddingVertical: 7,
                            borderRadius: 10,

                        }}>

                        <TouchableOpacity
                            onPress={() => setButtonStatus(true)}
                            style={{
                                elevation: 20,
                                width: SCREEN_WIDTH * 0.45,
                                height: SCREEN_HEIGHT * 0.05,
                                borderRadius: 20,
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: buttonStatus

                                    ? colors.background_theme2
                                    : colors.background_theme1,
                            }}>
                            <Text allowFontScaling={false}
                                style={{
                                    fontSize: 14,
                                    fontWeight: "500",
                                    color: buttonStatus
                                        ? colors.white_color
                                        : colors.black_color9,
                                }}>
                                Daily
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setButtonStatus(false)}
                            style={{
                                borderRadius: 20,
                                elevation: 20,
                                width: SCREEN_WIDTH * 0.45,
                                height: SCREEN_HEIGHT * 0.05,
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: !buttonStatus
                                    ? colors.background_theme2
                                    : colors.background_theme1,
                            }}>
                            <Text allowFontScaling={false}
                                style={{
                                    fontSize: 14,
                                    fontWeight: "500",
                                    color: !buttonStatus
                                        ? colors.white_color
                                        : colors.black_color9,
                                }}>
                                Monthly
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {buttonStatus ? (
                    <View style={{ height: "100%", width: '100%', paddingBottom: SCREEN_HEIGHT * 0.1 }}>


                        <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", paddingTop: SCREEN_HEIGHT * 0.015, paddingBottom: SCREEN_HEIGHT * 0.02 }}>

                            <TouchableOpacity style={{ borderWidth: 3, width: SCREEN_WIDTH * 0.15, alignItems: "center", justifyContent: "center", paddingVertical: SCREEN_HEIGHT * 0.02, borderRadius: 100, backgroundColor: colors.white_color, borderColor: colors.background_theme2 }}>
                                <Text style={{ fontSize: 11, fontWeight: "500", color: "black" }}>Today</Text>
                            </TouchableOpacity >
                            <TouchableOpacity style={{ borderWidth: 3, width: SCREEN_WIDTH * 0.18, alignItems: "center", justifyContent: "center", paddingVertical: SCREEN_HEIGHT * 0.02, borderRadius: 100, backgroundColor: colors.white_color, borderColor: colors.background_theme2 }}>
                                <Text style={{ fontSize: 11, fontWeight: "500", color: "black" }}>Tommorow</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ width: SCREEN_WIDTH * 0.08, alignItems: "center", justifyContent: "center", borderRadius: 100, backgroundColor: colors.background_theme2, elevation: 10, height: SCREEN_HEIGHT * 0.03 }}>
                                <AntDesign name='left' color={'white'} size={15} />
                            </TouchableOpacity>

                            <View style={{ borderWidth: 1, alignItems: "center", justifyContent: "center", width: SCREEN_WIDTH * 0.3, paddingVertical: SCREEN_HEIGHT * 0.016, borderRadius: 100, backgroundColor: colors.background_theme1, borderColor: colors.grey_color }}>

                                <Text style={{ fontSize: 13, fontWeight: "500", color: colors.background_theme2 }}>12-10-24</Text>

                            </View>

                            <TouchableOpacity style={{ width: SCREEN_WIDTH * 0.08, alignItems: "center", justifyContent: "center", height: SCREEN_HEIGHT * 0.03, borderRadius: 100, backgroundColor: colors.background_theme2, elevation: 10 }}>
                                <AntDesign name='right' color={'white'} size={15} />
                            </TouchableOpacity>

                        </View>

                        <ImageBackground

                            source={require('../../assets/images/BG120.png')}
                            style={{ flex: 0.8, paddingVertical: SCREEN_HEIGHT * 0.025, gap: SCREEN_HEIGHT * 0.02 }}>


                            <View>
                                <View style={{ alignItems: "center", justifyContent: "center", width: SCREEN_WIDTH * 0.35, height: SCREEN_HEIGHT * 0.043, borderRadius: 100, backgroundColor: colors.background_theme1, alignSelf: "center", elevation: 20 }}>
                                    <Text style={{ color: colors.background_theme2, fontWeight: "500", fontSize: 12 }}>Guruvaar</Text>
                                </View>

                                <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.04, bottom: SCREEN_HEIGHT * 0.015 }}>
                                    <View style={{ backgroundColor: colors.white_color, borderRadius: 10, paddingVertical: SCREEN_HEIGHT * 0.02, }}>

                                        <View style={{ flexDirection: "row", borderBottomWidth: 1, borderColor: colors.background_theme2, paddingHorizontal: SCREEN_WIDTH * 0.02, gap: 10, paddingBottom: SCREEN_HEIGHT * 0.02 }}>

                                            <View style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.2, borderWidth: 1, alignItems: "center", justifyContent: "center", borderRadius: 100, }}>
                                                <Image
                                                    style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.2, resizeMode: "contain" }}
                                                    source={require('../../assets/images/rishi.png')} />
                                            </View>

                                            <View>
                                                <Text style={{ fontSize: 13, fontWeight: "500", color: colors.black_color9 }}>Ekadashi,Shukla 12 </Text>
                                                <Text style={{ fontSize: 13, fontWeight: "400", color: colors.black_color9 }}>20,Shiva</Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-around", paddingTop: SCREEN_HEIGHT * 0.015 }}>
                                            <View style={{ flexDirection: 'row', gap: 15 }}>
                                                <Text style={{ fontSize: 13, color: colors.black_color9 }}>विशेष</Text>
                                                <Text style={{ fontSize: 13, color: colors.background_theme2, fontWeight: "500" }}>Balva,24</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', gap: 15 }}>
                                                <Text style={{ fontSize: 13, color: colors.black_color9 }}>नक्षत्र</Text>
                                                <Text style={{ fontSize: 13, color: colors.background_theme2, fontWeight: "500" }}>BHARINI,2</Text>
                                            </View>
                                        </View>

                                    </View>
                                </View>
                            </View>

                            <View>
                                <View style={{ alignItems: "center", justifyContent: "center", width: SCREEN_WIDTH * 0.35, height: SCREEN_HEIGHT * 0.043, borderRadius: 100, backgroundColor: colors.background_theme1, alignSelf: "center", elevation: 20 }}>
                                    <Text style={{ color: colors.background_theme2, fontWeight: "500", fontSize: 12 }}>Mahurat</Text>
                                </View>

                                <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.04, bottom: SCREEN_HEIGHT * 0.015 }}>
                                    <View style={{ backgroundColor: colors.white_color, borderRadius: 10, paddingVertical: SCREEN_HEIGHT * 0.02, }}>


                                        <View style={{ gap: SCREEN_HEIGHT * 0.02, paddingTop: SCREEN_HEIGHT * 0.015 }}>

                                            <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-evenly" }}>

                                                <View style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.35, alignItems: "center", overflow: "hidden", backgroundColor: "#FFCC00", borderRadius: 10 }}>

                                                    <View style={{ height: SCREEN_HEIGHT * 0.04, width: SCREEN_WIDTH * 0.35, backgroundColor: colors.background_theme2, alignItems: "center", justifyContent: "center", borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>

                                                        <Text style={{ fontSize: 13, fontWeight: "500", color: colors.background_theme1 }}>Abhijeet Mahurat</Text>
                                                    </View>

                                                    <View style={{ height: SCREEN_HEIGHT * 0.06, justifyContent: "center", }}>
                                                        <Text style={{ fontSize: 12, color: colors.black_color9 }}>Coming Soon</Text>
                                                    </View>

                                                </View>

                                                <View style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.35, alignItems: "center", overflow: "hidden", backgroundColor: "#FFCC00", borderRadius: 10 }}>

                                                    <View style={{ height: SCREEN_HEIGHT * 0.04, width: SCREEN_WIDTH * 0.35, backgroundColor: colors.background_theme2, alignItems: "center", justifyContent: "center", borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>

                                                        <Text style={{ fontSize: 13, fontWeight: "500", color: colors.background_theme1 }}>Gulk Period</Text>
                                                    </View>

                                                    <View style={{ height: SCREEN_HEIGHT * 0.06, justifyContent: "center", }}>
                                                        <Text style={{ fontSize: 12, color: colors.black_color9 }}>12-10-24</Text>
                                                    </View>

                                                </View>
                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-evenly" }}>

                                                <View style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.35, alignItems: "center", overflow: "hidden", backgroundColor: "#FFCC00", borderRadius: 10 }}>

                                                    <View style={{ height: SCREEN_HEIGHT * 0.04, width: SCREEN_WIDTH * 0.35, backgroundColor: colors.background_theme2, alignItems: "center", justifyContent: "center", borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>

                                                        <Text style={{ fontSize: 13, fontWeight: "500", color: colors.background_theme1 }}>Rahukul</Text>
                                                    </View>

                                                    <View style={{ height: SCREEN_HEIGHT * 0.06, justifyContent: "center", }}>
                                                        <Text style={{ fontSize: 12, color: colors.black_color9 }}>12-10-24</Text>
                                                    </View>

                                                </View>

                                                <View style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.35, alignItems: "center", overflow: "hidden", backgroundColor: "#FFCC00", borderRadius: 10 }}>

                                                    <View style={{ height: SCREEN_HEIGHT * 0.04, width: SCREEN_WIDTH * 0.35, backgroundColor: colors.background_theme2, alignItems: "center", justifyContent: "center", borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>

                                                        <Text style={{ fontSize: 12, fontWeight: "500", color: colors.background_theme1 }}>Yamghantak Peroid</Text>
                                                    </View>

                                                    <View style={{ height: SCREEN_HEIGHT * 0.06, justifyContent: "center", }}>
                                                        <Text style={{ fontSize: 12, color: colors.black_color9 }}>12-10-24</Text>
                                                    </View>

                                                </View>
                                            </View>


                                        </View>


                                    </View>
                                </View>

                            </View>


                        </ImageBackground >





                    </View>
                ) : (
                    <View
                        style={{ flex: 1, paddingVertical: SCREEN_HEIGHT * 0.01, paddingBottom: SCREEN_HEIGHT * 0.1 }}>

                        <View style={{ gap: 10, paddingVertical: SCREEN_HEIGHT * 0.025, backgroundColor: colors.background_theme2, }}>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.05 }}>
                                <View style={{ flexDirection: "row", gap: 13 }}>
                                    <Image
                                        style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.2, resizeMode: "contain" }}
                                        source={require('../../assets/images/rishi.png')} />
                                    <Text style={{ fontSize: 14, color: colors.white_color, fontWeight: "500" }}>1 ,-**</Text>
                                </View>

                                <View style={{ alignItems: "center" }}>
                                    <Text style={{ fontSize: 15, color: colors.white_color, fontWeight: "500" }}>12</Text>
                                    <Text style={{ fontSize: 14, color: colors.white_color, fontWeight: "450" }}>12,2024</Text>
                                    <Text style={{ fontSize: 14, color: colors.white_color, fontWeight: "400" }}>Guruvaar</Text>
                                </View>



                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.04 }}>

                                <View>
                                    <Text style={{ fontSize: 14, color: colors.white_color, fontWeight: "400" }}>Sunrise:2024-12-31 7:12:45</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 14, color: colors.white_color, fontWeight: "400" }}>Sunset:2024-12-31</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", paddingVertical: SCREEN_HEIGHT * 0.015 }}>

                            <TouchableOpacity >
                                <AntDesign name='left' color={'white'} size={25} />
                            </TouchableOpacity>

                            <Text style={{ fontSize: 15, color: colors.white_color, fontWeight: "500" }}>December</Text>

                            <TouchableOpacity >
                                <AntDesign name='right' color={'white'} size={25} />
                            </TouchableOpacity>

                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", paddingVertical: SCREEN_HEIGHT * 0.015, backgroundColor: colors.background_theme2 }}>

                            <TouchableOpacity>
                                <Text style={{ fontSize: 10, fontWeight: "500", color: colors.black_color9, }}>Sunday</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 10, fontWeight: "500", color: colors.black_color9, }}>Monday</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 10, fontWeight: "500", color: colors.black_color9, }}>Tuseday</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 10, fontWeight: "500", color: colors.black_color9, }}>Wednesday</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 10, fontWeight: "500", color: colors.black_color9, }}>Thurday</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 10, fontWeight: "500", color: colors.black_color9, }}>Friday</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 10, fontWeight: "500", color: colors.black_color9, }}>Saturday</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center", marginTop: SCREEN_HEIGHT * 0.01 }}>
                            <FlatList
                                data={DATA}
                                renderItem={renderItem}
                                numColumns={7}
                                keyExtractor={(item) => item.id} />


                        </View>


                    </View>
                )}

            </View>
        )
    }
}

export default Panchangscreen

const styles = StyleSheet.create({})