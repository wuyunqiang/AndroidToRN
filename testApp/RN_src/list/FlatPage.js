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
    BackHandler,
    requireNativeComponent,
    ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';
import Card from './SGList/Card';
import DataSource from './SGList/CardListDataSource';
import PullLayout from '../pull/PullLayout'
import * as homeCreators from "../actions/home";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
class App extends Component {

    static navigationOptions = ({navigation})=> ({
        title:'FlatList'
    });

    constructor(props,context){
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
        // DataSource.fetch(this.cache, (err, res) => {
        //     if (err) console.warn(err);
        //     else self.setState({deals:res.body.deals});
        // });
        this.KEY = "Four";
    }


    getData = async(params)=>{
        let query = "https://api.groupon.com/v2/deals?offset=" + this.cache.offset +
            "&client_id=" + "1a36af586a2ced1684fea9ecdc7c1f6f" +
            "&client_version_id=" + "16.2" +
            "&division_id=portland&include_travel_bookable_deals=true&lang=en" +
            "&lat=" + this.cache.lat +
            "&limit=" + this.cache.limit +
            "&lng=" + this.cache.lng + "&location_time=2015-06-09T22%3A56%3A19Z&metadata=true&secure_assets=false&show=id%2Ctitle%2CplacementPriority%2CsidebarImageUrl%2CendAt%2CdealTypes%2Cmerchant%2CisSoldOut%2CsoldQuantity%2CsoldQuantityMessage%2Cstatus%2Coptions%28images%2Ctrait%2CpricingMetadata%2CschedulerOptions%29%2CannouncementTitle%2ClargeImageUrl%2Cgrid4ImageUrl%2Cgrid6ImageUrl%2CmediumImageUrl%2CshippingAddressRequired%2CredemptionLocation%2Cchannels%2CdealUrl%2Cdivision%2CpitchHtml%2ChighlightsHtml%2CisEarly%2CisExtended%2CredemptionLocations%2CisTipped%2CtippingPoint%2ClocationNote%2CspecificAttributes%2CisTravelBookableDeal%2CisMerchandisingDeal%2Cdefault%2Cuuid%2Ctraits%2Cimages&zero_day=true";

        let data = await HttpUtil.GET(query);
        if(data){
            if(params==='refresh'){
                this.setState({
                    deals:data.deals
                });
                this.pullLayout&&this.pullLayout.finishRefresh(this.KEY);
            }else{
                this.setState({
                    loadmore:false,
                    deals:this.state.deals.concat(data.deals),
                })
            }
        }
        console.log('data',data);
    };

    componentDidMount() {
        console.log('replace flatPage componentDidMount',this.props);
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        this.getData('loadMore');
        this.subscription = DeviceEventEmitter.addListener(this.KEY+"onRefreshReleased",this.refreshReleased);
    }


    replace = ()=>{
        this.props.navigation.navigate('SGList');

    }

    renderRowView = ({item, index, separators})=>{
        return (
            <TouchableOpacity opacity={0.5} onPress={this.replace}>
            <Card deal={item} />
            </TouchableOpacity>
        );
    };

    loadMore = async(page)=>{
        this.cache.offset += 10;
        this.setState({
            loadmore:true,
        });
        this.getData('loadMore');
        // DataSource.fetch(this.cache, (err, res) => {
        //     if (err) console.warn(err);
        //     else self.setState({deals:self.state.deals.concat(res.body.deals),loadmore:false,}); // concat deals to the end of the array
        // });

        // this.loadertime = setTimeout(()=>{
        //     this.setState({
        //         loadmore:false,
        //         data:this.state.data.concat(['1sd','asd2','fdg3','4fdsa','5ewt','6sad','erg7','fasd8','1feerh','sda2','3fad','4hgsd','5fad','6fasd','asd7','8asdg','1adsg','2asd','3fasd','asd4','5afsd','6asd','7asd','8fasdfvas'])
        //     })
        // },2000)
    };

    refreshReleased = async(params)=>{
        console.log('params',params);
        this.getData('refresh');
    };

    onBackAndroid = ()=>{
        console.log('FlagPage this.onBackAndroid');
        this.props.navigation.goBack(null);
        return true;
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
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


const mapStateToProps = (state) => {
    console.log('replace flatpage state',state);
    const {nav } = state;
    return {
        nav
    };
};

export default connect(mapStateToProps)(App);


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
