/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-09-23
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ListView,
    Text,
    Image,
    InteractionManager,
    TouchableOpacity,
} from 'react-native';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Common from '../common/constants';
import Toast from 'react-native-root-toast';
import {preorderView} from '../actions/preorderActions';
import {orderCreate} from '../actions/orderActions';
import {addressList} from '../actions/addressActions';
import AddressContainer from '../containers/AddressContainer';

export default class PreorderPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (section1, section2) => section1 !== section2
            }),
            notice: '', //订单的备注
        };
    }

    componentDidMount() {
        const {dispatch, preorderReducer, userReducer,addressReducer} = this.props;
        //交互管理器在任意交互/动画完成之后，允许安排长期的运行工作. 在所有交互都完成之后安排一个函数来运行。
        InteractionManager.runAfterInteractions(() => {
            let cartItems = preorderReducer.cartItems;
            let phoneId = userReducer.phoneId;
            dispatch(preorderView(cartItems,phoneId));
            dispatch(addressList(phoneId));
        });
    }

    componentWillUpdate(nextProps, nextState){
        const {commonReducer, orderReducer} = this.props;
        InteractionManager.runAfterInteractions(() => {
            if (commonReducer.isToasting) {
                Toast.show(orderReducer.message, {position:Toast.positions.CENTER});
            }
        });
    }

    render() {
        // alert(1);
        const {preorderReducer,addressReducer} = this.props;
        let isLoading = preorderReducer.isLoading;
        let cartItems = preorderReducer.cartItems;
        let address = addressReducer.address ?addressReducer.address[0]:null;

        // 将数据进行分组
        let sectionIds = [];
        let rowIds = [];
        let sourceData = {};
        if(!isLoading) {
            //选择收货地址数据
            sectionIds.push('address');
            rowIds.push([0]);
            //商品列表数据
            if(cartItems && cartItems.length) {
                let rowIdArr = [];
                for (let i = 0; i < cartItems.length; i++) {
                    rowIdArr.push(i);
                }
                sectionIds.push('preorderItems');
                rowIds.push(rowIdArr);
            }
            sourceData = {address:[address], preorderItems:cartItems};
        }

        return (
            <View style={styles.container}>
                <Header
                    leftIcon='angle-left'
                    leftIconAction={()=>this.props.navigator.pop()}
                    title='确认订单'
                />
                {isLoading ?
                    <Loading /> :
                    <View style={{flex:1,flexDirection:'column'}}>
                        <ListView
                            style={styles.productListWrap}
                            dataSource={this.state.dataSource.cloneWithRowsAndSections(sourceData, sectionIds, rowIds)}
                            renderRow={this._renderRow.bind(this)}
                            enableEmptySections={true}
                        />
                        <View style={styles.toolBarWrap}>
                            <Text style={styles.cartNum}>￥{preorderReducer.total_price}元</Text>
                            <TouchableOpacity style={styles.toolBarItem} onPress={this._orderCreate.bind(this)}>
                                <View style={styles.addToCartWrap}>
                                    <Text style={styles.addToCart}>去支付</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        )
    }

    _renderRow(data, sectionId, rowId) {
        //选择收货地址
        if(sectionId == 'address'){
            let address = data;
            return (
                <View>
                    {address ?
                        <TouchableOpacity onPress={this._gotoAddressList.bind(this)}>
                            <View>
                                <Text>收货地址:{address}</Text>
                            </View>
                        </TouchableOpacity>
                        :<TouchableOpacity onPress={this._gotoAddressList.bind(this)}>
                        <View>
                        <Text>请选择收货地址>></Text>
                        </View>
                        </TouchableOpacity>}
                </View>
            )
        }
        //商品列表
        else if(sectionId == 'preorderItems'){
            let preorderItem = data;
            return (
                <View style={styles.productItem}>
                    <Image
                        style={styles.productImage}
                        source={{uri: preorderItem.image_small}}
                    />
                    <View style={styles.productRight}>
                        <Text>{preorderItem.name}</Text>
                        <Text>￥{preorderItem.price}</Text>
                    </View>
                </View>
            );
        }
    }

    _gotoAddressList(){
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                name: 'AddressContainer',
                component: AddressContainer
            })
        });
    }

    _orderCreate() {
        InteractionManager.runAfterInteractions(() => {
            const {dispatch, userReducer, preorderReducer,addressReducer} = this.props;
            dispatch(orderCreate(preorderReducer.cartItems, addressReducer.address,userReducer.phoneId));
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerWrap: {
        alignItems: 'center',
        height: 44,
        backgroundColor: '#ff7419',
    },
    header: {
        color: '#fff',
        paddingTop: 22,
        fontSize: 17,
    },

    productListWrap: {
        height: Common.window.height - 64 - 44 - 40,
    },
    productItem: {
        height: 80,
        flexDirection:'row',
        padding: 15,
        marginBottom: 1,
        backgroundColor:'#fff',
    },
    productRight: {
        flexDirection:'column',
    },
    productImage: {
        width: 60,
        height: 60,
        marginRight: 15,
    },
    productPrice: {
        fontSize: 24,
        color: 'red',
    },
    productFeaturedPrice: {
        fontSize: 14,
        color: '#ddd',
    },

    // 底部栏
    toolBarWrap: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopColor: '#ccc',
        borderTopWidth: 0.5,
    },
    toolBarItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addToCartWrap: {
        flex: 1,
        backgroundColor: '#fd6161',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addToCart: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
    },
    cartNum: {
        color: 'red',
        fontSize: 11,
        marginTop: -18,
        marginLeft: -10,
        backgroundColor: 'transparent',
    },
});