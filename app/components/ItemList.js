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
    PixelRatio
} from 'react-native';
import Common from '../common/constants';
//import Icon from 'react-native-vector-icons/Ionicons';


export default class ItemList extends Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this._renderRow = this._renderRow.bind(this);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    }

    _renderRow(rowDate) {
        return (
            <View style={styles.row}>
                <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={()=>{alert('我是12')} }
                    >
                    <Image
                        source={{ uri: rowDate.homeImgUrl }}
                        style={styles.rowDateImage}
                        />
                    <Text numberOfLines={1} style={{ fontSize: 11, width: 100 }}> {rowDate.name}</Text>

                    <Text style={{ color: 'red', fontSize: 15 }}>{'¥' + rowDate.price} </Text>

                </TouchableOpacity>
                
            </View>
        );
    }
    render() {

        return (
            <View style={styles.StyleFor18}>

                <View >
                    <ListView
                        horizontal={true}
                        dataSource={this.state.dataSource.cloneWithRows(this.props.module ? this.props.module : []) }
                        renderRow={this._renderRow}
                        contentContainerStyle={styles.list}
                        enableEmptySections={true}
                        initialListSize= {4}
                        style={styles.listView}
                        />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        height: 180,
        width: Common.window.width / 2 ,
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
    },
    rowDateImage: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 130,
        width: 100,
    },
    list: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'nowrap',

    },
    listView: {
        backgroundColor: 'white',
    },
    StyleFor18: {
        flexDirection: 'column',
        backgroundColor: 'black',
    },

    text1: {
        marginLeft: 10,
    }
});














