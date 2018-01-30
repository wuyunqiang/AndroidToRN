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
    BackHandler,
    TouchableOpacity,
    NativeModules,
    ImageBackground,
    DeviceEventEmitter
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeCreators from '../actions/home';
import PullView from '../pull/PullView'
import CodePush from 'react-native-code-push';
class App extends Component {
    static navigationOptions = ({navigation})=> ({
       tabBarLabel:'第一页',
        tabBarIcon: ({tintColor,focused}) => (
            <Image
                style={{width:45/2,height:41/2}}
                source={focused?AppImages.tab.home_active:AppImages.tab.home_unactive}/>
        ),
        header:(<View style={{flexDirection:'row', alignItems:'center' ,height:SCALE(80), backgroundColor: Color.C5995f5, borderWidth:0, borderBottomWidth:0,}}>
            <TouchableOpacity activeOpacity={1} onPress={()=>{
                NativeModules.NativeUtil.Finish();
            }}>
                <View style={{paddingLeft:SCALE(30),paddingRight:SCALE(40)}}>
                    <Image
                        source={AppImages.Home.back}
                        style={{width:SCALE(20),height:SCALE(37)}}/>
                </View>
            </TouchableOpacity>
        </View>)

})

    constructor(props){
        super(props);
        console.log("One执行构造函数");
    }

    componentDidMount() {
        console.log('this.props',this.props);
        console.log("One componentDidMount ");
        this.NativeListener = DeviceEventEmitter.addListener('asdfasdfNative', (...data) =>{
            console.log('MyReactActivity',...data);
        });

        if(Platform.OS==='android'){
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentWillUnmount() {
        this.NativeListener.remove();
        this.timer&&clearTimeout(this.timer);
        if(Platform.OS==='android'){
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    onBackAndroid = (params) => {
        // 最近2秒内按过back键，可以退出应用。
        // if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        //     return false;
        // }
        // this.lastBackPressed = Date.now();
        const nav = this.props.nav;//获取redux的navigation state
        console.log('onBackAndroid nav', nav);
        console.log('one 执行了这里');
        const routes = nav.routes;
        if (routes.length > 1) {
            console.log('返回上一级');
            this.props.navigation.goBack(null);
            return true;
        }else if(routes[0].routes[routes[0].index].routeName!=routes[0].routes[0].routeName){//当前页面不等于第一个页面 跳转至第一个页面
            this.props.navigation.navigate(routes[0].routes[0].routeName);
            console.log('跳转至首页');
            return true;
        }else{
            console.log('结束activity');
            NativeModules.NativeUtil.Finish();
            return true;
        }

    };


    hotupdate = ()=>{
        console.log("CodePush",CodePush);
        let data =  CodePush.sync({
            updateDialog: {
                appendReleaseDescription:true,
                descriptionPrefix:'更新内容:',
                mandatoryContinueButtonLabel:'更新',
                mandatoryUpdateMessage:'有新版本了，请您及时更新',
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

    goToNativePull = ()=>{
        this.props.navigation.navigate('Three');
    };

    goToFlatListPull = ()=>{
        this.props.navigation.navigate('Four');
    }

    goToLargePull = ()=>{
        this.props.navigation.navigate('LargeListPage');
    }

    goToSGList =()=>{
        this.props.navigation.navigate('SGList');
    }

    goToWaterFallPage =()=>{
        this.props.navigation.navigate('WaterFallPage');
    }

    onPullRelease= (resolve) => {
        this.timer = setTimeout(()=>{
            resolve&&resolve()
        },3000);
    };

    ClickRefresh = ()=>{
        DeviceEventEmitter.emit('asdfasdfNative',{data:'hello'});
    }




    render() {
        return (<PullView
            ref = {(pull)=>this.pullview = pull}
            showsVerticalScrollIndicator={false}
            overScrollMode = {'always'}
            style={{width: WIDTH, backgroundColor:Color.f5f5f5}}
            onPullRelease={this.onPullRelease}>
            <Text style={styles.hello}>使用ScrollView测试PullView </Text>

            <TouchableOpacity activeOpacity={1} onPress={()=>this.goToOther({data:true,})}>
                <View style={styles.Item}><Text style={styles.hello}>使用Flatlist测试pullList有数据</Text></View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} onPress={()=>this.goToOther({data:false})}>
                <View style={styles.Item}><Text style={styles.hello}>使用Flatlist测试pullList没有数据</Text></View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} onPress={this.hotupdate}>
                <View style={styles.Item}><Text style={styles.hello}>测试codepush</Text></View>
                </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} onPress={this.goToNativePull}>
                <View style={styles.Item}><Text style={styles.hello}>使用ScrollView测试原生封装的下拉刷新</Text></View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} onPress={this.goToFlatListPull}>
                <View style={styles.Item}><Text style={styles.hello}>使用flatlist测试原生封装的下拉刷新</Text></View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} onPress={this.goToLargePull}>
                <View style={styles.Item}><Text style={styles.hello}>使用largelist测试原生封装的下拉刷新</Text></View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} onPress={this.goToSGList}>
                <View style={styles.Item}><Text style={styles.hello}>使用SGList测试原生封装的下拉刷新</Text></View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={this.ClickRefresh}>
                <View style={styles.Item}><Text style={styles.hello}>ClickRefresh</Text></View>
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
        </PullView>)
    }
}


const mapStateToProps = (state) => {
    const { home,nav } = state;
    return {
        home,
        nav
    };
};

const mapDispatchToProps = (dispatch) => {
    const homeActions = bindActionCreators(homeCreators, dispatch);
    return {
        homeActions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

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
