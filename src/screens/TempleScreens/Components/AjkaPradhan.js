import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { img_url } from '../../../config/constants';
import * as HomeActions from '../../../redux/actions/HomeActions';

const AjkaPradhan = ({ dispatch, ajkapradhandata }) => {

    useEffect(() => {
        dispatch(HomeActions.getAjKaPradhan());
    }, [dispatch]);
    const pradhanData = ajkapradhandata?.sort((a, b) => b.referral_count - a.referral_count);

    const reorderData = (data) => {
        const reordered = [];
        for (let i = 0; i < data?.length; i++) {
            i % 2 === 0 ? reordered.push(data[i]) : reordered.unshift(data[i]);
        }
        return reordered;
    };

    const finalData = reorderData(pradhanData?.slice(0, 5));
    console.log("ljaisdhfoiashod:>>.", ajkapradhandata)

    return (
        <View>
            <FlatList
                horizontal
                data={finalData}
                keyExtractor={(item, index) => `${item._id}-${index}`}
                renderItem={({ item, index }) => {
                    const isCenter = index === Math.floor(finalData.length / 2);
                    return (
                        <>
                     
                            <View style={{
                                marginHorizontal: 5,
                                alignItems: 'center',
                                paddingTop:30,
                            }}>
                                {isCenter && (
                                    <Text style={{
                                        color: "red",
                                        textAlign: "center",
                                        backgroundColor: "#fff",
                                        paddingHorizontal: 10,
                                        borderRadius: 3,
                                        paddingBottom: 2,
                                        marginTop:-20,
                                        fontWeight:"700"
                                    }}>
                                        आज का प्रधान
                                    </Text>
                                )}
                                <Image
                                    source={
                                        item?.image
                                            ? { uri: `${img_url}${item.image}` }
                                            : require('../../../assets/images/pradhan.png')
                                    }
                                    style={{
                                        width: 45,
                                        height: 45,
                                        borderRadius: 30,
                                        backgroundColor: "#000", marginBottom: 5,
                                    }}
                                />

                            </View>

                        </>
                    );
                }}
            />
        </View>
    )
}



const mapStateToProps = state => ({
    ajkapradhandata: state.home.ajkapradhandata,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AjkaPradhan);

const styles = StyleSheet.create({})