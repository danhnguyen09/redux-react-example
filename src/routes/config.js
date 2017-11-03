import {StackNavigator} from 'react-navigation';

import Login from '../layouts/Login';
import Demo from '../layouts/demo/index';
import App from '../index';

const AppNavigator = StackNavigator({
    LoginPage: {screen: Login},
    HomePage: {screen: App},
    MainPage: {screen: Demo},
}, {
    initialRouteName: 'LoginPage',
});

export default AppNavigator;
