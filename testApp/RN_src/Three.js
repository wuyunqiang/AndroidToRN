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
import PullLayout from './pull/PullLayout'

let rowData = ['1','2','3','4','5','6','7','8','1','2','3','4','5','6','7','8','1','2','3','4','5','6','7','8'];
export default class App extends Component {

    static navigationOptions = ({navigation})=> ({
        tabBarLabel:'第三页',
        tabBarIcon: ({ tintColor,focused }) => (
            <Image style={{width:Platform.OS==='ios'?42/2:42/2,height:Platform.OS==='ios'?43/2:43/2}}
                   source={focused?AppImages.tab.profile_active:AppImages.tab.profile_unactive}/>
        ),

    })

    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    refreshReleased = (params)=>{
        alert("执行了这里")
        console.log('params',params);
        setTimeout(()=>{
            this.setState({
                data:['1sd','asd2','fdg3','4fdsa','5ewt','6sad','erg7','fasd8','1feerh','sda2','3fad','4hgsd','5fad','6fasd','asd7','8asdg','1adsg','2asd','3fasd','asd4','5afsd','6asd','7asd','8fasdfvas']
            });
            this.pullLayout&&this.pullLayout.finishRefresh();
        },2000)
    };

    testFlatList = ()=>{
        this.props.navigation.navigate('Four')
    }

    render() {
        return (
            <PullLayout
                ref = {(pull)=>{this.pullLayout = pull}}
                style={{flex: 1,backgroundColor:'white',}}
                onRefreshReleased = {this.refreshReleased}>
            <ScrollView
                style={{flex:1}}>
                <Text style={styles.hello}>使用scrollView测试原生下拉刷新</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={this.testFlatList}>
                    <View style={styles.Item}>
                        <Text style={styles.hello}>使用FlatList测试原生下拉刷新</Text></View>
                </TouchableOpacity>
                <View style={styles.Item}><Text style={styles.hello}>test</Text></View>
                <View style={styles.Item}><Text style={styles.hello}>test</Text></View>
                <View style={styles.Item}><Text style={styles.hello}>test</Text></View>
                <View style={styles.Item}><Text style={styles.hello}>test</Text></View>
                <View style={styles.Item}><Text style={styles.hello}>test</Text></View>
                <View style={styles.Item}><Text style={styles.hello}>test</Text></View>
                <View style={styles.Item}><Text style={styles.hello}>test</Text></View>
                <View style={styles.Item}><Text style={styles.hello}>test</Text></View>
                <View style={styles.Item}><Text style={styles.hello}>test</Text></View>
                <View style={styles.Item}><Text style={styles.hello}>test</Text></View>
                <View style={styles.Item}><Text style={styles.hello}>test</Text></View>
                <View style={styles.Item}><Text style={styles.hello}>test</Text></View>
                <View style={styles.Item}><Text style={styles.hello}>test</Text></View>
                <View style={styles.Item}><Text style={styles.hello}>test</Text></View>
                <View style={styles.Item}><Text style={styles.hello}>test</Text></View>
                <View style={styles.Item}><Text style={styles.hello}>test</Text></View>
                <View style={styles.Item}><Text style={styles.hello}>test</Text></View>
                <View style={styles.Item}><Text style={styles.hello}>test</Text></View>
                <View style={styles.Item}><Text style={styles.hello}>test</Text></View>
                <View style={styles.Item}><Text style={styles.hello}>test</Text></View>
                <View style={styles.Item}><Text style={styles.hello}>test</Text></View>
                <View style={styles.Item}><Text style={styles.hello}>test</Text></View>
                <View style={styles.Item}><Text style={styles.hello}>test</Text></View>
            </ScrollView>
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
