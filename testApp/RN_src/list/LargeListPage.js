/**
 * Created by wuyunqiang on 2018/1/18.
 */
import React from "react";
import {
    View,
    Image,
    Text,
    ScrollView,
    TouchableOpacity,
    DeviceEventEmitter,
    ActivityIndicator
} from "react-native";

import { LargeList } from "react-native-largelist";
import { messages } from "../data/DataSource";
import PullLayout from '../pull/PullLayout'
export default class LargeListPage extends React.Component {
    messages;
    largeList;

    static navigationOptions = ({navigation})=> ({
        title:'LargeList'
    })

    constructor(props) {
        super(props);
        this.state = { refreshing: false };
        this.messages = [...messages];
        this.KEY = "LargeList"
    }

    componentDidMount() {
        this.subscription = DeviceEventEmitter.addListener(this.KEY+"onRefreshReleased",this.refreshReleased);
    }

    componentWillUnmount() {
        this.pullLayout&&this.pullLayout.finishRefresh(this.KEY);
        this.timerRefresh&&clearTimeout(this.timerRefresh);
        this.timerload&&clearTimeout(this.timerload);
        this.subscription&&this.subscription.remove();
    }


    refreshReleased = async(params)=>{
        this.timerRefresh = setTimeout(()=>{
            this.messages = this.messages.concat(this.messages);
            this.pullLayout&&this.pullLayout.finishRefresh(this.KEY);
            this.largeList&&this.largeList.reloadData();
        },2000)
    };

    loadMore = ()=>{
        console.log('加载更多');//android 真机不能执行这里
        this.setState({
            refreshing:true
        });
        this.timerload = setTimeout(() => {
            // alert("LargeListPage 加载更多");
            this.setState({
                refreshing:false
            });
            this.messages = this.messages.concat(this.messages);
            this.largeList&&this.largeList.reloadData();
        }, 4000);
    };

    renderEmpty = ()=>{
        return (<View
            style={{
                height: 667,
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Text>Empty</Text>
        </View>)
    }

    renderItemSeparator = ()=>{
        return (<View
            style={{ backgroundColor: "#EEE", height: 1, marginLeft: 16 }}
        />)
    }

    renderLoadingMore = ()=>{
        return (<View
            style={{
                height:70,
                paddingVertical: 10,
                borderTopWidth: 1,
                borderColor: "#CED0CE"
            }}>
            <ActivityIndicator animating size="large"/>
        </View>);
    }

    renderLoadCompleted = ()=>{
        return (<View
            style={{
                height:70,
                paddingVertical: 10,
                borderTopWidth: 1,
                borderColor: "#CED0CE"
            }}>
            <Text style={{}}>加载完成</Text>
        </View>);
    }

    renderHeader = ()=>{
        return (<View style={{width:WIDTH, height:WIDTH, backgroundColor:'#FF6A6A'}}></View>);
    }

    renderFooter = ()=>{
        return (<View style={{width:WIDTH, height:WIDTH, backgroundColor:'#EECBAD'}}></View>);
    }


    render() {
        return (<LargeList
            style={{flex: 1, backgroundColor: 'white',}}
            ref={ref => (this.largeList = ref)}
            refreshing={this.state.refreshing}
            safeMargin={600}
            dynamicMargin = {500}
            scrollEventThrottle={16}
            speedLevel1 = {5}
            numberOfRowsInSection={() => this.messages.length}
            renderHeader = {this.renderHeader}
            // renderFooter = {this.renderFooter}
            heightForCell={() => 88}
            renderCell={this.renderItem}
            renderEmpty={this.renderEmpty}
            onLoadMore={this.loadMore}
            heightForLoadMore={() => 70}
            renderLoadingMore={this.renderLoadingMore}
            renderLoadCompleted ={this.renderLoadCompleted}
            renderItemSeparator={this.renderItemSeparator}/>)
        // return (
        //     <PullLayout
        //         Key={this.KEY}
        //         ref={(pull) => {
        //             this.pullLayout = pull
        //         }}
        //         style={{flex: 1, backgroundColor: 'white',}}>
        //
        //     </PullLayout>
        // );
    }

    renderItem = (section, row)=> {
        let msg = this.messages[row];
        return (
            <View style={{ flex: 1, backgroundColor: "#FFF" }}>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                    <Image
                        source={msg.icon}
                        style={{ marginLeft: 16, width: 44, height: 44 }}
                    />
                    <View style={{ marginLeft: 4 }}>
                        <Text style={{ fontSize: 18 }}>
                            {msg.title}
                        </Text>
                        <Text style={{ fontSize: 14, marginTop: 8 }}>
                            {msg.subtitle}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    renderRight = (section, row)=> {
        return (
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                    style={{ flex: 1, backgroundColor: "blue", justifyContent: "center" }}
                    removeClippedSubviews={true}
                >
                    <Text
                        style={{ marginLeft: 10, alignSelf: "center" }}
                        numberOfLines={1}
                    >
                        More
                    </Text>
                </View>
                <TouchableOpacity
                    style={{ flex: 1, backgroundColor: "red", justifyContent: "center" }}
                    removeClippedSubviews={true}
                    onPress={() => {
                        this.messages.splice(row, 1);
                        this.largeList.reloadData();
                    }}
                >
                    <Text
                        style={{ marginLeft: 10, alignSelf: "center" }}
                        numberOfLines={1}
                    >
                        Delete
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

