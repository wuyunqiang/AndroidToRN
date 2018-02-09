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
import PullLayout from '../pull/PullLayout'

let rowData = ['1','2','3','4','5','6','7','8','1','2','3','4','5','6','7','8','1','2','3','4','5','6','7','8'];
export default class App extends Component {

    static navigationOptions = ({navigation})=> ({
        tabBarLabel:'第三页',
        tabBarIcon: ({ tintColor,focused }) => (
            <Image style={{width:42/2,height:43/2}}
                   source={focused?AppImages.tab.profile_active:AppImages.tab.profile_unactive}/>
        ),
        tabBarOnPress:(tab)=>{
            console.log('three tab',tab);
            tab.jumpToIndex(tab.scene.index)
        },
        // header:(
        //     <ImageBackground style={styles.header} source={AppImages.Home.backgroundImageHeader} resizeMode='cover'>
        //         <TouchableOpacity activeOpacity={1} onPress={()=>{
        //             navigation.goBack(null)
        //         }}>
        //             <View style={{paddingLeft:SCALE(30),paddingRight:SCALE(40)}}>
        //                 <Image
        //                     source={AppImages.Home.back}
        //                     style={{width:SCALE(20),height:SCALE(37)}}/>
        //             </View>
        //         </TouchableOpacity>
        //     </ImageBackground>)

    })

    constructor(props){
        super(props);
        this.state = {
        };
        this.KEY = "Three"
    }

    componentDidMount() {
        console.log("Three执行构造函数");
        this.subscription = DeviceEventEmitter.addListener(this.KEY+"onRefreshReleased",this.refreshReleased);
    }

    componentWillUnmount() {
        this.timer&&clearTimeout(this.timer);
        this.subscription&&this.subscription.remove();
        this.pullLayout&&this.pullLayout.finishRefresh(this.KEY);
    }

    refreshReleased = async(params)=>{
        console.log('params',params);
        this.timer = setTimeout(()=>{
            this.setState({
                data:['1sd','asd2','fdg3','4fdsa','5ewt','6sad','erg7','fasd8','1feerh','sda2','3fad','4hgsd','5fad','6fasd','asd7','8asdg','1adsg','2asd','3fasd','asd4','5afsd','6asd','7asd','8fasdfvas']
            });
            this.pullLayout&&this.pullLayout.finishRefresh(this.KEY);
        },2000)
    };

    testFlatList = ()=>{
        this.props.navigation.navigate('Four')
    }

    goToLargePull = ()=>{
        this.props.navigation.navigate('LargeListPage');
    }


    render() {
        return (
            <PullLayout
                Key = {this.KEY}
                ref = {(pull)=>{this.pullLayout = pull}}
                style={{flex: 1,backgroundColor:'white',}}
                >
            <ScrollView
                style={{flex:1}}>
                <Text style={styles.hello}>使用scrollView测试原生下拉刷新</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={this.testFlatList}>
                    <View style={styles.Item}>
                        <Text style={styles.hello}>使用FlatList测试原生下拉刷新</Text></View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={this.goToLargePull}>
                    <View style={styles.Item}><Text style={styles.hello}>使用largelist测试原生封装的下拉刷新</Text></View>
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
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: SCALE(100),
        paddingBottom:SCALE(20),
        backgroundColor: Color.C5995f5,
        borderWidth: 0,
        borderBottomWidth: 0,
    }
});
