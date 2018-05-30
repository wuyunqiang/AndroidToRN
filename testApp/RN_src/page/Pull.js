
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
export default class Pull extends Component {

    static navigationOptions = ({navigation})=> ({
        header:(
            <ImageBackground style={styles.header} source={AppImages.Home.backgroundImageHeader} resizeMode='cover'>
                <TouchableOpacity activeOpacity={1} onPress={()=>{
                    navigation.goBack(null)
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
    }

    render(){
        return <View style={{flex:1}}>
            <TouchableOpacity activeOpacity={1} onPress={()=>this.props.navigation.navigate("PullScrollView")}>
                <View style={{
                    width:WIDTH,
                    height:SCALE(100),
                    justifyContent:'center',
                    alignItems:'center',
                    marginVertical:SCALE(50)
                }}>
                 <Text>测试scrollview下拉刷新</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} onPress={()=>this.props.navigation.navigate("PullFlatList")}>
                <View style={{
                    width:WIDTH,
                    height:SCALE(100),
                    justifyContent:'center',
                    alignItems:'center',
                    marginVertical:SCALE(50)
                }}>
                <Text>测试flatlist下拉刷新</Text>
                </View>
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
    },
    item:{
        width:WIDTH,
        height:SCALE(100),
        justifyContent:'center',
        alignItems:'center',
        marginVertical:SCALE(50)
    }

});