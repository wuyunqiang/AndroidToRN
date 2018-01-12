import React, {Component} from "react";
import {Dimensions, ActivityIndicator,View, Text} from "react-native";
const {width, height} = Dimensions.get('window');
export default class LoadingSpinner extends Component {

    static defaultProps = {
        width: width,
        height: height,
        spinnerColor: 'white',
        textColor: 'white',
        text: '努力加载中...',
        backgroundColor:'transparent'
    };

    render() {
        if(this.props.type==='normal'){
            return (
                <View style={{width:WIDTH,justifyContent:'center', alignItems:'center'}}>
                    <View style={{width:SCALE(280),height:SCALE(100),borderRadius:10,backgroundColor:'black',opacity: 0.75,flexDirection:'row',justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator color={this.props.spinnerColor}/>
                        <Text note style={{color: this.props.textColor}}>{this.props.text}</Text>
                    </View>
                </View>
            )
        }else if(this.props.type==='bottom'){
            return (
                    <View style={{width:WIDTH,height:SCALE(100),borderRadius:10,backgroundColor:Color.f5f5f5,flexDirection:'row',justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator color={this.props.spinnerColor}/>
                        <Text note style={{color: this.props.textColor}}>{this.props.text}</Text>
                    </View>
            )
        }else if(this.props.type==='allLoaded'){
            return (<View style={styles.allLoaded}><Text style={styles.statusText}>没有更多数据了</Text></View>)
        } else if(this.props.type==='home'){
            return (
                <ActivityIndicator color={'#FF6347'}/>
            );

        }else{
            return (
                <View style={{
                    position:'absolute',
                    top:0,
                    left:0,
                    right:0,
                    bottom: 0,
                    width: this.props.width,
                    height: this.props.height,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:this.props.backgroundColor}}>
                    <View style={{width:SCALE(280),height:SCALE(100),borderRadius:10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: 0.75,
                        backgroundColor:'black'}}>
                        <ActivityIndicator color={this.props.spinnerColor}/>
                        <Text note style={{marginLeft:SCALE(15),color: this.props.textColor}}>{this.props.text}</Text>
                    </View>
                </View>
            );
        }

    }
}

const styles = {
    allLoaded:{
        marginLeft: SCALE(20),
        marginRight: SCALE(20),
        justifyContent:'center',
        alignItems:'center',
        height:SCALE(100),
        backgroundColor:Color.f3f3f3,
    },
    statusText:{
        backgroundColor:'transparent',
        fontSize:FONT(13),
        color:Color.C333333,
    }
};
