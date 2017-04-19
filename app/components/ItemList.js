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
import ProductContainer from '../containers/ProductContainer';

var cellWidth = Common.window.width /2;
var cellHeight = cellWidth + 50;

export default class ItemList extends Component {
    constructor(props) {
        super(props);
        // console.log(props)
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
                    onPress={()=>{
                        this.props.navigator.push({
                            name: 'ProductContainer',
                            component: ProductContainer,
                            passProps: {
                                food: rowDate,
                                foodId:rowDate.foodId
                            }
                        })
                    }}
                    >
                    <Image source={{ uri: rowDate.homeImgUrl }} style={styles.rowDateImage}></Image>
                    <Text numberOfLines={2} style={ styles.nameLabel }> {rowDate.name}</Text>
                    <Text numberOfLines={1} style={ styles.priceLabel }>{'JPY' + rowDate.price} </Text>

                </TouchableOpacity>
                
            </View>
        );
    }

    _pressItem(goodsId){

    }
    render() {

        return (
            <View style={styles.StyleFor18}>

                <View >
                    <ListView
                        horizontal={true}
                        dataSource={this.state.dataSource.cloneWithRows(this.props.module ? this.props.module : []) }
                        renderRow={this._renderRow.bind(this)}
                        contentContainerStyle={styles.list}
                        enableEmptySections={true}
                        initialListSize= {1}
                        style={styles.listView}
                        />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    
    row: {
        flex: 50,
        width: cellWidth ,
        height: cellHeight,
        flexDirection:'row',
    },
    rowDateImage: {
        flexDirection: 'row',
        resizeMode: 'cover',
        width: cellWidth - 12,
        height: cellWidth - 12,
        
    },
      nameLabel: {
        flexDirection: 'row',
        marginLeft: 12,
        marginRight: 12,
        marginTop: 8,
        fontSize: 13,
        color: 'black',
        fontWeight: 'bold',
        
    },
    priceLabel: {
        flexDirection: 'row',
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 4,
        fontSize: 12,
        color: '#ff8500',
        // backgroundColor: 'red',
    },

    list: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'nowrap',
    },
    
    
    StyleFor18: {
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    listView: {
        backgroundColor: 'white',
    }

});














