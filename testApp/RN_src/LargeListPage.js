/**
 * Created by wuyunqiang on 2018/1/18.
 */
import React from "react";
import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import { LargeList } from "react-native-largelist";
import { messages } from "./data/DataSource";
import PullLayout from './pull/PullLayout'
export default class LargeListPage extends React.Component {
    messages;
    largeList;

    constructor(props) {
        super(props);
        this.state = { refreshing: false };
        this.messages = [...messages];
    }

    refreshReleased = async(params)=>{
        console.log('params',params);
        setTimeout(()=>{
            this.messages = this.messages.concat(this.messages);
            this.pullLayout&&this.pullLayout.finishRefresh();
            this.largeList&&this.largeList.reloadData();
        },2000)
    };

    render() {
        return (
            <PullLayout
                ref = {(pull)=>{this.pullLayout = pull}}
                style={{flex: 1,backgroundColor:'white',}}
                onRefreshReleased = {this.refreshReleased}//网络请求加载数据
            >
            <LargeList
                style={{flex: 1,backgroundColor:'white',}}
                ref={ref => (this.largeList = ref)}
                numberOfRowsInSection={() => this.messages.length}
                heightForCell={() => 88}
                refreshing={this.state.refreshing}
                renderCell={this.renderItem.bind(this)}

                renderEmpty={() =>
                    <View
                        style={{
                            height: 667,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Text>Empty</Text>
                    </View>}
                onLoadMore={() => {
                    setTimeout(() => {
                        this.messages = this.messages.concat(this.messages);
                        if (!this.loadComplete) this.loadComplete = true;
                        this.forceUpdate();
                        this.largeList&&this.largeList.reloadData();
                    }, 2000);
                }}
                renderItemSeparator={() =>
                    <View
                        style={{ backgroundColor: "#EEE", height: 1, marginLeft: 16 }}
                    />}
            />
            </PullLayout>
        );
    }

    renderItem(section: number, row: number) {
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

    renderRight(section: number, row: number) {
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

