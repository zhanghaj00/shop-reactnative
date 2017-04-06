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
import UserDefaults from '../common/UserDefaults';
import Common from '../common/constants';
import * as urls from '../common/constants_url';
const LIMIT = 10;
// 请求热搜关键词
export let fetchKeywords = ()=> {

    let URL = urls.kUrlHost+'/hotSearch/getHotSearchs.do'+urls.kUrlCommonParam;

    return dispatch => {
        dispatch(fetchKeywordsList());

        fetch(URL)
            .then((response) => response.text())
            .then((responseText) => {
                let result = JSON.parse(responseText);
                UserDefaults.cachedObject(Common.storeKeys.SEARCH_HISTORY_KEY).
                then((historyKeywords)=> {
                    let history = historyKeywords ? historyKeywords : [];
                    dispatch(receiveKeywordsList(history,result.keywords));
                })
            })
            .catch((err) => {
                console.log('Fetch keywords error: ' + err);
                dispatch(receiveKeywordsList([], []));
            });
    }
}

let fetchKeywordsList = ()=> {
    return {
        type: types.FETCH_KEYWORDS_LIST,
    }
}

let receiveKeywordsList = (history, keywords)=> {
    return {
        type: types.RECEIVE_KEYWORDS_LIST,
        history: history,
        keywordsList: keywords,
    }
}

let checkParam = (param) =>{
    if( param == undefined || param=='null' || param==='undefined' || param === ''){
        return '';
    }else{
        return param;
    }
}

// 请求搜索结果
export let fetchSearchResults = (keyword, ...params)=> {

    // 请求参数:q、order_asc、page、order_by、health_mode(血糖)、health_light(推荐)、tags
    // http://food.boohee.com/fb/v1/search?page=1&order_asc=asc&q=&tags=&order_by=calory&health_mode=1

    const [page, order_by, order_asc, canLoadMore, isLoading,brandId,categoryId,foodTag] = params;

    let URL = urls.kUrlGoodList ;

    console.log(URL)

    let param = {
        page:checkParam(page),
        orderAsc:checkParam(order_asc),
        foodTag:checkParam(keyword),
        brandId:checkParam(brandId),
        categoryId:checkParam(categoryId),
        sortId:checkParam(order_by),
        limit:LIMIT,
        server:'56846a8a2fee49d14901d39cc48b8b2a'
    };
    return dispatch => {
        dispatch(fetchSearchResultList(isLoading, canLoadMore));

        Util.post(URL, param, (status, code, message, data, share) => {

            dispatch(receiveSearchResultList( data,keyword));

        }, (error) => {
            console.log('Fetch search result error: ' + error);
            dispatch(receiveSearchResultList([]))
        })
    }
}

let fetchSearchResultList = (isLoading, canLoadMore)=> {
    return {
        type: types.FETCH_SEARCH_RESULT_LIST,
        isLoading: isLoading,
        canLoadMore: canLoadMore
    }
}

let receiveSearchResultList = (foods,searchText)=> {
    return {
        type: types.RECEIVE_SEARCH_RESULT_LIST,
        searchResultList: foods,
        searchText:searchText,
        isLoading:false,
        canLoadMore:false
    }
}

export let selectKeyword = (keyword)=> {

    return dispatch => {
        dispatch(setupSearchText(keyword))

        // 已缓存的搜索记录
        UserDefaults.cachedObject(Common.storeKeys.SEARCH_HISTORY_KEY)
            .then((historyKeywords)=> {

                let history = historyKeywords ? historyKeywords : [];

                // 缓存中已有该搜索记录
                if (history.indexOf(keyword) != -1) return;

                history.push(keyword);

                UserDefaults.setObject(Common.storeKeys.SEARCH_HISTORY_KEY, history);

                dispatch(cacheHistory(history))
            });
    }
}

export let resetState = ()=> {
    return {
        type: types.RESET_SEARCH_STATE,
    }
}

export let setupSearchText = (text)=> {
    return {
        type: types.SETUP_SEARCH_TEXT,
        searchText: text,
    }
}

// 添加搜索记录
let cacheHistory = (history)=> {
    return {
        type: types.CACHE_HISTORY,
        history: history,
    }
}

// 清除搜索历史
export let clearHistory = ()=> {
    UserDefaults.clearCachedObject(Common.storeKeys.SEARCH_HISTORY_KEY);

    return {
        type: types.CLEAR_HISTORY,
    }
}

export let changeSortViewStatus = ()=> {
    return {
        type: types.CHANGE_SORT_VIEW_STATUS_SEARCH,
    }
}

export let changeOrderAscStatus = ()=> {
    return {
        type: types.ORDER_ASC_OR_DESC_SEARCH,
    }
}

export let changeHealthLight = ()=> {
    return {
        type: types.CHANGE_HEALTH_LIGHT_SEARCH,
    }
}

export let selectSortType = (type)=> {
    return {
        type: types.SELECT_SORT_TYPE_SEARCH,
        currentSortType: type
    }
}

export let selectFoodTag = (tag)=> {
    return {
        type: types.SELECT_FOOD_TAG,
        currentTag: tag,
    }
}


const sortType = '{"code":"1","name":"综合","index":"1"},{"code":"2","name":"销量","index":"2"},{"code":"3","name":"热度","index":"3"}';
export let fetchSortTypes = ()=> {
    let URL = 'http://food.boohee.com/fb/v1/foods/sort_types';

    return dispatch => {
        dispatch(fetchSortTypesList());

        Util.get(URL, (response) => {
            dispatch(receiveSortTypesList(sortType));
        }, (error) => {
            console.log('Fetch sort types error: ' + error);
            dispatch(receiveSortTypesList([]))
        })
    }
}

let fetchSortTypesList = ()=> {
    return {
        type: types.FETCH_SORT_TYPES_LIST_SEARCH,
    }
}

let receiveSortTypesList = (sortTypes)=> {

    if (sortTypes.length > 0) {
        sortTypes.splice(0, 0, {name: '常见'})
    }

    return {
        type: types.RECEIVE_SORT_TYPES_LIST_SEARCH,
        sortTypesList: sortTypes,
    }
}

export let selectCompareFood = (food, position)=> {
    // 选择对比食物,请求食物营养元素信息
    let URL = 'http://food.boohee.com/fb/v1/foods/' + food.code + '/brief?';

    return dispatch => {
        dispatch(selectFood(food, position));
        dispatch(fetchBrief())

        Util.get(URL, response => {
            dispatch(receiveBrief(response, position))
        }, error => {
            console.log('Fetch food brief error: ' + error);
            dispatch(receiveBrief({}))
        })
    }
}

let fetchBrief = ()=> {
    return { type: types.FETCH_FOOD_BRIEF }
}

let receiveBrief = (brief, position)=> {
    return {
        type: types.RECEIVE_FOOD_BRIEF,
        brief: brief,
        position: position
    }
}

let selectFood = (food, position)=> {

    if (position === 'Left') {
        return {
            type: types.SELECT_COMPARE_FOOD,
            leftFood: food
        }
    }
    return {
        type: types.SELECT_COMPARE_FOOD,
        rightFood: food
    }
}