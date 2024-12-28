import * as actionTypes from '../actionTypes';

export const getHomeData = payload =>({
    type: actionTypes.GET_HOME_DATA,
    payload,
})

export const setHomeBanner = payload =>({
    type: actionTypes.SET_HOME_BANNER,
    payload,
})

export const setCallAstrologer = payload =>({
    type: actionTypes.SET_CALL_ASTROLOGER,
    payload,
})

export const setChatAstrologer = payload =>({
    type: actionTypes.SET_CHAT_ASTROLOGER,
    payload,
})
export const setVideoCallAstrologer = payload =>({
    type: actionTypes.SET_VIDEO_CALL_ASTROLOGER,
    payload,
})

export const getHomeDataOnRefresh = payload =>({
    type: actionTypes.GET_HOME_DATA_ON_REFRESH,
    payload,
})

export const getAstroCompanionData = payload =>({
    type: actionTypes.GET_ASTRO_COMPANION_DATA,
    payload,
})

export const setAstroCompanionData = payload =>({
    type: actionTypes.SET_ASTRO_COMPANION_DATA,
    payload,
})
export const getNotificationData = payload =>({
    type: actionTypes.GET_NOTIFICATION_DATA,
    payload,
})
export const setNotificationData = payload =>({
    type: actionTypes.SET_NOTIFICATION_DATA,
    payload,
})
export const getDeleteAccount = payload =>({
    type: actionTypes.GET_DELETE_ACCOUNT_DATA,
    payload,
})
export const setDeleteAccount = payload =>({
    type: actionTypes.SET_DELETE_ACCOUNT_DATA,
    payload,
})
export const getTemplegif = payload =>({
    type: actionTypes.GET_TEMPLE_GIF,
    payload,
})

export const getSanatangif = payload =>({
    type: actionTypes.GET_SANATAN_TEMPLE_GIF,
    payload,
})


export const getAbijitMuhurt = payload => {
    return {
        type: actionTypes.GET_ABHIJIT_MUHURT,
        payload,
    };
};
export const setAbijitMuhurt = payload =>({
    type: actionTypes.SET_ABHIJIT_MUHURT,
    payload,
})

export const getDurMuhurat = payload => {
    return {
        type: actionTypes.GET_DUR_MUHURAT,
        payload,
    };
};
export const setDurMuhurat = payload =>({
    type: actionTypes.SET_DUR_MUHURAT,
    payload,
})

export const getGulikMuhurat = payload => {
    return {
        type: actionTypes.GET_GULIK_MUHURAT,
        payload,
    };
};
export const setGulikMuhurat = payload =>({
    type: actionTypes.SET_GULIK_MUHURAT,
    payload,
})

export const getYamMuhurat = payload => {
    return {
        type: actionTypes.GET_YAM_MUHURAT,
        payload,
    };
};

export const setYamMuhurat = payload =>({
    type: actionTypes.SET_YAM_MUHURAT,
    payload,
})

export const getLiveTempleData = payload =>({
    type: actionTypes.GET_LIVE_TEMPLE_DATA,
    payload,
})

export const setLiveTempleData = payload =>({
    type: actionTypes.SET_LIVE_TEMPLE_DATA,
    payload,
})




