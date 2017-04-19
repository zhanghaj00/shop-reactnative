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
    Image,
    ListView,
    Text,
    ScrollView,
    TouchableOpacity,
    InteractionManager,
    RefreshControl,
    Swiper
} from 'react-native';
import {
    fetchFoodInfo,
} from '../actions/foodInfoActions';

import Loading from '../components/Loading';
import Common from '../common/constants';
import Header from '../components/Header';

export default class FoodInfo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                getRowData: (data, sectionID, rowID) => {
                    return data[sectionID][rowID];
                },
                getSectionHeaderData: (data, sectionID) => {
                    return data[sectionID];
                },
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
            })
        }
    }
    componentDidMount() {
        const {dispatch, food} = this.props;
        InteractionManager.runAfterInteractions(()=> {
            dispatch(fetchFoodInfo(food.foodId));
        })
    }

    render() {
        const {foodInfoReducer,dispatch} = this.props;

        if(foodInfoReducer.food){
            var food = foodInfoReducer.food;
            var sourceData = {'banner': food.infoList, 'detail': [food]};

            var sectionIDs = ['banner', 'detail'];
            var rowIDs = [[0]];
            let row = [];
            row.push(0);
            rowIDs.push(row);
           // var rowIDs;
        }
        let title = foodInfoReducer.food ? foodInfoReducer.food.name : "loading";
        return (
            <View style={styles.container}>
                <Header
                    leftIcon='angle-left'
                    leftIconAction={()=>this.props.navigator.pop()}
                    title={title}
                    rightIcon="heart-o"
                    rightIconAction={()=>alert('like')}
                />
                {foodInfoReducer.isFetchingFood ?
                    <Loading /> :
                    <ListView
                        dataSource={this.state.dataSource.cloneWithRowsAndSections(sourceData, sectionIDs, rowIDs)}
                        renderRow={this._renderRow.bind(this)}
                        initialListSize={1}
                        enableEmptySections={true}
                        onScroll={this._onScroll.bind(this)}
                        onEndReached={this._onEndReach.bind(this)}
                        onEndReachedThreshold={10}
                        renderFooter={this._renderFooter.bind(this)}
                        style={{height: Common.window.height - 64}}
                        contentContainerStyle={styles.listViewStyle}
                        refreshControl={
                            <RefreshControl
                                refreshing={foodInfoReducer.isRefreshing}
                                onRefresh={this._onRefresh.bind(this)}
                                title="正在加载中……"
                                color="#ccc"
                            />
                        }
                    />
                }
                <View style={styles.toolBar}>

                </View>
            </View>
        )
    }

    _renderRow(data, sectionID, rowID) {
        if (sectionID == 'banner') {
            let banners = data;
            return (
                <View>
                    <Swiper
                        height={200}
                        loop={true}
                        autoplay={true}
                        dot={<View style={styles.customDot} />}
                        activeDot={<View style={styles.customActiveDot} />}
                        paginationStyle={{
                            bottom: 10
                        }}
                    >
                        {banners.map((banner) => {
                            return (
                                <TouchableOpacity key={banner} activeOpacity={0.75}>
                                    <Image
                                        style={styles.bannerImage}
                                        source={{uri: banner}}
                                    />
                                </TouchableOpacity>
                            )
                        })}
                    </Swiper>
                </View>
            )
        } else {
            <View><Text>helo</Text></View>
        }
    }

    _onRefresh(){

    }

    _onEndReach(){

    }

    _renderFooter(){

    }
    _onScroll(){

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(228, 229, 230)',
    },
    listViewStyle:{
        // 主轴方向
        flexDirection:'row',
        // 一行显示不下,换一行
        flexWrap:'wrap',
        // 侧轴方向
        alignItems:'center', // 必须设置,否则换行不起作用
    },
    customDot: {
        backgroundColor: '#ccc',
        height: 1.5,
        width: 15,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
    },
    bannerImage: {
        height: 200,
        width: Common.window.width,
    },
    customActiveDot: {
        backgroundColor: 'white',
        height: 1.5,
        width: 15,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
    },
    scrollView: {
        height: Common.window.height - 64 - 40,
        paddingTop: 25,
        backgroundColor: 'rgb(241, 241, 241)',
    },

    headerSection: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        flex: 1,
    },

    foodNameHeader: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 80,
        width: Common.window.width - 15 * 2,
        alignItems: 'center',
        padding: 10,
        shadowColor: 'gray',
        shadowOffset: {x: 1, y: 1},
        shadowOpacity: 0.5,
        marginTop: -10,
    },

    thumbImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },

    nameContainer: {
        height: 50,
        justifyContent: 'space-between',
    },

    foodName: {
        flexDirection: 'row'
    },

    units: {
        flexDirection: 'row',
        position: 'absolute',
        right: 10,
        bottom: 0,
        height: 25,
    },

    addOrCompareItem: {
        borderColor: 'red',
        borderWidth: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        width: (Common.window.width - 15 * 3) / 2,
        height: 35,
        borderRadius: 4,
    },

    caloryContainer: {
        marginTop: 15,
    },

    compareCell: {
        flexDirection: 'row',
        height: 80,
        paddingVertical: 15,
        alignItems: 'center',
    },

    unitCell: {
        flexDirection: 'row',
        height: 40,
        width: Common.window.width - 15 * 2,
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    statusCell: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },

    nutritionsSection: {
        backgroundColor: 'white',
        marginTop: 10,
        paddingHorizontal: 15,
        paddingBottom: 40,
    },

    nutritionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
    },

    toolBar: {
        position: 'absolute',
        height: 40,
        bottom: 0,
        right: 0,
        left: 0,
        borderTopWidth: 0.5,
        borderColor: '#ccc',
        backgroundColor: 'white'
    }

})