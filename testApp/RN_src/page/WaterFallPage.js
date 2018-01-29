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
    Dimensions,
    DeviceEventEmitter,
    FlatList,
    ActivityIndicator,
    ListView
} from 'react-native';
let WIDTH = Dimensions.get('window').width;
import FastImage from 'react-native-fast-image'
import SGListView from 'react-native-sglistview';

const ds = new ListView.DataSource(
    { rowHasChanged: (r1, r2) => r1.uuid !== r2.uuid });

export default class WaterFallPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            data:[],
            loadmore:false,
        };
        this.cache = {
            offset: 0,
            limit: 20,
            lat: 45.52,
            lng: -122.681944,
        };
    }

    componentDidMount() {
        this.loadMore();
    }

    loadMore = async(params)=>{
        this.setState({
            loadmore:true,
        });
        this.cache.offset += 10;
        let query = "https://api.groupon.com/v2/deals?offset=" + this.cache.offset +
            "&client_id=" + "1a36af586a2ced1684fea9ecdc7c1f6f" +
            "&client_version_id=" + "16.2" +
            "&division_id=portland&include_travel_bookable_deals=true&lang=en" +
            "&lat=" + this.cache.lat +
            "&limit=" + this.cache.limit +
            "&lng=" + this.cache.lng + "&location_time=2015-06-09T22%3A56%3A19Z&metadata=true&secure_assets=false&show=id%2Ctitle%2CplacementPriority%2CsidebarImageUrl%2CendAt%2CdealTypes%2Cmerchant%2CisSoldOut%2CsoldQuantity%2CsoldQuantityMessage%2Cstatus%2Coptions%28images%2Ctrait%2CpricingMetadata%2CschedulerOptions%29%2CannouncementTitle%2ClargeImageUrl%2Cgrid4ImageUrl%2Cgrid6ImageUrl%2CmediumImageUrl%2CshippingAddressRequired%2CredemptionLocation%2Cchannels%2CdealUrl%2Cdivision%2CpitchHtml%2ChighlightsHtml%2CisEarly%2CisExtended%2CredemptionLocations%2CisTipped%2CtippingPoint%2ClocationNote%2CspecificAttributes%2CisTravelBookableDeal%2CisMerchandisingDeal%2Cdefault%2Cuuid%2Ctraits%2Cimages&zero_day=true";

        let res = await HttpUtil.GET(query);
        console.log('loadMore data',res);
        if(res){
            this.setState({
                loadmore:false,
                data:this.state.data.concat(res.deals),
            })
        }

    };

    rnd = (n, m)=> {
        let random = Math.floor(Math.random()*(m-n+1)+n);
        let str= "";
        for(let i=0;i<random;i++){
            str += 'wo'+i;
        }
        return str;
    };

    renderRowView = (item, index, separators)=>{
        console.log('item',item);
        let content = this.rnd(20,100);
        if(item){
            return (<View style={{flex:1,width:WIDTH/2-10,backgroundColor:'red',marginRight:5,marginBottom:5}}>
                <Text>{item.title + content}</Text>
                <FastImage
                    source={{
                        uri: item.largeImageUrl,
                        priority: FastImage.priority.normal,}}
                    style={styles.image} />
            </View>)
        }
    };

    _renderFoot = ()=>{
        if(this.state.loadmore){
            return (<View
                style={{
                    backgroundColor:'blue',
                    width:WIDTH,
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
            <View style={styles.container}>
                <SGListView
                    contentContainerStyle={{flexDirection:'row',flexWrap:'wrap'}}
                    style={{flex:1}}
                    ref={(c) => {this.scroll = c;}}
                    dataSource={ds.cloneWithRows(this.state.data)}
                    renderRow={this.renderRowView}
                    onEndReached={this.loadMore}
                    renderSeparator = {this.renderSeparator}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width:WIDTH,
    },
    image: {
        width:WIDTH/2-10,
        height:WIDTH/2-10,
        alignSelf: 'stretch',
    },
});



