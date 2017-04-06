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
 * 服务器地址
 * @type {string}
 */

//const kUrlHost = 'http://local.eleteamapi.ygcr8.com/v1'; //本地服务器
//const kUrlHost = 'http://eleteamapi.ygcr8.com/v1';    //在线服务器
export const kUrlHost = 'http://admin.jinyujia.tokyo';    //在线服务器
//export const kUrlHost = 'http://192.168.1.10:8080';    //在线服务器

//统一server参数
export const kUrlCommonParam              = '?server=56846a8a2fee49d14901d39cc48b8b2a';
//产品和分类
export const kUrlCategoryListWithProduct    = kUrlHost + '/category/list-with-product';
export const kUrlProductView                = kUrlHost + '/product/view?id=';

//首页
export const kUrlBannerList                 = kUrlHost + '/news/getMainImage.do';
export const kUrlHomeListArticles           = kUrlHost + '/service/getHomeFood.do';

//文章
export const kUrlArticleView                = kUrlHost + '/cms-article/view?id=';

//购物车
export const kUrlCart                       = kUrlHost + '/cart';
export const kUrlCartAdd                    = kUrlHost + '/cart/add';

//用户
export const kUrlUserRegister               = kUrlHost + '/user/register';
export const kUrlUserLogin                  = kUrlHost + '/user/toLogin.do';
export const kUrlUserLogout                 = kUrlHost + '/user/logout';

//预订单
export const kUrlPreorderCreate             = kUrlHost + '/preorder/create';
export const kUrlPreorderView               = kUrlHost + '/preorder/view?id=';

//订单
export const kUrlOrderCreate                = kUrlHost + '/order/create';
export const kUrlOrderView                  = kUrlHost + '/order/view?id=';
export const kUrlOrderIndex                 = kUrlHost + '/order/index';

//地址
export const kUrlAddressList                = kUrlHost + '/address/index';
export const kUrlAddressCreate              = kUrlHost + '/address/create';
export const kUrlAddressDelete              = kUrlHost + '/address/delete';


//分类
export const kUrlCategoryList              = kUrlHost + '/service/combineCatalogAndBrand.do';

//列表
export const kUrlGoodList              = kUrlHost + '/service/selectFoods.do';