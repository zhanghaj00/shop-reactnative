/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-09-23
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import * as types from './actionTypes';
import Util from '../common/utils';
import * as urls from '../common/constants_url';

/**
 * 预订单actions
 */

export let preorderCreate = (phoneId,itemList)=> {
    //let url = urls.kUrlPreorderCreate;
    //let orderId = "";
    //let totalPrice = 0 ;
    /*itemList.forEach((item)=>{
        orderId += (item.orderId + ",");
        totalPrice = totalPrice + item.price;
    })
    let data = {
        phoneId: phoneId,
        orderId:orderId,
        totalPrice:totalPrice,
        message:"支付"
    };*/

    return dispatch => {
        dispatch({type: types.kPreorderCreate});

        dispatch({type:types.kPreorderCreateReceived, status:true, message:"", phoneId:phoneId,cartItems:itemList});

        /*return Util.postNew(url, data,
            (data) => {
                let phoneId = '';
                let cartItems = [];
                let togetherId = '';
                if (data.status) {
                    cartItems = itemList;
                    phoneId = phoneId;
                    togetherId = data.togetherId;
                }
                dispatch({type:types.kPreorderCreateReceived, status:status, message:message,
                    togetherId:togetherId,phoneId:phoneId,cartItems:cartItems});
            },
            (error) => {
                // console.log('Fetch banner list error: ' + error);
                dispatch({'type': types.kActionError});
            }
        );*/
    }
};

export let preorderIsTurnedToViewFromSync = () => {
    return (dispatch) => {
        dispatch({type:types.kPreorderIsTurnedToViewFromSync});
    }
};

export let preorderView = (cartItems,phoneId)=> {
    /*let url = urls.kUrlPreorderView + preorder_id;
    let data = {
        access_token: access_token
    };

    return dispatch => {
        dispatch({type: types.kPreorderView});
        return Util.post(url, data,
            (status, code, message, data, share) => {
                let preorder = {};
                let address = {};
                if (status) {
                    preorder = data.preorder;
                    address = data.address;
                }
                dispatch({type:types.kPreorderViewReceived, status:status, code:code, message:message, share:share,
                    preorder:preorder, address:address});
            },
            (error) => {
                // console.log('Fetch banner list error: ' + error);
                dispatch({'type': types.kActionError});
            }
        );
    }*/
    return dispatch => {
        dispatch({type: types.kPreorderView,cartItems:cartItems,phoneId:phoneId});
        dispatch({type:types.kPreorderViewReceived});
    }
};