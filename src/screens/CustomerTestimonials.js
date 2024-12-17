import { StyleSheet, Text, View ,FlatList,Image ,TouchableOpacity} from 'react-native'
import React from 'react'

import { SCREEN_WIDTH,SCREEN_HEIGHT } from '../config/Screen'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { colors } from '../config/Constants1'

const CustomerTestimonials = () => {
    const images = {
        Image1: require('../assets/icons/astroone.png'),

    };
    const DATA = [
        { id: '1', image: images.Image1, name: 'Balvindar Singh', review: 'Gud Service' },
        { id: '2', image: images.Image1, name: 'Ram Santoshi ji', review: 'great service' },
        { id: '3', image: images.Image1, name: 'Sujeet', review: 'test' },
        { id: '4', image: images.Image1, name: 'Anuj', review: 'not good' },

    ];

    const renderitem = ({ item }) => {
        return (

            <View>
                
                <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: SCREEN_WIDTH * 0.02, paddingVertical: SCREEN_HEIGHT * 0.015, paddingBottom: SCREEN_HEIGHT * 0.04, backgroundColor: "#FCCDC7", borderRadius: 10, borderColor: colors.background_theme2, borderWidth: 1 ,marginVertical:SCREEN_HEIGHT*0.005 }}>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.2 }}>
                            <Image
                            resizeMode='contain'
                                style={{ height: "100%", width:'100%' }}
                                source={ item.image} />
                        </View>
                        <View >
                            <Text style={{ fontSize: 14, color: "black", fontWeight: "500" }}>{item.name}</Text>
                            <Text style={{ fontSize: 12, color: "gray" }} >{item.review}</Text>
                        </View>

                    </View>
                    <View style={{ flexDirection: "row", }}>
                        <EvilIcons name='star' size={20} color={'gray'} />
                        <EvilIcons name='star' size={20} color={'gray'} />
                        <EvilIcons name='star' size={20} color={'gray'} />
                        <EvilIcons name='star' size={20} color={'gray'} />
                        <EvilIcons name='star' size={20} color={'gray'} />
                    </View>
                </TouchableOpacity >
            </View>

        )
    }
    return (
        <View style={{ flex: 1 }}>
            {/* <Myheader title={'Customer Testimonials'} /> */}

            <View style={{paddingHorizontal:SCREEN_WIDTH*0.03,paddingVertical:  SCREEN_HEIGHT*0.03}}>
            <FlatList
                data={DATA}
                renderItem={renderitem}
                keyExtractor={(item) => item.id}

            />
            </View>
        </View>
    )
}

export default CustomerTestimonials

const styles = StyleSheet.create({})