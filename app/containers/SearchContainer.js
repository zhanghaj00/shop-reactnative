/**
 * Created by ljunb on 16/6/5.
 */
import React from 'react';
import {connect} from 'react-redux';
import Search from '../pages/Search';
//import NewSearch from '../pages/NewSearch';

class SearchContainer extends React.Component {
    render() {
        return (
            <Search {...this.props} />
        )
    }
}

export default connect((state) => {
    const {searchReducer} = state;
    return {
        searchReducer
    }
})(SearchContainer);