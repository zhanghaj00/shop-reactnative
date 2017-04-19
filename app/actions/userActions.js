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
 * action 创建函数 - 用户模块
 */

'user strict';

import * as types from './actionTypes';
import {cartView} from './cartActions';
import Util from '../common/utils';
import * as urls from '../common/constants_url';
import * as Storage from '../common/Storage';
import { Alert } from 'react-native';

export let userFromSync = (user) => {
    return (dispatch) => {
        dispatch({type: types.kUserFromSync, user: user});
    }
};

export let userRegister = (mobile, password, code) => {
    let url = urls.kUrlUserRegister;
    let data = {
        phone: mobile,
        password: password,
        nickname:mobile,
        server:'56846a8a2fee49d14901d39cc48b8b2a'
    };
    return (dispatch) => {
        dispatch({type: types.kUserRegister});
        Util.postNew(url, data,
            (data) => {
                let user = {};
                let phoneId = '';
                if (data.status) {
                    phoneId = mobile;
                    Storage.setAppCartCookieId(phoneId);
                    Storage.setUser(data.user);
                }
                dispatch({type:types.kUserRegisterReceived, status:data.status, message:data.message, user:data.user, phoneId:phoneId});
                dispatch(cartView(phoneId, user.access_token));
            },
            (error) => {
                dispatch({'type': types.kActionError});
            });
    }
};

export let userView = () => {
    let url = 'http://local.eleteamapi.ygcr8.com/v1/user/view?id=2';
    return (dispatch) => {
        dispatch({'type':types.kUserView});
        Util.get(url,
            () => {},
            () => {});
    }
};

export let userLogin = (mobile, password) => {
    let url = urls.kUrlUserLogin;
    let data = {
        phone: mobile,
        password: password,
        server:'56846a8a2fee49d14901d39cc48b8b2a'
    };
    return (dispatch) => {
        dispatch({'type': types.kUserLogin});
        Util.postNew(url,data,
            (data) => {
                let phoneId = '';
                let user = {};
                if (data.status) {
                    user = data.user;
                    phoneId = mobile;
                    Storage.setAppCartCookieId(phoneId);
                    Storage.setUser(user);
                }
                dispatch({type:types.kUserLoginReceived, status:data.status, message:data.message,  user:user, phoneId:phoneId});
                dispatch(cartView(phoneId));
            },
            (error) => {
                Alert.alert(error.message);
                dispatch({'type': types.kActionError});
            });
    }
};

export let userLogout = () => {
    let url = urls.kUrlUserLogout;
    return (dispatch) => {
        dispatch({'type': types.kUserLogout});
        Util.get(url,
            (status, code, message, data, share) => {
                let phoneId = '';
                if (status) {
                    phoneId = data.phoneId;
                    Storage.setAppCartCookieId(phoneId);
                    Storage.setUser({});
                }
                dispatch({type:types.kUserLogoutReceived, status:status, code:code, message:message, share:share, phoneId:phoneId, user:{}});
                dispatch(cartView(phoneId, ''));
            },
            (error) => {
                Alert.alert(error.message);
                dispatch({'type': types.kActionError});
            });
    }
};
