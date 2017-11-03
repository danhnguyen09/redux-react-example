import * as ActionTypes from '../actions/ActionType';

const initialState = {
  actions: null,
  isLoading: false,
  photos: []
};

export default (state = initialState, action) => {
  state.action = action.type;
  switch (action.type) {
    case ActionTypes.GET_PHOTO:
      return {
        ...state,
        isLoading: true,
      }
    case ActionTypes.GET_PHOTO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        photos: action.photos
      }
    case ActionTypes.GET_PHOTO_FAILURE:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state;
  }
}