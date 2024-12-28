import { call, put, select, takeLatest, takeLeading } from 'redux-saga/effects';
import { getRequest, postRequest } from '../../utils/apiRequests';
import * as actionTypes from '../actionTypes';
import { api_url, customer_home_banner, get_gifsanatan, get_active_astrologer, get_astro_companion, get_call_astrologer, get_chat_astrologer, get_delete_account_data, get_notification_data, get_video_call_astrologer, get_referres, get_mudra, get_lota_mudra, get_baghwan, get_pooja_category } from '../../config/constants';
import { showToastMessage } from '../../utils/services';
import { resetToScreen } from '../../navigations/NavigationServices';

function* getHomeData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: true })

        const bannerResponse = yield getRequest({
            url: api_url + customer_home_banner,
        })

        const callResponse = yield postRequest({
            url: api_url + get_call_astrologer,
            data: {
                page: 1
            }
        })

        const chatResponse = yield postRequest({
            url: api_url + get_chat_astrologer,
            data: {
                page: 1
            }
        })

        const videoResponse = yield postRequest({
            url: api_url + get_video_call_astrologer,
            data: {
                page: 1
            }
        })

        if (bannerResponse?.success) {
            yield put({ type: actionTypes.SET_HOME_BANNER, payload: bannerResponse?.banners })
        }

        if (callResponse?.success) {
            yield put({ type: actionTypes.SET_CALL_ASTROLOGER, payload: callResponse?.astrologer })
        }

        if (chatResponse?.success) {
            yield put({ type: actionTypes.SET_CHAT_ASTROLOGER, payload: chatResponse?.astrologer })
        }

        if (videoResponse?.success) {
            yield put({ type: actionTypes.SET_VIDEO_CALL_ASTROLOGER, payload: videoResponse?.astrologer })
        }

        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })
        console.log('hii', e);
    }
}

function* getHomeDataOnRefresh(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_REFRESHING, payload: true })


        const callResponse = yield postRequest({
            url: api_url + get_call_astrologer,
            data: {
                page: 1
            }
        })

        const chatResponse = yield postRequest({
            url: api_url + get_chat_astrologer,
            data: {
                page: 1
            }
        })
        const videoResponse = yield postRequest({
            url: api_url + get_video_call_astrologer,
            data: {
                page: 1
            }
        })

        yield put({ type: actionTypes.GET_CUSTOMER_DATA, payload: null })


        if (callResponse?.success) {
            yield put({ type: actionTypes.SET_CALL_ASTROLOGER, payload: callResponse?.astrologer })
        }

        if (chatResponse?.success) {
            yield put({ type: actionTypes.SET_CHAT_ASTROLOGER, payload: chatResponse?.astrologer })
        }
        if (videoResponse.response) {
            yield put({ type: actionTypes.SET_VIDEO_CALL_ASTROLOGER, payload: videoResponse?.astrologer })
        }

        yield put({ type: actionTypes.SET_IS_REFRESHING, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_IS_REFRESHING, payload: false })
        console.log('hii', e);
    }
}

function* getAstroCompanionData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })


        const response = yield postRequest({
            url: api_url + get_astro_companion,
            data: {
                type: payload
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_ASTRO_COMPANION_DATA, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log('hii', e);
    }
}

function* getNotificationData(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const customerData = yield select(state => state.customer.customerData);
        console.log(customerData?._id);

        const response = yield postRequest({
            url: api_url + get_notification_data,
            data: {
                customerId: customerData?._id
            }
        });

        console.log(response?.data, 'notification data');
        if (response?.success) {
            // Sort notifications by '_id' in descending order
            const sortedNotifications = response?.data.sort(
                (a, b) => b._id.localeCompare(a._id)
            );

            yield put({ type: actionTypes.SET_NOTIFICATION_DATA, payload: sortedNotifications });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}


function* getDeleteAccountData(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        console.log(customerData?._id)

        const response = yield postRequest({
            url: api_url + get_delete_account_data,
            data: {
                customerId: customerData?._id
            }
        })
        console.log(response?.message, 'notification data')
        if (response?.success) {
            console.log(response?.message, 'notification data')
            yield put({ type: actionTypes.SET_DELETE_ACCOUNT_DATA, payload: response?.data })
            showToastMessage({ message: response?.message })
            yield call(resetToScreen, 'login')
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getTemplegif(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_TEMPLE_GIF, payload: true })

        const templegifResponse = yield getRequest({
            // url: api_url + customer_home_banner,
            url: 'https://astrooneapi.ksdelhi.net/api/customers/gifs'
        })

        if (templegifResponse?.success) {
            yield put({ type: actionTypes.SET_TEMPLE_GIF, payload: templegifResponse?.gifs })
        }

        console.log(templegifResponse, 'hiiii')

        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })
        console.log('hii', e);
    }
}

function* getSanatangif(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_SANATAN_TEMPLE_GIF, payload: true })

        const sanatanMandirgif = yield getRequest({
            // url: api_url + get_gifsanatan,
            url: 'https://astrooneapi.ksdelhi.net/api/admin/get_temple'
        })
        if (sanatanMandirgif?.success) {
            yield put({ type: actionTypes.SET_SANATAN_TEMPLE_GIF, payload: sanatanMandirgif })
        }
        console.log(sanatanMandirgif, 'SanatanGifCheck12')
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })
        console.log('hii', e);
    }
}

function* getAbijitMuhurt(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const currentDate = new Date();
        const date = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()}`;

        const timezone = (currentDate.getTimezoneOffset() / -60).toFixed(1);

        const latitude = payload?.lat || "+28.70";
        const longitude = payload?.lon || "+77.10";

        const USER_ID = "tathastujy";
        const AUTH_CODE = "86ce34784bfc07a39392bf690995ef33";

        const LANGUAGE = "hi";

        const requestData = {
            d: date,
            tz: timezone,
            lat: latitude,
            lon: longitude,
            userid: USER_ID,
            authcode: AUTH_CODE,
            lang: LANGUAGE
        };

        console.log("Data being sent to API:", requestData);

        const response = yield postRequest({
            url: "https://api.kundli.click/cust_tathastujy_v0.4/muhurat-abhijit",
            data: requestData,
            header: 'post'
        });

        console.log("API Response:", response);

        if (response) {
            yield put({ type: actionTypes.SET_ABHIJIT_MUHURT, payload: response });
        } else {
            console.error("API Error Response:", response);
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.error("Error fetching Abhijit Muhurat:", e);
    }
}

function* getDurMuhurat(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const currentDate = new Date();
        const date = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()}`;
        const timezone = (currentDate.getTimezoneOffset() / -60).toFixed(1);

        const latitude = payload?.lat || "+28.70";
        const longitude = payload?.lon || "+77.10";

        const USER_ID = "tathastujy";
        const AUTH_CODE = "86ce34784bfc07a39392bf690995ef33";
        const LANGUAGE = "hi";

        const durmuhuratTypes = "rahukaal";

        const requestData = {
            durmuhurat: durmuhuratTypes,
            d: date,
            tz: timezone,
            lat: latitude,
            lon: longitude,
            userid: USER_ID,
            authcode: AUTH_CODE,
            lang: LANGUAGE
        };

        const response = yield postRequest({
            url: "https://api.kundli.click/cust_tathastujy_v0.4/durmuhurat",
            data: requestData,
            header: 'post',
        });

        console.log("Response for durmuhurat", response);

        if (response) {
            yield put({ type: actionTypes.SET_DUR_MUHURAT, payload: response });
        } else {
            console.error("API Error Response:", response);
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.error("Error fetching Abhijit Muhurat:", e);
    }
}

function* getGulikMuhurat(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const currentDate = new Date();
        const date = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()}`;
        const timezone = (currentDate.getTimezoneOffset() / -60).toFixed(1);

        const latitude = payload?.lat || "+28.70";
        const longitude = payload?.lon || "+77.10";

        const USER_ID = "tathastujy";
        const AUTH_CODE = "86ce34784bfc07a39392bf690995ef33";
        const LANGUAGE = "hi";

        const durmuhuratTypes = "gulikkaal";

        const requestData = {
            durmuhurat: durmuhuratTypes,
            d: date,
            tz: timezone,
            lat: latitude,
            lon: longitude,
            userid: USER_ID,
            authcode: AUTH_CODE,
            lang: LANGUAGE
        };

        const response = yield postRequest({
            url: "https://api.kundli.click/cust_tathastujy_v0.4/durmuhurat",
            data: requestData,
            header: 'post',
        });

        console.log("Response for durmuhurat", response);

        if (response) {
            yield put({ type: actionTypes.SET_GULIK_MUHURAT, payload: response });
        } else {
            console.error("API Error Response:", response);
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.error("Error fetching Abhijit Muhurat:", e);
    }
}

function* getYamghantMuhurat(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const currentDate = new Date();
        const date = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()}`;
        const timezone = (currentDate.getTimezoneOffset() / -60).toFixed(1);

        const latitude = payload?.lat || "+28.70";
        const longitude = payload?.lon || "+77.10";

        const USER_ID = "tathastujy";
        const AUTH_CODE = "86ce34784bfc07a39392bf690995ef33";
        const LANGUAGE = "hi";

        const durmuhuratTypes = "yamgantakkaal";

        const requestData = {
            durmuhurat: durmuhuratTypes,
            d: date,
            tz: timezone,
            lat: latitude,
            lon: longitude,
            userid: USER_ID,
            authcode: AUTH_CODE,
            lang: LANGUAGE
        };

        const response = yield postRequest({
            url: "https://api.kundli.click/cust_tathastujy_v0.4/durmuhurat",
            data: requestData,
            header: 'post',
        });

        console.log("Response for durmuhurat", response);

        if (response) {
            yield put({ type: actionTypes.SET_YAM_MUHURAT, payload: response });
        } else {
            console.error("API Error Response:", response);
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.error("Error fetching Abhijit Muhurat:", e);
    }
}

function* getLiveTempleData(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield getRequest({
            url: "https://astrooneapi.ksdelhi.net/api/admin/get_Darshan",
        })

        console.log("Response for Live Temple Data", response);

        if (response?.success) {
            yield put({ type: actionTypes.SET_LIVE_TEMPLE_DATA, payload: response?.data});
        
            console.log("Response for Live Temple Data", response?.data);
            
        }

    } catch (error) {

        console.log("Something went wrong:::::", error);

    }
}



function* getPradhan(actions) {
    try {
        const { payload } = actions
        const response = yield getRequest({
             url: api_url + get_referres,
        })
        console.log("response:>>>",response)
        if (response?.success) {
            yield put({ type: actionTypes.SET_PRADHAN_DATA, payload: response?.data })
        }
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })
        console.log('hii', e);
    }
}

function* getMudra(actions) {
    try {
        const { payload } = actions
        console.log(payload,"oisadhfdosahoh")
        const response = yield postRequest({
             url: api_url + get_mudra,
             data:payload
        })
        console.log("responsepradhan>>>:::",response)
        if (response?.success) {
            yield put({ type: actionTypes.SET_MUDRA_DATA, payload: response })
        }
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })
        console.log('hii', e);
    }
}
function* getLotaMudra(actions) {
    try {
        const { payload } = actions
        console.log(payload,"oisadhfdosahoh")
        const response = yield postRequest({
             url: api_url + get_lota_mudra,
             data:payload
        })
        console.log("responsepradhan>>>:::",response)
        if (response?.success) {
            yield put({ type: actionTypes.SET_LOTA_MUDRA_DATA, payload: response })
            yield put({ type: actionTypes.GET_MUDRA_DATA });        }
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })
        console.log('hii', e);
    }
}

function* getBaghwandata(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_SANATAN_TEMPLE_GIF, payload: true })
     
        const baghwanData = yield getRequest({
             url: api_url + get_baghwan,
           
        })
        console.log("baghwanData",baghwanData)
        if (baghwanData?.success) {
            yield put({ type: actionTypes.SET_BAGHWAN_DATA, payload: baghwanData?.data })
        }
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })
        console.log('hii', e);
    }
}
function* getPoojacategory(actions) {
    try {
        const { payload } = actions
     const poojaData = yield getRequest({
             url: api_url + get_pooja_category,
           
        })
        console.log("poojaData",poojaData?.success)
        if (poojaData?.success) {
            yield put({ type: actionTypes.SET_POOJA_CATEGORY, payload: poojaData?.data })
        }
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_HOME_SIMMER, payload: false })
        console.log('hii', e);
    }
}
export default function* homeSaga() {
    yield takeLatest(actionTypes.GET_HOME_DATA, getHomeData);
    yield takeLeading(actionTypes.GET_HOME_DATA_ON_REFRESH, getHomeDataOnRefresh);
    yield takeLeading(actionTypes.GET_ASTRO_COMPANION_DATA, getAstroCompanionData);
    yield takeLeading(actionTypes.GET_NOTIFICATION_DATA, getNotificationData);
    yield takeLeading(actionTypes.GET_DELETE_ACCOUNT_DATA, getDeleteAccountData);
    yield takeLeading(actionTypes.GET_TEMPLE_GIF, getTemplegif);
    yield takeLeading(actionTypes.GET_SANATAN_TEMPLE_GIF, getSanatangif);
    yield takeLeading(actionTypes.GET_ABHIJIT_MUHURT, getAbijitMuhurt);
    yield takeLeading(actionTypes.GET_DUR_MUHURAT, getDurMuhurat);
    yield takeLeading(actionTypes.GET_GULIK_MUHURAT, getGulikMuhurat);
    yield takeLeading(actionTypes.GET_YAM_MUHURAT, getYamghantMuhurat);
    yield takeLeading(actionTypes.GET_LIVE_TEMPLE_DATA, getLiveTempleData);
    yield takeLeading(actionTypes.GET_PRADHAN_DATA, getPradhan);
    yield takeLeading(actionTypes.GET_MUDRA_DATA, getMudra);
    yield takeLeading(actionTypes.GET_LOTA_MUDRA_DATA, getLotaMudra);
    yield takeLeading(actionTypes.GET_BAGHWAN_DATA, getBaghwandata);
    yield takeLeading(actionTypes.GET_POOJA_CATEGORY, getPoojacategory);
}