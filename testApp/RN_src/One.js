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
import PullView from './pull/PullView'
import CodePush from 'react-native-code-push';
export default class App extends Component {

    static navigationOptions = {
        header:null,
    };

    constructor(props){
        super(props);
        console.log("One执行构造函数");
    }

    componentDidMount() {
        console.log("One componentDidMount ");
        DeviceEventEmitter.addListener('Native', (...data) =>{
            console.log('MyReactActivity',...data);
        });
    }


    hotupdate = ()=>{
        console.log("CodePush",CodePush);
        let data =  CodePush.sync({
            updateDialog: {
                appendReleaseDescription:true,
                descriptionPrefix:'更新内容:',
                mandatoryContinueButtonLabel:'更新',
                mandatoryUpdateMessage:'好贷宝有新版本了，请您及时更新',
                optionalInstallButtonLabel: '立即更新',
                optionalIgnoreButtonLabel: '稍后',
                optionalUpdateMessage:'有新版本了，是否更新？',
                title: '提示'
            },
            installMode: CodePush.InstallMode.IMMEDIATE
        });
    };

    goToOther = (params)=>{
      this.props.navigation.navigate('Two',{...params})
    };


    onPullRelease= (resolve) => {
        setTimeout(()=>{
            resolve&&resolve()
        },3000);
    };

    render() {
        return (<PullView
            showsVerticalScrollIndicator={false}
            overScrollMode = {'always'}
            style={{width: WIDTH, backgroundColor:Color.f5f5f5}}
            onPullRelease={this.onPullRelease}>
                <View style={styles.Item}>
                    <Text style={styles.hello}>这是一个scrollview</Text>
                </View>
            <TouchableOpacity activeOpacity={1} onPress={()=>this.goToOther({data:true,})}>
                <View style={styles.Item}><Text style={styles.hello}>页面跳转 pullList 有数据</Text></View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={()=>this.goToOther({data:false})}>
                <View style={styles.Item}><Text style={styles.hello}>页面跳转 pullList 没有数据</Text></View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={this.hotupdate}>
                <View style={styles.Item}><Text style={styles.hello}>测试codepush</Text></View>
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
        </PullView>)
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
