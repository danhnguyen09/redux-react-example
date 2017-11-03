import * as ActionTypes from "../actions/ActionType";

const initialState = {
    action: null,
    value: ''
};

export default (state = initialState, action) => {
    state.action = action.type;
    switch (action.type) {
        case ActionTypes.ACTION_1:
            return {
                ...state,
                value: action.value
            };
            break;
        case ActionTypes.ACTION_2:
            return {
                ...state,
                value: action.value
            };
            break;
        default:
            return state;
    }
}