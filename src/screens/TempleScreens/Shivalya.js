import React, { useState, useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const images = [
    { id: '1', source: require('../../assets/images/Ramjii.png') },
    { id: '2', source: require('../../assets/images/hanumanji.png') },
    { id: '3', source: require('../../assets/images/shivji.png') },
    { id: '4', source: require('../../assets/images/Ramjii.png') },
    { id: '5', source: require('../../assets/images/hanumanji.png')},
    { id: '6', source: require('../../assets/images/shivji.png') },
    { id: '7', source: require('../../assets/images/Ramjii.png') },
    { id: '8', source: require('../../assets/images/shivji.png') },
];

const pujaAssets = [
    { id: '1', source: require('../../assets/images/sun.png') },
    { id: '2', source: require('../../assets/images/flower1.png') },
    { id: '3', source: require('../../assets/images/lamp.png') },
    { id: '4', source: require('../../assets/images/coconut.png') },
    { id: '5', source: require('../../assets/images/shankh_golden.png') },
    { id: '6', source: require('../../assets/images/calendarr.png')},
];

const Shivalya = () => {
    const navigation = useNavigation()
    const [selectedIndex, setSelectedIndex] = useState(0);
    const scrollViewRef = useRef(null);
    const flatListRef = useRef(null);

    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => handleFlatListPress(index)}>
            <Image
                source={item.source}
                style={[
                    styles.flatListImage,
                    selectedIndex === index && { borderColor: 'blue' },
                ]}
            />
        </TouchableOpacity>
    );

    const renderPujaItem = ({ item }) => (
        <TouchableOpacity style={styles.pujaItemContainer}>
            <Image source={item.source} resizeMode='contain' style={styles.pujaImage} />
        </TouchableOpacity>
    );

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / SCREEN_WIDTH);
        if (index !== selectedIndex && index >= 0 && index < images.length) {
            setSelectedIndex(index);
            flatListRef.current.scrollToIndex({ index, animated: true });
        }
    };

    const handleFlatListPress = (index) => {
        setSelectedIndex(index);
        scrollViewRef.current.scrollTo({ x: index * SCREEN_WIDTH, animated: true });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={Colors.primaryTheme} barStyle={'dark-content'} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <AntDesign name="left" size={20} color={'black'} />

                </TouchableOpacity>
                <Text style={{color: 'black', alignSelf:'center' }}>Ganesh Ji</Text>
            </View>

            {/* Thumbnails (FlatList) */}
            <FlatList
                ref={flatListRef}
                data={images}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatList}
                style={styles.flatListContainer}
            />

            {/* Background Image */}
            <Image
                source={require('../../assets/images/outer_temple1.png')}
                resizeMode="cover"
                style={styles.templeImage}
            />

            {/* Scrollable Images inside the Temple background */}
            <View style={styles.centeredImageContainer}>
                <ImageBackground source={require('../../assets/images/innerTemple.png')}
                    style={{
                        width: SCREEN_WIDTH * 1.15,
                        height: SCREEN_HEIGHT * 0.45, 
                        position: 'absolute',
                        alignSelf: 'center'
                    }} />
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    ref={scrollViewRef}
                    style={styles.scrollView}
                >
                    {images.map((item) => (
                        <View key={item.id} style={styles.scrollableImageContainer}>
                            <Image
                                source={item.source}
                                resizeMode="contain"
                                style={styles.centeredImage}
                            />
                        </View>
                    ))}
                </ScrollView>
            </View>

            {/* Scrollable Image which is used for puja */}

            <View style={styles.pujaAssetsContainer}>
                <FlatList
                    data={pujaAssets}
                    renderItem={renderPujaItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.pujaAssetsFlatList}
                />
            </View>


        </SafeAreaView>
    );
};

export default Shivalya;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#e2d183',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 10,
    },
    templeImage: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        zIndex: 1,
        alignSelf:'center',
    },
    centeredImageContainer: {
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.28,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: -2,
    },
    centeredImage: {
        width: SCREEN_WIDTH * 0.5,
        height: SCREEN_HEIGHT * 0.5,
        elevation: 3,
    },
    flatListContainer: {
        position: 'absolute',
        top: 28,
        left: 0,
        right: 0,
        zIndex: 3,
    },
    flatList: {
        padding: 10,
        gap: 10
    },
    flatListImage: {
        height: 45,
        width: 45,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'red',
    },
    scrollView: {
        width: '100%',
    },
    scrollableImageContainer: {
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pujaAssetsContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        zIndex: 10,
        alignItems: 'center'
    },
    pujaAssetsFlatList: {
        gap: 20
    },
    pujaItemContainer: {
        height: 50,
        width: 50,
        borderWidth: 2,
        borderColor: '#FFA500',
        borderRadius: 50,
        backgroundColor: '#940000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pujaImage: {
        height: 30,
        width: 30,
    },
});
