import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addNavigationHelpers} from 'react-navigation';
import AppNavigator from './config';
import Actions from '../actions';


class AppWithNavigationState extends Component {
    constructor(props) {
        super(props)
    }

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
        actions: bindActionCreators(...Actions.naviActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigationState);