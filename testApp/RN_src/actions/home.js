/**
 * Created by wuyunqiang on 2018/01/24.
 */

//请求数据的前发送的action
export function FetchData(refresh = false , loadmore = false) {
    console.log('ActionTypes.HOME_FETCH');
    return {
        type: ActionTypes.FETCH,
        refresh,
        loadmore,
    };
}

//请求结束 发送action
export function ReceiveData(data) {
    console.log('ActionTypes.HOME_RECEIVE');
    return {
        type: ActionTypes.RECEIVE,
        data,
    };
}

//请求数据的action
export function RequestData(url,params){
    console.log('ActionTypes.HOME_REQUEST');
    console.log('home url',url);
    console.log('home params',params);
    return {
        type: ActionTypes.REQUEST,
        url,
        params
    };
}
