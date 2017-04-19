/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-09-27
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import * as types from './actionTypes';
import Util from '../common/utils';
import * as urls from '../common/constants_url';
import {commonIsToasting} from './commonActions';
import {alipay} from '../actions/aliPayAction';

/**
 * 订单actions
 */

export let orderCreate = (cartItems, address, phoneId)=> {
    let url = urls.kUrlOrderCreate;
    let orderId = "";
    let totalPrice = 0 ;
    cartItems.forEach((item)=>{
     orderId += (item.orderId + ",");
     totalPrice = totalPrice + item.price;
     })
     let data = {
         phoneId: phoneId,
         orderId:orderId,
         totalPrice:totalPrice,
         message:"支付",
         rank:"1",
         server:urls.kUrlCommonParamStr
     };

    return dispatch => {
        dispatch({type: types.kOrderCreate});
        return Util.postNew(url, data,
            (data) => {
                let togetherId = '';
                if (data.status) {
                    togetherId = data.togetherId;
                }else{
                    dispatch(commonIsToasting(true));
                }

                //得到簽名  然後調用支付寶
                console.log("pay")
                alipay(data.singStr);



                dispatch({type:types.kOrderCreateReceived, status:data.status,  message:data.message,
                    order:data.togetherId});
                dispatch(commonIsToasting(false));


            },
            (error) => {
                // console.log('Fetch banner list error: ' + error);
                dispatch({'type': types.kActionError});
            }
        );
    }
};

export let orderView = (order_id, access_token)=> {
    let url = urls.kUrlOrderView + order_id;
    let data = {
        access_token: access_token
    };

    return dispatch => {
        dispatch({type: types.kOrderView});
        return Util.post(url, data,
            (status, code, message, data, share) => {
                let order = {};
                let address = {};
                if (status) {
                    order = data.order;
                    address = data.address;
                }
                dispatch({type:types.kOrderViewReceived, status:status, code:code, message:message, share:share,
                    order:order, address:address});
            },
            (error) => {
                // console.log('Fetch banner list error: ' + error);
                dispatch({'type': types.kActionError});
            }
        );
    }
};