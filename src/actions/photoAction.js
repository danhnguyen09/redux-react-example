import * as ActionTypes from './ActionType';
import APIService from '../service/api';
import * as API from '../service/api/config';

export function getPhoto() {
  return (dispatch) => {
    console.log("Call api get photos")
    APIService.get(API.getPhoto())
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({
          type: ActionTypes.GET_PHOTO_SUCCESS,
          photos: responseJson
        })
      })
      .catch((error) => {
        dispatch({
          type: ActionTypes.GET_PHOTO_FAILURE
        })
      })
  }
}