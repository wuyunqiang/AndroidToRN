/**
 * Created by wuyunqiang on 2018/01/24.
 */
import {fromJS} from 'immutable';
import {NavigationActions} from 'react-navigation';

import AppNavigator from '../router';

// *****************方式重复跳转页面
const navigateOnce = (getStateForAction) => (action, state) => {
    const {type, routeName} = action
    console.log('执行了这里跳转页面',"routeName:",routeName);
    return (
        state &&
        type === NavigationActions.NAVIGATE &&
        routeName === state.routes[state.routes.length - 1].routeName
    ) ? null : getStateForAction(action, state)
};
AppNavigator.router.getStateForAction= navigateOnce(AppNavigator.router.getStateForAction);
// *****************

export default function navigator(state, action) {
    console.log('navigator reduce',state,'action',action);
    const newState = AppNavigator.router.getStateForAction(action, state);

    return newState || state;
    // Initial state
    // if (!state) {
    //     return fromJS(AppNavigator.router.getStateForAction(action, state));
    // }
    // // Is this a navigation action that we should act upon?
    // if (includes(NavigationActions, action.type)) {
    //     return fromJS(AppNavigator.router.getStateForAction(action, state.toJS()));
    // }
    // return state;
}
