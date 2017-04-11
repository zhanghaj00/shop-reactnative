

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    ListView,
    PixelRatio,
    Platform
} from 'react-native';
import Common from '../common/constants';

export default class RecommendText extends Component {
    constructor(props) {
        super(props);
        // console.log(props)

    }
    render() {
        let imageHeight= 50 ;
        let imageWidth = 620;

        // console.log('imageHeight====>' + imageHeight);
        return (

            <View style={{flexDirection: 'column', alignItems: 'stretch', justifyContent: 'center',backgroundColor: 'rgb(240, 240, 240)'}}>
                <View style={{ alignItems: 'center',flexDirection: 'row', backgroundColor: 'rgb(240, 240, 240)', height:  0 }}>
                    <View style={{backgroundColor:'red',width:5,height: 0}}>
                    </View>
                    <Text style={{marginLeft:10,fontSize:15 }}></Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={{ alignItems: 'center' }}
                    >
                    <Text style={styles.textLabel}>{'- 推荐商品 -'}</Text>
                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    
    textLabel: {
        justifyContent: 'center',
        marginTop: 12,
        fontSize: 14,
        color: '#ff8500',
        height: 35,
    }
});















