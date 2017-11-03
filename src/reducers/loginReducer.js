import * as ActionType from '../actions/ActionType';

const initState = {
    action: null,
    isLoading: false,
    user: null
};

export default (state = initState, action) => {
    state.action = action.type;
    switch (action.type) {
        case ActionType.LOGIN_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case ActionType.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.user
            }
        case ActionType.LOGIN:
            return {
                ...state,
                isLoading: true
            }
        default :
            return {...state}
    }
}