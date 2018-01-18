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
    FlatList,
    ScrollView,
    Image,
    TouchableOpacity,
    NativeModules,
    ImageBackground,
    DeviceEventEmitter,
    requireNativeComponent,
    ActivityIndicator
} from 'react-native';
import PullLayout from './pull/PullLayout'
export default class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            loadmore:false,
            data:['1','2','3','4','5','6','7','8','1','2','3','4','5','6','7','8','1','2','3','4','5','6','7','8'],
        }
    }

    componentDidMount() {
    }

    renderRowView = ({item, index, separators})=>{
        return (<View style={styles.Item}><Text>{item}</Text></View>);
    };

    loadMore = async(page)=>{
        this.setState({
            loadmore:true,
        });
        setTimeout(()=>{
            this.setState({
                loadmore:false,
                data:this.state.data.concat(['1sd','asd2','fdg3','4fdsa','5ewt','6sad','erg7','fasd8','1feerh','sda2','3fad','4hgsd','5fad','6fasd','asd7','8asdg','1adsg','2asd','3fasd','asd4','5afsd','6asd','7asd','8fasdfvas'])
            })
        },2000)
    };

    refreshReleased = async(params)=>{
        console.log('params',params);
        setTimeout(()=>{
            this.setState({
                data:['1sd','asd2','fdg3','4fdsa','5ewt','6sad','erg7','fasd8','1feerh','sda2','3fad','4hgsd','5fad','6fasd','asd7','8asdg','1adsg','2asd','3fasd','asd4','5afsd','6asd','7asd','8fasdfvas']
            })
            this.pullLayout&&this.pullLayout.finishRefresh();
        },2000)
    };

    _renderFoot = ()=>{
        if(this.state.loadmore){
            return (<View
                style={{
                    paddingVertical: 10,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}>
                <ActivityIndicator animating size="large"/>
            </View>);
        }else{
            return null;
        }

    };

    render() {
        return (
            <PullLayout
                ref = {(pull)=>{this.pullLayout = pull}}
                style={{flex: 1,backgroundColor:'white',}}
                onRefreshReleased = {this.refreshReleased}>
                <FlatList
                    style={{flex:1}}
                    ref={(c) => {this.scroll = c;}}
                    refreshing={false}
                    keyExtractor={(item, index) => {return index}}
                    onEndReachedThreshold={1}
                    data={this.state.data}
                    windowSize={10}
                    updateCellsBatchingPeriod={1}
                    maxToRenderPerBatch={10}
                    renderItem={this.renderRowView}
                    onEndReached={this.loadMore}
                    ListFooterComponent={this._renderFoot}
                    disableVirtualization={false}
                />

            </PullLayout>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'blue'
    },
    hello: {
        backgroundColor:'green',
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
