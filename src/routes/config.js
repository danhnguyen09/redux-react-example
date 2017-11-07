import {StackNavigator} from 'react-navigation';

import Login from '../layouts/Login';
import DrawerPage from '../components/leftmenu/DrawNavigation';

const RootAppNavigator = StackNavigator({
    LoginPage: {screen: Login},
    MainPage: {screen: DrawerPage},
}, {
    initialRouteName: 'LoginPage',
    headerMode: 'none'
});
export default RootAppNavigator;
