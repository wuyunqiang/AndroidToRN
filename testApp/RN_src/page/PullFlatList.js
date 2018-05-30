
import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    Image,
    View,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    DeviceEventEmitter, NativeModules
} from 'react-native';
import Card from '../list/SGList/Card';
import {PullList} from '../pull'

export default class Pull extends Component {

    static navigationOptions = ({navigation})=> ({
        header:(
            <ImageBackground style={styles.header} source={AppImages.Home.backgroundImageHeader} resizeMode='cover'>
                <TouchableOpacity activeOpacity={1} onPress={()=>{
                    navigation.goBack(null)
                    // console.log("search",search);
                }}>
                    <View style={{paddingLeft:SCALE(30),paddingRight:SCALE(40)}}>
                        <Image
                            source={AppImages.Home.back}
                            style={{width:SCALE(20),height:SCALE(37)}}/>
                    </View>
                </TouchableOpacity>
            </ImageBackground>)

    })

    constructor(props){
        super(props);
        this.cache = {
            offset: 0,
            limit: 10,
            lat: 45.52,
            lng: -122.681944,
        };
    }



    onPullRelease = async(resolve)=>{
        try {
            this.cache.offset += 10;
            let query = "https://api.groupon.com/v2/deals?offset=" + this.cache.offset +
                "&client_id=" + "1a36af586a2ced1684fea9ecdc7c1f6f" +
                "&client_version_id=" + "16.2" +
                "&division_id=portland&include_travel_bookable_deals=true&lang=en" +
                "&lat=" + this.cache.lat +
                "&limit=" + this.cache.limit +
                "&lng=" + this.cache.lng + "&location_time=2015-06-09T22%3A56%3A19Z&metadata=true&secure_assets=false&show=id%2Ctitle%2CplacementPriority%2CsidebarImageUrl%2CendAt%2CdealTypes%2Cmerchant%2CisSoldOut%2CsoldQuantity%2CsoldQuantityMessage%2Cstatus%2Coptions%28images%2Ctrait%2CpricingMetadata%2CschedulerOptions%29%2CannouncementTitle%2ClargeImageUrl%2Cgrid4ImageUrl%2Cgrid6ImageUrl%2CmediumImageUrl%2CshippingAddressRequired%2CredemptionLocation%2Cchannels%2CdealUrl%2Cdivision%2CpitchHtml%2ChighlightsHtml%2CisEarly%2CisExtended%2CredemptionLocations%2CisTipped%2CtippingPoint%2ClocationNote%2CspecificAttributes%2CisTravelBookableDeal%2CisMerchandisingDeal%2Cdefault%2Cuuid%2Ctraits%2Cimages&zero_day=true";
            let data = await HttpUtil.GET(query);
            this.pullList&&this.pullList.setData(data.deals);
            resolve&&resolve();
        } catch (err) {
            resolve&&resolve();
            Log(err);
        }
    };

    loadMore = async(page)=>{
        try {
            this.cache.offset += 10;
            let query = "https://api.groupon.com/v2/deals?offset=" + this.cache.offset +
                "&client_id=" + "1a36af586a2ced1684fea9ecdc7c1f6f" +
                "&client_version_id=" + "16.2" +
                "&division_id=portland&include_travel_bookable_deals=true&lang=en" +
                "&lat=" + this.cache.lat +
                "&limit=" + this.cache.limit +
                "&lng=" + this.cache.lng + "&location_time=2015-06-09T22%3A56%3A19Z&metadata=true&secure_assets=false&show=id%2Ctitle%2CplacementPriority%2CsidebarImageUrl%2CendAt%2CdealTypes%2Cmerchant%2CisSoldOut%2CsoldQuantity%2CsoldQuantityMessage%2Cstatus%2Coptions%28images%2Ctrait%2CpricingMetadata%2CschedulerOptions%29%2CannouncementTitle%2ClargeImageUrl%2Cgrid4ImageUrl%2Cgrid6ImageUrl%2CmediumImageUrl%2CshippingAddressRequired%2CredemptionLocation%2Cchannels%2CdealUrl%2Cdivision%2CpitchHtml%2ChighlightsHtml%2CisEarly%2CisExtended%2CredemptionLocations%2CisTipped%2CtippingPoint%2ClocationNote%2CspecificAttributes%2CisTravelBookableDeal%2CisMerchandisingDeal%2Cdefault%2Cuuid%2Ctraits%2Cimages&zero_day=true";
            let data = await HttpUtil.GET(query);
            this.pullList&&this.pullList.addData(data.deals);
        } catch (err) {
            Log(err);
        }
    };

    renderRowView = ({item, index, separators})=>{
        return ( <Card deal={item} />)};

    render(){
        return (<PullList
            Android_Native={true} //可以设置false
            Key={'list'}//每一个实例不能重复
            ref={(list) => this.pullList = list}
            onEndReachedThreshold={20}
            onPullRelease={this.onPullRelease}
            onEndReached={this.loadMore}
            renderItem={this.renderRowView}
            getItemLayout={(data, index) => ({length:230, offset:230 * index, index})}
            numColumns={1}
            ItemSeparatorComponent={() => {
                return null;
            }}
            initialNumToRender={5}
            renderLoading = {()=>{return null;}}
        />)
    }
}


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: SCALE(100),
        paddingBottom:SCALE(20),
        backgroundColor: Color.C5995f5,
        borderWidth: 0,
        borderBottomWidth: 0,
    },
    item:{
        width:WIDTH,
        height:SCALE(100),
        justifyContent:'center',
        alignItems:'center',
        marginVertical:SCALE(50)
    }

});