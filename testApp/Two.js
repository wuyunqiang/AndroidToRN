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
export default class App extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
    }

    goToOther = ()=>{
        this.props.navigation.goBack(null);
    };

    render() {
        return (
            <View style={styles.container}>
              <TouchableOpacity activeOpacity={1} onPress={this.goToOther}>
                <Text style={styles.hello}> 这是第二个页面 页面跳转到第一个页面</Text>
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
