import * as ActionTypes from './ActionType';
import APIService from '../service/api';
import * as API from '../service/api/config';

export function loginWithEmail(email, password) {
    // alert(email)
    console.log("do login")
    return (dispatch) => {
        APIService.post(API.login(), {
            email: email,
            password: password
        }).then((response) => response.json())
            .then((responseJson) => {
                dispatch({
                    type: responseJson.error ? ActionTypes.LOGIN_FAIL : ActionTypes.LOGIN_SUCCESS,
                    user: responseJson.error ? null : responseJson,
                    error: responseJson.error ? responseJson : null
                })
            })
            .catch((error) => {
                console.log(error)
                dispatch({
                    type: ActionTypes.LOGIN_FAIL
                })
            }).done();
    }
}
