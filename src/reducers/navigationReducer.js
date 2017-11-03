import * as ActionType from '../actions/ActionType';
import {NavigationActions} from 'react-navigation';
import AppNavigator from '../routes/config';


const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('LoginPage'));

export default (state = initialState, action) => {
    let nextState = state;
    switch (action.type) {
        case ActionType.NAVI_LOGOUT:
        case ActionType.NAVI_LOGIN:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'LoginPage'}),
                state
            );
            break;
        case ActionType.NAVI_HOME:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'HomePage'}),
                state
            );
            break;
        case ActionType.NAVI_DEMO:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'MainPage'}),
                state
            );
            break;
        default:
            console.log("Navigate go to switch default");
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    console.log("Current sate ==> " + nextState.action || state.action);
    return nextState || state;
}

