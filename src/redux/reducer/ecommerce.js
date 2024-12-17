import * as actionTypes from '../actionTypes'

const initialState = {
    productCategoryData: null,
    productsData: null,
    cartData: null,
    mallOrderData: null,
    // removecartData: null
}



const ecommerce = (state = initialState, actions) => {
    const { type, payload } = actions;
    switch (type) {
        case actionTypes.SET_PRODUCT_CATEGORY:
            return {
                ...state,
                productCategoryData: payload,
            };
        case actionTypes.SET_PRODUCTS:
            return {
                ...state,
                productsData: payload,
            };
        case actionTypes.SET_CART_DATA:
            return {
                ...state,
                cartData: payload,
            };
        case actionTypes.REMOVE_CART_ITEM:
            return {
                    ...state,
                    cartData: {
                        ...state.cartData,
                        cart: state.cartData.cart.filter(item => item._id !== actions.payload)
                    }
            };
            case actionTypes.SET_MALL_ORDER_DATA:
                return {
                        ...state,
                        mallOrderData: payload,
                };
           
        default:
            return state;
    }
}

export default ecommerce;