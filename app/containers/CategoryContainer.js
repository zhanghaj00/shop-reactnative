/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-08-13
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
//import CategoryPage from '../pages/CategoryPage';
import Foods from '../pages/Foods';

class CategoryContainer extends Component {
    render() {
        return (
            <Foods {...this.props} />
        )
    }
}

export default connect((state) => {
    const { foodsReducer } = state;
    return {
        foodsReducer
    }
})(CategoryContainer);