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
    DeviceEventEmitter
} from 'react-native';
let WIDTH = Dimensions.get('window').width;

export default class App extends Component {

    constructor(props){
        super(props);
        console.log("TestActivity 执行构造函数")
    }

    componentDidMount() {
        console.log("TestActivity componentDidMount")
    }

    render() {
        return (
            <View style={styles.container}>
              <Text style={styles.hello}>Hello, 这里是RN view</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width:WIDTH,
        backgroundColor:'gray'
    },
    hello: {
        marginTop:20,
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});



