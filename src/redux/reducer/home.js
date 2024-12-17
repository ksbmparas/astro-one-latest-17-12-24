import * as actionTypes from '../actionTypes';

const initialState = {
    bannerData: null,
    callAstrologer: null,
    chatAstrologer: null,
    videoCallAstrolgoer: null,
    homeSimmer: false,
    companionData: null,
    notificationData: null,
    deleteAccount: null,
    templegif: null,
    sanatangif:null,
    getabhijitdata: null,
    getdurmuhurtdata: null,
    getgulikdata:null,
    getyamgantakdata: null
};

const home = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case actionTypes.SET_HOME_BANNER:
            return {
                ...state,
                bannerData: payload,
            };
        case actionTypes.SET_CALL_ASTROLOGER:
            return {
                ...state,
                callAstrologer: payload,
            };
        case actionTypes.SET_CHAT_ASTROLOGER:
            return {
                ...state,
                chatAstrologer: payload,
            };
        case actionTypes.SET_VIDEO_CALL_ASTROLOGER:
            return {
                ...state,
                videoCallAstrolgoer: payload,
            };

        case actionTypes.SET_HOME_SIMMER:
            return {
                ...state,
                homeSimmer: payload,
            };
        case actionTypes.SET_ASTRO_COMPANION_DATA:
            return {
                ...state,
                companionData: payload,
            };
        case actionTypes.SET_NOTIFICATION_DATA:
            return {
                ...state,
                notificationData: payload,
            };
        case actionTypes.SET_DELETE_ACCOUNT_DATA:
            return {
                ...state,
                deleteAccount: payload,
            };
        case actionTypes.SET_TEMPLE_GIF:
            return {
                ...state,
                templegif: payload,
            };
        case actionTypes.SET_SANATAN_TEMPLE_GIF:
                return {
                    ...state,
                    sanatangif: payload,
                };
        case actionTypes.SET_ABHIJIT_MUHURT:
                return {
                    ...state,
                    getabhijitdata: payload,
                };
        case actionTypes.SET_DUR_MUHURAT:
                return {
                    ...state,
                    getdurmuhurtdata: payload,
                };
        case actionTypes.SET_GULIK_MUHURAT:
                return {
                    ...state,
                    getgulikdata: payload,
                };
        case actionTypes.SET_YAM_MUHURAT:
                return {
                    ...state,
                    getyamgantakdata: payload,
                };

        default:
            return state;
    }
};

export default home;
