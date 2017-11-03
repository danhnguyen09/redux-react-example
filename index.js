import {AppRegistry, Keyboard} from 'react-native';
// import App from './src/index';
import {BackHandler} from "react-native";
import React, {Component} from 'react';
import {Provider, connect} from 'react-redux';
import store from './src/store';
import AppWithNavigationState from './src/routes/AppNavigator';

class AyogaMobileApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
    }

    onBackPress = () => {
        const {dispatch, navi} = this.props;
        if (navi.index === 0) {
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };

    componentWillUnmount() {
        this._hideKeyBoard();
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
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
