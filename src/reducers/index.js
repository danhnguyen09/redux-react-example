import {combineReducers} from 'redux';

import AppReducer from './AppReducer';
import photoReducer from './photoReducer';
import loginReducer from './loginReducer';
import NavigationReducer from './navigationReducer';

const reducer = combineReducers({
    AppReducer,
    photoReducer,
    loginReducer,
    NavigationReducer,
});

export default reducer;