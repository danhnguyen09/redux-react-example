import * as ActionType from '../actions/ActionType';

const initState = {
    action: null,
    isLoading: false,
    user: null,
    isLoginSuccess: false,
    isWaitingLogin: false,
    error: null
};

export default (state = initState, action) => {
    state.action = action.type;
    switch (action.type) {
        case ActionType.LOGIN_FAIL:
            return {
                ...state,
                isLoading: false,
                isLoginSuccess: true,
                isWaitingLogin: false,
                error: action.error
            }
        case ActionType.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.user,
                isLoginSuccess: true,
                isWaitingLogin: false,
                error: null
            }
        case ActionType.LOGIN:
            return {
                ...state,
                isLoading: true,
                isWaitingLogin: true,
                isLoginSuccess: false
            }
        default :
            return {...state}
    }
}