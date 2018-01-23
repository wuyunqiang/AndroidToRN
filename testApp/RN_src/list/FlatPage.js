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
import Card from './SGList/Card';
import DataSource from './SGList/CardListDataSource';
import PullLayout from '../pull/PullLayout'
export default class App extends Component {

    static navigationOptions = ({navigation})=> ({
        title:'FlatList'
    })

    constructor(props){
        super(props);
        this.state = {
            deals: [],
        };
        this.cache = {
            offset: 0,
            limit: 10,
            lat: 45.52,
            lng: -122.681944,
        };

        let self = this;
        DataSource.fetch(this.cache, (err, res) => {
            if (err) console.warn(err);
            else self.setState({deals:res.body.deals});
        });
        this.KEY = "Four";
    }

    componentDidMount() {
        this.subscription = DeviceEventEmitter.addListener(this.KEY+"onRefreshReleased",this.refreshReleased);
    }

    renderRowView = ({item, index, separators})=>{
        return (
            <Card deal={item} />
        );
    };

    loadMore = async(page)=>{
        this.cache.offset += 10;
        var self = this;
        this.setState({
            loadmore:true,
        });
        DataSource.fetch(this.cache, (err, res) => {
            if (err) console.warn(err);
            else self.setState({deals:self.state.deals.concat(res.body.deals),loadmore:false,}); // concat deals to the end of the array
        });

        // this.loadertime = setTimeout(()=>{
        //     this.setState({
        //         loadmore:false,
        //         data:this.state.data.concat(['1sd','asd2','fdg3','4fdsa','5ewt','6sad','erg7','fasd8','1feerh','sda2','3fad','4hgsd','5fad','6fasd','asd7','8asdg','1adsg','2asd','3fasd','asd4','5afsd','6asd','7asd','8fasdfvas'])
        //     })
        // },2000)
    };

    refreshReleased = async(params)=>{
        let self = this;
        DataSource.fetch(this.cache, (err, res) => {
            if (err) console.warn(err);
            else {
                self.setState({deals:res.body.deals});
                this.pullLayout&&this.pullLayout.finishRefresh(this.KEY);
            }
        });
    };

    componentWillUnmount() {
        this.pullLayout&&this.pullLayout.finishRefresh(this.KEY);
        this.loadertime &&clearTimeout(this.loadertime);
        this.refreshtime &&clearTimeout(this.refreshtime);
        this.subscription&&this.subscription.remove();
    }

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
            //onRefreshReleased = {this.refreshReleased}
            <PullLayout
                Key = {this.KEY}
                ref = {(pull)=>{this.pullLayout = pull}}
                style={{flex: 1,backgroundColor:'white',}}
                >
                <FlatList
                    style={{flex:1}}
                    ref={(c) => {this.scroll = c;}}
                    refreshing={false}
                    keyExtractor={(item, index) => {return index}}
                    onEndReachedThreshold={20}
                    data={this.state.deals}
                    windowSize={20}
                    updateCellsBatchingPeriod={10}
                    maxToRenderPerBatch={20}
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
