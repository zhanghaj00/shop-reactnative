/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-09-16
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

'use strict';

import {AsyncStorage} from 'react-native';

const kStorageUser = 'kStorageUser';
const kStorageAppCartCookieId = 'kStorageAppCartCookieId';

export const getUser = () => {
    return AsyncStorage.getItem(kStorageUser)
        .then((user) => {
            if (user) {
                return JSON.parse(user);
            } else {
                return {};
            }
        })
        .catch(error => {
            // console.log(error);
        });
};

export const setUser = (user) => {
    AsyncStorage.setItem(kStorageUser, JSON.stringify(user));
};

export const getAppCartCookieId = () => {
    return AsyncStorage.getItem(kStorageAppCartCookieId)
        .then((phoneId) => {
            if (phoneId) {
                return phoneId;
            } else {
                return '';
            }
        })
        .catch(error => {
            // console.log(error);
        });
};

export const setAppCartCookieId = (phoneId) => {
    AsyncStorage.setItem(kStorageAppCartCookieId, phoneId);
};
