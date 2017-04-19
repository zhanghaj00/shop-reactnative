/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-08-13
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

/**
 * redux actions - 用户模块
 */

'user strict';

import * as types from './actionTypes';
import {cartNumFromSync} from '../actions/cartActions';
import * as urls from '../common/constants_url';
import Util from '../common/utils';
import { Alert } from 'react-native';

/**
 *
 * @param isLoading
 * @returns {function(*)}
 */
export let categoryListWithProduct = (isLoading) => {
    let url = urls.kUrlCategoryListWithProduct;
    return (dispatch) => {
        dispatch({'type': types.kCategoryListWithProduct, 'isLoading':isLoading});
        Util.get(url,
            (status, code, message, data, share) => {
                let categories = [];
                if (status) {
                    categories = data.categories;
                }
                dispatch({type:types.kCategoryListWithProductReceived, status:status, code:code, message:message, share:share, categories:categories});
            },
            (error) => {
                // Alert.alert(error.message);
                dispatch({'type': types.kActionError, 'isLoading':false});
            });
    }
};

/**
 *
 * @param isLoading
 * @returns {function(*)}
 */
export let productView = (product_id, phoneId) => {
    let URL = urls.kUrlGoodInfo + urls.kUrlCommonParam + "&foodId=" + product_id;
    return (dispatch) => {
        dispatch({'type': types.kProductView, 'isLoading':true});
        fetch(URL)
            .then((response) => response.text())
            .then((responseText) => {
                let result = JSON.parse(responseText);
                dispatch({type:types.kProductViewReceived, product:result.food});
                //dispatch(cartNumFromSync(cart_num));
            })
            .catch((err) => {
                dispatch({'type': types.kActionError, 'isLoading':false, 'error':error});
            });
    }
};
