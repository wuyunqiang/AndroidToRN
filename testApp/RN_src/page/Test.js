
import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    Image,
    View,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    DeviceEventEmitter, NativeModules
} from 'react-native';
export default class Test extends Component {

    static navigationOptions = ({navigation})=> ({
        header:(
            <ImageBackground style={styles.header} source={AppImages.Home.backgroundImageHeader} resizeMode='cover'>
                <TouchableOpacity activeOpacity={1} onPress={()=>{
                    navigation.goBack(null)
                    console.log("navigation",navigation);
                    let search = navigation.getParam("search");
                    search();
                    // console.log("search",search);
                }}>
                    <View style={{paddingLeft:SCALE(30),paddingRight:SCALE(40)}}>
                        <Image
                            source={AppImages.Home.back}
                            style={{width:SCALE(20),height:SCALE(37)}}/>
                    </View>
                </TouchableOpacity>
            </ImageBackground>)

    })

    constructor(props){
        super(props);
        this.props.navigation.addListener("didBlur",(data)=>{

        })
    }

    C = store => next => action => {
        console.log('A');
        console.log('store',store);
        console.log('next',next);
        console.log('action',action);
    }


    test = async() => {
        let res = await Promise.resolve().then(() => {
            console.log("res 解决并且抛出了一个异常")
            return new Error("error");
        }).catch((err) => {
            console.log("res catch", err)
        }).catch((err)=>{
            console.log("res catch2", err)
        });
        console.log("test res", res);
    };

    search = ()=>{
        console.log("search ..........")
    }

    componentDidMount() {

        this.props.navigation.setParams({search:this.search});
//        let node = {
//            type :"test",
//            name :"wuyunqaing"
//        }
//        this.test( {type,name} = node);

    }

    render(){
        return <View style={{flex:1}}>
            <TouchableOpacity activeOpacity={1} onPress={this.test.bind(this,"hahahha")}>
                <Text>hahahahhahahahahahha</Text>
            </TouchableOpacity>

        </View>
    }
}


const styles = StyleSheet.create({
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