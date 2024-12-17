import React, { useState, useRef, useEffect } from 'react';
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
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    GestureHandlerRootView,
    PanGestureHandler,
} from 'react-native-gesture-handler';
import {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import Animated, { withRepeat } from 'react-native-reanimated';
import Sound from 'react-native-sound';
import { colors } from '../../config/Constants1';
import { color } from '@rneui/base';
import { Fonts, Sizes } from '../../assets/style';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import { connect } from 'react-redux';
import * as HomeActions from '../../redux/actions/HomeActions';
import Modal from 'react-native-modal';

const images = [
    { id: '1', source: require('../../assets/images/ramji.jpeg'), text: 'Ram Ji' },
    { id: '2', source: require('../../assets/images/ganesh2.png'), text: 'Ganesh ji' },
    { id: '3', source: require('../../assets/images/Durgamaata.jpeg'), text: 'Durga ji' },
    { id: '4', source: require('../../assets/images/saibabakirpa.png'), text: 'Om Sai ' },
    { id: '5', source: require('../../assets/images/shivaji.jpeg'), text: 'Shiva ji' },
    { id: '6', source: require('../../assets/images/krishnajiiiiiiii.png'), text: 'Krishna Ji' },
    { id: '7', source: require('../../assets/images/RadaKrishna.png'), text: 'RadhaKrishna Ji' },
    { id: '8', source: require('../../assets/images/saraswati.png'), text: 'Saraswati Ji' }
];

const Sanatan = ({ sanatangif, dispatch }) => {
    useEffect(() => {
        dispatch(HomeActions.getSanatangif());
    }, [dispatch]);

    console.log('SanatangifTesting:::KKK', sanatangif,);




    useEffect(() => {
        if (sanatangif?.data) {
            const transformedImages = sanatangif.data.map((item) => ({
                id: item._id,
                source: { uri: `https://astrooneapi.ksdelhi.net/${item.image}` },
                name: item.name,
            }));

            // Set the transformed images into state
            setScrollImages(transformedImages);
        }
    }, [sanatangif]);


    const navigation = useNavigation();

    // const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollImages, setScrollImages] = useState(images); // Images for ScrollView
    const [selectedIndex, setSelectedIndex] = useState(0); // Currently selected index

    const scrollViewRef = useRef(null);
    const flatListRef = useRef(null);


    const [btnclick, SetBtnclick] = useState(false);
    const animation = useSharedValue(0);
    const animation2 = useSharedValue(0);
    const [aartiThaliZIndex, setAartiThaliZIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [btnclick3, SetBtnclick3] = useState(false);
    const animation4 = useSharedValue(0);
    const [btnClick, setBtnClick] = useState(false);
    const [isGifCoinVisible, setIsGifCoinVisible] = useState(false);
    const [coinCount, setCoinCount] = useState(0); // Initial coin count
    const [btnclick2, SetBtnclick2] = useState(false);
    const [coconutZIndex, setCoconutZIndex] = useState(0);
    const [dragThaliZIndex, setDragThaliZIndex] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalFullVisible, setModalFullVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const toggleModalFull = () => {
        setModalFullVisible(!isModalFullVisible);
    };



    const startAnimation3 = () => {
        animation4.value = withTiming(1, { duration: 1000 });
    };

    const stopAnimation3 = () => {
        animation4.value = 0;
    };

    const toggleAnimation3 = () => {
        if (btnclick3) {
            stopAnimation3();
        } else {
            startAnimation3();
        }
        SetBtnclick3(!btnclick3);
    };

    const AnimatedStyle4 = useAnimatedStyle(() => ({
        transform: [
            { translateY: animation4.value * 500 },
            { rotate: `${animation4.value * -80}deg` },
        ],
    }));

    const AnimatedStyle5 = useAnimatedStyle(() => ({
        transform: [
            { translateY: animation4.value * 500 },
            { rotate: `${animation4.value * 120}deg` },
        ],
    }));

    const sound3 = new Sound(
        require('../../assets/audio/shankh_sound.mp3'),
        Sound.MAIN_BUNDLE,
        error => {
            if (error) {
                console.log('Failed to load the sound', error);
                return;
            }
        },
    );

    const playSankhSound = () => {
        setIsGifCoinVisible(true);

        // Simulate playing the sound (replace `sound3.play` with your actual logic)
        sound3.play(success => {
            if (!success) {
                console.log('Sound playback failed');
            }
        });

        setCoinCount(prevCount => prevCount + 10);

        setTimeout(() => {
            setIsGifCoinVisible(false);
        }, 2500);
    };



    let sound2 = new Sound(require('../../assets/audio/coconut.mp3'), error => {
        if (error) {
            console.log('Failed to load the sound', error);
            return;
        }
    });



    const startAnimation2 = () => {
        sound2.play();

        animation2.value = withTiming(1, { duration: 1000 });
        setCoconutZIndex(0);
        setDragThaliZIndex(10);
    };


    const stopAnimation2 = () => {
        animation2.value = 0;
        setCoconutZIndex(0);
        setDragThaliZIndex(10);
    };


    const toggleAnimation2 = () => {
        setIsGifCoinVisible(true);
        setCoinCount(prevCount => prevCount + 10);

        if (btnclick2) {
            stopAnimation2();
            setCoconutZIndex(0);
            setDragThaliZIndex(10);
        } else {
            startAnimation2();
            setCoconutZIndex(10);
            setDragThaliZIndex(0);
        }
        SetBtnclick2(!btnclick2);
        setTimeout(() => {
            setIsGifCoinVisible(false);
        }, 2500);
    };



    const AnimatedStyle3 = useAnimatedStyle(() => ({
        transform: [{ translateX: animation2.value * 100 }],
    }));


    const startAnimation = () => {
        animation.value = withRepeat(withTiming(1, { duration: 3000 }), -1, false);
    };


    const stopAnimation = () => {
        animation.value = 0;
        sound.stop();
    };

    const toggleAnimation = () => {
        if (btnclick) {
            stopAnimation();
            setAartiThaliZIndex(0);
            setDragThaliZIndex(10);
            sound.stop();
        } else {
            setAartiThaliZIndex(10);
            setDragThaliZIndex(0);
            startAnimation();
            sound.play();
        }
        SetBtnclick(!btnclick);
    };

    const animatedStyle2 = useAnimatedStyle(() => ({
        transform: [
            { translateY: animation.value * -50 },
            { rotate: `${animation.value * -540}deg` },
            { translateX: animation.value * 200 },
        ],
    }));

    const innerAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: animation.value * -50 },
            { rotate: `${animation.value * 540}deg` },
            { translateX: animation.value * 100 },
        ],
    }));

    const x = useSharedValue(0);
    const y = useSharedValue(0);
    const gesturehandler = useAnimatedGestureHandler({
        onStart: (e, c) => {
            c.startX = x.value;
            c.startY = y.value;
        },
        onActive: (e, c) => {
            x.value = c.startX + e.translationX;
            y.value = c.startY + e.translationY;
        },
        onEnd: (e, c) => {
            x.value = withTiming(0, { duration: 2000 });
            y.value = withTiming(0, { duration: 2000 });
        },
    });

    const animatedstyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: x.value }, { translateY: y.value }],
        };
    });

    const [showGif, setShowGif] = useState(false);

    const leftBellAnim = useSharedValue(0);
    const rightBellAnim = useSharedValue(0);

    const [isLeftSwinging, setIsLeftSwinging] = useState(false);
    const [isRightSwinging, setIsRightSwinging] = useState(false);

    const toggleBothBells = () => {
        // If neither bell is swinging, start the animation for both bells
        if (!isLeftSwinging && !isRightSwinging) {
            leftBellAnim.value = withRepeat(
                withTiming(1, { duration: 1500, easing: Easing.linear }),
                -1,
                true,
            );
            rightBellAnim.value = withRepeat(
                withTiming(1, { duration: 1500, easing: Easing.linear }),
                -1,
                true,
            );
            setIsLeftSwinging(true);
            setIsRightSwinging(true);
        } else {
            // If either bell is swinging, reset both to 0 degrees
            leftBellAnim.value = withTiming(0, {
                duration: 1500,
                easing: Easing.linear,
            });
            rightBellAnim.value = withTiming(0, {
                duration: 1500,
                easing: Easing.linear,
            });
            setIsLeftSwinging(false);
            setIsRightSwinging(false);
        }
    };

    const leftBellStyle = useAnimatedStyle(() => ({
        transform: [
            {
                rotate:
                    leftBellAnim.value === 0
                        ? '0deg'
                        : `${leftBellAnim.value * 30 - 15}deg`, // Swing between -15° and 15°, reset to 0deg when stopped
            },
        ],
    }));

    const rightBellStyle = useAnimatedStyle(() => ({
        transform: [
            {
                rotate:
                    rightBellAnim.value === 0
                        ? '0deg'
                        : `${rightBellAnim.value * -30 + 15}deg`, // Swing between 15° and -15°, reset to 0deg when stopped
            },
        ],
    }));

    const toggleLeftBell = () => {
        if (!isLeftSwinging && bellSound) {
            // Play sound
            bellSound.play(success => {
                if (!success) {
                    console.log('Failed to play sound');
                }
            });

            // Start animation
            leftBellAnim.value = withRepeat(
                withTiming(1, { duration: 1500, easing: Easing.linear }),
                -1,
                true,
            );
            setIsLeftSwinging(true);

            // Stop animation after a specific duration
            setTimeout(() => {
                leftBellAnim.value = withTiming(0, {
                    duration: 500,
                    easing: Easing.linear,
                });
                setIsLeftSwinging(false);
            }, 5000);
        }
    };

    const toggleRightBell = () => {
        if (!isRightSwinging && bellSound) {
            bellSound.play(success => {
                if (!success) {
                    console.log('Failed to play sound');
                }
            });

            rightBellAnim.value = withRepeat(
                withTiming(1, { duration: 1500, easing: Easing.linear }),
                -1,
                true,
            );
            setIsRightSwinging(true);

            setTimeout(() => {
                rightBellAnim.value = withTiming(0, {
                    duration: 500,
                    easing: Easing.linear,
                });
                setIsRightSwinging(false);
            }, 5000);
        }
    };

    // const [isSoundPlaying, setIsSoundPlaying] = useState(false);
    const [isAartiPlaying, setIsAartiPlaying] = useState(false);
    const [bellSound, setBellSound] = useState(null);
    useEffect(() => {
        const sound = new Sound(
            require('../../assets/audio/bell_sound.mp3'),
            error => {
                if (error) {
                    console.log('Failed to load the bell sound', error);
                } else {
                    console.log('Bell sound loaded successfully');
                    setBellSound(sound);
                }
            },
        );

        return () => {
            sound.release();
        };
    }, []);

    const aartiSound = useRef(
        new Sound(require('../../assets/audio/temple_aarti_sound.mp3'), error => {
            if (error) {
                console.log('Failed to load the aarti sound', error);
            } else {
                console.log('Aarti sound loaded successfully');
            }
        }),
    ).current;

    const playAartiSound = () => {
        console.log('Trying to play Aarti sound...');
        if (!aartiSound.isPlaying()) {
            aartiSound.play(success => {
                if (!success) {
                    console.log('Aarti sound playback failed');
                } else {
                    aartiSound.setNumberOfLoops(-1);
                    setIsAartiPlaying(true);
                    console.log('Aarti sound is playing');
                }
            });
        } else {
            console.log('Aarti sound is already playing');
        }
    };

    const stopAartiSound = () => {
        console.log('Trying to stop Aarti sound...');
        if (aartiSound.isPlaying()) {
            // Check if the sound is actually playing
            aartiSound.stop(() => {
                setIsAartiPlaying(false); // Update state when the sound stops
                console.log('Aarti sound stopped');
            });
        } else {
            console.log('Aarti sound is not playing, cannot stop'); // Debug log for when it's not playing
        }
    };

    // Function to play the sound

    // const playSound = () => {
    //     if (!isSoundPlaying) {
    //         bellSound.play(() => {
    //             bellSound.setNumberOfLoops(-1); // Loop the sound infinitely
    //             setIsSoundPlaying(true);
    //         });
    //     }
    // };

    // Function to stop the sound

    // const stopSound = () => {
    //     if (isSoundPlaying) {
    //         bellSound.stop(() => {
    //             setIsSoundPlaying(false);
    //         });
    //     }
    // };

    const handleImageClick = () => {
        setShowGif(prevState => {
            const newState = !prevState;

            if (newState) {
                if (!isLeftSwinging && !isRightSwinging) {
                    toggleBothBells(); // Start bell swinging animation
                }

                // playSound(); // Play bell sound
                playAartiSound(); // Play aarti sound
            } else {
                if (isLeftSwinging || isRightSwinging) {
                    toggleBothBells(); // Stop bell swinging animation
                }

                // stopSound(); // Stop bell sound
                stopAartiSound(); // Stop aarti sound
            }

            return newState;
        });
    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => handleFlatListPress(index)}
            style={[styles.UpperFlatlistImageContainer]}>
            <View
                style={[
                    styles.UpperFlatlistImageContainer2,
                    selectedIndex === index && {
                        borderWidth: 1,
                        borderColor: Colors.grayA,
                        borderRadius: 20,
                        borderRadius: SCREEN_WIDTH * 0.07,
                    },
                ]}>
                <Image
                    resizeMode="contain"
                    source={item.source}
                    style={[styles.flatListImage, selectedIndex === index && {}]}
                />
            </View>
        </TouchableOpacity>
    );

    const renderPujaItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('Artithali')}
            style={styles.pujaItemContainer}>
            <Image
                source={item.source}
                resizeMode="contain"
                style={styles.pujaImage}
            />
        </TouchableOpacity>
    );
    const IMAGE_WIDTH = SCREEN_WIDTH * 1.13;



    // const handleScroll = event => {
    //     const contentOffsetX = event.nativeEvent.contentOffset.x;
    //     const index = Math.round(contentOffsetX / IMAGE_WIDTH);
    //     if (index !== selectedIndex && index >= 0 && index < images.length) {
    //         setSelectedIndex(index);
    //         flatListRef.current.scrollToIndex({ index, animated: true });
    //     }
    // };


    const handleFlatListPress = index => {
        setSelectedIndex(index);
        scrollViewRef.current.scrollTo({ x: index * IMAGE_WIDTH, animated: true });
    };


    // const handleScroll = (event) => {
    //     const contentOffsetX = event.nativeEvent.contentOffset.x;
    //     const index = Math.round(contentOffsetX / IMAGE_WIDTH);

    //     if (index !== selectedIndex && index >= 0 && index < scrollImages.length) {
    //         setSelectedIndex(index); // Update active index
    //         flatListRef.current.scrollToIndex({ index, animated: true }); // Sync thumbnail
    //     }
    // };


    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / IMAGE_WIDTH);

        if (index !== selectedIndex && index >= 0 && index < scrollImages.length) {
            setSelectedIndex(index);
            flatListRef.current.scrollToIndex({ index, animated: true });
        }
    };




    return (
        <GestureHandlerRootView>
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={'#D6CDBB'} barStyle={'dark-content'} />

                <View
                    style={{
                        alignItems: 'center',
                        position: 'absolute',
                        zIndex: 10,
                        marginTop: SCREEN_HEIGHT * 0.1,
                    }}>
                    {/* <View style={{ flexDirection: "row", gap: 150 }}>
                        <View style={{ gap: 10 }}>
                            <Animated.View style={AnimatedStyle4}>
                                <View>
                                    <Image
                                        style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.1 }}
                                        source={require('../../assets/images/flower1.png')}
                                    />

                                </View>
                            </Animated.View>

                            <Animated.View style={AnimatedStyle5}>
                                <View>
                                    <Image
                                        style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.1 }}
                                        source={require('../../assets/images/flower1.png')}
                                    />

                                </View>
                            </Animated.View>

                        </View>


                        <View>
                            <Animated.View style={AnimatedStyle6}>
                                <View>
                                    <Image
                                        style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.1 }}
                                        source={require('../../assets/images/flower1.png')}
                                    />

                                </View>
                            </Animated.View>
                        </View>

                        <View style={{ gap: 10 }}>
                            <Animated.View style={AnimatedStyle7}>
                                <View>
                                    <Image
                                        style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.1 }}
                                        source={require('../../assets/images/flower1.png')}
                                    />

                                </View>
                            </Animated.View>

                            <Animated.View style={AnimatedStyle4}>
                                <View>
                                    <Image
                                        style={{ height: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.1 }}
                                        source={require('../../assets/images/flower1.png')}
                                    />

                                </View>
                            </Animated.View>

                        </View>
                    </View> */}

                    {/* <TouchableOpacity
                        onPress={toggleAnimation3}
                        style={{ borderWidth: 1, width: 50, alignItems: "center" }}
                    >
                        <Text>{btnclick3 ? 'Stop' : 'Start'}</Text>
                    </TouchableOpacity> */}
                </View>

                {/* coconut code */}

                <View
                    style={{
                        alignItems: 'center',
                        paddingTop: SCREEN_HEIGHT * 0.8,
                        position: 'absolute',
                        zIndex: coconutZIndex,
                        left: SCREEN_WIDTH * 0.2,
                    }}>
                    <Animated.View style={AnimatedStyle3}>
                        <View>
                            <Image
                                style={{
                                    height: SCREEN_HEIGHT * 0.05,
                                    width: SCREEN_WIDTH * 0.1,
                                }}
                                source={require('../../assets/images/nariyal.png')}
                            />
                        </View>
                    </Animated.View>
                </View>

                {/* code for drag thali */}

                {/* <View style={{ marginTop: SCREEN_HEIGHT * 0.8, position: "absolute", zIndex: dragThaliZIndex, alignSelf: "center" }}>
                    <PanGestureHandler onGestureEvent={gesturehandler}>
                        <Animated.View style={animatedstyle}>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Image
                                    style={{ height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH * 0.2 }}
                                    source={require('../../assets/images/AARTITHALI.png')} />
                            </View>
                        </Animated.View>
                    </PanGestureHandler>
                </View> */}

                <ImageBackground
                    source={require('../../assets/images/outer_temple1.png')}
                    style={[styles.templeImage, { pointerEvents: 'box-none' }]}
                    resizeMode="cover">

                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack();
                            }}>
                            <AntDesign name="left" size={20} color={'black'} />
                        </TouchableOpacity>

                        <View
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text style={{ ...Fonts.PoppinsMedium, textAlign: 'center' }}>
                                {scrollImages[selectedIndex]?.name || 'Jai Shree Ram'}
                            </Text>
                        </View>

                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: '#D66912',
                                flexDirection: 'row',
                                gap: 10,
                                borderRadius: 30,
                                paddingRight: Sizes.fixPadding,
                                alignItems: 'center',
                                backgroundColor: '#FCEDE1',
                            }}>
                            <View
                                style={{
                                    padding: 2,
                                    backgroundColor: 'white',
                                    borderWidth: 1,
                                    borderRadius: 20,
                                    borderColor: colors.background_theme2,
                                }}>
                                <View
                                    style={{
                                        borderWidth: 2,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#FCAA17',
                                        borderColor: '#FEDA2C',
                                        borderRadius: 20,
                                        padding: 2,
                                    }}>
                                    <Image
                                        source={require('../../assets/images/WalletStar.png')}
                                        style={{ height: 20, width: 20 }}
                                        resizeMode="contain"
                                    />
                                </View>
                            </View>

                            <Text
                                style={{
                                    ...Fonts.PoppinsSemiBold,
                                    color: colors.background_theme2,
                                }}>
                                {coinCount}
                            </Text>
                        </View>
                    </View>

                    <View style={{}}>
                        <FlatList
                            ref={flatListRef}
                            data={images}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.flatList}
                            style={styles.flatListContainer}
                        />
                    </View>

                    {isGifCoinVisible && (
                        <View
                            style={{
                                position: 'absolute',
                                top: SCREEN_WIDTH * -0.1,
                                left: SCREEN_WIDTH * 0.18,
                            }}>
                            <FastImage
                                loop={false}
                                style={{ width: SCREEN_WIDTH * 0.8, height: SCREEN_WIDTH * 0.62 }}
                                source={require('../../assets/Videos/winingCoins.gif')}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </View>
                    )}

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            zIndex: -1,
                        }}>
                        {/* Left Bell */}
                        <TouchableOpacity onPress={toggleLeftBell}>
                            <Animated.View style={[leftBellStyle]}>
                                <View
                                    style={{
                                        marginTop: SCREEN_WIDTH * 0.52,
                                        marginLeft: SCREEN_WIDTH * 0.13,
                                    }}>
                                    <Image
                                        source={require('../../assets/images/Bell.png')}
                                        resizeMode="contain"
                                        style={{ height: 120, width: 120 }}
                                    />
                                </View>
                            </Animated.View>
                        </TouchableOpacity>

                        {/* Right Bell */}
                        <TouchableOpacity onPress={toggleRightBell}>
                            <Animated.View style={[rightBellStyle]}>
                                <View
                                    style={{
                                        marginTop: SCREEN_WIDTH * 0.5,
                                        marginRight: SCREEN_WIDTH * 0.1,
                                    }}>
                                    <Image
                                        source={require('../../assets/images/Bell.png')}
                                        resizeMode="contain"
                                        style={{ height: 120, width: 120 }}
                                    />
                                </View>
                            </Animated.View>
                        </TouchableOpacity>
                    </View>

                    {/* Scrollable Images inside the Temple background */}

                    <View style={styles.centeredImageContainer}>
                        <ImageBackground
                            resizeMode='cover'
                            source={require('../../assets/images/innerTemple.png')}
                            style={{
                                height: '100%',
                                width: '100%',
                                // position: 'absolute',
                                alignSelf: 'center',
                            }}
                        >

                            <ScrollView
                                key={scrollImages.length}
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                onScroll={handleScroll}
                                scrollEventThrottle={16}
                                ref={scrollViewRef}
                                style={styles.scrollView}
                            >
                                {/* {scrollImages.map((item) => (
                                    <View key={item.id} style={styles.scrollableImageContainer}>
                                        <Image
                                            source={item.source}
                                            resizeMode="contain"
                                            style={[styles.centeredImage, {}]}
                                        />
                                    </View>
                                ))} */}
                                {scrollImages.map((item) => (
                                    <View key={item.id} style={styles.scrollableImageContainer}>
                                        <Image
                                            source={item.source}
                                            resizeMode="contain"
                                            style={[styles.centeredImage, {}]}
                                            onError={(e) => console.error('Image Load Error:', e.nativeEvent.error)}
                                        />
                                    </View>
                                ))}
                            </ScrollView>
                        </ImageBackground>
                    </View>



                    <View style={{ alignSelf: 'center', bottom: SCREEN_WIDTH * 0.4 }}>
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                // top: SCREEN_WIDTH * 0.4,
                            }}>
                            {showGif ? (
                                // Show the GIF when showGif is true
                                <FastImage
                                    style={{
                                        width: SCREEN_WIDTH * 0.9,
                                        height: SCREEN_HEIGHT * 0.25,
                                        bottom: SCREEN_WIDTH * 0.4,
                                    }}
                                    source={require('../../assets/Videos/arti2.gif')}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                            ) : (
                                // Show the image when showGif is false
                                <TouchableOpacity onPress={handleImageClick}>
                                    <FastImage
                                        style={{
                                            height: SCREEN_WIDTH * 0.3,
                                            width: SCREEN_WIDTH * 0.4,
                                        }}
                                        source={require('../../assets/Videos/arti3.gif')}
                                        resizeMode={FastImage.resizeMode.contain}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>


                    <View style={styles.pujaAssetsContainer}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: SCREEN_WIDTH * 0.025,
                            }}>
                            <ImageBackground
                                source={require('../../assets/images/SanatanMandirRing.png')}
                                style={{
                                    height: SCREEN_HEIGHT * 0.06,
                                    width: SCREEN_WIDTH * 0.12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                resizeMode="contain">
                                <TouchableOpacity
                                    onPress={toggleModalFull}
                                    style={{
                                        height: SCREEN_HEIGHT * 0.06,
                                        width: SCREEN_WIDTH * 0.08,
                                    }}>
                                    <Image
                                        resizeMode="contain"
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                        }}
                                        source={require('../../assets/images/sun.png')}
                                    />
                                </TouchableOpacity>
                            </ImageBackground>

                            <Modal
                                isVisible={isModalFullVisible}
                                onBackdropPress={toggleModalFull}
                                style={styles.fullScreenModal}
                            >
                                <ImageBackground
                                    source={require('../../assets/images/sangrahalay_bg.jpg')}
                                    style={styles.backgroundImage}
                                >
                                    <View style={styles.modalContent2}>
                                        <View style={styles.modalHeader}>
                                            <Text style={styles.headerText}>Ram Parivar</Text>
                                            <TouchableOpacity
                                                style={styles.closeButton}
                                                onPress={toggleModalFull}
                                            >
                                                <Text style={styles.closeButtonText}>X</Text>
                                            </TouchableOpacity>
                                        </View>

                                        {/* Modal Body */}
                                        <ScrollView showsVerticalScrollIndicator={false}>
                                        <View style={styles.modalBody}>
                                            <Image
                                                source={require('../../assets/images/pmatpis-77.jpg')}
                                                style={styles.modalImage}
                                            />
                                  
                                           <View style={{ marginTop: 20,  }}>
                                           <Text style={styles.modalText}>
                                                Ram Parivar 
                                            </Text>
                                            <Text style={styles.modalText1}>
                                                Introduction to Ram Parivar 
                                            </Text>
                                            <Text style={styles.modalText2}>
                                            According to the Ramayana, Rama was born to Dasaratha and his first wife Kausalya in Ayodhya, the capital of the Kingdom of Kosala. His siblings included Lakshmana, Bharata, and Shatrughna. He married Sita. Born in a royal family, Rama's life is described in the Hindu texts as one challenged by unexpected changes, such as an exile into impoverished and difficult circumstances, and challenges of ethical questions and moral dilemmas.[8] The most notable story involving Rama is the kidnapping of Sita by the demon-king Ravana, followed by Rama and Lakshmana's journey to rescue her.
                                            The entire life story of Rama, Sita and their companions allegorically discusses duties, rights and social responsibilities of an individual. It illustrates dharma and dharmic living through model characters.[8][9]
                                            Rama is especially important to Vaishnavism. He is the central figure of the ancient Hindu epic Ramayana, a text historically popular in the South Asian and Southeast Asian cultures.[10][11][12] His ancient legends have attracted bhashya (commentaries) and extensive secondary literature and inspired performance arts. Two such texts, for example, are the Adhyatma Ramayana – a spiritual and theological treatise considered foundational by Ramanandi monasteries,[13] and the Ramcharitmanas – a popular treatise that inspires thousands of Ramlila festival performances during autumn every year in India
                                            </Text>
                                           </View>
                                        </View>
                                        </ScrollView>
                                    </View>
                                </ImageBackground>
                            </Modal>


                            <ImageBackground
                                source={require('../../assets/images/SanatanMandirRing.png')}
                                style={{
                                    height: SCREEN_HEIGHT * 0.06,
                                    width: SCREEN_WIDTH * 0.12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                resizeMode="contain">
                                <TouchableOpacity
                                    style={{
                                        height: SCREEN_HEIGHT * 0.06,
                                        width: SCREEN_WIDTH * 0.08,
                                    }}
                                    onPress={toggleBothBells}>
                                    <Image
                                        resizeMode="contain"
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                        }}
                                        source={require('../../assets/images/flower1.png')}
                                    />
                                </TouchableOpacity>
                            </ImageBackground>

                            <ImageBackground
                                source={require('../../assets/images/SanatanMandirRing.png')}
                                style={{
                                    height: SCREEN_HEIGHT * 0.06,
                                    width: SCREEN_WIDTH * 0.12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                resizeMode="contain">
                                <TouchableOpacity
                                    style={{
                                        height: SCREEN_HEIGHT * 0.06,
                                        width: SCREEN_WIDTH * 0.08,
                                    }}
                                    onPress={handleImageClick}>
                                    <Image
                                        resizeMode="contain"
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                        }}
                                        source={require('../../assets/images/lamp.png')}
                                    />
                                </TouchableOpacity>
                            </ImageBackground>

                            <ImageBackground
                                source={require('../../assets/images/SanatanMandirRing.png')}
                                style={{
                                    height: SCREEN_HEIGHT * 0.06,
                                    width: SCREEN_WIDTH * 0.12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                resizeMode="contain">
                                <TouchableOpacity
                                    style={{
                                        height: SCREEN_HEIGHT * 0.06,
                                        width: SCREEN_WIDTH * 0.08,
                                    }}
                                    onPress={toggleAnimation2}>
                                    <Image
                                        resizeMode="contain"
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                        }}
                                        source={require('../../assets/images/coconut.png')}
                                    />
                                </TouchableOpacity>
                            </ImageBackground>

                            <ImageBackground
                                source={require('../../assets/images/SanatanMandirRing.png')}
                                style={{
                                    height: SCREEN_HEIGHT * 0.06,
                                    width: SCREEN_WIDTH * 0.12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                resizeMode="contain">
                                <TouchableOpacity
                                    style={{
                                        height: SCREEN_HEIGHT * 0.06,
                                        width: SCREEN_WIDTH * 0.08,
                                    }}
                                    onPress={playSankhSound}>
                                    <Image
                                        resizeMode="contain"
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                        }}
                                        source={require('../../assets/images/shankh_golden.png')}
                                    />
                                </TouchableOpacity>
                            </ImageBackground>

                            <ImageBackground
                                source={require('../../assets/images/SanatanMandirRing.png')}
                                style={{
                                    height: SCREEN_HEIGHT * 0.06,
                                    width: SCREEN_WIDTH * 0.12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                resizeMode="contain">
                                <TouchableOpacity
                                    style={{
                                        height: SCREEN_HEIGHT * 0.06,
                                        width: SCREEN_WIDTH * 0.08,
                                    }}>
                                    <Image
                                        resizeMode="contain"
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                        }}
                                        source={require('../../assets/images/calendarr.png')}
                                    />
                                </TouchableOpacity>
                            </ImageBackground>


                            <ImageBackground
                                source={require('../../assets/images/music1.png')}
                                style={{
                                    height: SCREEN_HEIGHT * 0.06,
                                    width: SCREEN_WIDTH * 0.12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                resizeMode="contain">
                                <TouchableOpacity
                                    onPress={toggleModal}
                                    style={{
                                        height: SCREEN_HEIGHT * 0.06,
                                        width: SCREEN_WIDTH * 0.08,
                                    }}>
                                    <Image
                                        resizeMode="contain"
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                        }}
                                        source={require('../../assets/images/music1.png')}
                                    />
                                </TouchableOpacity>
                            </ImageBackground>


                            <Modal
                                isVisible={isModalVisible}
                                onBackdropPress={toggleModal}
                                style={styles.modal}
                            >
                                <View style={styles.modalContent}>
                                    {/* Header Section */}
                                    <View style={styles.musicPlayerHeader}>
                                        <Text style={styles.modalHeaderText}>Ganesh Ji</Text>
                                    </View>

                                    {/* Music Player Main Content */}
                                    <View style={styles.musicController}>
                                        <Image
                                            source={require('../../assets/images/music1.png')}
                                            style={styles.musicImage}
                                        />
                                        {/* Time Controls */}
                                        <View style={styles.timerSection}>
                                            <Text style={styles.timerText}>00:00</Text>
                                            <Text style={styles.timerText}>00:00</Text>
                                        </View>
                                        {/* Player Controls */}
                                        <View style={styles.controllerButtons}>
                                            <TouchableOpacity>
                                                <Text>{"<<"}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Text>{"Play"}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Text>{">>"}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>

                        </View>
                    </View>

                    <View
                        style={[
                            styles.pujaAssetsContainer,
                            { bottom: 2, alignSelf: 'center' },
                        ]}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: SCREEN_WIDTH * 0.05,
                            }}>
                            <TouchableOpacity style={[styles.AajKaPradhanContainer]}>
                                <View
                                    style={{
                                        height: SCREEN_HEIGHT * 0.033,
                                        width: SCREEN_WIDTH * 0.08,
                                    }}>
                                    <Image
                                        source={require('../../assets/images/sanatanUser.png')}
                                        resizeMode="contain"
                                        style={{ height: '100%', width: '100%' }}
                                    />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.AajKaPradhanContainer]}>
                                <View
                                    style={{
                                        height: SCREEN_HEIGHT * 0.033,
                                        width: SCREEN_WIDTH * 0.08,
                                    }}>
                                    <Image
                                        source={require('../../assets/images/ramji.jpeg')}
                                        resizeMode="cover"
                                        style={{ height: '100%', width: '100%' }}
                                    />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.AajKaPradhanContainer]}>
                                <Text
                                    style={{
                                        ...Fonts.PoppinsMedium,
                                        flexWrap: 'wrap',
                                        textAlign: 'center',
                                    }}>
                                    आज का
                                </Text>
                                <Text
                                    style={{
                                        ...Fonts.PoppinsMedium,
                                        flexWrap: 'wrap',
                                        textAlign: 'center',
                                    }}>
                                    {' '}
                                    प्रधान
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.AajKaPradhanContainer,
                                    { backgroundColor: Colors.background_theme1 },
                                ]}>
                                <View
                                    style={{
                                        height: SCREEN_HEIGHT * 0.033,
                                        width: SCREEN_WIDTH * 0.08,
                                    }}>
                                    <Image
                                        source={require('../../assets/images/plusSign.png')}
                                        resizeMode="contain"
                                        style={{ height: '100%', width: '100%' }}
                                        tintColor={Colors.grayD}
                                    />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.AajKaPradhanContainer,
                                    { backgroundColor: Colors.background_theme1 },
                                ]}>
                                <View
                                    style={{
                                        height: SCREEN_HEIGHT * 0.033,
                                        width: SCREEN_WIDTH * 0.08,
                                    }}>
                                    <Image
                                        source={require('../../assets/images/plusSign.png')}
                                        resizeMode="contain"
                                        style={{ height: '100%', width: '100%' }}
                                        tintColor={Colors.grayD}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ImageBackground>

                {/* Scrollable Image which is used for puja */}
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

const mapStateToProps = state => ({
    customerData: state.customer.customerData,
    wallet: state.customer.wallet,
    notificationData: state.customer.notificationData,
    sanatangif: state.home.sanatangif,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Sanatan);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: Sizes.fixPadding,
        paddingRight: Sizes.fixPadding,
    },
    templeImage: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        alignSelf: 'center',
        position: 'relative',
    },
    centeredImageContainer: {
        alignSelf: 'center',
        zIndex: -2,
        bottom: SCREEN_WIDTH * 0.54,
        width: SCREEN_WIDTH * 1.13,
        height: SCREEN_HEIGHT * 0.4,
    },
    centeredImage: {
        width: '100%',
        height: '80%',
        elevation: 3,
        top: SCREEN_WIDTH * 0.09
    },
    flatList: {
        padding: 10,
        gap: 10,
    },
    flatListImage: {
        height: '100%',
        width: '100%',
        borderRadius: SCREEN_WIDTH * 0.06,
        borderWidth: 2,
        borderColor: colors.background_theme2,
    },
    scrollView: {
        width: '100%',
    },
    scrollableImageContainer: {
        width: SCREEN_WIDTH * 1.13,
        height: SCREEN_HEIGHT * 0.5,
    },
    pujaAssetsContainer: {
        position: 'absolute',
        bottom: SCREEN_WIDTH * 0.16,
        alignItems: 'center',
    },
    pujaAssetsFlatList: {
        gap: 20,
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

    AajKaPradhanContainer: {
        paddingHorizontal: 4,
        paddingVertical: 4,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
    },
    UpperFlatlistImageContainer: {
        height: SCREEN_WIDTH * 0.13,
        width: SCREEN_WIDTH * 0.13,
        borderRadius: SCREEN_WIDTH * 0.07,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,

        backgroundColor: colors.white_color,
    },
    UpperFlatlistImageContainer2: {
        height: SCREEN_WIDTH * 0.12,
        width: SCREEN_WIDTH * 0.12,
        borderRadius: SCREEN_WIDTH * 0.09,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    musicIconBackground: {
        height: SCREEN_HEIGHT * 0.06,
        width: SCREEN_WIDTH * 0.12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    musicIconTouchable: {
        height: SCREEN_HEIGHT * 0.06,
        width: SCREEN_WIDTH * 0.08,
    },
    musicIcon: {
        height: '100%',
        width: '100%',
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: '#FFA500',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // padding: 20,
    },
    musicPlayerHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
    },
    modalHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    musicController: {
        alignItems: 'center',
    },
    musicImage: {
        height: SCREEN_HEIGHT * 0.1,
        width: SCREEN_HEIGHT * 0.1,
        marginBottom: 10,
    },
    timerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    timerText: {
        fontSize: 14,
        color: '#fff',
    },
    controllerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%',
        marginTop: 10,
    },
    imageBackground: {
        height: SCREEN_HEIGHT * 0.06,
        width: SCREEN_WIDTH * 0.12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchable: {
        height: SCREEN_HEIGHT * 0.06,
        width: SCREEN_WIDTH * 0.08,
    },
    iconImage: {
        height: '100%',
        width: '100%',
    },
    fullScreenModal: {
        margin: 0,
    },
    modalContent2: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'red',
        width: '100%'
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFA500',
    },
    closeButton: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 50,
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFA500',
    },
    modalBody: {
        flex: 1,
        marginTop: 20,

    },
    modalImage: {
        width: "100%",
        objectFit:"cover",
        height:"30%"
    },
    modalText: {
        fontSize: 24,
        color: '#FFA500',
        fontWeight: 'bold'
    },
    modalText1: {
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold'
    },
    modalText2:{
        fontSize: 18,
        color: 'black',
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
    },
});