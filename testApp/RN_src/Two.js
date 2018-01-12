/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    NativeModules,
    ImageBackground,
    DeviceEventEmitter
} from 'react-native';
import PullList from './pull/PullList'
let rowData = ['1','2','3','4','5','6','7','8','1','2','3','4','5','6','7','8','1','2','3','4','5','6','7','8'];
export default class App extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
    }


    onPullRelease =  (resolve) => {
        if(this.props.navigation.state.params.data){
            setTimeout(()=>{
                this.pullList && this.pullList.setData(["a","c","d","e","f","g","a","c","d","e","f","g","a","c","d","e","f","g","a","c","d","e","f","g"]);
                resolve();
            },2000)
        }else{
            setTimeout(()=>{
                this.pullList && this.pullList.setData([]);
                resolve();
            },2000)
        }

    };


    loadMore = async(page)=>{
        setTimeout(()=>{
            this.pullList && this.pullList.addData(rowData);
        },2000)

    };

    renderRowView = ({item, index, separators})=>{
        return (<View style={styles.Item}><Text>{item}</Text></View>);
    };

    render() {
        return (
            <PullList
                style={{height:HEIGHT}}
                ref={(list)=> this.pullList = list}
                onPullRelease={this.onPullRelease}
                onEndReached={this.loadMore}
                renderItem={this.renderRowView}
                numColumns={1}
                initialNumToRender={5}
                key={'list'}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    hello: {
        marginTop:20,
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

    Item:{
        backgroundColor:'gray',
        width:WIDTH,
        height:SCALE(100),
        margin:SCALE(10),
        justifyContent:'center',
        alignItems:'center'
    }
});
