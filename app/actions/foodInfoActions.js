/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-08-13
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import * as types from './actionTypes';
import Util from '../common/utils';

import * as urls from '../common/constants_url';

export let fetchFoodInfo = (foodCode)=> {

    let URL = urls.kUrlGoodInfo + urls.kUrlCommonParam + "&foodId=" + foodCode;

    return dispatch => {
        dispatch(fetchFood());
        fetch(URL)
            .then((response) => response.text())
            .then((responseText) => {
                let result = JSON.parse(responseText);
                dispatch(receiveFood(result.food));
            })
            .catch((err) => {
                dispatch(receiveFood({}))
            });

    }
}

let fetchFood = ()=> {
    return { type: types.FOOD_INFO_FETCH_FOOD }
}

let receiveFood = (food)=> {
    return {
        type: types.FOOD_INFO_RECEIVE_FOOD,
        food: food
    }
}

export let changeUnitsStatus = ()=> {
    return { type: types.FOOD_INFO_CHANGE_SHOW_UNITS_STATUS }
}