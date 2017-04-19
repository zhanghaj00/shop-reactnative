/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-08-13
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

'use strict';

/**
 * action 类型
 */

//公用类型
export const kActionError                       = 'kActionError';
export const kCommonIsToasting                  = 'kCommonIsToasting';

//首页
export const kBannerList                        = 'kBannerList';
export const kBannerListReceived                = 'kBannerListReceived';
export const kHomeListArticles                  = 'kHomeListArticles';
export const kHomeListArticlesReceived          = 'kHomeListArticlesReceived';

// 用户
export const kUserFromSync                      = 'kUserFromSync'; //同步加载用户数据, 一般从缓存加载
export const kUserRegister                      = 'kUserRegister';
export const kUserRegisterReceived              = 'kUserRegisterReceived';
export const kUserView                          = 'kUserView';
export const kUserLogin                         = 'kUserLogin';
export const kUserLoginReceived                 = 'kUserLoginReceived';
export const kUserLogout                        = 'kUserLogout';
export const kUserLogoutReceived                = 'kUserLogoutReceived';

//商品、商品目录
export const kCategoryListWithProduct           = 'kCategoryListWithProduct';
export const kCategoryListWithProductReceived   = 'kCategoryListWithProductReceived';
export const kProductView                       = 'kProductView';
export const kProductViewReceived               = 'kProductViewReceived';

//文章
export const kArticleView                       = 'kArticleView';
export const kArticleViewReceived               = 'kArticleViewReceived';

//详情
export const FOOD_INFO_RECEIVE_FOOD             = 'foodInfoReceiveFood';
export const FOOD_INFO_FETCH_FOOD               = 'foodInfoFetchFood';
export const FOOD_INFO_CHANGE_SHOW_UNITS_STATUS = 'foodInfoChangeShowUnitsStatus';

//购物车
export const kAppCartCookieIdFromSync           = 'kAppCartCookieIdFromSync'; //同步加载数据, 一般从缓存加载
export const kCartNumFromSync                   = 'kCartNumFromSync'; //同步加载数据, 一般从商品详情页
export const kCartView                          = 'kCartView';
export const kCartViewReceived                  = 'kCartViewReceived';
export const kCartAdd                           = 'kCartAdd';
export const kCartAddReceived                   = 'kCartAddReceived';

//预订单
export const kPreorderCreate                    = 'kPreorderCreate';
export const kPreorderCreateReceived            = 'kPreorderCreateReceived';
export const kPreorderIsTurnedToViewFromSync    = 'kPreorderIsTurnedToViewFromSync';
export const kPreorderView                      = 'kPreorderView';
export const kPreorderViewReceived              = 'kPreorderViewReceived';

//订单
export const kOrderCreate                       = 'kOrderCreate';
export const kOrderCreateReceived               = 'kOrderCreateReceived';
export const kOrderIsTurnedToViewFromSync       = 'kOrderIsTurnedToViewFromSync';
export const kOrderView                         = 'kOrderView';
export const kOrderViewReceived                 = 'kOrderViewReceived';
export const kOrderIndex                        = 'kOrderIndex';
export const kOrderIndexReceived                = 'kOrderIndexReceived';

//地址
export const kAddressIsToasting                 = 'kAddressIsToasting';
export const kAddressList                       = 'kAddressList';
export const kAddressListReceived               = 'kAddressListReceived';
export const kAddressCreate                     = 'kAddressCreate';
export const kAddressCreateReceived             = 'kAddressCreateReceived';
export const kAddressDelete                     = 'kAddressDelete';
export const kAddressDeleteReceived             = 'kAddressDeleteReceived';


export const FETCH_CATEGORY_LIST                = 'fetchCateGoryList';
export const RECEIVE_CATEGORY_LIST              = 'receiveCategoryList';


//搜索
export const FETCH_KEYWORDS_LIST                ='FETCH_KEYWORDS_LIST';
export const RECEIVE_KEYWORDS_LIST              ='RECEIVE_KEYWORDS_LIST';
export const FETCH_SEARCH_RESULT_LIST           ='FETCH_SEARCH_RESULT_LIST';
export const RECEIVE_SEARCH_RESULT_LIST         ='RECEIVE_SEARCH_RESULT_LIST';
export const RESET_SEARCH_STATE                 ='RESET_SEARCH_STATE';
export const SETUP_SEARCH_TEXT                  ='SETUP_SEARCH_TEXT';
export const CACHE_HISTORY                      ='CACHE_HISTORY';
export const CLEAR_HISTORY                      ='CLEAR_HISTORY';
export const CHANGE_SORT_VIEW_STATUS_SEARCH     ='CHANGE_SORT_VIEW_STATUS_SEARCH';
export const ORDER_ASC_OR_DESC_SEARCH           ='ORDER_ASC_OR_DESC_SEARCH';
export const CHANGE_HEALTH_LIGHT_SEARCH         ='CHANGE_HEALTH_LIGHT_SEARCH';
export const SELECT_SORT_TYPE_SEARCH            ='SELECT_SORT_TYPE_SEARCH';
export const SELECT_FOOD_TAG                    ='SELECT_FOOD_TAG';
export const FETCH_SORT_TYPES_LIST_SEARCH       ='FETCH_SORT_TYPES_LIST_SEARCH';
export const RECEIVE_SORT_TYPES_LIST_SEARCH     ='RECEIVE_SORT_TYPES_LIST_SEARCH';
export const FETCH_FOOD_BRIEF                   ='FETCH_FOOD_BRIEF';
export const RECEIVE_FOOD_BRIEF                 ='RECEIVE_FOOD_BRIEF';
export const SELECT_COMPARE_FOOD                ='SELECT_COMPARE_FOOD';