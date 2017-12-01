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
    DeviceEventEmitter
} from 'react-native';

export default class App extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        DeviceEventEmitter.addListener('Native', (...data) =>{
            console.log('MyReactActivity',...data);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.hello}>Hello, My Hybrid App!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    hello: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
AppRegistry.registerComponent('testApp', () => App);
