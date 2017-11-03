import {AppRegistry, Keyboard} from 'react-native';
// import App from './src/index';
import React, {Component} from 'react';
import {Provider, connect} from 'react-redux';
import store from './src/store';
import AppWithNavigationState from './src/routes/AppNavigator';

class AyogaMobileApp extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this._hideKeyBoard();
    }

    componentDidMount() {

    }

    componentWillMount() {
    }

    _hideKeyBoard() {
        Keyboard.dismiss(0);
    }

    render() {
        this._hideKeyBoard();
        return (
            <Provider store={store}>
                <AppWithNavigationState/>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('Ayoga', () => AyogaMobileApp);
