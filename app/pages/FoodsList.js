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
    Image,
    ListView,
    TouchableOpacity,
    InteractionManager,
    Animated,
} from 'react-native';

import {
    fetchFoods,
    fetchSortTypes,
    selectSortType,
    resetState,
    changeSortViewStatus,
    changeOrderAscStatus,
    changeSubcategoryViewStatus,
    selectSubcategory,
} from '../actions/foodsListActions';

import Header from '../components/Header';
import Loading from '../components/Loading';
import LoadMoreFooter from '../components/LoadMoreFooter';
import Common from '../common/constants';
import FoodInfoContainer from '../containers/FoodInfoContainer';

let page = 1;
let order_by = 1;
let order_asc = 'asc'
let canLoadMore = false;
let isLoading = true;

export default class FoodsList extends React.Component {

    constructor(props) {
        super(props);
        
        this.renderRow = this.renderRow.bind(this);

        this.state = {
            dataSource: new ListView.DataSource({
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
        InteractionManager.runAfterInteractions(() => {
            const {dispatch, brand, category,params,canLoadMore,isLoading} = this.props;
            dispatch(fetchFoods(params,brand, category, order_by, 1, order_asc, canLoadMore, isLoading));
            //dispatch(fetchSortTypes())
        })
    }

    componentWillUnmount() {
        // 退出时重置foodsListReducer状态
        const {dispatch} = this.props;
        dispatch(resetState())
    }
    
    // 排序View动画
    handleSortTypesViewAnimation() {
        const {FoodsList, dispatch} = this.props;
        Animated.sequence([
            // 1)营养素frameY、箭头角度
            Animated.parallel([
                Animated.timing(this.state.sortTypeViewY, {
                    toValue: FoodsList.showSortTypeView ? 0 : 1,
                    duration: 500,
                }),
                Animated.timing(this.state.angleRotation, {
                    toValue: FoodsList.showSortTypeView ? 0 : 1,
                    duration: 500,
                })
            ]),
            // 2)遮盖层透明度
            Animated.timing(this.state.coverViewOpacity, {
                toValue: FoodsList.showSortTypeView ? 0 : 1,
                duration: 100,
            })
        ]).start();
        // 改变排序视图状态
        dispatch(changeSortViewStatus());
    }

    // 遮盖层
    renderCoverView() {
        return (
            <TouchableOpacity
                style={{position: 'absolute',top: 84}}
                activeOpacity={1}
                onPress={()=>this.handleSortTypesViewAnimation()}
            >
                <Animated.View
                    style={{
                        width: Common.window.width,
                        height: Common.window.height - 84,
                        backgroundColor: 'rgba(131, 131, 131, 0.3)',
                        opacity: this.state.coverViewOpacity,
                    }}
                />
            </TouchableOpacity>
        )
    }

    // 所有营养素View
    renderSortTypesView() {
        const {FoodsList, dispatch} = this.props;
        // 这里写死了8行数据
        let height = 8 * (30 + 10) + 10;

        let typesStyle = [styles.sortTypesView];
        typesStyle.push({
            top: this.state.sortTypeViewY.interpolate({
                inputRange: [0, 1],
                outputRange: [84 - height, 84]
            })
        })

        return (
            <Animated.View style={typesStyle}>
                {FoodsList.sortTypesList.map((type, i) => {
                    let sortTypeStyle = [styles.sortType];
                    let titleStyle = [];
                    if (FoodsList.currentSortType) {
                        if (FoodsList.currentSortType.index == type.index) {
                            sortTypeStyle.push({
                                borderColor: 'red'
                            });
                            titleStyle.push({color: 'red'})
                        }
                    }

                    return (
                        <TouchableOpacity
                            key={i}
                            style={sortTypeStyle}
                            onPress={()=>{
                                this.handleSortTypesViewAnimation();
                                dispatch(selectSortType(type));

                                InteractionManager.runAfterInteractions(()=> {
                                    page = 1;
                                    isLoading = true;
                                    canLoadMore = false;
                                    this.fetchData(page, canLoadMore, isLoading);
                                })
                            }}
                        >
                            <Text style={titleStyle}>{type.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </Animated.View>
        )
    }

    // 营养素排序Cell
    renderSortTypeCell() {
        const {FoodsList,order_asc,order_by, dispatch} = this.props;
        let currentTypeName = '价格排序';
        let orderByAscTitle = (order_asc == 'asc') ? '由低到高' : '由高到低';
        let orderByAscIconSource = (order_asc == 'asc') ? {uri: 'ic_food_ordering_up'} : {uri: 'ic_food_ordering_down'};
        return (
            <View style={styles.sortTypeCell}>
                <TouchableOpacity
                    style={{flexDirection: 'row'}}
                    activeOpacity={0.75}
                    onPress={()=>{this.handleSortTypesViewAnimation()}}
                >
                    <Text>{currentTypeName}</Text>
                    <Animated.Image
                        style={{
                            width: 16,
                            height: 16,
                            transform: [{
                                rotate: this.state.angleRotation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '180deg']
                                })
                            }]
                        }}
                        source={{uri: 'ic_food_ordering'}}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={{flexDirection: 'row'}}
                    onPress={()=> {
                        dispatch(changeOrderAscStatus());
                        InteractionManager.runAfterInteractions(()=> {
                            page = 1;
                            canLoadMore = false;
                            isLoading = true;
                            this.fetchData(page, canLoadMore, isLoading);
                        })
                    }}
                >
                    <Text style={{color: 'red'}}>{orderByAscTitle}</Text>
                    <Image style={{width: 16, height: 16}} source={orderByAscIconSource}/>
                </TouchableOpacity>
            </View>
        )
    }

    onScroll() {
        if (!canLoadMore) canLoadMore = true;
    }

    fetchData(page, canLoadMore, isLoading) {
        const {dispatch,params, brand, category,order_asc ,order_by,FoodsList} = this.props;
        dispatch(fetchFoods(params,brand, category, order_by, page, order_asc, canLoadMore, isLoading));
    }
    
    render() {
        const {category, FoodsList, dispatch} = this.props;
        let subcategories = [{id: '', name: '全部'}];
        category.sub_categories.forEach((subcategory)=>{
            subcategories.push(subcategory)
        })

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                {FoodsList.isLoading ?
                    <Loading /> :
                    <ListView
                        style={{position: 'absolute', top: 84, height: Common.window.height-84}}
                        dataSource={this.state.dataSource.cloneWithRows(FoodsList.foodsList)}
                        renderRow={this.renderRow}
                        onScroll={this.onScroll}
                        onEndReached={this.onEndReach.bind(this)}
                        onEndReachedThreshold={10}
                        renderFooter={this.renderFooter.bind(this)}
                    />
                }
                <View style={{position: 'absolute', top: 0}}>
                        <Header
                            leftIcon='angle-left'
                            leftIconAction={()=>this.props.navigator.pop()}
                            title={category.name}
                        />
                    {this.renderSortTypeCell()}
                </View>

            </View >
        )
    }

    renderRow(food) {

        let lightStyle = [styles.healthLight];
        lightStyle.push({backgroundColor: 'orange'})

        return (
            <TouchableOpacity
                style={styles.foodsCell}
                onPress={()=>{
                    InteractionManager.runAfterInteractions(()=>{
                        this.props.navigator.push({
                            name: 'FoodInfoContainer',
                            component: FoodInfoContainer,
                            passProps: {
                                food: food
                            }
                        })
                    })
                }}
            >
                <View style={{flexDirection: 'row'}}>
                    <Image style={styles.foodIcon} source={{uri: food.img_url}}/>
                    <View style={styles.titleContainer}>
                        <Text style={styles.foodName} numberOfLines={1}>{food.name}</Text>
                        <Text style={styles.calory}>
                            <Text style={styles.unit}> 111</Text>
                        </Text>
                    </View>
                </View>
                <View style={lightStyle}/>
            </TouchableOpacity>
        )
    }
    // 上拉加载
    onEndReach() {
        if (canLoadMore) {
            page++;
            isLoading = false;
            this.fetchData(page, canLoadMore, isLoading);
            canLoadMore = false;
        }
    }

    renderFooter() {
        const {FoodsList} = this.props;
        if (FoodsList.isLoadMore) {
            return <LoadMoreFooter />
        }
    }
}

const styles = StyleSheet.create({
    sortTypeCell: {
        flexDirection: 'row',
        height: 40,
        width: Common.window.width,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white'
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

    foodName: {
        width: Common.window.width - 15 - 15 - 40 - 15 - 10,
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
    }
})