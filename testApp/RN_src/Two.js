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
    Image,
    TouchableOpacity,
    NativeModules,
    ImageBackground,
    DeviceEventEmitter
} from 'react-native';
import PullList from './pull/PullList'
let rowData = ['1','2','3','4','5','6','7','8','1','2','3','4','5','6','7','8','1','2','3','4','5','6','7','8'];
export default class App extends Component {
    static navigationOptions = ({navigation})=> ({
        tabBarLabel:'第二页',
        tabBarIcon: ({ tintColor,focused }) => (
            <Image style={{width:Platform.OS==='ios'?38/2:38,height:Platform.OS==='ios'?40/2:40}}
                   source={focused?AppImages.tab.project_active:AppImages.tab.project_unactive}/>
        ),
    })
    constructor(props){
        super(props);
        this.refresh = 1;
    }

    componentDidMount() {
        this.subscription = DeviceEventEmitter.addListener('Two',this.update)
    }

    componentWillUnmount() {
        this.subscription&&this.subscription.remove();
    }

    update =()=>{
        this.pullList&&this.pullList.refresh();
    }

    onPullRelease =  (resolve) => {
        console.log('this.props.navigation.state.params&&this.props.navigation.state.params.data',this.props.navigation.state.params&&this.props.navigation.state.params.data)
        if(this.props.navigation.state.params&&this.props.navigation.state.params.data){
            this.refresh===2?null:setTimeout(()=>{
                this.pullList && this.pullList.setData(["a","c","d","e","f","g","a","c","d","e","f","g","a","c","d","e","f","g","a","c","d","e","f","g"]);
                resolve&&resolve();
                this.refresh = 2;
            },2000)

        }else{
            this.refresh===3?null:setTimeout(()=>{
                this.pullList && this.pullList.setData([]);
                resolve&&resolve();
                this.refresh = 3;
            },300)
        }

    };


    loadMore = async(page)=>{
        setTimeout(()=>{
            this.pullList && this.pullList.addData(rowData);
        },2000)
    };

    renderRowView = ({item, index, separators})=>{
        return (<View style={styles.Item}><Text>{item}</Text></View>);
    };

    render() {
        return (
            <PullList
                style={{height:HEIGHT}}
                ref={(list)=> this.pullList = list}
                onPullRelease={this.onPullRelease}
                onEndReached={this.loadMore}
                renderItem={this.renderRowView}
                numColumns={1}
                initialNumToRender={5}
                key={'list'}
            />
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

    Item:{
        backgroundColor:'gray',
        width:WIDTH,
        height:SCALE(100),
        margin:SCALE(10),
        justifyContent:'center',
        alignItems:'center'
    }
});
