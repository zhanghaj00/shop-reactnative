/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-08-13
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    ListView,
    ScrollView,
    Animated,
    TouchableOpacity,
    InteractionManager
} from 'react-native';

import {
    fetchKeywords,
    selectKeyword,
    resetState,
    setupSearchText,
    clearHistory,
    fetchSearchResults,
    changeSortViewStatus,
    changeOrderAscStatus,
    changeHealthLight,
    selectSortType,
    selectFoodTag,
    fetchSortTypes,
    selectCompareFood,
} from '../actions/searchActions';

import Common from '../common/constants';
import SearchInputBar from '../components/SearchInputBar';
import Loading from '../components/Loading';
import LoadMoreFooter from '../components/LoadMoreFooter';
import ProductContainer from '../containers/ProductContainer';
let page = 1;
let canLoadMore = false;
let isLoading = true;

export default class Search extends React.Component {

    constructor(props) {
        super(props);

        this.renderRow = this.renderRow.bind(this);
        this.renderResultRow = this.renderResultRow.bind(this);

        this.state = {
            dataSource: new ListView.DataSource({
                getRowData: (data, sectionID, rowID) => {
                    if (rowID === 'clear') return '清空历史记录';
                    return data[sectionID][rowID];
                },
                getSectionHeaderData: (data, sectionID) => {
                    return sectionID === 'history' ? '最近搜过' : '大家都在搜';
                },
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
            }),

            resultDataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),

            // 排序视图Y值
            sortTypeViewY: new Animated.Value(0),
            // 排序三角角度
            angleRotation: new Animated.Value(0),
            // 遮盖层透明度
            coverViewOpacity: new Animated.Value(0),
        }
    }

    componentDidMount() {
        const {dispatch} = this.props;
        InteractionManager.runAfterInteractions(()=> {
            dispatch(fetchKeywords());
            dispatch(fetchSortTypes());
        })
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(resetState());
    }

    render() {

        const {searchReducer, dispatch} = this.props;

        // 将数据进行分组
        let sectionIDs = [];
        let rowIdentifiers = [];
        let sourceData = null;

        if (searchReducer.history && searchReducer.history.length) {
            sectionIDs.push('history');

            let rowID = [];
            for (let i = 0; i < searchReducer.history.length; i++) {
                rowID.push(i);
            }

            rowID.push('clear');
            rowIdentifiers.push(rowID);
        }

        if (searchReducer.keywordsList && searchReducer.keywordsList.length) {
            sectionIDs.push('keywordsList');
            rowIdentifiers.push([0]);
        }

        if (searchReducer.history && searchReducer.history.length) {
            sourceData = {'history': searchReducer.history, 'keywordsList': [searchReducer.keywordsList]};
        } else {
            sourceData = {'keywordsList': [searchReducer.keywordsList]};
        }
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <SearchInputBar
                    backAction={()=>this.props.navigator.pop()}
                    searchAction={this.handleSearchText.bind(this, searchReducer.searchText)}
                    value={searchReducer.searchText}
                    onChangeText={(text)=>{
                        dispatch(setupSearchText(text))
                    }}
                />
                <View style={{position: 'absolute', top: 44, height: Common.window.height-44-20}}>
                    {searchReducer.searchText ?
                        this.renderResultView() :
                        <ListView
                            dataSource={this.state.dataSource.cloneWithRowsAndSections(sourceData, sectionIDs, rowIdentifiers)}
                            renderRow={this.renderRow.bind(this)}
                            renderSectionHeader={this.renderSectionHeader.bind(this)}
                            enableEmptySections={true}
                            bounces={false}
                            style={{height: Common.window.height-64, width: Common.window.width}}
                        />
                    }
                </View>

            </View>
        )
    }

    renderRow(keywords, sectionID, rowID) {

        const {dispatch} = this.props;

        if (sectionID == 'history') {
            if (rowID == 'clear') {
                return (
                    <TouchableOpacity
                        style={styles.clearHistoryRow}
                        onPress={()=>dispatch(clearHistory())}
                    >
                        <Image source={{uri: 'ic_trash'}} style={{height: 20, width: 20, marginRight: 10}}/>
                        <Text style={{color: 'gray'}}>{keywords}</Text>
                    </TouchableOpacity>
                )
            }

            // 搜索历史记录
            return (
                <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    activeOpacity={0.75}
                    onPress={this.handleSearchText.bind(this, keywords)}
                >
                    <Image source={{uri: 'ic_search_history'}} style={styles.historyIcon}/>
                    <View style={styles.historyTitle}>
                        <Text>{keywords}</Text>
                    </View>
                </TouchableOpacity>
            )
        }

        return (
            <View style={styles.keywordsContainer}>
                {
                    keywords.map((keyword, i) => {
                        let keywordStyle = [styles.keyword]
                        let left = i % 2 === 0 ? 0 : Common.window.width / 2;
                        let top = Math.floor(i / 2) * 44;
                        keywordStyle.push({
                            position: 'absolute',
                            left: left,
                            top: top
                        });
                        return (
                            <TouchableOpacity
                                key={i}
                                style={keywordStyle}
                                activeOpacity={0.75}
                                onPress={this.handleSearchText.bind(this, keyword)}
                            >
                                <Text>{keyword}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }

    handleSearchText(keyword) {

        if (!keyword || !keyword.trim().length) {
            alert('输入不能为空!');
            return;
        }

        const {dispatch} = this.props;
        dispatch(selectKeyword(keyword));
        this.fetchData(keyword, page, canLoadMore, isLoading);
    }

    renderSectionHeader(sectionHeader) {
        return (
            <View style={styles.sectionHeader}>
                <Text style={{fontSize: 13, color: 'gray'}}>{sectionHeader}</Text>
            </View>
        )
    }

    renderResultView() {
        const {searchReducer, dispatch} = this.props;
        let topPosition =  40 ;

        return (
            <View style={{flex:1,backgroundColor: 'white'}}>
                {this.renderSortTypeCell()}
                {searchReducer.isLoading ? <Loading /> :
                    <ListView
                        dataSource={this.state.resultDataSource.cloneWithRows(searchReducer.searchResultList)}
                        renderRow={this.renderResultRow.bind(this)}
                        enableEmptySections={true}
                        onScroll={this.onScroll()}
                        onEndReached={this.onEndReach.bind(this)}
                        onEndReachedThreshold={10}
                        renderFooter={this.renderFooter.bind(this)}
                        style={{
                      position: 'absolute',
                      width: Common.window.width,
                      paddingTop:20
                    }}
                    />}
            </View>
        )
    }

    onScroll() {
        if (!canLoadMore) canLoadMore = true;
    }

    // 上拉加载
    onEndReach() {
        const {searchReducer} = this.props;
        if (canLoadMore) {
            page++;
            isLoading = false;
            this.fetchData(searchReducer.searchText, page, canLoadMore, isLoading);
            canLoadMore = false;
        }
    }

    renderFooter() {
        const {searchReducer} = this.props;
        if (searchReducer.canLoadMore) {
            return <LoadMoreFooter />
        }
    }

    renderResultRow(food) {

        let { dispatch } = this.props;

        let foodNameStyle = {width: Common.window.width - 100} ;

        return (
            <TouchableOpacity
                style={styles.foodsCell}
                activeOpacity={0.75}
                onPress={()=>{
                        this.props.navigator.push({
                            name: 'ProductContainer',
                            component: ProductContainer,
                            passProps: {
                                food: food
                            }
                        })
                }}
            >
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.foodIcon}><Image style={styles.foodIcon}source={{uri: food.imgUrl}}/></View>
                    <View style={styles.titleContainer}>
                        <Text style={foodNameStyle} numberOfLines={1}>{food.name}</Text>
                        <Text style={styles.calory}>
                            <Text style={styles.unit}> 价格：{food.price}￥</Text>
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    renderSortTypeCell() {

        const {searchReducer, dispatch} = this.props;
        let sortTypeName = searchReducer.currentSortType ? searchReducer.currentSortType.name : '价格';

        // 升降序/是否推荐
        let orderByName;
        if (searchReducer.currentSortType && searchReducer.currentSortType.name !== '常见') {
            orderByName = searchReducer.orderByAsc ? '由低到高' : '由高到低';
        } else {
            orderByName = '由低到高';
        }
       // let orderByAscIconSource= searchReducer.orderByAsc ? {uri: 'ic_food_ordering_up'} : {uri: 'ic_food_ordering_down'};
        let orderByAscIconSource=  searchReducer.orderByAsc ? {uri: require('../images/ic_up.png')}: {uri: require('../images/ic_down.png')};
        let healthIconName = 'check-square' ;

        let orderStyle = searchReducer.orderByAsc ? {width: 13, height: 13,marginTop:5,marginLeft:5}:{width: 13, height: 13,marginLeft:5}

        return (
            <View style={styles.sortTypeCell}>
                <TouchableOpacity
                    style={{flex:1,flexDirection: 'row',justifyContent: 'center',}}
                    activeOpacity={0.75}
                    onPress={()=>{this.handleSortTypesViewAnimation();}}
                >
                    <Text>综合</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{flex:1,flexDirection: 'row',justifyContent: 'center',}}
                    activeOpacity={0.75}
                    onPress={()=>{this.handleSortTypesViewAnimation();}}
                >
                    <Text>价格</Text>
                    <Image style={{width: 16, height: 16}} source={require('../images/ic_down.png')}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{flex:1,flexDirection: 'row',justifyContent: 'center',}}
                    activeOpacity={0.75}
                    onPress={()=>{this.handleSortTypesViewAnimation();}}
                >
                    <Text>销量</Text>
                    <Image style={{width: 16, height: 16}} source={require('../images/ic_down.png')}/>
                </TouchableOpacity>
            </View>
        )
    }

    // 排序View动画
    handleSortTypesViewAnimation() {
        const {searchReducer, dispatch} = this.props;
        Animated.sequence([
            Animated.parallel([

                Animated.timing(this.state.sortTypeViewY, {
                    toValue: searchReducer.showSortTypeView ? 0 : 1,
                    duration: 500,
                }),
                Animated.timing(this.state.angleRotation, {
                    toValue: searchReducer.showSortTypeView ? 0 : 1,
                    duration: 500,
                })
            ]),
            Animated.timing(this.state.coverViewOpacity, {
                toValue: searchReducer.showSortTypeView ? 0 : 1,
                duration: 100,
            })
        ]).start();
        // 改变排序视图状态
        dispatch(changeSortViewStatus());
    }

    // const [page, order_by, order_asc, tags, health_light, isLoadMore, isLoading, health_mode] = params;
    fetchData(keyword, page, canLoadMore, isLoading) {
        const {dispatch, searchReducer} = this.props;
        //  这两个参数默认不添加,设置null用于判断
        //let order_by = searchReducer.currentSortType ? searchReducer.currentSortType.code : null;
        let order_by = 1;
        let order_asc ='asc';
        dispatch(fetchSearchResults(keyword, page, order_by, order_asc, canLoadMore, isLoading))
    }
}

const styles = StyleSheet.create({
    historyTitle: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        width: Common.window.width - 15 - 10 - 16,
        marginLeft: 10,
        paddingTop: 15,
        paddingBottom: 15
    },

    historyIcon: {
        height: 16,
        width: 16,
        marginLeft: 15
    },

    clearHistoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
    },

    keywordsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    keyword: {
        width: Common.window.width / 2,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        padding: 15,
    },

    sectionHeader: {
        height: 44,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        paddingTop: 20,
        paddingLeft: 15,
        backgroundColor: 'rgb(245, 246, 247)'
    },

    tag: {
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#ccc',
        textAlign: 'center',
        padding: 6,
        marginLeft: 10,
    },

    sortTypeCell: {
        flexDirection: 'row',
        height: 50,
        width: Common.window.width,
        borderColor: '#ccc',
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },


    foodsCell: {
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    foodIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },

    titleContainer: {
        height: 40,
        marginLeft: 15,
        justifyContent: 'space-between',
    },

    calory: {
        fontSize: 13,
        color: 'red',
    },

    unit: {
        fontSize: 13,
        color: 'black'
    },

    healthLight: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'green',
        marginRight: 0,
    },

    sortType: {
        justifyContent: 'center',
        alignItems: 'center',
        width: (Common.window.width - 4 * 10) / 3,
        height: 30,
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 5,
        marginLeft: 10,
        marginBottom: 10,
    },

    sortTypesView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'absolute',
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        width: Common.window.width,
        paddingTop: 10,
    },

    subcategoryContainer: {
        position: 'absolute',
        top: 30,
        right: 10,
        width: 150,
        backgroundColor: 'white',
        shadowColor: 'gray',
        shadowOffset: {x: 1.5, y: 1},
        shadowOpacity: 0.5,
    },

    subcategory: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        height: 40,
        justifyContent: 'center',
        padding: 15,
    },

    addCompare: {
        borderWidth: 0.5,
        borderColor: 'red',
        padding: 5,
        paddingLeft: 0,
    }
})
