/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-09-11
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import * as types from './actionTypes';
import Util from '../common/utils';
import * as urls from '../common/constants_url';
import * as Storage from '../common/Storage';

/**
 * 购物车actions
 * @param id
 * @returns {function(*)}
 */

export let appCartCookieIdFromSync = (phoneId) => {
    return (dispatch) => {
        dispatch({type:types.kAppCartCookieIdFromSync, phoneId:phoneId});
    }
};

export let cartNumFromSync = (cart_num) => {
    return (dispatch) => {
        dispatch({type:types.kCartNumFromSync, cart_num:cart_num});
    }
};

export let cartView = (phoneId)=> {
    let url = urls.kUrlCart;
    let data = {
        phoneId:phoneId,
        server:'56846a8a2fee49d14901d39cc48b8b2a'
    };

    return dispatch => {
        dispatch({type: types.kCartView});
        return Util.postNew(url, data,
            (data) => {
                let phoneId = '';
                let cartItems = [];
                if (data.status) {
                    cartItems = data.orderList;
                    phoneId = phoneId;
                }
                dispatch({type:types.kCartViewReceived, status:data.status,  message:data.message,  cartItems:cartItems, phoneId:phoneId});
            },
            (error) => {
                // console.log('Fetch banner list error: ' + error);
                dispatch({'type': types.kActionError});
            }
        );
    }
};

export let cartAdd = (phone_id, goodsCount, foodId)=> {
    let url = urls.kUrlCartAdd;
    let data = {
        phoneId: phone_id,
        foodCount:goodsCount ,
        foodId: foodId,
        server:'56846a8a2fee49d14901d39cc48b8b2a'
    };

    return dispatch => {
        dispatch({type: types.kCartAdd});
        return Util.postNew(url, data,
            (data) => {
                let cart_num = 0;
                let phoneId = phone_id;
                if (data.status) {
                    cart_num = 1;
                    phoneId = phone_id;
                }
                Storage.setAppCartCookieId(phoneId);
                dispatch({type:types.kCartAddReceived, status:data.status, message:data.message,
                    cart_num:cart_num, phoneId:phone_id});
                dispatch(cartView(phoneId));
            },
            (error) => {
                // console.log('Fetch banner list error: ' + error);
                dispatch({'type': types.kActionError});
            }
        );
    }
};