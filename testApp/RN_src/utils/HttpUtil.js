/**
 * Created by wuyunqiang on 2018/1/24.
 */
import {DeviceEventEmitter,Alert,NetInfo} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'
import Toast from 'react-native-root-toast';
const HOST = '';
const baseParams = {
    'credentials': 'include',//手动添加cookier
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    // ...others  //自己配置需要的参数
};
const TIMEOUT = 30000;
const CONFIG = {timeout:TIMEOUT,followRedirects:false};
export default class HttpRequest {

    static flag = true;
    static NetFlag = true;
    //监听网络连接状态
    static async checkNet(){
        let data = false;
        let isNet ={};
        if(HttpRequest.NetFlag){
            HttpRequest.NetFlag = false;
            isNet = await fetch("https://www.baidu.com").then((res)=>{
                console.log('有网络',res);
                HttpRequest.NetFlag = true;
                return true;
            }).catch((err)=>{
                console.log('没有网络',err);
                HttpRequest.showToast('没有网络');
                setTimeout(()=>{HttpRequest.NetFlag = true;},3000);
                return false;
            });
            return isNet;
        }
    };

    static async GETtype(url,headers) {
        console.log('GETtype url',url);
        let res = await RNFetchBlob.config({fileCache:true,...CONFIG}).fetch('GET',url,{
            ...baseParams,
            ...headers
        }).then((res)=>{
            console.log('res',res);
            let type = res.respInfo.headers['Content-Type'];
            console.log('type',type);
            if(type.indexOf('image')>=0){
                return true;
            }
            return false;
        }).catch(async (err) => {
            console.log('发生意外');
            if (err.message.indexOf('timed out') >= 0) {
                HttpRequest.showToast('请求超时');
                return false;
            }
            let check = await HttpRequest.checkNet();
            if (!check) {
                return false;
            }

            return false;
        });
        return res;
    }


    static showToast(msg){
        Toast.show(msg, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: false,
            delay: 0
        });
    }

    static async GET(url,headers) {
        console.log('url',HOST+url);
        let res = await RNFetchBlob.config({fileCache:true,...CONFIG}).fetch('GET',HOST+url,{
            ...baseParams,
            ...headers
        }).then((res)=>{
            console.log('res.json',res.json());
            return res.json();
        }).catch(async (err) => {
            if (err.message.indexOf('timed out') >= 0) {
                HttpRequest.showToast('请求超时');
                return false;
            }
            if(err.message.indexOf('JSON') >= 0) {
                HttpRequest.showToast(err.message);
                return false;
            }
            let check = await HttpRequest.checkNet();
            if (!check) {
                return false;
            }
            HttpRequest.showToast(err.message);
            console.log('其他错误',err.message);
            return false;
        });
        console.log('res',res);
        HttpRequest.emitData(res);
        return res;
    }

    static async POST(url, params, headers) {
        console.log('url', HOST + url);
        console.log('params', params);
        let res = await RNFetchBlob.config(CONFIG).fetch('POST', HOST + url, {
            ...baseParams,
            ...headers
        }, params)
            .uploadProgress((written, total) => {
                console.log('uploaded', written / total)
            })
            // listen to download progress event
            .progress((received, total) => {
                console.log('progress', received / total)
            })
            .then((res) => {
                console.log('res.json', res.json());
                return res.json();
            }).catch(async (err) => {
                console.log('err',err);
                if(err.message.indexOf('timed out') >= 0) {
                    HttpRequest.showToast('请求超时');
                    return false;
                }
                if(err.message.indexOf('Unexpected') >= 0) {
                    HttpRequest.showToast(err.message);
                    return false;
                }
                let check = await HttpRequest.checkNet();
                if (!check) {
                    return false;
                }
                HttpRequest.showToast(err.message);
                console.log('其他错误',err.message);
                return false;
            });
        console.log('res',res);
        HttpRequest.emitData(res);
        return res;
    }

    static emitData(res){
        //这里可以验证cookie是否到期
        // if(res.message.indexOf('登录')>-1){
        //     if(HttpRequest.flag){
        //         HttpRequest.flag = false;
        //         console.log('丢失cookie跳到登录页面');
        //         DeviceEventEmitter.emit('data', 'Login');
        //         setTimeout(()=>{HttpRequest.flag = true;},2000)
        //     }
        // }
    }

    static async POSTImage(url, params,headers) {
        console.log('url',url);
        console.log('params', params);
        let data = [];
        for(let i=0;i<params.length;i++){
            data.push({file:{uri:params[i],type:'application/octet-stream', name: 'image.jpg'},})
        }
        console.log('images', data);
        let res = await RNFetchBlob.config(CONFIG).fetch('POST',url, {
            'Accept': 'application/json',
            'Content-Type' :'multipart/form-data',
            ...headers,
        }, data)
            .uploadProgress((written, total) => {
                console.log('uploaded', written / total)
            })
            // listen to download progress event
            .progress((received, total) => {
                console.log('progress', received / total)
            })
            .then((res) => {
                console.log('res.json', res.json());
                return res.json();
            }).catch(async (err) => {
                let check = await HttpRequest.checkNet();
                console.log('check', check);
                if (!check) {
                    return false;
                }
                if(err.message.indexOf('timed out') >= 0) {
                    HttpRequest.showToast('请求超时');
                    return false;
                }
                return false;
            });
        HttpRequest.emitData(res);
        console.log('res', res);
        return res;
    }

    static ToQueryString(obj) {
        return obj
            ? Object
                .keys(obj)
                .sort()
                .map(function (key) {
                    var val = obj[key];
                    if (Array.isArray(val)) {
                        return val
                            .sort()
                            .map(function (val2) {
                                // return ""+key + '=' + val2;
                                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
                            })
                            .join('&');
                    }

                    return encodeURIComponent(key) + '=' + encodeURIComponent(val);
                    // return ""+key + '=' + val;
                })
                .join('&')
            : '';
    }
}
global.HttpUtil = HttpRequest;