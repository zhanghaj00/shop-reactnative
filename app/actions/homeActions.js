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

const COMMONLIMIT = 4;

export let bannerList = (page)=> {
    let url = urls.kUrlBannerList + '?server=56846a8a2fee49d14901d39cc48b8b2a&page=' + page + '&limit' + COMMONLIMIT;
    return dispatch => {
        // 请求轮播数据
        dispatch({type: types.kBannerList});
        return Util.get(url,
            (status, code, message, data, share) => {
                let banners = [];
                if (status) {
                    banners = data
                }
                dispatch({type:types.kBannerListReceived, status:status, code:code, message:message, share:share, banners:banners});
            },
            (error) => {
                // console.log('Fetch banner list error: ' + error);
                dispatch({'type': types.kActionError});
                alert('Android要用外网地址');
            }
        );
    }
};

export let homeListRecommend = (page, isLoadMore, isRefreshing, isLoading)=> {
    let url = urls.kUrlHomeListArticles + '?server=56846a8a2fee49d14901d39cc48b8b2a&page=' + page + '&limit' + COMMONLIMIT;
    return dispatch => {
        dispatch({
            type: types.kHomeListArticles,
            isLoadMore: isLoadMore,
            isRefreshing: isRefreshing,
            isLoading: isLoading,
        });

        return Util.get(url,
            (status, code, message, data, share) => {
                let recommendData = [];
                if (status) {
                    recommendData = data;
                }
                dispatch({type:types.kHomeListArticlesReceived, status:status, code:code, message:message, share:share, articles:recommendData});
            },
            (error) => {
                dispatch({'type': types.kActionError, 'isLoading':false});
            }
        );

        //模拟网络延迟
        // function fetching() {
        //     Util.get(URL, (response) => {
        //         dispatch(receiveFeedList(response.feeds));
        //     }, (error) => {
        //         dispatch(receiveFeedList([]));
        //     });
        // }
        // setTimeout(fetching, 3000);
    }
};