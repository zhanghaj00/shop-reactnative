/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-08-13
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
    ScrollView,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Common from '../common/constants';
import CartContainer from '../containers/CartContainer';
import {productView} from '../actions/productActions';
import {cartAdd} from '../actions/cartActions';
import * as Storage from '../common/Storage';

import LoginContainer from '../containers/LoginContainer';

export default class ProductPage extends Component {



    componentDidMount() {
        //交互管理器在任意交互/动画完成之后，允许安排长期的运行工作. 在所有交互都完成之后安排一个函数来运行。
        InteractionManager.runAfterInteractions(() => {
            const {dispatch, food,foodId, cartReducer, userReducer} = this.props;
            let phoneId = cartReducer.phoneId;
            dispatch(productView(food.foodId?food.foodId:foodId, phoneId));
        });
    }

    render() {
        const {productReducer} = this.props;
        let product = productReducer.product;
        let images = [];
        if (productReducer.product.infoList){
            productReducer.product.infoList.forEach((item)=>{
                images.push(item);
            });
        }

        return (
            <View style={styles.container}>
                <Header
                    leftIcon='angle-left'
                    leftIconAction={()=>this.props.navigator.pop()}
                    title='商品详情'
                />
                <ScrollView style={styles.mainWrap}>
                    {productReducer.isLoading ?
                        <Loading /> :
                        <View style = {styles.container}>
                            <ScrollView
                                bounces={false}
                                showsVerticalScrollIndicator={false}
                                style={styles.scrollView}
                            >
                                <Swiper
                                    height={350}
                                    loop={true}
                                    autoplay={false}
                                    dot={<View style={styles.customDot} />}
                                    activeDot={<View style={styles.customActiveDot} />}
                                    paginationStyle={{
                                        bottom: 10
                                    }}
                                >
                                    {images.map((image) => {
                                        return (
                                            <TouchableOpacity key={image} activeOpacity={0.75}>
                                                <Image
                                                    style={styles.productImage}
                                                    source={{uri: image}}
                                                />
                                            </TouchableOpacity>
                                        )
                                    })}
                                </Swiper>
                            </ScrollView>
                            <View style={styles.contentWrap}>
                                <View style={styles.nameWrap}>
                                    <Text style={styles.name}>{product.name}</Text>
                                    <Text style={styles.price}>{'JPY '+product.price}</Text>
                                </View>
                                <View style={styles.line}>
                                    {/*<View style={styles.name}></View>*/}
                                </View>
                                <View style={styles.nameWrap}>
                                    <Text style={styles.name}>Size</Text>
                                    <Text style={styles.price}>{product.backgroundSize}</Text>
                                </View>
                                <View style={styles.nameWrap}>
                                    <Text style={styles.name}>Condition</Text>
                                    <Text style={styles.price}>{product.fittings?product.fittings:'暂无说明'}</Text>
                                </View>
                                <View style={styles.nameWrap}>
                                    <Text style={styles.name}>Detail</Text>
                                    <Text style={styles.price}>{product.buyExplain?product.buyExplain:'暂无说明'}</Text>
                                </View>
                                <View style={styles.nameWrap}>
                                    <Text style={styles.name}>Description</Text>
                                    <View style={{flexDirection: 'row'}}><Text style={styles.price}>{product.buyExplain?product.buyExplain:'暂无说明'}</Text></View>
                                </View>
                                <View style={styles.nameWrap}>
                                    <Text style={styles.name}>模特图片</Text>
                                    {product.modelPicList?
                                        product.modelPicList.map((item)=>{
                                            <Image
                                                style={styles.productImage}
                                                source={{uri: item}}
                                            />
                                        }):<Text style={styles.price} >"暂无图片"</Text>}
                                </View>


                            </View>
                        </View>
                    }
                </ScrollView>
                <ToolBar {...this.props} />
            </View>
        )
    }
}

class ToolBar extends Component {
    render() {
        const {cartReducer} = this.props;
        let cart_num = cartReducer.cart_num;

        return (
            <View style={styles.toolBarWrap}>
                <TouchableOpacity style={styles.toolBarItem}>
                    <Icon
                        name="share-square-o"
                        color="gray"
                        size={15}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.toolBarItem}>
                    <Icon
                        name="heart-o"
                        color="gray"
                        size={15}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.toolBarItem} onPress={this._goToCartPage.bind(this)}>
                    <Icon
                        name="shopping-cart"
                        color="gray"
                        size={18}
                    />
                    <Text style={styles.cartNum}>{cart_num}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.toolBarItem} onPress={this._addToCart.bind(this)}>
                    <View style={styles.addToCartWrap}>
                        <Text style={styles.addToCart}>加入购物车</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    _addToCart() {
        const {dispatch, productReducer, cartReducer, userReducer} = this.props;
        const product_id = productReducer.product.foodId;
        if(!userReducer.isLoggedIn){
            InteractionManager.runAfterInteractions(() => {
                this.props.navigator.push({
                    name: 'LoginContainer',
                    component: LoginContainer,
                    passProps: {...this.props, isShowNavigator:true}
                })
            });
            return;
        }
        let phoneId = userReducer.phoneId;
        let count = 1;
        Storage.getAppCartCookieId()
        .then((result)=>{
            phoneId = result;
        });

        InteractionManager.runAfterInteractions(() => {
            dispatch(cartAdd(phoneId, count,product_id ));
        });
    }

    _goToCartPage() {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                name: 'CartContainer',
                component: CartContainer,
                passProps: {...this.props, isShowNavigator:true}
            })
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection:'column'
    },

    //内容栏
    mainWrap: {
        width: Common.window.width,
        height: Common.window.height-108,
    },
    scrollView: {
        height: Common.window.width,
        backgroundColor: 'rgb(241, 241, 241)',
    },
    contentWrap: {
        marginLeft: 10,
        marginRight: 10,
    },

    productImage: {
        height: Common.window.width,
        width: Common.window.width,
    },
    customDot: {
        backgroundColor: '#ccc',
        height: 1.5,
        width: 15,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
    },
    customActiveDot: {
        backgroundColor: 'white',
        height: 1.5,
        width: 15,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
    },

    nameWrap: {
        flexDirection: 'column',
        marginTop: 12,
    },
    name: {
        flex: 1,
        flexDirection: 'column',
        fontSize: 16,
        color: '#222',
        marginLeft: 12,
        marginTop: 4,
    },
    price: {
        flex: 1,
        flexDirection: 'column',
        fontSize: 14,
        color: '#FC5500',
        marginLeft: 12,
        marginTop: 12,
    },
    line:{
        flex: 80,
        backgroundColor: 'black',
        height: 5,
    },

    featuredPrice: {
        fontSize: 16,
        color: '#666',
        marginLeft: 20,
    },
    shortDesc: {
        fontSize: 16,
        color: '#666',
        marginTop: 10,
    },

    // 底部栏
    toolBarWrap: {
        height: 48,
        alignItems: 'center',
        borderTopColor: '#ccc',
        borderTopWidth: 0.5,
        flexDirection: 'row',
        paddingBottom:1
    },
    toolBarItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerLine: {
        position: 'absolute',
        height: 20,
        width: 0.5,
        top: 10,
        right: Common.window.width * 0.5,
        backgroundColor: '#ccc'
    },
    itemTitle: {
        marginLeft: 5,
        fontSize: 12,
        color: 'gray'
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
