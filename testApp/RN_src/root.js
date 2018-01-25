/**
 * Created by wuyunqiang on 2017/10/9.
 */
import './assets'
import './utils';
import './actions/ActionTypes'
import React from 'react';
import {
    BackHandler,
    Platform
} from 'react-native';
import { Provider,connect } from 'react-redux';
import { StackNavigator,TabNavigator,addNavigationHelpers,NavigationActions,DeviceEventEmitter} from 'react-navigation';
import configureStore from './store/configure-store';//配置reduce
import rootSaga from './sagas/index';//配置sagas异步操作
import AppNavigator from './router'
const store = configureStore();
GLOBAL.Log = console.log;
store.runSaga(rootSaga);//配置数据通过saga获取 然后通过reduce返回存储到store中 store作为唯一数据源

// const getCurrentRouteName = (navigationState) => {
//     if (!navigationState) {
//         return null;
//     }
//     const route = navigationState.routes[navigationState.index];
//     // dive into nested navigators
//     if (route.routes) {
//         return getCurrentRouteName(route);
//     }
//     return route.routeName;
// }

class NavigatorView extends React.Component {

    render (){
        //react-navigation与redux集成
        return (<AppNavigator navigation={addNavigationHelpers({dispatch: this.props.dispatch, state: this.props.nav})}
                            />)
    }
}
/**
 * 注入数据流
 * **/
const mapStateToProps = state => ({
    nav: state.nav,
});
const AppWithNavigationState =  connect(mapStateToProps)(NavigatorView);

const Root = () => (<Provider store={store}>
    <AppWithNavigationState/>
</Provider>);

export default Root;

