/**
 * Created by wuyunqiang on 2018/01/24.
 */
import { Map,is,fromJS } from 'immutable';
const initialState = Map({
    refresh:false,
    loading:true,
    loadmore:false,
    data: fromJS({}),
    url:'',
    params:{},
});

export default function home(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.FETCH:
            return state
                .set('loading',true)
                .set('refresh',action.refresh?action.refresh:false)
                .set('loadmore',action.loadmore?action.loadmore:false);
        case ActionTypes.RECEIVE:
            const map1 = fromJS(action.data);//网络获取
            const map2 = state.get('data');//本地已经有的数据
            console.log('是否更新 reduce',!is(map1,map2));
            if(is(map1,map2)){
                return state
                    .set('loading',false)
                    .set('refresh',false)
                    .set('loadmore',false)
            }
            return state
                .set('data',map1)
                .set('loading',false)
                .set('refresh',false)
                .set('loadmore',false);

        default:
            return state;
    }
}

function loadMore(state, action) {
    // state.get('articleList')[action.typeId] = state.get('articleList')[action.typeId].concat(
    //     action.articleList
    // );
    // console.log('loadMore state', state.get('articleList'));
    return state.get('articleList');
    // state.articleList[action.typeId] = state.articleList[action.typeId].concat(
    //   action.articleList
    // );
    // return state.articleList;
}
