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
export let fetchCategories = ()=>{
    //let URL = 'http://food.boohee.com/fb/v1/categories/list';
    let URL = urls.kUrlCategoryList + urls.kUrlCommonParam;

    return dispatch => {
        dispatch(fetchCategoryList());

        Util.get(URL, (status, code, message, data, share) => {
            dispatch(receiveCategoryList(data));
        }, (error) => {
            console.log('Fetch category list error: ' + error);
            dispatch(receiveCategoryList([])); 
        });
    }
}

let fetchCategoryList = ()=> {
    return {
        type: types.FETCH_CATEGORY_LIST,
    }
}

let receiveCategoryList = (categoryList)=> {
    return {
        type: types.RECEIVE_CATEGORY_LIST,
        categoryList: categoryList,
    }
}