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
    ScrollView,
    Image,
    TouchableOpacity,
    NativeModules,
    ImageBackground,
    DeviceEventEmitter,
    requireNativeComponent
} from 'react-native';
import DataSource from './CardListDataSource';
import PullLayout from '../../pull/PullLayout'
import CardListView from './CardListView';
export default class SGListPage extends Component {

    static navigationOptions = ({navigation})=> ({
       title:'SGListView'
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
        this.KEY = "SGListView"
    }

    componentDidMount() {
        this.subscription = DeviceEventEmitter.addListener(this.KEY+"onRefreshReleased",this.refreshReleased);
    }

    componentWillUnmount() {
        this.timer&&clearTimeout(this.timer);
        this.subscription&&this.subscription.remove();
        this.pullLayout&&this.pullLayout.finishRefresh(this.KEY);
    }

    refreshReleased = async(params)=>{
        // alert("执行了这里 Three");
        let self = this;
        DataSource.fetch(this.cache, (err, res) => {
            if (err) console.warn(err);
            else {
                self.setState({deals:res.body.deals});
                this.pullLayout&&this.pullLayout.finishRefresh(this.KEY);
            }
        });
    };

    renderRow(rowData, sectionID, rowID) {
        return (
            <Card deal={rowData} />
        );
    }

    getDataSource = ()=> {
        const dataSource = new ListView.DataSource(
            { rowHasChanged: (r1, r2) => r1.uuid !== r2.uuid });

        const deals = this.props.deals.length > 0;
        return deals ? dataSource.cloneWithRows(this.props.deals) : dataSource;
    }

    onEndReached = ()=> {
        this.cache.offset += 10;
        var self = this;

        DataSource.fetch(this.cache, (err, res) => {
            if (err) console.warn(err);
            else self.setState({deals:self.state.deals.concat(res.body.deals)}); // concat deals to the end of the array
        });
    }

    render() {
        return (
            <PullLayout
                Key = {this.KEY}
                ref = {(pull)=>{this.pullLayout = pull}}
                style={{flex: 1,backgroundColor:'white',}}>
                <CardListView
                    deals={this.state.deals}
                    onEndReached={this.onEndReached}
                    {...this.cache} />
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
