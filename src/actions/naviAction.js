import * as ActionTypes from './ActionType'
export function gotoLoginPage() {
    return {
        type: ActionTypes.NAVI_LOGIN,
    }
}

export function gotoHomePage() {
    return {
        type: ActionTypes.NAVI_HOME,
    }
}

export function gotoDemoPage() {
    return {
        type: ActionTypes.NAVI_DEMO,
    }
}