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
import {
    StyleSheet,
    Text,
    View,
    Image,
    PixelRatio,
    ScrollView,
    Alert,
    TouchableOpacity,
    TouchableHighlight,
    InteractionManager,
    NativeModules
} from 'react-native';
import Common from '../common/constants';
import commonStyles, {colors} from '../common/commonStyles';
import * as Storage from '../common/Storage';
import ImageButton from '../common/ImageButton';
import TextButton from '../common/TextButton';
import {userLogout, userFromSync} from '../actions/userActions';
import LoginContainer from '../containers/LoginContainer';
// import LoginContainer from '../pages/LoginPage';

const ChatMoudle = NativeModules.reactChatModule;

export default class MyPage extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         user: {}
    //     };
    // }

    // componentDidMount() {
    //     let user = {};
    //     Storage.getUser()
    //     .then((result) => {
    //         // this.setState({user: user});
    //         user = result;
    //     });
    //
    //     InteractionManager.runAfterInteractions(() => {
    //         const {dispatch} = this.props;
    //         dispatch(userFromSync(user));
    //     });
    // }

    // componentWillUpdate() {
    //     const {userReducer} = this.props;
    //     if (userReducer.user.id) {
    //         this.state.user = userReducer.user;
    //     }
    // }

    render() {
        const {userReducer} = this.props;
        const user = userReducer.phoneId;

        return (
            <View style={styles.container}>
                <View style={styles.headerWrap}>
                    <Text style={styles.header}>我的</Text>
                </View>
                <ScrollView style={{
                    backgroundColor: 'rgba(240,240,240,0.9)'
                }}>
                    <Image style={styles.myBgImage}>
                        <TouchableOpacity
                            style={styles.loginWrap}
                            onPress={this._onPressHead.bind(this)}
                        >
                            {userReducer.isLoggedIn ?
                                <Image style={styles.headIcon} source={{uri:user.avatar}}/> :
                                <Image style={styles.headIcon} source={require('../images/img_default_head.png')}/>
                            }
                            {userReducer.isLoggedIn ?
                                <Text style={styles.login}>{userReducer.phoneId}</Text> :
                                <Text style={styles.login}>点击登录</Text>
                            }
                        </TouchableOpacity>
                    </Image>


                    <TouchableOpacity style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 50,
                        position: 'relative',
                        backgroundColor: 'white'
                    }} activeOpacity={0.75}>
                        <Image
                            source={require('../images/personal_orders.png') }
                            style={{width: 25, height: 25, marginLeft: 12}}
                        />
                        <Text style={{marginLeft: 10}}>
                            我的订单
                        </Text>
                        <Text style={{
                            position: 'absolute',
                            padding: 12,
                            fontSize: 18,
                            marginLeft: Common.window.width - 150
                        }}>
                            >
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        marginTop: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 50,
                        position: 'relative',
                        backgroundColor: 'white'
                    }} activeOpacity={0.75} onPress={this._openChat.bind(this)} >
                        <Image
                            source={require('../images/personal_address.png')}
                            style={{width: 25, height: 25, marginLeft: 12}}
                        />
                        <Text style={{marginLeft: 10}}>
                            地址管理
                        </Text>
                        <Text style={{
                            position: 'absolute',
                            padding: 12,
                            fontSize: 18,
                            marginLeft: Common.window.width - 150
                        }}>
                            >
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[commonStyles.btn, {marginBottom:20}]}
                        onPress={() => {
                            Alert.alert(
                                "确定要退出登录么?",
                                "",
                                [
                                    {text:"确定", onPress:()=>{this._logout()}},
                                    {text:"取消", onPress:()=>{}},
                                ]
                            );
                        }}
                        underlayColor={colors.backGray}
                    >
                        <Text style={[{color: colors.white,fontWeight: "bold",textAlign:"center"}]}> 退出登录 </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }

    _openChat(){
        //获取cookie中的 username
        ChatMoudle.openChatWithAdmin("hello word");
    }
    _onPressHead() {
        const {userReducer} = this.props;
        const user = userReducer.user;

        if(!user.id) {
            InteractionManager.runAfterInteractions(() => {
                this.props.navigator.push({
                    name: 'LoginContainer',
                    component: LoginContainer,
                    passProps: {
                        ...this.props,
                    }
                })
            });
        }
    }

    _logout() {
        InteractionManager.runAfterInteractions(() => {
            const {dispatch} = this.props;
            dispatch(userLogout());
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerWrap: {
        alignItems: 'center',
        height: 44,
        backgroundColor: '#ff7419',
    },
    header: {
        color: '#fff',
        paddingTop: 22,
        fontSize: 16,
    },

    myBgImage: {
        flex: 1,
        backgroundColor: colors.white,
        width: Common.window.width,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headIcon: {
        height: 70,
        width: 70,
        borderRadius: 35,
    },
    loginWrap: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    login: {
        borderColor: colors.borderColor,
        color: colors.black,
        borderWidth: 0.5,
        padding: 5,
        marginTop: 10,
        borderRadius: 3,
    },
});
