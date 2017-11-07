import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {BackHandler} from "react-native";
import {addNavigationHelpers, NavigationActions} from 'react-navigation';
import AppNavigator from './config';
import Actions from '../actions';
import store from '../store'


class AppWithNavigationState extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    onBackPress = () => {
        const {navi} = this.props;
        if (navi.index === 0) {
            return false;
        }
        store.dispatch(NavigationActions.back());
        return true;
    };

    render() {
        const {dispatch, navi} = this.props;
        const navigation = addNavigationHelpers({
            dispatch,
            state: navi
        })

        return <AppNavigator navigation={navigation}/>
    }
}

function mapStateToProps(state) {
    return {
        navi: {...state.NavigationReducer},
    }
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(...Actions.naviActions, dispatch),
        dispatch: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigationState);