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
import CodePush from 'react-native-code-push';
export default class App extends Component {

    static navigationOptions = {
        header:null,
    };

    constructor(props){
        super(props);
    }

    componentDidMount() {
        DeviceEventEmitter.addListener('Native', (...data) =>{
            console.log('MyReactActivity',...data);
        });
    }


    goToH5 = ()=>{
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

    goToOther = ()=>{
      this.props.navigation.navigate('Two')
    };

    render() {
        return (
            <View style={styles.container}>
              <TouchableOpacity activeOpacity={1} onPress={this.goToH5}>
                <Text style={styles.hello}>Hello, 这里是app.js哈哈哈哈!</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} onPress={this.goToOther}>
                <Text style={styles.hello}>页面跳转</Text>
              </TouchableOpacity>
            </View>
        )
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
});
