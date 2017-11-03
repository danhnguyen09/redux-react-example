import * as ActionTypes from './ActionType'

export function demoButton1Click(value) {
    return {
        type: ActionTypes.ACTION_1,
        value: !isNaN(value) ? parseFloat(value) + 5 : 'NaN'
    }
}

export function demoButton2Click(value) {
    return {
        type: ActionTypes.ACTION_2,
        value: !isNaN(value) ? parseFloat(value) - 5 : 'NaN'
    }
}
